-- Create digital_twins table
CREATE TABLE public.digital_twins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  twin_type TEXT NOT NULL, -- 'equipment', 'system', 'process'
  physical_id TEXT, -- Reference to physical device/system
  state JSONB DEFAULT '{}', -- Current state parameters
  metadata JSONB DEFAULT '{}', -- Additional metadata
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create twin_simulations table
CREATE TABLE public.twin_simulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  twin_id UUID NOT NULL REFERENCES public.digital_twins(id) ON DELETE CASCADE,
  protocol_id UUID REFERENCES public.protocols(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  input_parameters JSONB NOT NULL DEFAULT '{}',
  predicted_outcome JSONB,
  confidence_score NUMERIC CHECK (confidence_score >= 0 AND confidence_score <= 100),
  simulation_duration_seconds INTEGER,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  result_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create twin_metrics table for time-series data
CREATE TABLE public.twin_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  twin_id UUID NOT NULL REFERENCES public.digital_twins(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_unit TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.digital_twins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.twin_simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.twin_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for digital_twins
CREATE POLICY "Users can view own digital twins"
  ON public.digital_twins FOR SELECT
  USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can create digital twins"
  ON public.digital_twins FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own digital twins"
  ON public.digital_twins FOR UPDATE
  USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can delete own digital twins"
  ON public.digital_twins FOR DELETE
  USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for twin_simulations
CREATE POLICY "Users can view own simulations"
  ON public.twin_simulations FOR SELECT
  USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can create simulations"
  ON public.twin_simulations FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own simulations"
  ON public.twin_simulations FOR UPDATE
  USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can delete own simulations"
  ON public.twin_simulations FOR DELETE
  USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for twin_metrics
CREATE POLICY "Users can view metrics for own twins"
  ON public.twin_metrics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.digital_twins
      WHERE id = twin_metrics.twin_id
      AND (created_by = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
    )
  );

CREATE POLICY "Users can insert metrics for own twins"
  ON public.twin_metrics FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.digital_twins
      WHERE id = twin_metrics.twin_id
      AND created_by = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_digital_twins_created_by ON public.digital_twins(created_by);
CREATE INDEX idx_digital_twins_twin_type ON public.digital_twins(twin_type);
CREATE INDEX idx_twin_simulations_twin_id ON public.twin_simulations(twin_id);
CREATE INDEX idx_twin_simulations_status ON public.twin_simulations(status);
CREATE INDEX idx_twin_metrics_twin_id ON public.twin_metrics(twin_id);
CREATE INDEX idx_twin_metrics_timestamp ON public.twin_metrics(timestamp DESC);

-- Trigger for updated_at
CREATE TRIGGER update_digital_twins_updated_at
  BEFORE UPDATE ON public.digital_twins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();