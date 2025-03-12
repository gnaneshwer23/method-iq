
import { supabase } from './supabase';
import type { 
  Project, 
  Protocol, 
  ProtocolStep, 
  IoTDevice, 
  SensorData, 
  DigitalTwin,
  BlockchainRecord,
  ARSession,
  FederatedLearningProject
} from '../types/database.types';

// Central API client for interacting with the microservices

// Project Management
export const projectApi = {
  create: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select();
    
    return { data, error };
  },
  
  getAll: async (userId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  update: async (id: string, updates: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

// Protocol Engine Service
export const protocolEngineApi = {
  // Get AI recommended protocols
  getRecommendedProtocols: async (researchType: string, parameters: any) => {
    // In a real implementation, this would call an AI service
    // For now, we just query existing protocols
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('research_type', researchType)
      .eq('is_ai_generated', true)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  // Save a new protocol
  saveProtocol: async (protocol: Omit<Protocol, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('protocols')
      .insert(protocol)
      .select();
    
    return { data, error };
  },
  
  // Add steps to a protocol
  addProtocolSteps: async (steps: Omit<ProtocolStep, 'id' | 'created_at' | 'updated_at'>[]) => {
    const { data, error } = await supabase
      .from('protocol_steps')
      .insert(steps)
      .select();
    
    return { data, error };
  },
  
  // Get protocol with all steps
  getProtocolWithSteps: async (id: string) => {
    const { data: protocol, error: protocolError } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    if (protocolError) return { protocol: null, steps: null, error: protocolError };
    
    const { data: steps, error: stepsError } = await supabase
      .from('protocol_steps')
      .select('*')
      .eq('protocol_id', id)
      .order('step_order', { ascending: true });
    
    return { protocol, steps, error: stepsError };
  }
};

// Blockchain Service
export const blockchainApi = {
  // Add record to blockchain verification
  addRecord: async (record: Omit<BlockchainRecord, 'id' | 'timestamp' | 'verified'>) => {
    const recordWithDefaults = {
      ...record,
      verified: false,
      timestamp: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('blockchain_records')
      .insert(recordWithDefaults)
      .select();
    
    return { data, error };
  },
  
  // Verify a record
  verifyRecord: async (recordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('id', recordId)
      .single();
    
    return { data, error };
  },
  
  // Get verification history for a record
  getVerificationHistory: async (recordType: string, originalRecordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('record_type', recordType)
      .eq('record_id', originalRecordId)
      .order('timestamp', { ascending: false });
    
    return { data, error };
  }
};

// IoT Integration Service
export const iotApi = {
  // Register a new IoT device
  registerDevice: async (device: Omit<IoTDevice, 'id' | 'created_at' | 'updated_at' | 'last_connected_at' | 'connection_status'>) => {
    const deviceWithDefaults = {
      ...device,
      connection_status: 'offline' as const,
      last_connected_at: null
    };
    
    const { data, error } = await supabase
      .from('iot_devices')
      .insert(deviceWithDefaults)
      .select();
    
    return { data, error };
  },
  
  // Update device status
  updateDeviceStatus: async (id: string, status: IoTDevice['connection_status']) => {
    const { data, error } = await supabase
      .from('iot_devices')
      .update({ 
        connection_status: status,
        last_connected_at: status === 'online' ? new Date().toISOString() : undefined
      })
      .eq('id', id)
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
  
  // Log sensor data
  logSensorData: async (sensorData: Omit<SensorData, 'id'>) => {
    const { data, error } = await supabase
      .from('sensor_data')
      .insert(sensorData)
      .select();
    
    return { data, error };
  },
  
  // Get sensor data from a device
  getSensorData: async (deviceId: string, timeRange?: { start: Date, end: Date }) => {
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

// Digital Twin Service
export const digitalTwinApi = {
  // Create a new digital twin
  createDigitalTwin: async (twin: Omit<DigitalTwin, 'id' | 'created_at' | 'updated_at' | 'simulation_status'>) => {
    const twinWithDefaults = {
      ...twin,
      simulation_status: 'not_started' as const
    };
    
    const { data, error } = await supabase
      .from('digital_twins')
      .insert(twinWithDefaults)
      .select();
    
    return { data, error };
  },
  
  // Get digital twin by ID
  getDigitalTwin: async (id: string) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  // Update simulation status
  updateSimulationStatus: async (id: string, status: DigitalTwin['simulation_status']) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .update({ simulation_status: status })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  // Get all digital twins for a project
  getProjectTwins: async (projectId: string) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .select('*')
      .eq('project_id', projectId);
    
    return { data, error };
  }
};

// AR/MR Gateway Service
export const arMrApi = {
  // Start a new AR session
  startSession: async (session: Omit<ARSession, 'id' | 'end_time'>) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .insert(session)
      .select();
    
    return { data, error };
  },
  
  // End an AR session
  endSession: async (id: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .update({ end_time: new Date().toISOString() })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  // Get AR session data
  getSession: async (id: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  // Get user's AR sessions
  getUserSessions: async (userId: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false });
    
    return { data, error };
  }
};

// Federated Learning Service
export const federatedLearningApi = {
  // Create a federated learning project
  createProject: async (project: Omit<FederatedLearningProject, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    const projectWithDefaults = {
      ...project,
      status: 'recruiting' as const
    };
    
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .insert(projectWithDefaults)
      .select();
    
    return { data, error };
  },
  
  // Get federated learning project
  getProject: async (id: string) => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },
  
  // Update project status
  updateProjectStatus: async (id: string, status: FederatedLearningProject['status']) => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .update({ status })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  // Get all available federated learning projects
  getAvailableProjects: async () => {
    const { data, error } = await supabase
      .from('federated_learning_projects')
      .select('*')
      .in('status', ['recruiting', 'training'])
      .order('created_at', { ascending: false });
    
    return { data, error };
  }
};
