
import { supabase } from '../supabase-client';
import type { DigitalTwin } from '@/types/database.types';

export const digitalTwinApi = {
  // Create a new digital twin
  createDigitalTwin: async (twin: Omit<DigitalTwin, 'id' | 'created_at' | 'updated_at' | 'simulation_status'>) => {
    const twinWithDefaults = {
      ...twin,
      simulation_status: 'not_started' as const
    };
    
    const { data, error } = await supabase
      .from('digital_twins')
      .insert(twinWithDefaults)
      .select();
    
    return { data, error };
  },
  
  // Get digital twin by ID
  getDigitalTwin: async (id: string) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  // Update simulation status
  updateSimulationStatus: async (id: string, status: DigitalTwin['simulation_status']) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .update({ simulation_status: status })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  // Get all digital twins for a project
  getProjectTwins: async (projectId: string) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('project_id', projectId);
    
    return { data, error };
  }
};
