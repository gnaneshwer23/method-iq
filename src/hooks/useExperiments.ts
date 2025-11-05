import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experimentApi } from '@/lib/api/experiments';
import { useToast } from '@/hooks/use-toast';

export const useExperiments = (filters?: { protocol_id?: string }) => {
  return useQuery({
    queryKey: ['experiments', filters],
    queryFn: () => experimentApi.getExperiments(filters),
  });
};

export const useExperiment = (id: string) => {
  return useQuery({
    queryKey: ['experiment', id],
    queryFn: () => experimentApi.getExperimentById(id),
    enabled: !!id,
  });
};

export const useCreateExperiment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: experimentApi.createExperiment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
      toast({
        title: 'Success',
        description: 'Experiment created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create experiment',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateExperiment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      experimentApi.updateExperiment(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['experiment', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
      toast({
        title: 'Success',
        description: 'Experiment updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update experiment',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteExperiment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: experimentApi.deleteExperiment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
      toast({
        title: 'Success',
        description: 'Experiment deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete experiment',
        variant: 'destructive',
      });
    },
  });
};

export const useUploadDataFile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ experimentId, file }: { experimentId: string; file: File }) =>
      experimentApi.uploadDataFile(experimentId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['experiment', variables.experimentId] });
      queryClient.invalidateQueries({ queryKey: ['data-uploads', variables.experimentId] });
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload file',
        variant: 'destructive',
      });
    },
  });
};

export const useDataUploads = (experimentId: string) => {
  return useQuery({
    queryKey: ['data-uploads', experimentId],
    queryFn: () => experimentApi.getDataUploads(experimentId),
    enabled: !!experimentId,
  });
};

export const useExperimentStats = () => {
  return useQuery({
    queryKey: ['experiment-stats'],
    queryFn: () => experimentApi.getExperimentStats(),
  });
};
