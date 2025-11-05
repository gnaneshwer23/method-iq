-- Add reputation scoring columns to federated_learning_participants
ALTER TABLE public.federated_learning_participants
ADD COLUMN IF NOT EXISTS reputation_score NUMERIC DEFAULT 50.0,
ADD COLUMN IF NOT EXISTS quality_score NUMERIC DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS consistency_score NUMERIC DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS impact_score NUMERIC DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS total_training_samples INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS average_accuracy NUMERIC DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS streak_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS best_round_contribution INTEGER,
ADD COLUMN IF NOT EXISTS reputation_history JSONB DEFAULT '[]'::jsonb;

-- Create reputation events table for tracking
CREATE TABLE IF NOT EXISTS public.reputation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES public.federated_learning_participants(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.federated_learning_projects(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('contribution', 'improvement', 'consistency', 'quality')),
  round_number INTEGER NOT NULL,
  score_change NUMERIC NOT NULL,
  metrics JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on reputation_events
ALTER TABLE public.reputation_events ENABLE ROW LEVEL SECURITY;

-- RLS Policy for reputation events
CREATE POLICY "Participants can view own reputation events"
  ON public.reputation_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.federated_learning_participants p
      WHERE p.id = reputation_events.participant_id 
      AND p.user_id = auth.uid()
    ) OR
    has_role(auth.uid(), 'admin')
  );

CREATE POLICY "System can insert reputation events"
  ON public.reputation_events FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reputation_events_participant ON public.reputation_events(participant_id);
CREATE INDEX IF NOT EXISTS idx_reputation_events_project ON public.reputation_events(project_id);
CREATE INDEX IF NOT EXISTS idx_participants_reputation ON public.federated_learning_participants(reputation_score DESC);

-- Create function to calculate reputation score
CREATE OR REPLACE FUNCTION public.calculate_participant_reputation(
  _participant_id UUID
)
RETURNS NUMERIC
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _quality_score NUMERIC := 0;
  _consistency_score NUMERIC := 0;
  _impact_score NUMERIC := 0;
  _reputation NUMERIC := 50.0;
BEGIN
  -- Get participant stats
  SELECT 
    COALESCE(AVG(accuracy), 0) * 100,
    CASE 
      WHEN COUNT(*) >= 5 THEN LEAST(COUNT(*) * 2, 30)
      ELSE COUNT(*) * 2
    END,
    COALESCE(AVG(
      CASE 
        WHEN accuracy > 0.7 THEN 10
        WHEN accuracy > 0.5 THEN 5
        ELSE 0
      END
    ), 0)
  INTO _quality_score, _consistency_score, _impact_score
  FROM federated_model_updates
  WHERE participant_id = _participant_id;

  -- Calculate final reputation (weighted average)
  _reputation := (
    (_quality_score * 0.4) + 
    (_consistency_score * 0.3) + 
    (_impact_score * 0.3)
  );

  -- Update participant record
  UPDATE federated_learning_participants
  SET 
    reputation_score = _reputation,
    quality_score = _quality_score,
    consistency_score = _consistency_score,
    impact_score = _impact_score,
    updated_at = now()
  WHERE id = _participant_id;

  RETURN _reputation;
END;
$$;

-- Create trigger to update reputation after model updates
CREATE OR REPLACE FUNCTION public.update_reputation_on_contribution()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Calculate and update reputation
  PERFORM calculate_participant_reputation(NEW.participant_id);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_reputation_on_contribution
  AFTER INSERT ON public.federated_model_updates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_reputation_on_contribution();