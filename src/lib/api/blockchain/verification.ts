
import { supabase } from '../../supabase-client';
import type { BlockchainRecord } from '@/types/database.types';

export const verificationApi = {
  verifyRecord: async (recordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('id', recordId)
      .single();
    
    if (error) {
      return { data: null, verified: false, error };
    }
    
    return { data, verified: true, error: null };
  },

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
  }
};
