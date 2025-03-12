
import { supabase } from '../../supabase-client';
import type { DigitalTwin } from '@/types/database.types';

/**
 * Create a new digital twin simulation
 */
export const createDigitalTwin = async (twin: Omit<DigitalTwin, 'id' | 'created_at' | 'updated_at' | 'simulation_status'>) => {
  const twinWithDefaults = {
    ...twin,
    simulation_status: 'not_started' as const
  };
  
  const { data, error } = await supabase
    .from('digital_twins')
    .insert(twinWithDefaults)
    .select();
  
  return { data, error };
};

/**
 * Get digital twin by ID
 */
export const getDigitalTwin = async (id: string) => {
  const { data, error } = await supabase
    .from('digital_twins')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

/**
 * Update simulation status and parameters
 */
export const updateDigitalTwin = async (id: string, updates: Partial<Omit<DigitalTwin, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('digital_twins')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();
  
  return { data, error };
};

/**
 * Update simulation status
 */
export const updateSimulationStatus = async (id: string, status: DigitalTwin['simulation_status']) => {
  const { data, error } = await supabase
    .from('digital_twins')
    .update({ 
      simulation_status: status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();
  
  return { data, error };
};

/**
 * Get all digital twins for a project
 */
export const getProjectTwins = async (projectId: string) => {
  const { data, error } = await supabase
    .from('digital_twins')
    .select('*')
    .eq('project_id', projectId);
  
  return { data, error };
};
