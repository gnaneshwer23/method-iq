-- Fix security warning: Set search_path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix security warning: Set search_path for update_protocol_rating function
CREATE OR REPLACE FUNCTION public.update_protocol_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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