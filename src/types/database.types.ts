// Define Supabase database schema types

export type UserProfile = {
  user_id: string;
  name: string;
  email: string;
  role: 'admin' | 'researcher' | 'collaborator';
  created_at: string;
  updated_at: string;
};

export type Protocol = {
  protocol_id: string;
  title: string;
  description: string;
  created_by: string; // Foreign Key to UserProfiles.user_id
  status: 'draft' | 'verified' | 'archived';
  project_id?: string;
  name?: string;
  research_type?: string;
  version?: string;
  is_ai_generated?: boolean;
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

export type Experiment = {
  experiment_id: string;
  protocol_id: string; // Foreign Key to Protocols.protocol_id
  ai_recommendations: string | Record<string, any>;
  experiment_data: Record<string, any>;
  start_time: string;
  end_time?: string;
  created_at: string;
  updated_at: string;
};

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

export type ARAsset = {
  id: string;
  name: string;
  type: 'model_3d' | 'overlay' | 'tutorial';
  file_url: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type ARSession = {
  id: string;
  user_id: string;
  experiment_id?: string;
  start_time: string;
  end_time?: string;
  session_type: 'ar' | 'mr';
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

export type FederatedModelRound = {
  round_id: string;
  model_name: string;
  round_number: number;
  global_model_params: string;
  status: 'pending' | 'active' | 'completed';
  created_at: string;
  updated_at: string;
};

export type ClientUpdate = {
  update_id: string;
  round_id: string;
  client_id: string;
  model_params: string;
  timestamp: string;
};

export type Database = {
  user_profiles: UserProfile[];
  protocols: Protocol[];
  protocol_steps: ProtocolStep[];
  experiments: Experiment[];
  projects: Project[];
  iot_devices: IoTDevice[];
  sensor_data: SensorData[];
  digital_twins: DigitalTwin[];
  blockchain_records: BlockchainRecord[];
  ar_sessions: ARSession[];
  federated_learning_projects: FederatedLearningProject[];
  federated_model_rounds: FederatedModelRound[];
  client_updates: ClientUpdate[];
};
