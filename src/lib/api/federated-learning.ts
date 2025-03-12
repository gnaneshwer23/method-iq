
import { supabase } from '../supabase-client';

export const federatedLearningApi = {
  // Create a new federated learning project
  createProject: async (projectData: any) => {
    try {
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .insert(projectData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create federated learning project error:', error);
      return { data: null, error };
    }
  },
  
  // Get all federated learning projects
  getAllProjects: async () => {
    try {
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get all federated learning projects error:', error);
      return { data: null, error };
    }
  },
  
  // Join a federated learning project
  joinProject: async (projectId: string, participantData: any) => {
    try {
      // In a real implementation, this would involve more complex logic
      // For now, we'll just return a success message
      return { 
        data: { message: 'Successfully joined federated learning project' }, 
        error: null 
      };
    } catch (error: any) {
      console.error('Join federated learning project error:', error);
      return { data: null, error };
    }
  },
  
  // Update federated learning project status
  updateProjectStatus: async (projectId: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .update({ status })
        .eq('id', projectId)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update federated learning project status error:', error);
      return { data: null, error };
    }
  }
};
