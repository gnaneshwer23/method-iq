
import { supabase } from '../supabase-client';
import type { ARSession, ARAsset } from '@/types/database.types';

export const arMrApi = {
  /**
   * Start a new AR/MR session
   */
  startSession: async (session: Omit<ARSession, 'id' | 'end_time'>) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .insert(session)
      .select();
    
    return { data, error };
  },
  
  /**
   * End an AR/MR session
   */
  endSession: async (id: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .update({ 
        end_time: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  /**
   * Get AR/MR session data
   */
  getSession: async (id: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  /**
   * Get user's AR/MR sessions with optional filters
   */
  getUserSessions: async (userId: string, options?: { experimentId?: string; isActive?: boolean }) => {
    let query = supabase
      .from('ar_sessions')
      .select('*')
      .eq('user_id', userId);
    
    if (options?.experimentId) {
      query = query.eq('experiment_id', options.experimentId);
    }
    
    if (options?.isActive) {
      query = query.is('end_time', null);
    }
    
    const { data, error } = await query.order('start_time', { ascending: false });
    
    return { data, error };
  },

  /**
   * Create a new AR asset
   */
  createAsset: async (asset: Omit<ARAsset, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('ar_assets')
      .insert(asset)
      .select();
    
    return { data, error };
  },
  
  /**
   * Get AR asset by ID
   */
  getAsset: async (id: string) => {
    const { data, error } = await supabase
      .from('ar_assets')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  /**
   * Get AR assets with optional filtering
   */
  getAssets: async (options?: { type?: ARAsset['type']; experimentId?: string }) => {
    let query = supabase
      .from('ar_assets')
      .select('*');
    
    if (options?.type) {
      query = query.eq('type', options.type);
    }
    
    if (options?.experimentId) {
      query = query.eq('experiment_id', options.experimentId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  /**
   * Subscribe to AR session updates
   * @param sessionId - The ID of the session to subscribe to
   * @param callback - Function to call when updates are received
   */
  subscribeToSessionUpdates: (sessionId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('ar_session_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ar_sessions',
          filter: `id=eq.${sessionId}`
        },
        callback
      )
      .subscribe();
  },

  /**
   * Subscribe to real-time digital twin updates for AR overlay
   * @param digitalTwinId - The ID of the digital twin to subscribe to
   * @param callback - Function to call when updates are received
   */
  subscribeToDigitalTwinUpdates: (digitalTwinId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('digital_twin_ar_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'digital_twins',
          filter: `id=eq.${digitalTwinId}`
        },
        callback
      )
      .subscribe();
  }
};
