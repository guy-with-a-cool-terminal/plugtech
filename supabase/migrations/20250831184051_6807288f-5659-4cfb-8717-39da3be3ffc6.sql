
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT NOT NULL,
  processor TEXT NOT NULL,
  ram TEXT NOT NULL,
  storage TEXT NOT NULL,
  display TEXT NOT NULL,
  condition TEXT NOT NULL DEFAULT 'Refurbished',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  date_added DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table for admin roles
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Products policies (readable by everyone, writable by admins)
CREATE POLICY "Products are viewable by everyone" 
  ON public.products FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert products" 
  ON public.products FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update products" 
  ON public.products FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete products" 
  ON public.products FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample products (letting PostgreSQL generate UUIDs automatically)
INSERT INTO public.products (name, category, price, image, processor, ram, storage, display, condition, in_stock, date_added) VALUES
  ('HP ProBook 440 G10 Intel Core i7 13th Gen 8GB RAM 512GB SSD 14 Inches FHD Display', 'laptops', 99999, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center', 'Intel Core i7 13th Gen', '8GB', '512GB SSD', '14 Inches FHD Display', 'Refurbished', true, '2025-08-31'),
  ('Dell Latitude 7420 Intel Core i5 11th Gen 16GB RAM 256GB SSD 14 Inches FHD', 'laptops', 85000, 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop&crop=center', 'Intel Core i5 11th Gen', '16GB', '256GB SSD', '14 Inches FHD', 'Refurbished', true, '2025-08-30'),
  ('Lenovo ThinkPad T490 Core i5 8th Gen 8GB RAM 256GB SSD 14 Inches FHD', 'laptops', 65000, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&crop=center', 'Intel Core i5 8th Gen', '8GB', '256GB SSD', '14 Inches FHD', 'Refurbished', true, '2025-08-29'),
  ('Apple MacBook Air M1 Chip 8GB RAM 256GB SSD 13 Inches Retina Display', 'laptops', 125000, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center', 'Apple M1 Chip', '8GB', '256GB SSD', '13 Inches Retina', 'New', true, '2025-08-31'),
  ('HP ProDesk 400 G6 Intel Core i5 9th Gen 8GB RAM 500GB HDD Desktop Computer', 'desktops', 45000, 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=300&fit=crop&crop=center', 'Intel Core i5 9th Gen', '8GB', '500GB HDD', 'Desktop PC', 'Refurbished', true, '2025-08-28'),
  ('Dell OptiPlex 7070 Intel Core i7 9th Gen 16GB RAM 512GB SSD Desktop', 'desktops', 75000, 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&h=300&fit=crop&crop=center', 'Intel Core i7 9th Gen', '16GB', '512GB SSD', 'Desktop PC', 'Refurbished', true, '2025-08-27'),
  ('HP Victus Gaming Laptop Core i7 GTX 1650 16GB RAM 512GB SSD 15.6 Inches FHD', 'gaming', 120000, 'https://images.unsplash.com/photo-1593640393637-2ed698cb2682?w=400&h=300&fit=crop&crop=center', 'Intel Core i7', '16GB', '512GB SSD', '15.6 Inches FHD Gaming', 'New', true, '2025-08-30'),
  ('Lenovo Legion 5 Gaming Laptop RTX 3060 16GB RAM 1TB SSD 15.6 Inches 165Hz', 'gaming', 180000, 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop&crop=center', 'AMD Ryzen 7', '16GB', '1TB SSD', '15.6 Inches 165Hz Gaming', 'New', true, '2025-08-31'),
  ('Dell UltraSharp U2417H 24-inch FHD IPS Monitor 1920x1080 USB Hub', 'monitors', 25000, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&crop=center', 'N/A', 'N/A', 'N/A', '24-inch FHD IPS 1920x1080', 'New', true, '2025-08-29'),
  ('HP EliteDisplay E243 24-inch IPS Monitor Full HD 1920x1080 VGA HDMI DP', 'monitors', 28000, 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=400&h=300&fit=crop&crop=center', 'N/A', 'N/A', 'N/A', '24-inch IPS Full HD', 'New', true, '2025-08-28'),
  ('Universal Laptop Chargers Compatible with HP Dell Lenovo Acer 65W 90W', 'accessories', 2500, 'https://images.unsplash.com/photo-1609592591345-b0abcf3f5ca5?w=400&h=300&fit=crop&crop=center', 'N/A', 'N/A', 'N/A', '65W/90W Power Output', 'New', true, '2025-08-31'),
  ('Professional Laptop Bag 15.6 inch Water Resistant Business Carry Case', 'accessories', 1800, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=center', 'N/A', 'N/A', 'N/A', '15.6 inch Laptop Compatible', 'New', true, '2025-08-30'),
  ('Logitech Wireless Mouse 2.4GHz USB Receiver Ergonomic Design', 'accessories', 1200, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop&crop=center', 'N/A', 'N/A', 'N/A', '2.4GHz Wireless Connection', 'New', true, '2025-08-29');

-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policies for product images
CREATE POLICY "Public can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Only admins can upload product images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'product-images' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can update product images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'product-images' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Only admins can delete product images" ON storage.objects FOR DELETE USING (
  bucket_id = 'product-images' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
