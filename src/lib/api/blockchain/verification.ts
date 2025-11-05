
import { supabase } from '../../supabase-client';
import type { BlockchainRecord } from '@/types/database.types';

export const verificationApi = {
  verifyRecord: async (recordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_logs')
      .select('*')
      .eq('id', recordId)
      .single();
    
    if (error) {
      return { data: null, verified: false, error };
    }
    
    return { data, verified: true, error: null };
  },

  verifyHash: async (hash: string, protocolId?: string, experimentId?: string) => {
    let query = supabase
      .from('blockchain_logs')
      .select('*')
      .eq('hash', hash);
    
    if (protocolId) {
      query = query.eq('protocol_id', protocolId);
    }
    if (experimentId) {
      query = query.eq('experiment_id', experimentId);
    }
    
    const { data, error } = await query.maybeSingle();
    
    if (error) {
      return { verified: false, error };
    }
    
    return { verified: !!data, data, error: null };
  },

  verifyOnBlockchain: async (entityType: 'protocol' | 'experiment', entityId: string, entityData: any) => {
    const { data, error } = await supabase.functions.invoke('blockchain-verify', {
      body: { entityType, entityId, entityData }
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  }
};
