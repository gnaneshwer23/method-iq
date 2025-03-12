
import { supabase } from '../supabase-client';

export const blockchainApi = {
  // Record a new verification
  createRecord: async (recordData: any) => {
    try {
      const { data, error } = await supabase
        .from('blockchain_records')
        .insert(recordData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create blockchain record error:', error);
      return { data: null, error };
    }
  },
  
  // Verify a record
  verifyRecord: async (recordType: string, recordId: string) => {
    try {
      const { data, error } = await supabase
        .from('blockchain_records')
        .select('*')
        .eq('record_type', recordType)
        .eq('record_id', recordId)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Verify record error:', error);
      return { data: null, error };
    }
  },
  
  // Get all blockchain records for an entity
  getRecordsForEntity: async (recordType: string, recordId: string) => {
    try {
      const { data, error } = await supabase
        .from('blockchain_records')
        .select('*')
        .eq('record_type', recordType)
        .eq('record_id', recordId)
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get records for entity error:', error);
      return { data: null, error };
    }
  }
};
