
import { supabase } from '../supabase-client';

export const digitalTwinApi = {
  // Create a new digital twin
  createDigitalTwin: async (twinData: any) => {
    try {
      const { data, error } = await supabase
        .from('digital_twins')
        .insert(twinData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create digital twin error:', error);
      return { data: null, error };
    }
  },
  
  // Get a digital twin
  getDigitalTwin: async (twinId: string) => {
    try {
      const { data, error } = await supabase
        .from('digital_twins')
        .select('*')
        .eq('id', twinId)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get digital twin error:', error);
      return { data: null, error };
    }
  },
  
  // Get all digital twins for a project
  getProjectDigitalTwins: async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('digital_twins')
        .select('*')
        .eq('project_id', projectId);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get project digital twins error:', error);
      return { data: null, error };
    }
  },
  
  // Update digital twin simulation status
  updateSimulationStatus: async (twinId: string, status: string, results?: any) => {
    try {
      const { data, error } = await supabase
        .from('digital_twins')
        .update({ 
          simulation_status: status,
          ...(results && { simulation_results: results })
        })
        .eq('id', twinId)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update simulation status error:', error);
      return { data: null, error };
    }
  }
};
