
import { supabase } from '../supabase-client';
import type { FederatedLearningProject, FederatedModelRound, ClientUpdate, RealtimeEvent } from '@/types/database.types';

export const federatedLearningApi = {
  // Create a federated learning project
  createProject: async (project: Omit<FederatedLearningProject, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    const projectWithDefaults = {
      ...project,
      status: 'recruiting' as const
    };
    
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .insert(projectWithDefaults)
      .select();
    
    return { data, error };
  },
  
  // Get federated learning project
  getProject: async (id: string) => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  // Update project status
  updateProjectStatus: async (id: string, status: FederatedLearningProject['status']) => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .update({ status })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  // Get all available federated learning projects
  getAvailableProjects: async () => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .select('*')
      .in('status', ['recruiting', 'training'])
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Start a new training round
  startTrainingRound: async (modelName: string, roundNumber: number) => {
    const { data, error } = await supabase
      .from('federated_model_rounds')
      .insert({
        model_name: modelName,
        round_number: roundNumber,
        global_model_params: '',
        status: 'pending'
      })
      .select()
      .single();
    
    return { data, error };
  },

  // Submit client model updates
  submitClientUpdate: async (roundId: string, clientId: string, modelParams: string) => {
    const { data, error } = await supabase
      .from('client_updates')
      .insert({
        round_id: roundId,
        client_id: clientId,
        model_params: modelParams,
        timestamp: new Date().toISOString()
      })
      .select();
    
    return { data, error };
  },

  // Get training round data
  getTrainingRound: async (roundId: string) => {
    const { data, error } = await supabase
      .from('federated_model_rounds')
      .select('*')
      .eq('round_id', roundId)
      .single();
    
    return { data, error };
  },

  // Aggregate client updates and update global model
  aggregateUpdates: async (roundId: string) => {
    // First get all client updates for this round
    const { data: updates, error: fetchError } = await supabase
      .from('client_updates')
      .select('*')
      .eq('round_id', roundId);
    
    if (fetchError) return { error: fetchError };
    
    // Then update the global model parameters and mark round as completed
    const { data, error: updateError } = await supabase
      .from('federated_model_rounds')
      .update({ 
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('round_id', roundId)
      .select();
    
    return { data, error: updateError };
  },

  /**
   * Subscribe to training round updates
   */
  subscribeToRoundUpdates: (roundId: string, callback: (payload: any) => void) => {
    const channel = supabase.channel(`federated_round_${roundId}`);
    
    channel.on('broadcast', { event: 'round_update' }, (payload) => {
      callback(payload);
    });
    
    return channel.subscribe();
  },

  // Get all client updates for a round
  getClientUpdates: async (roundId: string) => {
    const { data, error } = await supabase
      .from('client_updates')
      .select('*')
      .eq('round_id', roundId)
      .order('timestamp', { ascending: true });
    
    return { data, error };
  },

  // Get latest training round for a model
  getLatestRound: async (modelName: string) => {
    const { data, error } = await supabase
      .from('federated_model_rounds')
      .select('*')
      .eq('model_name', modelName)
      .order('round_number', { ascending: false })
      .limit(1)
      .single();
    
    return { data, error };
  },

  /**
   * Subscribe to model update events
   */
  subscribeToModelUpdates: (callback: (payload: RealtimeEvent) => void) => {
    const channel = supabase.channel('federated_events');
    
    channel.on('broadcast', { event: 'model_update' }, (payload) => {
      callback(payload as unknown as RealtimeEvent);
    });
    
    return channel.subscribe();
  },

  /**
   * Emit a model update event
   */
  emitModelUpdate: async (target: RealtimeEvent['target'], payload: Record<string, any>) => {
    const event: Omit<RealtimeEvent, 'id' | 'created_at'> = {
      event_type: 'model_update',
      source: 'federated',
      target,
      payload,
      processed: false
    };

    const { data, error } = await supabase
      .from('realtime_events')
      .insert(event)
      .select();

    // Also broadcast the event for real-time subscribers
    const channel = supabase.channel('federated_events');
    channel.send({
      type: 'broadcast',
      event: 'model_update',
      payload: event
    });

    return { data, error };
  }
};
