
export { recordsApi } from './records';
export { verificationApi } from './verification';
export { realtimeApi } from './realtime';

// Export consolidated API
export const blockchainApi = {
  ...recordsApi,
  ...verificationApi,
  ...realtimeApi
};
