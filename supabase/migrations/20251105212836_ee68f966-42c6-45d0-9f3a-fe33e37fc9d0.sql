-- Create storage bucket for federated learning model weights
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'fl-model-weights',
  'fl-model-weights',
  false,
  104857600, -- 100MB limit
  ARRAY['application/octet-stream', 'application/x-pickle', 'application/x-hdf', 'application/x-pytorch']
);

-- RLS policies for fl-model-weights bucket
-- Participants can upload to their own participant folder
CREATE POLICY "Participants can upload model weights"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'fl-model-weights' AND
  EXISTS (
    SELECT 1 FROM federated_learning_participants
    WHERE id::text = (storage.foldername(name))[1]
    AND user_id = auth.uid()
  )
);

-- Participants can read their own uploads and aggregated models
CREATE POLICY "Participants can read model weights"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'fl-model-weights' AND
  (
    -- Own participant folder
    EXISTS (
      SELECT 1 FROM federated_learning_participants
      WHERE id::text = (storage.foldername(name))[1]
      AND user_id = auth.uid()
    )
    OR
    -- Aggregated models folder (shared)
    (storage.foldername(name))[1] = 'aggregated'
  )
);

-- Project owners can read all weights in their project
CREATE POLICY "Project owners can read all weights"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'fl-model-weights' AND
  EXISTS (
    SELECT 1 FROM federated_learning_projects p
    JOIN federated_learning_participants part ON part.project_id = p.id
    WHERE part.id::text = (storage.foldername(name))[1]
    AND p.created_by = auth.uid()
  )
);

-- Admins can manage all weights
CREATE POLICY "Admins can manage all weights"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'fl-model-weights' AND
  has_role(auth.uid(), 'admin')
);