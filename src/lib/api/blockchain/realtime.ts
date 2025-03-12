
import { supabase } from '../../supabase-client';
import type { RealtimeEvent } from '@/types/database.types';

export const realtimeApi = {
  subscribeToProtocolLogs: (callback: (payload: RealtimeEvent) => void) => {
    const channel = supabase.channel('blockchain_events');
    
    channel.on('postgres_changes', { 
      event: 'INSERT',
      schema: 'public',
      table: 'realtime_events'
    }, (payload) => {
      callback(payload as unknown as RealtimeEvent);
    }).subscribe();
    
    return channel;
  },

  emitProtocolLog: async (payload: Record<string, any>) => {
    const event: Omit<RealtimeEvent, 'id' | 'created_at'> = {
      event_type: 'protocol_log',
      source: 'blockchain',
      target: 'blockchain',
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
