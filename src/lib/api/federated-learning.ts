
import { supabase } from '../supabase-client';
import type { FederatedLearningProject } from '@/types/database.types';

export const federatedLearningApi = {
  // Create a federated learning project
  createProject: async (project: Omit<FederatedLearningProject, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    const projectWithDefaults = {
      ...project,
      status: 'recruiting' as const
    };
    
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .insert(projectWithDefaults)
      .select();
    
    return { data, error };
  },
  
  // Get federated learning project
  getProject: async (id: string) => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  // Update project status
  updateProjectStatus: async (id: string, status: FederatedLearningProject['status']) => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .update({ status })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  // Get all available federated learning projects
  getAvailableProjects: async () => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .select('*')
      .in('status', ['recruiting', 'training'])
      .order('created_at', { ascending: false });
    
    return { data, error };
  }
};
