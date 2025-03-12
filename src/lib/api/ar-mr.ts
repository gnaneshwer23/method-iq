
import { supabase } from '../supabase-client';

export const arMrApi = {
  // Start a new AR/MR session
  startSession: async (sessionData: any) => {
    try {
      const { data, error } = await supabase
        .from('ar_sessions')
        .insert(sessionData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Start AR/MR session error:', error);
      return { data: null, error };
    }
  },
  
  // End an AR/MR session
  endSession: async (sessionId: string, endData: any) => {
    try {
      const { data, error } = await supabase
        .from('ar_sessions')
        .update({
          end_time: new Date().toISOString(),
          ...endData
        })
        .eq('id', sessionId)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('End AR/MR session error:', error);
      return { data: null, error };
    }
  },
  
  // Get all AR/MR sessions for a project
  getProjectSessions: async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('ar_sessions')
        .select('*')
        .eq('project_id', projectId)
        .order('start_time', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get project AR/MR sessions error:', error);
      return { data: null, error };
    }
  }
};
