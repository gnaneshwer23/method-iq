import { supabase } from '../supabase-client';
import type { Protocol, ProtocolStep, Experiment } from '@/types/database.types';

export const protocolApi = {
  // Create a new protocol
  createProtocol: async (protocol: Omit<Protocol, 'protocol_id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('protocols')
      .insert(protocol)
      .select();
    
    return { data, error };
  },
  
  // Get protocol by ID
  getProtocolById: async (protocolId: string) => {
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('protocol_id', protocolId)
      .single();
    
    return { data, error };
  },
  
  // Get all protocols created by a user
  getUserProtocols: async (userId: string) => {
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  // Update protocol
  updateProtocol: async (protocolId: string, updates: Partial<Protocol>) => {
    const { data, error } = await supabase
      .from('protocols')
      .update(updates)
      .eq('protocol_id', protocolId)
      .select();
    
    return { data, error };
  },
  
  // Delete protocol
  deleteProtocol: async (protocolId: string) => {
    const { error } = await supabase
      .from('protocols')
      .delete()
      .eq('protocol_id', protocolId);
    
    return { error };
  },
  
  // Create a new experiment
  createExperiment: async (experiment: Omit<Experiment, 'experiment_id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('experiments')
      .insert(experiment)
      .select();
    
    return { data, error };
  },
  
  // Get experiment by ID
  getExperimentById: async (experimentId: string) => {
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .eq('experiment_id', experimentId)
      .single();
    
    return { data, error };
  },
  
  // Get all experiments for a protocol
  getProtocolExperiments: async (protocolId: string) => {
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .eq('protocol_id', protocolId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  // Update experiment
  updateExperiment: async (experimentId: string, updates: Partial<Experiment>) => {
    const { data, error } = await supabase
      .from('experiments')
      .update(updates)
      .eq('experiment_id', experimentId)
      .select();
    
    return { data, error };
  },
  
  // Update experiment AI recommendations
  updateExperimentRecommendations: async (experimentId: string, recommendations: string | Record<string, any>) => {
    const { data, error } = await supabase
      .from('experiments')
      .update({ ai_recommendations: recommendations })
      .eq('experiment_id', experimentId)
      .select();
    
    return { data, error };
  },
  
  // Get protocol with steps
  getProtocolWithSteps: async (protocolId: string) => {
    const { data: protocol, error: protocolError } = await supabase
      .from('protocols')
      .select('*')
      .eq('protocol_id', protocolId)
      .single();
    
    if (protocolError) return { protocol: null, steps: null, error: protocolError };
    
    const { data: steps, error: stepsError } = await supabase
      .from('protocol_steps')
      .select('*')
      .eq('protocol_id', protocolId)
      .order('step_order', { ascending: true });
    
    return { protocol, steps, error: stepsError };
  },
  
  // Add steps to a protocol
  addProtocolSteps: async (steps: Omit<ProtocolStep, 'id' | 'created_at' | 'updated_at'>[]) => {
    const { data, error } = await supabase
      .from('protocol_steps')
      .insert(steps)
      .select();
    
    return { data, error };
  },
  
  // AI Protocol Engine specific methods
  generateProtocolRecommendations: async (experimentData: Record<string, any>) => {
    // In a real implementation, this might call an external AI service
    // For now, we'll return a mock recommendation
    const mockRecommendations = {
      adjustments: [
        { step: 1, suggestion: "Increase temperature by 5°C" },
        { step: 3, suggestion: "Extend duration by 10 minutes" }
      ],
      reasoning: "Based on similar experiments, these adjustments may improve yield",
      confidence: 0.85
    };
    
    return { data: mockRecommendations, error: null };
  }
};
