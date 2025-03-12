
import { supabase } from '../supabase-client';
import type { UserProfile } from '@/types/database.types';

export const databaseApi = {
  // Create a new user profile
  createUserProfile: async (profile: Omit<UserProfile, 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .select();
    
    return { data, error };
  },
  
  // Get user profile by ID
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { data, error };
  },
  
  // Update user profile
  updateUserProfile: async (userId: string, updates: Partial<Omit<UserProfile, 'user_id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select();
    
    return { data, error };
  },
  
  // Get all user profiles (admin only)
  getAllUserProfiles: async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  }
};

export default databaseApi;
