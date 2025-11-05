import { supabase } from '../supabase-client';

export const analyticsApi = {
  // Get dashboard overview statistics
  getDashboardStats: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    // Get protocols count
    const { count: protocolsCount } = await supabase
      .from('protocols')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id);

    // Get experiments count
    const { count: experimentsCount } = await supabase
      .from('experiments')
      .select('*', { count: 'exact', head: true })
      .eq('researcher_id', user.id);

    // Get recent experiments success rate
    const { data: recentExperiments } = await supabase
      .from('experiments')
      .select('success_percentage')
      .eq('researcher_id', user.id)
      .not('success_percentage', 'is', null)
      .order('created_at', { ascending: false })
      .limit(10);

    const avgSuccess = recentExperiments && recentExperiments.length > 0
      ? recentExperiments.reduce((sum, exp) => sum + (exp.success_percentage || 0), 0) / recentExperiments.length
      : 0;

    // Get verified protocols count
    const { count: verifiedCount } = await supabase
      .from('protocols')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)
      .eq('verified', true);

    return {
      data: {
        totalProtocols: protocolsCount || 0,
        totalExperiments: experimentsCount || 0,
        averageSuccessRate: Math.round(avgSuccess),
        verifiedProtocols: verifiedCount || 0,
      },
      error: null,
    };
  },

  // Get recent activity feed
  getRecentActivity: async (limit = 20) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    // Get recent experiments
    const { data: experiments } = await supabase
      .from('experiments')
      .select('id, created_at, notes, success_percentage, protocols!inner(title)')
      .eq('researcher_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Get recent protocols
    const { data: protocols } = await supabase
      .from('protocols')
      .select('id, created_at, title, verified')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Combine and sort by date
    const activities = [
      ...(experiments?.map((exp: any) => ({
        id: exp.id,
        type: 'experiment' as const,
        timestamp: exp.created_at,
        title: exp.protocols?.title || 'Untitled Protocol',
        description: exp.notes || 'No notes provided',
        metadata: { success_percentage: exp.success_percentage },
      })) || []),
      ...(protocols?.map((proto: any) => ({
        id: proto.id,
        type: 'protocol' as const,
        timestamp: proto.created_at,
        title: proto.title,
        description: proto.verified ? 'Protocol verified' : 'Protocol created',
        metadata: { verified: proto.verified },
      })) || []),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
     .slice(0, limit);

    return { data: activities, error: null };
  },

  // Get experiment trends over time
  getExperimentTrends: async (days = 30) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: experiments } = await supabase
      .from('experiments')
      .select('created_at, success_percentage, time_taken_minutes')
      .eq('researcher_id', user.id)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    // Group by day
    const trendsByDay = experiments?.reduce((acc: any, exp) => {
      const date = new Date(exp.created_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, count: 0, totalSuccess: 0, totalTime: 0, experiments: 0 };
      }
      acc[date].count += 1;
      if (exp.success_percentage !== null) {
        acc[date].totalSuccess += exp.success_percentage;
        acc[date].experiments += 1;
      }
      if (exp.time_taken_minutes !== null) {
        acc[date].totalTime += exp.time_taken_minutes;
      }
      return acc;
    }, {});

    const trends = Object.values(trendsByDay || {}).map((day: any) => ({
      date: day.date,
      experiments: day.count,
      avgSuccess: day.experiments > 0 ? Math.round(day.totalSuccess / day.experiments) : 0,
      totalTime: day.totalTime,
    }));

    return { data: trends, error: null };
  },

  // Get protocol usage statistics
  getProtocolUsage: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const { data: protocolUsage } = await supabase
      .from('experiments')
      .select('protocol_id, protocols!inner(title, tags)')
      .eq('researcher_id', user.id);

    // Count usage per protocol
    const usageMap = protocolUsage?.reduce((acc: any, exp: any) => {
      const title = exp.protocols?.title || 'Unknown Protocol';
      if (!acc[title]) {
        acc[title] = { protocol: title, count: 0, tags: exp.protocols?.tags || [] };
      }
      acc[title].count += 1;
      return acc;
    }, {});

    const usage = Object.values(usageMap || {})
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 10);

    return { data: usage, error: null };
  },

  // Get success rate distribution
  getSuccessDistribution: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const { data: experiments } = await supabase
      .from('experiments')
      .select('success_percentage')
      .eq('researcher_id', user.id)
      .not('success_percentage', 'is', null);

    const distribution = {
      excellent: 0, // 90-100%
      good: 0,      // 70-89%
      fair: 0,      // 50-69%
      poor: 0,      // 0-49%
    };

    experiments?.forEach(exp => {
      const success = exp.success_percentage || 0;
      if (success >= 90) distribution.excellent += 1;
      else if (success >= 70) distribution.good += 1;
      else if (success >= 50) distribution.fair += 1;
      else distribution.poor += 1;
    });

    return {
      data: [
        { name: 'Excellent (90-100%)', value: distribution.excellent },
        { name: 'Good (70-89%)', value: distribution.good },
        { name: 'Fair (50-69%)', value: distribution.fair },
        { name: 'Poor (0-49%)', value: distribution.poor },
      ],
      error: null,
    };
  },

  // Subscribe to real-time updates
  subscribeToActivity: (userId: string, callback: (payload: any) => void) => {
    const channel = supabase
      .channel('dashboard-activity')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'experiments',
          filter: `researcher_id=eq.${userId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'protocols',
          filter: `created_by=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    return channel;
  },
};
