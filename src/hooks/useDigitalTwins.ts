import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { digitalTwinFullApi } from '@/lib/api/digital-twins-full';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export const useDigitalTwins = (filters?: { twin_type?: string; is_active?: boolean }) => {
  return useQuery({
    queryKey: ['digital-twins', filters],
    queryFn: () => digitalTwinFullApi.getTwins(filters),
  });
};

export const useDigitalTwin = (id: string) => {
  return useQuery({
    queryKey: ['digital-twin', id],
    queryFn: () => digitalTwinFullApi.getTwinById(id),
    enabled: !!id,
  });
};

export const useCreateDigitalTwin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: digitalTwinFullApi.createTwin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-twins'] });
      toast({
        title: 'Success',
        description: 'Digital twin created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create digital twin',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateDigitalTwin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      digitalTwinFullApi.updateTwin(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['digital-twin', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['digital-twins'] });
      toast({
        title: 'Success',
        description: 'Digital twin updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update digital twin',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteDigitalTwin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: digitalTwinFullApi.deleteTwin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-twins'] });
      toast({
        title: 'Success',
        description: 'Digital twin deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete digital twin',
        variant: 'destructive',
      });
    },
  });
};

// Simulations
export const useSimulations = (twinId?: string) => {
  return useQuery({
    queryKey: ['simulations', twinId],
    queryFn: () => digitalTwinFullApi.getSimulations(twinId),
  });
};

export const useSimulation = (id: string) => {
  return useQuery({
    queryKey: ['simulation', id],
    queryFn: () => digitalTwinFullApi.getSimulationById(id),
    enabled: !!id,
  });
};

export const useCreateSimulation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: digitalTwinFullApi.createSimulation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
      toast({
        title: 'Simulation Started',
        description: 'Your simulation is now running with AI predictions',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to start simulation',
        variant: 'destructive',
      });
    },
  });
};

// Metrics
export const useTwinMetrics = (twinId: string, metricName?: string) => {
  return useQuery({
    queryKey: ['twin-metrics', twinId, metricName],
    queryFn: () => digitalTwinFullApi.getMetrics(twinId, metricName),
    enabled: !!twinId,
  });
};

// Real-time subscription
export const useTwinRealtimeUpdates = (twinId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!twinId) return;

    const channel = digitalTwinFullApi.subscribeTwinUpdates(twinId, () => {
      queryClient.invalidateQueries({ queryKey: ['digital-twin', twinId] });
      queryClient.invalidateQueries({ queryKey: ['twin-metrics', twinId] });
    });

    return () => {
      channel.unsubscribe();
    };
  }, [twinId, queryClient]);
};
