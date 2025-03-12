
import { supabase } from '../supabase-client';
import type { IoTDevice, SensorData } from '@/types/database.types';

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
