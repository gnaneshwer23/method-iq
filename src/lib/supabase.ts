
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

// Create the Supabase client with better error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helper functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

// Session management
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

// Database schema helpers
export const createSchemaIfNotExists = async () => {
  console.log('Checking database schema...');
  
  // This is a client-side function that just logs what schema should be created
  // In a real implementation, you would use Supabase migrations or Edge Functions
  const requiredTables = [
    'projects',
    'protocols',
    'protocol_steps',
    'iot_devices',
    'sensor_data',
    'digital_twins',
    'blockchain_records',
    'ar_sessions',
    'federated_learning_projects'
  ];
  
  console.log(`The following tables should be created in your Supabase project: ${requiredTables.join(', ')}`);
  
  return {
    message: 'Schema check completed. Please create the required tables in your Supabase dashboard.',
    requiredTables
  };
};

// Project-related functions
export const projectApi = {
  // Create a new research project
  createProject: async (projectData: any) => {
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select();
    
    return { data, error };
  },
  
  // Get all projects for the current user
  getUserProjects: async (userId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  // Get a specific project
  getProject: async (projectId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    return { data, error };
  }
};

// Protocol Engine API
export const protocolApi = {
  // Get AI recommended protocols
  getRecommendedProtocols: async (researchType: string, parameters: any) => {
    // This would typically call an AI service or custom function
    // For now, we'll just query existing protocols as examples
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('research_type', researchType)
      .limit(5);
    
    return { data, error };
  },
  
  // Save a new protocol
  createProtocol: async (protocol: any) => {
    const { data, error } = await supabase
      .from('protocols')
      .insert(protocol)
      .select();
    
    return { data, error };
  },
  
  // Get protocol details with steps
  getProtocolWithSteps: async (protocolId: string) => {
    const { data: protocol, error: protocolError } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', protocolId)
      .single();
    
    if (protocolError) return { protocol: null, steps: null, error: protocolError };
    
    const { data: steps, error: stepsError } = await supabase
      .from('protocol_steps')
      .select('*')
      .eq('protocol_id', protocolId)
      .order('step_order', { ascending: true });
    
    return { 
      protocol, 
      steps, 
      error: stepsError 
    };
  }
};

// IoT Device API
export const iotApi = {
  // Register a new IoT device
  registerDevice: async (device: any) => {
    const { data, error } = await supabase
      .from('iot_devices')
      .insert(device)
      .select();
    
    return { data, error };
  },
  
  // Get all devices for a user
  getUserDevices: async (userId: string) => {
    const { data, error } = await supabase
      .from('iot_devices')
      .select('*')
      .eq('user_id', userId);
    
    return { data, error };
  },
  
  // Log sensor data from a device
  logSensorData: async (sensorData: any) => {
    const { data, error } = await supabase
      .from('sensor_data')
      .insert(sensorData)
      .select();
    
    return { data, error };
  },
  
  // Get sensor data for a device
  getDeviceSensorData: async (deviceId: string, timeRange?: { start: Date, end: Date }) => {
    let query = supabase
      .from('sensor_data')
      .select('*')
      .eq('device_id', deviceId);
    
    if (timeRange) {
      query = query
        .gte('timestamp', timeRange.start.toISOString())
        .lte('timestamp', timeRange.end.toISOString());
    }
    
    const { data, error } = await query.order('timestamp', { ascending: false });
    
    return { data, error };
  }
};
