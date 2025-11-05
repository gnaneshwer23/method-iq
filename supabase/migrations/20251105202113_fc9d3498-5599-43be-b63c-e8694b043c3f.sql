-- Create storage bucket for experiment data files
INSERT INTO storage.buckets (id, name, public)
VALUES ('experiment-data', 'experiment-data', false);

-- RLS policies for experiment data files
CREATE POLICY "Users can view own experiment files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'experiment-data' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload own experiment files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'experiment-data' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update own experiment files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'experiment-data' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own experiment files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'experiment-data' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Admins can access all experiment files
CREATE POLICY "Admins can view all experiment files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'experiment-data' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete all experiment files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'experiment-data' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);