
import { supabase } from '../../supabase-client';
import type { RealtimeEvent } from '@/types/database.types';

/**
 * Subscribe to changes in a digital twin
 * @param id - The ID of the digital twin to subscribe to
 * @param callback - Function to call when the twin is updated
 */
export const subscribeToTwinUpdates = (id: string, callback: (payload: any) => void) => {
  const channel = supabase.channel(`digital_twin_${id}`);
  
  channel.on('broadcast', { event: 'twin_update' }, (payload) => {
    callback(payload);
  }).subscribe();
  
  return channel;
};

/**
 * Subscribe to simulation update events
 */
export const subscribeToSimulationUpdates = (callback: (payload: RealtimeEvent) => void) => {
  const channel = supabase.channel('digital_twin_events');
  
  channel.on('broadcast', { event: 'simulation_update' }, (payload) => {
    callback(payload as unknown as RealtimeEvent);
  }).subscribe();
  
  return channel;
};

/**
 * Emit a simulation update event
 */
export const emitSimulationUpdate = async (target: RealtimeEvent['target'], payload: Record<string, any>) => {
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
  // Fix: change broadcast to system event type
  channel.send({
    type: 'system',
    event: 'simulation_update',
    payload: event
  });

  return { data, error };
};
