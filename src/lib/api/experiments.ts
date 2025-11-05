import { supabase } from '../supabase-client';
import type { Experiment } from '@/types/database.types';

export const experimentApi = {
  // Create a new experiment
  createExperiment: async (experiment: {
    protocol_id: string;
    notes?: string;
    environment_conditions?: Record<string, any>;
    time_taken_minutes?: number;
    success_percentage?: number;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const { data, error } = await supabase
      .from('experiments')
      .insert({
        ...experiment,
        researcher_id: user.id,
      })
      .select('*, protocols(title, summary)')
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  // Get all experiments for current user
  getExperiments: async (filters?: { protocol_id?: string }) => {
    let query = supabase
      .from('experiments')
      .select('*, protocols(title, summary, tags)')
      .order('created_at', { ascending: false });

    if (filters?.protocol_id) {
      query = query.eq('protocol_id', filters.protocol_id);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Get single experiment by ID
  getExperimentById: async (id: string) => {
    const { data, error } = await supabase
      .from('experiments')
      .select('*, protocols(title, summary, tags, estimated_duration_minutes, estimated_cost)')
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Update experiment
  updateExperiment: async (id: string, updates: Partial<Experiment>) => {
    const { data, error } = await supabase
      .from('experiments')
      .update(updates)
      .eq('id', id)
      .select('*, protocols(title, summary)')
      .single();

    return { data, error };
  },

  // Delete experiment
  deleteExperiment: async (id: string) => {
    const { error } = await supabase
      .from('experiments')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Upload data file
  uploadDataFile: async (experimentId: string, file: File) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${experimentId}/${Date.now()}.${fileExt}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('experiment-data')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('experiment-data')
      .getPublicUrl(fileName);

    // Record in data_uploads table
    const { data: recordData, error: recordError } = await supabase
      .from('data_uploads')
      .insert({
        experiment_id: experimentId,
        uploaded_by: user.id,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size_bytes: file.size,
      })
      .select()
      .single();

    if (recordError) throw recordError;

    // Update experiment with data file URL
    await supabase
      .from('experiments')
      .update({ data_file_url: publicUrl })
      .eq('id', experimentId);

    return { data: recordData, error: null };
  },

  // Get data uploads for experiment
  getDataUploads: async (experimentId: string) => {
    const { data, error } = await supabase
      .from('data_uploads')
      .select('*')
      .eq('experiment_id', experimentId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Delete data file
  deleteDataFile: async (uploadId: string, filePath: string) => {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('experiment-data')
      .remove([filePath]);

    if (storageError) throw storageError;

    // Delete record
    const { error: dbError } = await supabase
      .from('data_uploads')
      .delete()
      .eq('id', uploadId);

    return { error: dbError };
  },

  // Get experiment statistics
  getExperimentStats: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: new Error('User must be authenticated') };
    }

    // Get total experiments
    const { count: totalCount, error: countError } = await supabase
      .from('experiments')
      .select('*', { count: 'exact', head: true })
      .eq('researcher_id', user.id);

    if (countError) return { data: null, error: countError };

    // Get average success rate
    const { data: successData, error: successError } = await supabase
      .from('experiments')
      .select('success_percentage')
      .eq('researcher_id', user.id)
      .not('success_percentage', 'is', null);

    if (successError) return { data: null, error: successError };

    const avgSuccess = successData.length > 0
      ? successData.reduce((sum, exp) => sum + (exp.success_percentage || 0), 0) / successData.length
      : 0;

    // Get total time spent
    const { data: timeData, error: timeError } = await supabase
      .from('experiments')
      .select('time_taken_minutes')
      .eq('researcher_id', user.id)
      .not('time_taken_minutes', 'is', null);

    if (timeError) return { data: null, error: timeError };

    const totalTime = timeData.reduce((sum, exp) => sum + (exp.time_taken_minutes || 0), 0);

    return {
      data: {
        totalExperiments: totalCount || 0,
        averageSuccessRate: Math.round(avgSuccess),
        totalTimeSpent: totalTime,
      },
      error: null,
    };
  },
};
