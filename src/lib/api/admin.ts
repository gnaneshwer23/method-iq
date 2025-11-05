import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['app_role'];

export interface UserWithRole {
  id: string;
  email: string;
  created_at: string;
  full_name?: string;
  institution?: string;
  role?: UserRole;
}

export const adminApi = {
  // Get all users with their roles
  async getAllUsers() {
    try {
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, institution, created_at');

      if (profilesError) throw profilesError;

      // Get all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get auth users (requires service role in production)
      const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

      if (usersError) throw usersError;

      // Combine the data
      const usersWithRoles: UserWithRole[] = users.map(user => {
        const profile = profiles?.find(p => p.id === user.id);
        const userRole = roles?.find(r => r.user_id === user.id);

        return {
          id: user.id,
          email: user.email || '',
          created_at: user.created_at,
          full_name: profile?.full_name,
          institution: profile?.institution,
          role: userRole?.role as UserRole,
        };
      });

      return { data: usersWithRoles, error: null };
    } catch (error: any) {
      console.error('Error fetching users:', error);
      return { data: null, error };
    }
  },

  // Update user role
  async updateUserRole(userId: string, newRole: UserRole) {
    try {
      // Check if user already has a role
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      let result;
      if (existingRole) {
        // Update existing role
        result = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);
      } else {
        // Insert new role
        result = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });
      }

      if (result.error) throw result.error;

      return { data: true, error: null };
    } catch (error: any) {
      console.error('Error updating user role:', error);
      return { data: null, error };
    }
  },

  // Get system statistics
  async getSystemStats() {
    try {
      const [
        protocolsResult,
        experimentsResult,
        usersResult,
      ] = await Promise.all([
        supabase.from('protocols').select('id, verified', { count: 'exact', head: true }),
        supabase.from('experiments').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
      ]);

      // Get verified protocols count
      const { count: verifiedCount } = await supabase
        .from('protocols')
        .select('id', { count: 'exact', head: true })
        .eq('verified', true);

      return {
        data: {
          totalProtocols: protocolsResult.count || 0,
          verifiedProtocols: verifiedCount || 0,
          totalExperiments: experimentsResult.count || 0,
          totalUsers: usersResult.count || 0,
          totalDevices: 0, // IoT devices table doesn't exist yet
        },
        error: null,
      };
    } catch (error: any) {
      console.error('Error fetching system stats:', error);
      return { data: null, error };
    }
  },

  // Delete user (admin only)
  async deleteUser(userId: string) {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;

      return { data: true, error: null };
    } catch (error: any) {
      console.error('Error deleting user:', error);
      return { data: null, error };
    }
  },
};
