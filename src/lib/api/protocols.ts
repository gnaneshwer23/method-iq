import { supabase } from '../supabase-client';
import type { Protocol } from '@/types/database.types';

export const protocolApi = {
  // Get all protocols with optional filters
  getProtocols: async (filters?: {
    tags?: string[];
    minCost?: number;
    maxCost?: number;
    minDuration?: number;
    maxDuration?: number;
    minSuccessRate?: number;
    verified?: boolean;
    minRating?: number;
  }) => {
    let query = supabase
      .from('protocols')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.tags && filters.tags.length > 0) {
      query = query.overlaps('tags', filters.tags);
    }

    if (filters?.minCost !== undefined) {
      query = query.gte('estimated_cost', filters.minCost);
    }

    if (filters?.maxCost !== undefined) {
      query = query.lte('estimated_cost', filters.maxCost);
    }

    if (filters?.minDuration !== undefined) {
      query = query.gte('estimated_duration_minutes', filters.minDuration);
    }

    if (filters?.maxDuration !== undefined) {
      query = query.lte('estimated_duration_minutes', filters.maxDuration);
    }

    if (filters?.minSuccessRate !== undefined) {
      query = query.gte('success_rate', filters.minSuccessRate);
    }

    if (filters?.verified !== undefined) {
      query = query.eq('verified', filters.verified);
    }

    if (filters?.minRating !== undefined) {
      query = query.gte('average_rating', filters.minRating);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Search protocols by text
  searchProtocols: async (searchQuery: string, filters?: any) => {
    let query = supabase
      .from('protocols')
      .select('*')
      .or(`title.ilike.%${searchQuery}%,summary.ilike.%${searchQuery}%`)
      .order('created_at', { ascending: false });

    // Apply filters if provided
    if (filters?.tags && filters.tags.length > 0) {
      query = query.overlaps('tags', filters.tags);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Get AI recommendations
  getAIRecommendations: async (query: string, userId?: string) => {
    const { data, error } = await supabase.functions.invoke('ai-protocol-finder', {
      body: { query, userId }
    });

    return { data, error };
  },

  // Get single protocol by ID
  getProtocolById: async (id: string) => {
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Create a new protocol
  createProtocol: async (protocol: Omit<Protocol, 'id' | 'created_at' | 'updated_at' | 'average_rating' | 'rating_count'>) => {
    const { data, error } = await supabase
      .from('protocols')
      .insert(protocol)
      .select()
      .single();

    return { data, error };
  },

  // Update existing protocol
  updateProtocol: async (id: string, updates: Partial<Protocol>) => {
    const { data, error } = await supabase
      .from('protocols')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Add rating to a protocol
  addRating: async (protocolId: string, stars: number, comment?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const { data, error } = await supabase
      .from('ratings')
      .insert({
        protocol_id: protocolId,
        user_id: user.id,
        stars,
        comment
      })
      .select()
      .single();

    return { data, error };
  },

  // Get ratings for a protocol
  getProtocolRatings: async (protocolId: string) => {
    const { data, error } = await supabase
      .from('ratings')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url
        )
      `)
      .eq('protocol_id', protocolId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Get protocol stats
  getProtocolStats: async () => {
    const { data: protocols, error } = await supabase
      .from('protocols')
      .select('verified, success_rate');

    if (error) return { stats: null, error };

    const stats = {
      total: protocols?.length || 0,
      verified: protocols?.filter(p => p.verified).length || 0,
      avgSuccessRate: protocols?.reduce((acc, p) => acc + (p.success_rate || 0), 0) / (protocols?.length || 1)
    };

    return { stats, error: null };
  }
};
