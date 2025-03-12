
import { supabase } from '../supabase-client';

export const protocolApi = {
  // Get AI recommended protocols
  getRecommendedProtocols: async (researchType: string, parameters: any) => {
    try {
      // This would typically call an AI service or custom function
      // For now, we'll just query existing protocols as examples
      const { data, error } = await supabase
        .from('protocols')
        .select('*')
        .eq('research_type', researchType)
        .limit(5);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get recommended protocols error:', error);
      return { data: null, error };
    }
  },
  
  // Save a new protocol
  createProtocol: async (protocol: any) => {
    try {
      const { data, error } = await supabase
        .from('protocols')
        .insert(protocol)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create protocol error:', error);
      return { data: null, error };
    }
  },
  
  // Get protocol details with steps
  getProtocolWithSteps: async (protocolId: string) => {
    try {
      const { data: protocol, error: protocolError } = await supabase
        .from('protocols')
        .select('*')
        .eq('id', protocolId)
        .single();
      
      if (protocolError) throw protocolError;
      
      const { data: steps, error: stepsError } = await supabase
        .from('protocol_steps')
        .select('*')
        .eq('protocol_id', protocolId)
        .order('step_order', { ascending: true });
      
      if (stepsError) throw stepsError;
      
      return { protocol, steps, error: null };
    } catch (error: any) {
      console.error('Get protocol with steps error:', error);
      return { protocol: null, steps: null, error };
    }
  },
  
  // Update a protocol
  updateProtocol: async (protocolId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('protocols')
        .update(updates)
        .eq('id', protocolId)
        .select();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update protocol error:', error);
      return { data: null, error };
    }
  },
  
  // Create a protocol step
  createProtocolStep: async (step: any) => {
    try {
      const { data, error } = await supabase
        .from('protocol_steps')
        .insert(step)
        .select();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create protocol step error:', error);
      return { data: null, error };
    }
  }
};
