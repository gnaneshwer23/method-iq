
import { supabase } from '../supabase-client';
import type { BlockchainRecord } from '@/types/database.types';

export const blockchainApi = {
  // Add record to blockchain verification
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
  
  // Verify a record
  verifyRecord: async (recordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('id', recordId)
      .single();
    
    return { data, error };
  },
  
  // Get verification history for a record
  getVerificationHistory: async (recordType: string, originalRecordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('record_type', recordType)
      .eq('record_id', originalRecordId)
      .order('timestamp', { ascending: false });
    
    return { data, error };
  }
};
