import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { protocolApi } from '@/lib/api/protocols';
import { useToast } from '@/hooks/use-toast';

export const useProtocols = (filters?: any) => {
  return useQuery({
    queryKey: ['protocols', filters],
    queryFn: () => protocolApi.getProtocols(filters),
  });
};

export const useProtocolSearch = (searchQuery: string, filters?: any) => {
  return useQuery({
    queryKey: ['protocols', 'search', searchQuery, filters],
    queryFn: () => protocolApi.searchProtocols(searchQuery, filters),
    enabled: !!searchQuery,
  });
};

export const useAIRecommendations = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ query, userId }: { query: string; userId?: string }) =>
      protocolApi.getAIRecommendations(query, userId),
    onError: (error: any) => {
      toast({
        title: 'AI Error',
        description: error.message || 'Failed to get AI recommendations',
        variant: 'destructive',
      });
    },
  });
};

export const useProtocol = (id: string) => {
  return useQuery({
    queryKey: ['protocol', id],
    queryFn: () => protocolApi.getProtocolById(id),
    enabled: !!id,
  });
};

export const useCreateProtocol = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: protocolApi.createProtocol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['protocols'] });
      toast({
        title: 'Success',
        description: 'Protocol created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create protocol',
        variant: 'destructive',
      });
    },
  });
};

export const useAddRating = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ protocolId, stars, comment }: { protocolId: string; stars: number; comment?: string }) =>
      protocolApi.addRating(protocolId, stars, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['protocol', variables.protocolId] });
      queryClient.invalidateQueries({ queryKey: ['protocols'] });
      queryClient.invalidateQueries({ queryKey: ['ratings', variables.protocolId] });
      toast({
        title: 'Success',
        description: 'Rating added successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add rating',
        variant: 'destructive',
      });
    },
  });
};

export const useProtocolRatings = (protocolId: string) => {
  return useQuery({
    queryKey: ['ratings', protocolId],
    queryFn: () => protocolApi.getProtocolRatings(protocolId),
    enabled: !!protocolId,
  });
};

export const useProtocolStats = () => {
  return useQuery({
    queryKey: ['protocol-stats'],
    queryFn: () => protocolApi.getProtocolStats(),
  });
};
