-- Add privacy budget tracking to participants
ALTER TABLE public.federated_learning_participants
ADD COLUMN IF NOT EXISTS privacy_budget_used NUMERIC DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS privacy_budget_remaining NUMERIC;

-- Create function to calculate remaining budget
CREATE OR REPLACE FUNCTION public.calculate_privacy_budget_remaining()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  project_budget NUMERIC;
BEGIN
  -- Get the project's total privacy budget
  SELECT privacy_budget INTO project_budget
  FROM federated_learning_projects
  WHERE id = NEW.project_id;
  
  -- Calculate remaining budget
  NEW.privacy_budget_remaining := COALESCE(project_budget, 1.0) - COALESCE(NEW.privacy_budget_used, 0.0);
  
  RETURN NEW;
END;
$$;

-- Create trigger to update remaining budget
DROP TRIGGER IF EXISTS trigger_calculate_privacy_budget ON federated_learning_participants;
CREATE TRIGGER trigger_calculate_privacy_budget
BEFORE INSERT OR UPDATE ON federated_learning_participants
FOR EACH ROW
EXECUTE FUNCTION calculate_privacy_budget_remaining();

-- Update existing participants to set remaining budget
UPDATE federated_learning_participants p
SET privacy_budget_remaining = (
  SELECT COALESCE(fp.privacy_budget, 1.0) - COALESCE(p.privacy_budget_used, 0.0)
  FROM federated_learning_projects fp
  WHERE fp.id = p.project_id
);

-- Add privacy budget tracking to model updates
ALTER TABLE public.federated_model_updates
ADD COLUMN IF NOT EXISTS epsilon_used NUMERIC DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS delta_used NUMERIC DEFAULT 0.0;