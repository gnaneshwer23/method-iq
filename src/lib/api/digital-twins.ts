
import { supabase } from '../supabase-client';
import type { DigitalTwin, SensorData, RealtimeEvent } from '@/types/database.types';

export const digitalTwinApi = {
  /**
   * Create a new digital twin simulation
   */
  createDigitalTwin: async (twin: Omit<DigitalTwin, 'id' | 'created_at' | 'updated_at' | 'simulation_status'>) => {
    const twinWithDefaults = {
      ...twin,
      simulation_status: 'not_started' as const
    };
    
    const { data, error } = await supabase
      .from('digital_twins')
      .insert(twinWithDefaults)
      .select();
    
    return { data, error };
  },
  
  /**
   * Get digital twin by ID
   */
  getDigitalTwin: async (id: string) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  /**
   * Update simulation status and parameters
   */
  updateDigitalTwin: async (id: string, updates: Partial<Omit<DigitalTwin, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  /**
   * Update simulation status
   */
  updateSimulationStatus: async (id: string, status: DigitalTwin['simulation_status']) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .update({ 
        simulation_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  /**
   * Get all digital twins for a project
   */
  getProjectTwins: async (projectId: string) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('project_id', projectId);
    
    return { data, error };
  },
  
  /**
   * Run a simulation step or scenario
   * @param id - The ID of the digital twin to run simulation for
   * @param parameters - Optional parameters to use for the simulation
   */
  runSimulation: async (id: string, parameters?: Record<string, any>) => {
    // First update status to in_progress
    const statusUpdate = await digitalTwinApi.updateSimulationStatus(id, 'in_progress');
    
    if (statusUpdate.error) {
      return { data: null, error: statusUpdate.error };
    }
    
    // If parameters are provided, update the twin with them
    if (parameters && Object.keys(parameters).length > 0) {
      const paramUpdate = await digitalTwinApi.updateDigitalTwin(id, {
        parameters: {
          ...statusUpdate.data?.[0]?.parameters,
          ...parameters,
          last_simulation_run: new Date().toISOString()
        }
      });
      
      if (paramUpdate.error) {
        return { data: null, error: paramUpdate.error };
      }
    }
    
    // In a real implementation, this would trigger actual simulation logic
    // For now, we'll just simulate a delay and mark it as completed
    // In a production environment, this would likely be a background job
    
    // Simulate a delay for the "simulation" to run
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update status to completed
    const completionUpdate = await digitalTwinApi.updateSimulationStatus(id, 'completed');
    
    return {
      data: completionUpdate.data?.[0] || null,
      error: completionUpdate.error
    };
  },
  
  /**
   * Update digital twin with sensor data
   * @param id - The ID of the digital twin
   * @param sensorData - The sensor data to incorporate
   */
  updateWithSensorData: async (id: string, sensorData: SensorData[]) => {
    // First get the current twin
    const { data: twin, error } = await digitalTwinApi.getDigitalTwin(id);
    
    if (error || !twin) {
      return { data: null, error: error || new Error('Digital twin not found') };
    }
    
    // Update the parameters with the sensor data
    // This is a simplified version - in a real implementation, 
    // this would process and integrate the data more intelligently
    const updatedParameters = {
      ...twin.parameters,
      latest_sensor_data: sensorData,
      last_sensor_update: new Date().toISOString()
    };
    
    // Update the twin
    const { data, error: updateError } = await digitalTwinApi.updateDigitalTwin(id, {
      parameters: updatedParameters
    });
    
    return { data, error: updateError };
  },
  
  /**
   * Subscribe to changes in a digital twin
   * @param id - The ID of the digital twin to subscribe to
   * @param callback - Function to call when the twin is updated
   */
  subscribeToTwinUpdates: (id: string, callback: (payload: any) => void) => {
    const channel = supabase.channel(`digital_twin_${id}`);
    
    channel.on('broadcast', { event: 'twin_update' }, (payload) => {
      callback(payload);
    });
    
    return channel.subscribe();
  },

  /**
   * Subscribe to simulation update events
   */
  subscribeToSimulationUpdates: (callback: (payload: RealtimeEvent) => void) => {
    const channel = supabase.channel('digital_twin_events');
    
    channel.on('broadcast', { event: 'simulation_update' }, (payload) => {
      callback(payload as unknown as RealtimeEvent);
    });
    
    return channel.subscribe();
  },

  /**
   * Emit a simulation update event
   */
  emitSimulationUpdate: async (target: RealtimeEvent['target'], payload: Record<string, any>) => {
    const event: Omit<RealtimeEvent, 'id' | 'created_at'> = {
      event_type: 'simulation_update',
      source: 'digital_twin',
      target,
      payload,
      processed: false
    };

    const { data, error } = await supabase
      .from('realtime_events')
      .insert(event)
      .select();

    // Also broadcast the event for real-time subscribers
    const channel = supabase.channel('digital_twin_events');
    channel.send({
      type: 'broadcast',
      event: 'simulation_update',
      payload: event
    });

    return { data, error };
  }
};
