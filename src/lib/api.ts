
import { supabase } from './supabase';

// Central API client for interacting with the microservices

// Protocol Engine Service
export const protocolEngineApi = {
  // Get AI recommended protocols
  getRecommendedProtocols: async (researchType: string, parameters: any) => {
    const { data, error } = await supabase
      .from('ai_protocol_recommendations')
      .select('*')
      .eq('research_type', researchType)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  // Save a new protocol
  saveProtocol: async (protocol: any) => {
    const { data, error } = await supabase
      .from('protocols')
      .insert(protocol)
      .select();
    
    return { data, error };
  },
  
  // Get protocol by ID
  getProtocol: async (id: string) => {
    const { data, error } = await supabase
      .from('protocols')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  }
};

// Blockchain Service
export const blockchainApi = {
  // Add record to blockchain verification
  addRecord: async (record: any) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .insert(record)
      .select();
    
    return { data, error };
  },
  
  // Verify a record
  verifyRecord: async (recordId: string) => {
    const { data, error } = await supabase
      .from('blockchain_records')
      .select('*')
      .eq('record_id', recordId)
      .single();
    
    return { data, error };
  }
};

// IoT Integration Service
export const iotApi = {
  // Register a new IoT device
  registerDevice: async (device: any) => {
    const { data, error } = await supabase
      .from('iot_devices')
      .insert(device)
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
  createDigitalTwin: async (twin: any) => {
    const { data, error } = await supabase
      .from('digital_twins')
      .insert(twin)
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
  
  // Run simulation on digital twin
  runSimulation: async (twinId: string, simulationParameters: any) => {
    // This would typically call a Supabase Edge Function to run the simulation
    const { data, error } = await supabase.functions.invoke('run-simulation', {
      body: { twinId, parameters: simulationParameters },
    });
    
    return { data, error };
  }
};

// AR/MR Gateway Service
export const arMrApi = {
  // Get AR session data
  getArSession: async (sessionId: string) => {
    const { data, error } = await supabase
      .from('ar_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    return { data, error };
  },
  
  // Save AR interaction data
  saveArInteraction: async (interaction: any) => {
    const { data, error } = await supabase
      .from('ar_interactions')
      .insert(interaction)
      .select();
    
    return { data, error };
  }
};

// Federated Learning Service
export const federatedLearningApi = {
  // Join a federated learning project
  joinProject: async (projectId: string, nodeInfo: any) => {
    const { data, error } = await supabase
      .from('federated_nodes')
      .insert({ project_id: projectId, ...nodeInfo })
      .select();
    
    return { data, error };
  },
  
  // Get model updates
  getModelUpdates: async (projectId: string) => {
    const { data, error } = await supabase
      .from('model_updates')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  
  // Submit model update
  submitModelUpdate: async (update: any) => {
    const { data, error } = await supabase
      .from('model_updates')
      .insert(update)
      .select();
    
    return { data, error };
  }
};
