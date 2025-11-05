-- Create IoT Devices table
CREATE TABLE IF NOT EXISTS public.iot_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  device_name TEXT NOT NULL,
  device_type TEXT NOT NULL,
  manufacturer TEXT,
  model TEXT,
  connection_status TEXT NOT NULL DEFAULT 'offline' CHECK (connection_status IN ('online', 'offline', 'error')),
  last_connected_at TIMESTAMPTZ,
  configuration JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Sensor Data table
CREATE TABLE IF NOT EXISTS public.sensor_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES public.iot_devices(id) ON DELETE CASCADE,
  experiment_id UUID REFERENCES public.experiments(id) ON DELETE SET NULL,
  sensor_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.iot_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensor_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for iot_devices
CREATE POLICY "Users can view their own devices"
  ON public.iot_devices FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own devices"
  ON public.iot_devices FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own devices"
  ON public.iot_devices FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices"
  ON public.iot_devices FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for sensor_data
CREATE POLICY "Users can view sensor data from their devices"
  ON public.sensor_data FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.iot_devices
      WHERE iot_devices.id = sensor_data.device_id
      AND iot_devices.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert sensor data to their devices"
  ON public.sensor_data FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.iot_devices
      WHERE iot_devices.id = sensor_data.device_id
      AND iot_devices.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX idx_iot_devices_user_id ON public.iot_devices(user_id);
CREATE INDEX idx_iot_devices_status ON public.iot_devices(connection_status);
CREATE INDEX idx_sensor_data_device_id ON public.sensor_data(device_id);
CREATE INDEX idx_sensor_data_experiment_id ON public.sensor_data(experiment_id);
CREATE INDEX idx_sensor_data_timestamp ON public.sensor_data(timestamp DESC);

-- Trigger for updated_at
CREATE TRIGGER update_iot_devices_updated_at
  BEFORE UPDATE ON public.iot_devices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();