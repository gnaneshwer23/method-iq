
import { supabase } from '../supabase-client';
import type { Protocol, ProtocolStep } from '@/types/database.types';

export const protocolApi = {
  // Get AI recommended protocols
  getRecommendedProtocols: async (researchType: string, parameters: any) => {
    // In a real implementation, this would call an AI service
    // For now, we just query existing protocols
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('research_type', researchType)
      .eq('is_ai_generated', true)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  // Save a new protocol
  saveProtocol: async (protocol: Omit<Protocol, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('protocols')
      .insert(protocol)
      .select();
    
    return { data, error };
  },
  
  // Add steps to a protocol
  addProtocolSteps: async (steps: Omit<ProtocolStep, 'id' | 'created_at' | 'updated_at'>[]) => {
    const { data, error } = await supabase
      .from('protocol_steps')
      .insert(steps)
      .select();
    
    return { data, error };
  },
  
  // Get protocol with all steps
  getProtocolWithSteps: async (id: string) => {
    const { data: protocol, error: protocolError } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    if (protocolError) return { protocol: null, steps: null, error: protocolError };
    
    const { data: steps, error: stepsError } = await supabase
      .from('protocol_steps')
      .select('*')
      .eq('protocol_id', id)
      .order('step_order', { ascending: true });
    
    return { protocol, steps, error: stepsError };
  }
};
