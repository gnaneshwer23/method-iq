
import { supabase } from '../supabase-client';
import { databaseApi } from './index';

const authApi = {
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
      await databaseApi.createUserProfile({
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

export default authApi;
