
import { supabase } from '../supabase-client';
import type { ARSession } from '@/types/database.types';

export const arMrApi = {
  // Start a new AR session
  startSession: async (session: Omit<ARSession, 'id' | 'end_time'>) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .insert(session)
      .select();
    
    return { data, error };
  },
  
  // End an AR session
  endSession: async (id: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .update({ end_time: new Date().toISOString() })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  // Get AR session data
  getSession: async (id: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  // Get user's AR sessions
  getUserSessions: async (userId: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false });
    
    return { data, error };
  }
};
