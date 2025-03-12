
import { supabase } from '../supabase-client';

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
