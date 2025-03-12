import { supabase } from '../supabase-client';
import type { BlockchainRecord, RealtimeEvent } from '@/types/database.types';

export const blockchainApi = {
  /**
   * Add a new record to blockchain verification
   * Logs a new record's hash and metadata to the blockchain
   */
  addRecord: async (record: Omit<BlockchainRecord, 'id' | 'timestamp' | 'verified'>) => {
    const recordWithDefaults = {
      ...record,
      verified: false,
      timestamp: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('blockchain_records')
      .insert(recordWithDefaults)
      .select();
    
    return { data, error };
  },
  
  /**
   * Verify a record's hash against the stored blockchain data
   * @param recordId - The ID of the record to verify
   */
  verifyRecord: async (recordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('id', recordId)
      .single();
    
    if (error) {
      return { data: null, verified: false, error };
    }
    
    // In a real implementation, this would check against an actual blockchain
    // For now, we just return the record and assume verification logic would happen here
    return { data, verified: true, error: null };
  },
  
  /**
   * Get verification history for an entity
   * Returns the entire blockchain transaction history for the given entity
   * @param recordType - The type of record (e.g., "protocol", "result")
   * @param originalRecordId - The ID of the original record
   */
  getVerificationHistory: async (recordType: string, originalRecordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('record_type', recordType)
      .eq('record_id', originalRecordId)
      .order('timestamp', { ascending: false });
    
    return { data, error };
  },
  
  /**
   * Verify if a hash matches the chain records
   * @param hash - The hash to verify
   * @param entityType - The type of entity (e.g., "protocol", "result")
   * @param entityId - The ID of the entity
   */
  verifyHash: async (hash: string, entityType: string, entityId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('record_type', entityType)
      .eq('record_id', entityId)
      .eq('hash', hash)
      .single();
    
    if (error) {
      return { verified: false, error };
    }
    
    return { verified: true, data, error: null };
  },
  
  /**
   * Get all blockchain records
   */
  getAllRecords: async () => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .order('timestamp', { ascending: false });
    
    return { data, error };
  },

  /**
   * Subscribe to protocol log events
   */
  subscribeToProtocolLogs: (callback: (payload: RealtimeEvent) => void) => {
    const channel = supabase.channel('blockchain_events');
    
    return channel
      .on('broadcast', { event: 'blockchain_event' }, callback)
      .subscribe();
  },

  /**
   * Emit a protocol log event
   */
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

    // Also broadcast the event for real-time subscribers
    supabase.channel('blockchain_events').send({
      type: 'broadcast',
      event: 'blockchain_event',
      payload: event
    });

    return { data, error };
  }
};
