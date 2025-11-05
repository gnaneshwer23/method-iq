-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'researcher', 'reviewer');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  institution TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create equipment table
CREATE TABLE public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;

-- Create protocols table (main method repository)
CREATE TABLE public.protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  detailed_steps JSONB,
  tags TEXT[],
  equipment_ids UUID[],
  estimated_cost NUMERIC,
  estimated_duration_minutes INTEGER,
  hash TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  verified BOOLEAN DEFAULT false,
  average_rating NUMERIC(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  success_rate NUMERIC(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.protocols ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_protocols_tags ON public.protocols USING GIN(tags);
CREATE INDEX idx_protocols_created_by ON public.protocols(created_by);
CREATE INDEX idx_protocols_verified ON public.protocols(verified);

-- Create experiments table (tracking experiments and results)
CREATE TABLE public.experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id UUID REFERENCES public.protocols(id) ON DELETE CASCADE NOT NULL,
  researcher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  data_file_url TEXT,
  success_percentage NUMERIC(5,2),
  time_taken_minutes INTEGER,
  notes TEXT,
  environment_conditions JSONB,
  verified BOOLEAN DEFAULT false,
  blockchain_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_experiments_protocol ON public.experiments(protocol_id);
CREATE INDEX idx_experiments_researcher ON public.experiments(researcher_id);
CREATE INDEX idx_experiments_verified ON public.experiments(verified);

-- Create ratings table (community feedback)
CREATE TABLE public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id UUID REFERENCES public.protocols(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(protocol_id, user_id)
);

ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_ratings_protocol ON public.ratings(protocol_id);
CREATE INDEX idx_ratings_user ON public.ratings(user_id);

-- Create blockchain_logs table (immutable verification trail)
CREATE TABLE public.blockchain_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id UUID REFERENCES public.protocols(id) ON DELETE SET NULL,
  experiment_id UUID REFERENCES public.experiments(id) ON DELETE SET NULL,
  hash TEXT NOT NULL,
  transaction_id TEXT,
  blockchain_network TEXT DEFAULT 'polygon-testnet',
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blockchain_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_blockchain_logs_protocol ON public.blockchain_logs(protocol_id);
CREATE INDEX idx_blockchain_logs_experiment ON public.blockchain_logs(experiment_id);
CREATE INDEX idx_blockchain_logs_hash ON public.blockchain_logs(hash);

-- Create data_uploads table (for IoT/CSV files)
CREATE TABLE public.data_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID REFERENCES public.experiments(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT,
  file_type TEXT,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.data_uploads ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_data_uploads_experiment ON public.data_uploads(experiment_id);

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_protocols_updated_at
  BEFORE UPDATE ON public.protocols
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiments_updated_at
  BEFORE UPDATE ON public.experiments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ratings_updated_at
  BEFORE UPDATE ON public.ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Assign default 'researcher' role to new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'researcher');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update protocol ratings
CREATE OR REPLACE FUNCTION public.update_protocol_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.protocols
  SET 
    average_rating = (
      SELECT COALESCE(AVG(stars), 0)
      FROM public.ratings
      WHERE protocol_id = COALESCE(NEW.protocol_id, OLD.protocol_id)
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM public.ratings
      WHERE protocol_id = COALESCE(NEW.protocol_id, OLD.protocol_id)
    )
  WHERE id = COALESCE(NEW.protocol_id, OLD.protocol_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger to update protocol ratings
CREATE TRIGGER update_protocol_rating_on_insert
  AFTER INSERT ON public.ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_protocol_rating();

CREATE TRIGGER update_protocol_rating_on_update
  AFTER UPDATE ON public.ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_protocol_rating();

CREATE TRIGGER update_protocol_rating_on_delete
  AFTER DELETE ON public.ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_protocol_rating();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for equipment
CREATE POLICY "Anyone can view equipment"
  ON public.equipment FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage equipment"
  ON public.equipment FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for protocols
CREATE POLICY "Anyone can view verified protocols"
  ON public.protocols FOR SELECT
  TO authenticated
  USING (verified = true OR created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Researchers can create protocols"
  ON public.protocols FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own protocols"
  ON public.protocols FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete protocols"
  ON public.protocols FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for experiments
CREATE POLICY "Users can view own experiments"
  ON public.experiments FOR SELECT
  TO authenticated
  USING (researcher_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'reviewer'));

CREATE POLICY "Researchers can create experiments"
  ON public.experiments FOR INSERT
  TO authenticated
  WITH CHECK (researcher_id = auth.uid());

CREATE POLICY "Users can update own experiments"
  ON public.experiments FOR UPDATE
  TO authenticated
  USING (researcher_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete experiments"
  ON public.experiments FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ratings
CREATE POLICY "Anyone can view ratings"
  ON public.ratings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create ratings"
  ON public.ratings FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own ratings"
  ON public.ratings FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own ratings"
  ON public.ratings FOR DELETE
  TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for blockchain_logs
CREATE POLICY "Anyone can view blockchain logs"
  ON public.blockchain_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can insert blockchain logs"
  ON public.blockchain_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for data_uploads
CREATE POLICY "Users can view own data uploads"
  ON public.data_uploads FOR SELECT
  TO authenticated
  USING (uploaded_by = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'reviewer'));

CREATE POLICY "Users can upload data"
  ON public.data_uploads FOR INSERT
  TO authenticated
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can delete own uploads"
  ON public.data_uploads FOR DELETE
  TO authenticated
  USING (uploaded_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));