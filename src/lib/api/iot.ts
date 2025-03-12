
import { supabase } from '../supabase-client';
import type { IoTDevice, SensorData } from '@/types/database.types';

export const iotApi = {
  /**
   * Register a new IoT device
   */
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
  
  /**
   * Get device information by ID
   */
  getDevice: async (deviceId: string) => {
    const { data, error } = await supabase
      .from('iot_devices')
      .select('*')
      .eq('id', deviceId)
      .single();
    
    return { data, error };
  },
  
  /**
   * Update device connection status
   */
  updateDeviceStatus: async (id: string, status: IoTDevice['connection_status']) => {
    const { data, error } = await supabase
      .from('iot_devices')
      .update({ 
        connection_status: status,
        last_connected_at: status === 'online' ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    return { data, error };
  },
  
  /**
   * Get all devices for a user
   */
  getUserDevices: async (userId: string) => {
    const { data, error } = await supabase
      .from('iot_devices')
      .select('*')
      .eq('user_id', userId);
    
    return { data, error };
  },
  
  /**
   * Log new sensor data
   * @param sensorData - The sensor reading to log
   */
  logSensorData: async (sensorData: Omit<SensorData, 'id'>) => {
    const { data, error } = await supabase
      .from('sensor_data')
      .insert(sensorData)
      .select();
    
    return { data, error };
  },
  
  /**
   * Get sensor readings with optional filtering
   * @param deviceId - The ID of the device to get readings from
   * @param options - Optional parameters for filtering data
   */
  getSensorData: async (
    deviceId: string, 
    options?: {
      experimentId?: string;
      timeRange?: { start: Date; end: Date };
      limit?: number;
    }
  ) => {
    let query = supabase
      .from('sensor_data')
      .select('*')
      .eq('device_id', deviceId);
    
    if (options?.experimentId) {
      query = query.eq('experiment_id', options.experimentId);
    }
    
    if (options?.timeRange) {
      query = query
        .gte('timestamp', options.timeRange.start.toISOString())
        .lte('timestamp', options.timeRange.end.toISOString());
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query.order('timestamp', { ascending: false });
    
    return { data, error };
  },
  
  /**
   * Get real-time sensor data updates using Supabase real-time subscriptions
   * @param deviceId - The ID of the device to subscribe to
   * @param callback - Function to call when new data is received
   */
  subscribeToSensorData: (deviceId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('sensor_data_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sensor_data',
          filter: `device_id=eq.${deviceId}`
        },
        callback
      )
      .subscribe();
  }
};
