
// Define Supabase database schema types

export type Project = {
  id: string;
  name: string;
  description: string;
  user_id: string;
  status: 'active' | 'archived' | 'completed';
  research_field: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
};

export type Protocol = {
  id: string;
  project_id: string;
  name: string;
  description: string;
  research_type: string;
  version: string;
  is_ai_generated: boolean;
  parameters?: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type ProtocolStep = {
  id: string;
  protocol_id: string;
  step_order: number;
  title: string;
  description: string;
  duration_minutes?: number;
  required_equipment?: string[];
  required_materials?: string[];
  safety_notes?: string;
  expected_results?: string;
  created_at: string;
  updated_at: string;
};

export type IoTDevice = {
  id: string;
  user_id: string;
  project_id?: string;
  name: string;
  device_type: string;
  model: string;
  serial_number?: string;
  connection_status: 'online' | 'offline' | 'error';
  last_connected_at?: string;
  firmware_version?: string;
  configuration?: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type SensorData = {
  id: string;
  device_id: string;
  timestamp: string;
  data_type: string;
  value: number | string | boolean | Record<string, any>;
  unit?: string;
  metadata?: Record<string, any>;
};

export type DigitalTwin = {
  id: string;
  project_id: string;
  name: string;
  description: string;
  model_type: string;
  parameters: Record<string, any>;
  simulation_status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
};

export type BlockchainRecord = {
  id: string;
  record_type: 'protocol' | 'result' | 'publication' | 'other';
  record_id: string;
  hash: string;
  timestamp: string;
  verified: boolean;
  blockchain_tx_id?: string;
  metadata?: Record<string, any>;
};

export type ARSession = {
  id: string;
  user_id: string;
  project_id: string;
  session_type: 'ar' | 'mr' | 'vr';
  start_time: string;
  end_time?: string;
  device_info?: Record<string, any>;
  session_data?: Record<string, any>;
};

export type FederatedLearningProject = {
  id: string;
  name: string;
  description: string;
  model_type: string;
  learning_objective: string;
  parameters?: Record<string, any>;
  status: 'recruiting' | 'training' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
};

export type Database = {
  projects: Project[];
  protocols: Protocol[];
  protocol_steps: ProtocolStep[];
  iot_devices: IoTDevice[];
  sensor_data: SensorData[];
  digital_twins: DigitalTwin[];
  blockchain_records: BlockchainRecord[];
  ar_sessions: ARSession[];
  federated_learning_projects: FederatedLearningProject[];
};
