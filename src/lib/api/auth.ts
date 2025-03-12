
import { supabase } from '../supabase-client';
import type { UserProfile } from '@/types/database.types';

export const authApi = {
  // Sign up a new user and create their profile
  signUp: async (email: string, password: string, profileData?: { name: string, role: 'researcher' | 'collaborator' }) => {
    // Create the user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) return { data: null, error: authError };
    
    // If user was created successfully and profile data provided, create profile
    if (authData.user && profileData) {
      await createUserProfile({
        user_id: authData.user.id,
        email: authData.user.email || email,
        name: profileData.name,
        role: profileData.role
      });
    }
    
    return { data: authData, error: null };
  },
  
  // Sign in existing user
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  },
  
  // Sign out current user
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  
  // Get the current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  },
  
  // Get the current user
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  },
  
  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  },
  
  // Update user password
  updatePassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    return { data, error };
  }
};

// Extracted helper function
const createUserProfile = async (profile: Omit<UserProfile, 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      ...profile,
      updated_at: new Date().toISOString()
    })
    .select();
  
  return { data, error };
};

export default authApi;
