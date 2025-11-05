import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface FederatedProject {
  id: string;
  name: string;
  description: string | null;
  model_type: string;
  learning_objective: string;
  parameters: Record<string, any>;
  current_round: number;
  total_rounds: number;
  min_participants: number;
  status: 'recruiting' | 'training' | 'completed' | 'archived';
  privacy_budget: number;
  aggregation_method: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface FederatedParticipant {
  id: string;
  project_id: string;
  user_id: string;
  status: 'active' | 'inactive' | 'dropped';
  contribution_count: number;
  last_contribution_at: string | null;
  local_data_size: number | null;
  performance_metrics: Record<string, any>;
  joined_at: string;
}

export interface ModelUpdate {
  id: string;
  project_id: string;
  participant_id: string;
  round_number: number;
  model_weights_hash: string;
  model_weights_url: string | null;
  loss: number | null;
  accuracy: number | null;
  training_samples: number | null;
  privacy_metrics: Record<string, any>;
  submitted_at: string;
}

export const useFederatedLearning = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['federated-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as FederatedProject[];
    }
  });

  const { data: myParticipations, isLoading: participationsLoading } = useQuery({
    queryKey: ['my-fl-participations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('federated_learning_participants')
        .select('*, project:federated_learning_projects(*)')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const createProject = useMutation({
    mutationFn: async (projectData: {
      name: string;
      description?: string;
      model_type: string;
      learning_objective: string;
      total_rounds?: number;
      min_participants?: number;
      privacy_budget?: number;
      aggregation_method?: string;
      status?: 'recruiting' | 'training' | 'completed' | 'archived';
    }) => {
      if (!user?.id) throw new Error("Must be logged in");
      
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .insert([{
          name: projectData.name,
          description: projectData.description || null,
          model_type: projectData.model_type,
          learning_objective: projectData.learning_objective,
          total_rounds: projectData.total_rounds || 10,
          min_participants: projectData.min_participants || 3,
          privacy_budget: projectData.privacy_budget || 1.0,
          aggregation_method: projectData.aggregation_method || 'federated_averaging',
          status: projectData.status || 'recruiting',
          created_by: user.id
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['federated-projects'] });
      toast.success("Federated learning project created successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create project: ${error.message}`);
    }
  });

  const joinProject = useMutation({
    mutationFn: async ({ projectId, localDataSize }: { projectId: string; localDataSize?: number }) => {
      if (!user?.id) throw new Error("Must be logged in");
      
      const { data, error } = await supabase
        .from('federated_learning_participants')
        .insert({
          project_id: projectId,
          user_id: user.id,
          local_data_size: localDataSize
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['federated-projects'] });
      queryClient.invalidateQueries({ queryKey: ['my-fl-participations'] });
      toast.success("Successfully joined federated learning project");
    },
    onError: (error: Error) => {
      toast.error(`Failed to join project: ${error.message}`);
    }
  });

  const submitModelUpdate = useMutation({
    mutationFn: async (updateData: {
      project_id: string;
      participant_id: string;
      round_number: number;
      model_weights_hash: string;
      model_weights_url?: string;
      loss?: number;
      accuracy?: number;
      training_samples?: number;
      privacy_metrics?: Record<string, any>;
    }) => {
      const { data, error } = await supabase
        .from('federated_model_updates')
        .insert([updateData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Model update submitted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to submit update: ${error.message}`);
    }
  });

  return {
    projects,
    projectsLoading,
    myParticipations,
    participationsLoading,
    createProject,
    joinProject,
    submitModelUpdate
  };
};

export const useFederatedProject = (projectId: string) => {
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['federated-project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      return data as FederatedProject;
    },
    enabled: !!projectId
  });

  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ['project-participants', projectId],
    queryFn: async () => {
      // First get participants
      const { data: participantsData, error: participantsError } = await supabase
        .from('federated_learning_participants')
        .select('*')
        .eq('project_id', projectId);
      
      if (participantsError) throw participantsError;
      if (!participantsData || participantsData.length === 0) return [];

      // Then get profiles for these user_ids
      const userIds = participantsData.map(p => p.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);
      
      if (profilesError) console.error('Error fetching profiles:', profilesError);

      // Combine the data
      const combined = participantsData.map(participant => ({
        ...participant,
        profile: profilesData?.find(p => p.id === participant.user_id) || null
      }));

      return combined;
    },
    enabled: !!projectId
  });

  const { data: modelUpdates, isLoading: updatesLoading } = useQuery({
    queryKey: ['project-updates', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('federated_model_updates')
        .select('*')
        .eq('project_id', projectId)
        .order('submitted_at', { ascending: false });
      
      if (error) throw error;
      return data as ModelUpdate[];
    },
    enabled: !!projectId
  });

  const { data: aggregatedModels, isLoading: modelsLoading } = useQuery({
    queryKey: ['aggregated-models', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('federated_aggregated_models')
        .select('*')
        .eq('project_id', projectId)
        .order('round_number', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!projectId
  });

  return {
    project,
    projectLoading,
    participants,
    participantsLoading,
    modelUpdates,
    updatesLoading,
    aggregatedModels,
    modelsLoading
  };
};
