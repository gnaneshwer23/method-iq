
import { supabase } from '../supabase-client';
import type { RealtimeEvent } from '@/types/database.types';

export const federatedLearningApi = {
  /**
   * Get available federated learning projects
   */
  getProjects: async () => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .select('*');
    
    return { data, error };
  },
  
  /**
   * Get a specific federated learning project by ID
   */
  getProject: async (id: string) => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  /**
   * Join a federated learning project
   */
  joinProject: async (projectId: string, userId: string) => {
    const { data, error } = await supabase
      .from('federated_learning_participants')
      .insert({
        project_id: projectId,
        user_id: userId,
        status: 'active'
      })
      .select();
    
    return { data, error };
  },
  
  /**
   * Get project participants
   */
  getParticipants: async (projectId: string) => {
    const { data, error } = await supabase
      .from('federated_learning_participants')
      .select(`
        *,
        users:user_id (
          id,
          email
        )
      `)
      .eq('project_id', projectId);
    
    return { data, error };
  },
  
  /**
   * Subscribe to federated learning updates
   */
  subscribeToUpdates: (projectId: string, callback: (payload: RealtimeEvent) => void) => {
    const channel = supabase.channel(`federated_learning_${projectId}`);
    
    channel.on('postgres_changes', { 
      event: 'INSERT',
      schema: 'public',
      table: 'realtime_events',
      filter: `event_type=eq.federated_learning_update AND payload->project_id=eq.${projectId}`
    }, (payload) => {
      callback(payload as unknown as RealtimeEvent);
    }).subscribe();
    
    return channel;
  },
  
  /**
   * Emit a federated learning update event
   */
  emitUpdate: async (target: RealtimeEvent['target'], payload: Record<string, any>) => {
    const event: Omit<RealtimeEvent, 'id' | 'created_at'> = {
      event_type: 'federated_learning_update',
      source: 'federated_learning',
      target,
      payload,
      processed: false
    };
    
    const { data, error } = await supabase
      .from('realtime_events')
      .insert(event)
      .select();
      
    return { data, error };
  }
};
