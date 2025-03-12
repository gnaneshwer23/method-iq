
// Re-export the Supabase client
export { supabase } from './supabase-client';

// Re-export all API services
export {
  authApi,
  projectApi,
  protocolApi,
  iotApi,
  digitalTwinApi,
  blockchainApi,
  arMrApi,
  federatedLearningApi,
  databaseApi
} from './api';
