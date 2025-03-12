
// First import the APIs
import { recordsApi } from './records';
import { verificationApi } from './verification';
import { realtimeApi } from './realtime';

// Then export them individually
export { recordsApi } from './records';
export { verificationApi } from './verification';
export { realtimeApi } from './realtime';

// Export consolidated API using the imported variables
export const blockchainApi = {
  ...recordsApi,
  ...verificationApi,
  ...realtimeApi
};
