
import { supabase } from '../../supabase-client';
import type { RealtimeEvent } from '@/types/database.types';

export const realtimeApi = {
  subscribeToProtocolLogs: (callback: (payload: RealtimeEvent) => void) => {
    const channel = supabase.channel('blockchain_events');
    
    channel.on('broadcast', { event: 'blockchain_event' }, (payload) => {
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

    const channel = supabase.channel('blockchain_events');
    channel.subscribe();
    
    channel.send({
      type: 'broadcast',
      event: 'blockchain_event',
      payload: event
    });

    return { data, error };
  }
};
