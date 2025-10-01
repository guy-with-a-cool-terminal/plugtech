-- Fix function search path for increment_image_version
CREATE OR REPLACE FUNCTION public.increment_image_version()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only increment if image URL changed
  IF (TG_OP = 'UPDATE' AND OLD.image IS DISTINCT FROM NEW.image) THEN
    NEW.image_version = OLD.image_version + 1;
  END IF;
  RETURN NEW;
END;
$$;