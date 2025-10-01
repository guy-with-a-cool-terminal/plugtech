import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at, updated_at')
        .single();

      if (error) throw error;

      setProducts(prev => [data, ...prev]);
      
      toast({
        title: "Success",
        description: "Product added successfully!",
      });

      return { data, error: null };
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add product. Please try again.",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at, updated_at')
        .single();

      if (error) throw error;

      setProducts(prev => prev.map(p => p.id === id ? data : p));
      
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });

      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update product. Please try again.",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(p => p.id !== id));
      
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete product. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};
