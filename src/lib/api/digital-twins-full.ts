import { supabase } from '../supabase-client';

export const digitalTwinFullApi = {
  // Digital Twin CRUD
  createTwin: async (twin: {
    name: string;
    description?: string;
    twin_type: 'equipment' | 'system' | 'process';
    physical_id?: string;
    state?: Record<string, any>;
    metadata?: Record<string, any>;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const { data, error } = await supabase
      .from('digital_twins')
      .insert({
        ...twin,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  getTwins: async (filters?: { twin_type?: string; is_active?: boolean }) => {
    let query = supabase
      .from('digital_twins')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.twin_type) {
      query = query.eq('twin_type', filters.twin_type);
    }
    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getTwinById: async (id: string) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  },

  updateTwin: async (id: string, updates: Partial<{
    name: string;
    description: string;
    state: Record<string, any>;
    metadata: Record<string, any>;
    is_active: boolean;
  }>) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  deleteTwin: async (id: string) => {
    const { error } = await supabase
      .from('digital_twins')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Twin Simulations
  createSimulation: async (simulation: {
    twin_id: string;
    protocol_id?: string;
    name: string;
    description?: string;
    input_parameters: Record<string, any>;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const { data, error } = await supabase
      .from('twin_simulations')
      .insert({
        ...simulation,
        created_by: user.id,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Call edge function to run simulation
    const { data: simResult, error: simError } = await supabase.functions.invoke('run-simulation', {
      body: {
        simulationId: data.id,
        twinId: simulation.twin_id,
        inputParameters: simulation.input_parameters,
        protocolId: simulation.protocol_id,
      },
    });

    if (simError) {
      // Update simulation status to failed
      await supabase
        .from('twin_simulations')
        .update({
          status: 'failed',
          error_message: simError.message,
        })
        .eq('id', data.id);
    }

    return { data, error: null };
  },

  getSimulations: async (twinId?: string) => {
    let query = supabase
      .from('twin_simulations')
      .select('*, digital_twins(name), protocols(title)')
      .order('created_at', { ascending: false });

    if (twinId) {
      query = query.eq('twin_id', twinId);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getSimulationById: async (id: string) => {
    const { data, error } = await supabase
      .from('twin_simulations')
      .select('*, digital_twins(name, state), protocols(title, detailed_steps)')
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Twin Metrics
  addMetric: async (metric: {
    twin_id: string;
    metric_name: string;
    metric_value: number;
    metric_unit?: string;
    metadata?: Record<string, any>;
  }) => {
    const { data, error } = await supabase
      .from('twin_metrics')
      .insert(metric)
      .select()
      .single();

    return { data, error };
  },

  getMetrics: async (twinId: string, metricName?: string, limit = 100) => {
    let query = supabase
      .from('twin_metrics')
      .select('*')
      .eq('twin_id', twinId)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (metricName) {
      query = query.eq('metric_name', metricName);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Subscribe to real-time twin updates
  subscribeTwinUpdates: (twinId: string, callback: (payload: any) => void) => {
    const channel = supabase
      .channel(`twin-${twinId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'digital_twins',
          filter: `id=eq.${twinId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'twin_metrics',
          filter: `twin_id=eq.${twinId}`,
        },
        callback
      )
      .subscribe();

    return channel;
  },
};
