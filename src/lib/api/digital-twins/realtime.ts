
import { supabase } from '../../supabase-client';
import type { RealtimeEvent } from '@/types/database.types';

export const subscribeToTwinUpdates = (id: string, callback: (payload: any) => void) => {
  const channel = supabase.channel(`digital_twin_${id}`);
  
  channel.on('postgres_changes', { 
    event: 'UPDATE',
    schema: 'public',
    table: 'digital_twins',
    filter: `id=eq.${id}`
  }, (payload) => {
    callback(payload);
  }).subscribe();
  
  return channel;
};

export const subscribeToSimulationUpdates = (callback: (payload: RealtimeEvent) => void) => {
  const channel = supabase.channel('digital_twin_events');
  
  channel.on('postgres_changes', { 
    event: 'INSERT',
    schema: 'public',
    table: 'realtime_events',
    filter: 'source=eq.digital_twin'
  }, (payload) => {
    callback(payload as unknown as RealtimeEvent);
  }).subscribe();
  
  return channel;
};

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

  return { data, error };
};
