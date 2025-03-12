
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

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
export const authApi = {
  signUp: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { error };
    }
  },

  getCurrentUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error: any) {
      console.error('Get current user error:', error);
      return { user: null, error };
    }
  },

  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session: data.session, error: null };
    } catch (error: any) {
      console.error('Get session error:', error);
      return { session: null, error };
    }
  }
};

// Project Management Microservice
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

// Protocol Engine Microservice
export const protocolApi = {
  // Get AI recommended protocols
  getRecommendedProtocols: async (researchType: string, parameters: any) => {
    try {
      // This would typically call an AI service or custom function
      // For now, we'll just query existing protocols as examples
      const { data, error } = await supabase
        .from('protocols')
        .select('*')
        .eq('research_type', researchType)
        .limit(5);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get recommended protocols error:', error);
      return { data: null, error };
    }
  },
  
  // Save a new protocol
  createProtocol: async (protocol: any) => {
    try {
      const { data, error } = await supabase
        .from('protocols')
        .insert(protocol)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create protocol error:', error);
      return { data: null, error };
    }
  },
  
  // Get protocol details with steps
  getProtocolWithSteps: async (protocolId: string) => {
    try {
      const { data: protocol, error: protocolError } = await supabase
        .from('protocols')
        .select('*')
        .eq('id', protocolId)
        .single();
      
      if (protocolError) throw protocolError;
      
      const { data: steps, error: stepsError } = await supabase
        .from('protocol_steps')
        .select('*')
        .eq('protocol_id', protocolId)
        .order('step_order', { ascending: true });
      
      if (stepsError) throw stepsError;
      
      return { protocol, steps, error: null };
    } catch (error: any) {
      console.error('Get protocol with steps error:', error);
      return { protocol: null, steps: null, error };
    }
  },
  
  // Update a protocol
  updateProtocol: async (protocolId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('protocols')
        .update(updates)
        .eq('id', protocolId)
        .select();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update protocol error:', error);
      return { data: null, error };
    }
  },
  
  // Create a protocol step
  createProtocolStep: async (step: any) => {
    try {
      const { data, error } = await supabase
        .from('protocol_steps')
        .insert(step)
        .select();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create protocol step error:', error);
      return { data: null, error };
    }
  }
};

// IoT Integration Microservice
export const iotApi = {
  // Register a new IoT device
  registerDevice: async (device: any) => {
    try {
      const { data, error } = await supabase
        .from('iot_devices')
        .insert(device)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Register device error:', error);
      return { data: null, error };
    }
  },
  
  // Get all devices for a user
  getUserDevices: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('iot_devices')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get user devices error:', error);
      return { data: null, error };
    }
  },
  
  // Log sensor data from a device
  logSensorData: async (sensorData: any) => {
    try {
      const { data, error } = await supabase
        .from('sensor_data')
        .insert(sensorData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Log sensor data error:', error);
      return { data: null, error };
    }
  },
  
  // Get sensor data for a device
  getDeviceSensorData: async (deviceId: string, timeRange?: { start: Date, end: Date }) => {
    try {
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
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get device sensor data error:', error);
      return { data: null, error };
    }
  }
};

// Digital Twin Microservice
export const digitalTwinApi = {
  // Create a new digital twin
  createDigitalTwin: async (twinData: any) => {
    try {
      const { data, error } = await supabase
        .from('digital_twins')
        .insert(twinData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create digital twin error:', error);
      return { data: null, error };
    }
  },
  
  // Get a digital twin
  getDigitalTwin: async (twinId: string) => {
    try {
      const { data, error } = await supabase
        .from('digital_twins')
        .select('*')
        .eq('id', twinId)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get digital twin error:', error);
      return { data: null, error };
    }
  },
  
  // Get all digital twins for a project
  getProjectDigitalTwins: async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('digital_twins')
        .select('*')
        .eq('project_id', projectId);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get project digital twins error:', error);
      return { data: null, error };
    }
  },
  
  // Update digital twin simulation status
  updateSimulationStatus: async (twinId: string, status: string, results?: any) => {
    try {
      const { data, error } = await supabase
        .from('digital_twins')
        .update({ 
          simulation_status: status,
          ...(results && { simulation_results: results })
        })
        .eq('id', twinId)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update simulation status error:', error);
      return { data: null, error };
    }
  }
};

// Blockchain Verification Microservice
export const blockchainApi = {
  // Record a new verification
  createRecord: async (recordData: any) => {
    try {
      const { data, error } = await supabase
        .from('blockchain_records')
        .insert(recordData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create blockchain record error:', error);
      return { data: null, error };
    }
  },
  
  // Verify a record
  verifyRecord: async (recordType: string, recordId: string) => {
    try {
      const { data, error } = await supabase
        .from('blockchain_records')
        .select('*')
        .eq('record_type', recordType)
        .eq('record_id', recordId)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Verify record error:', error);
      return { data: null, error };
    }
  },
  
  // Get all blockchain records for an entity
  getRecordsForEntity: async (recordType: string, recordId: string) => {
    try {
      const { data, error } = await supabase
        .from('blockchain_records')
        .select('*')
        .eq('record_type', recordType)
        .eq('record_id', recordId)
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get records for entity error:', error);
      return { data: null, error };
    }
  }
};

// AR/MR Gateway Microservice
export const arMrApi = {
  // Start a new AR/MR session
  startSession: async (sessionData: any) => {
    try {
      const { data, error } = await supabase
        .from('ar_sessions')
        .insert(sessionData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Start AR/MR session error:', error);
      return { data: null, error };
    }
  },
  
  // End an AR/MR session
  endSession: async (sessionId: string, endData: any) => {
    try {
      const { data, error } = await supabase
        .from('ar_sessions')
        .update({
          end_time: new Date().toISOString(),
          ...endData
        })
        .eq('id', sessionId)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('End AR/MR session error:', error);
      return { data: null, error };
    }
  },
  
  // Get all AR/MR sessions for a project
  getProjectSessions: async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('ar_sessions')
        .select('*')
        .eq('project_id', projectId)
        .order('start_time', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get project AR/MR sessions error:', error);
      return { data: null, error };
    }
  }
};

// Federated Learning Microservice
export const federatedLearningApi = {
  // Create a new federated learning project
  createProject: async (projectData: any) => {
    try {
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .insert(projectData)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Create federated learning project error:', error);
      return { data: null, error };
    }
  },
  
  // Get all federated learning projects
  getAllProjects: async () => {
    try {
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Get all federated learning projects error:', error);
      return { data: null, error };
    }
  },
  
  // Join a federated learning project
  joinProject: async (projectId: string, participantData: any) => {
    try {
      // In a real implementation, this would involve more complex logic
      // For now, we'll just return a success message
      return { 
        data: { message: 'Successfully joined federated learning project' }, 
        error: null 
      };
    } catch (error: any) {
      console.error('Join federated learning project error:', error);
      return { data: null, error };
    }
  },
  
  // Update federated learning project status
  updateProjectStatus: async (projectId: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('federated_learning_projects')
        .update({ status })
        .eq('id', projectId)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Update federated learning project status error:', error);
      return { data: null, error };
    }
  }
};

// Database schema helper
export const databaseApi = {
  createSchemaIfNotExists: async () => {
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
  }
};
