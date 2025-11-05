import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/lib/api/analytics';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => analyticsApi.getDashboardStats(),
  });
};

export const useRecentActivity = (limit = 20) => {
  return useQuery({
    queryKey: ['recent-activity', limit],
    queryFn: () => analyticsApi.getRecentActivity(limit),
  });
};

export const useExperimentTrends = (days = 30) => {
  return useQuery({
    queryKey: ['experiment-trends', days],
    queryFn: () => analyticsApi.getExperimentTrends(days),
  });
};

export const useProtocolUsage = () => {
  return useQuery({
    queryKey: ['protocol-usage'],
    queryFn: () => analyticsApi.getProtocolUsage(),
  });
};

export const useSuccessDistribution = () => {
  return useQuery({
    queryKey: ['success-distribution'],
    queryFn: () => analyticsApi.getSuccessDistribution(),
  });
};

// Real-time activity subscription
export const useRealtimeActivity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = analyticsApi.subscribeToActivity(user.id, () => {
      // Invalidate queries when new activity occurs
      queryClient.invalidateQueries({ queryKey: ['recent-activity'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['experiment-trends'] });
      queryClient.invalidateQueries({ queryKey: ['protocol-usage'] });
    });

    return () => {
      queryClient.removeQueries({ queryKey: ['dashboard-activity'] });
      channel.unsubscribe();
    };
  }, [user, queryClient]);
};
