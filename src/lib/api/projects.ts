
import { supabase } from '../supabase-client';
import { toast } from '@/components/ui/use-toast';

export const projectApi = {
  // Create a new research project
  createProject: async (projectData: any) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create project error:', error);
      toast({ 
        title: "Project Creation Failed", 
        description: error.message,
        variant: "destructive" 
      });
      return { data: null, error };
    }
  },
  
  // Get all projects for the current user
  getUserProjects: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get user projects error:', error);
      return { data: null, error };
    }
  },
  
  // Get a specific project
  getProject: async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get project error:', error);
      return { data: null, error };
    }
  },
  
  // Update a project
  updateProject: async (projectId: string, updates: Partial<any>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update project error:', error);
      return { data: null, error };
    }
  },
  
  // Delete a project
  deleteProject: async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
        
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Delete project error:', error);
      return { error };
    }
  }
};
