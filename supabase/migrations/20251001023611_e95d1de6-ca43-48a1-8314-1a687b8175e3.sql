-- Add image_version column to products table
ALTER TABLE public.products 
ADD COLUMN image_version integer NOT NULL DEFAULT 1;

-- Create function to auto-increment image_version
CREATE OR REPLACE FUNCTION public.increment_image_version()
RETURNS TRIGGER AS $$
BEGIN
  -- Only increment if image URL changed
  IF (TG_OP = 'UPDATE' AND OLD.image IS DISTINCT FROM NEW.image) THEN
    NEW.image_version = OLD.image_version + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-increment image_version on image update
CREATE TRIGGER trigger_increment_image_version
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_image_version();