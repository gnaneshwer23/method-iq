import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { iotApi } from '@/lib/api/iot';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export const useIoTDevices = (userId?: string) => {
  return useQuery({
    queryKey: ['iot-devices', userId],
    queryFn: () => iotApi.getUserDevices(userId!),
    enabled: !!userId,
  });
};

export const useIoTDevice = (deviceId: string) => {
  return useQuery({
    queryKey: ['iot-device', deviceId],
    queryFn: () => iotApi.getDevice(deviceId),
    enabled: !!deviceId,
  });
};

export const useRegisterDevice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: iotApi.registerDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iot-devices'] });
      toast({
        title: 'Success',
        description: 'Device registered successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to register device',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateDeviceStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'online' | 'offline' | 'error' }) =>
      iotApi.updateDeviceStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['iot-device', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['iot-devices'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update device status',
        variant: 'destructive',
      });
    },
  });
};

export const useSensorData = (deviceId: string, options?: {
  experimentId?: string;
  timeRange?: { start: Date; end: Date };
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['sensor-data', deviceId, options],
    queryFn: () => iotApi.getSensorData(deviceId, options),
    enabled: !!deviceId,
    refetchInterval: 5000, // Refetch every 5 seconds for near real-time data
  });
};

export const useLogSensorData = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: iotApi.logSensorData,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sensor-data', variables.device_id] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to log sensor data',
        variant: 'destructive',
      });
    },
  });
};

export const useSensorDataRealtime = (deviceId: string, onNewData: (payload: any) => void) => {
  useEffect(() => {
    if (!deviceId) return;

    const channel = iotApi.subscribeToSensorData(deviceId, onNewData);

    return () => {
      channel.unsubscribe();
    };
  }, [deviceId, onNewData]);
};
