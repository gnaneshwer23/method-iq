
import { supabase } from '../../supabase-client';
import type { BlockchainRecord } from '@/types/database.types';

export const recordsApi = {
  addRecord: async (record: { protocol_id?: string; experiment_id?: string; hash: string; transaction_id?: string; blockchain_network?: string }) => {
    const recordWithDefaults = {
      ...record,
      verified: false,
      blockchain_network: record.blockchain_network || 'polygon-mumbai'
    };
    
    const { data, error } = await supabase
      .from('blockchain_logs')
      .insert(recordWithDefaults)
      .select();
    
    return { data, error };
  },

  getVerificationHistory: async (protocolId?: string, experimentId?: string) => {
    let query = supabase
      .from('blockchain_logs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (protocolId) {
      query = query.eq('protocol_id', protocolId);
    }
    if (experimentId) {
      query = query.eq('experiment_id', experimentId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  getAllRecords: async () => {
    const { data, error } = await supabase
      .from('blockchain_logs')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  }
};
