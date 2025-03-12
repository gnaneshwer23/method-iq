
import { verificationApi } from './verification';
import { recordsApi } from './records';
import { realtimeApi } from './realtime';

export const blockchainApi = {
  ...verificationApi,
  ...recordsApi,
  ...realtimeApi
};

export default blockchainApi;
