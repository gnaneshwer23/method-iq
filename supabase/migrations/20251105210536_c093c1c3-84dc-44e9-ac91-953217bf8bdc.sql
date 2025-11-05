-- Create federated learning projects table
CREATE TABLE IF NOT EXISTS public.federated_learning_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  model_type TEXT NOT NULL,
  learning_objective TEXT NOT NULL,
  parameters JSONB DEFAULT '{}'::jsonb,
  current_round INTEGER DEFAULT 0,
  total_rounds INTEGER NOT NULL DEFAULT 10,
  min_participants INTEGER DEFAULT 3,
  status TEXT NOT NULL DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'training', 'completed', 'archived')),
  privacy_budget NUMERIC DEFAULT 1.0,
  aggregation_method TEXT DEFAULT 'federated_averaging',
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create federated learning participants table
CREATE TABLE IF NOT EXISTS public.federated_learning_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.federated_learning_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'dropped')),
  contribution_count INTEGER DEFAULT 0,
  last_contribution_at TIMESTAMPTZ,
  local_data_size INTEGER,
  performance_metrics JSONB DEFAULT '{}'::jsonb,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Create federated model updates table
CREATE TABLE IF NOT EXISTS public.federated_model_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.federated_learning_projects(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES public.federated_learning_participants(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  model_weights_hash TEXT NOT NULL,
  model_weights_url TEXT,
  loss NUMERIC,
  accuracy NUMERIC,
  training_samples INTEGER,
  privacy_metrics JSONB DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create aggregated models table
CREATE TABLE IF NOT EXISTS public.federated_aggregated_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.federated_learning_projects(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  model_weights_hash TEXT NOT NULL,
  model_weights_url TEXT,
  participating_clients INTEGER NOT NULL,
  global_loss NUMERIC,
  global_accuracy NUMERIC,
  aggregation_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, round_number)
);

-- Enable RLS
ALTER TABLE public.federated_learning_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.federated_learning_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.federated_model_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.federated_aggregated_models ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Anyone can view recruiting or training projects"
  ON public.federated_learning_projects FOR SELECT
  USING (status IN ('recruiting', 'training') OR created_by = auth.uid() OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Researchers can create projects"
  ON public.federated_learning_projects FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Project owners can update their projects"
  ON public.federated_learning_projects FOR UPDATE
  USING (created_by = auth.uid() OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
  ON public.federated_learning_projects FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for participants
CREATE POLICY "Participants can view project participants"
  ON public.federated_learning_participants FOR SELECT
  USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.federated_learning_participants p2
      WHERE p2.project_id = federated_learning_participants.project_id 
      AND p2.user_id = auth.uid()
    ) OR
    has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can join projects"
  ON public.federated_learning_participants FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their participation"
  ON public.federated_learning_participants FOR UPDATE
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

-- RLS Policies for model updates
CREATE POLICY "Participants can view updates in their projects"
  ON public.federated_model_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.federated_learning_participants p
      WHERE p.id = federated_model_updates.participant_id 
      AND p.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.federated_learning_participants p2
      WHERE p2.project_id = federated_model_updates.project_id 
      AND p2.user_id = auth.uid()
    ) OR
    has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Participants can submit updates"
  ON public.federated_model_updates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.federated_learning_participants p
      WHERE p.id = participant_id AND p.user_id = auth.uid()
    )
  );

-- RLS Policies for aggregated models
CREATE POLICY "Project participants can view aggregated models"
  ON public.federated_aggregated_models FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.federated_learning_participants p
      WHERE p.project_id = federated_aggregated_models.project_id 
      AND p.user_id = auth.uid()
    ) OR
    has_role(auth.uid(), 'admin')
  );

CREATE POLICY "System can insert aggregated models"
  ON public.federated_aggregated_models FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_fl_projects_status ON public.federated_learning_projects(status);
CREATE INDEX idx_fl_projects_created_by ON public.federated_learning_projects(created_by);
CREATE INDEX idx_fl_participants_project ON public.federated_learning_participants(project_id);
CREATE INDEX idx_fl_participants_user ON public.federated_learning_participants(user_id);
CREATE INDEX idx_fl_updates_project ON public.federated_model_updates(project_id);
CREATE INDEX idx_fl_updates_round ON public.federated_model_updates(round_number);
CREATE INDEX idx_fl_aggregated_project ON public.federated_aggregated_models(project_id);

-- Create trigger for updated_at
CREATE TRIGGER update_federated_learning_projects_updated_at
  BEFORE UPDATE ON public.federated_learning_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();