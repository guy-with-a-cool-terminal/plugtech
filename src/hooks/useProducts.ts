import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const useProducts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const addProductMutation = useMutation({
    mutationFn: async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at, updated_at')
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product added successfully!",
      });
    },
    onError: (error: any) => {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  });

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const data = await addProductMutation.mutateAsync(productData);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, productData }: { id: string; productData: Partial<Product> }) => {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at, updated_at')
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
    },
    onError: (error: any) => {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update product. Please try again.",
        variant: "destructive",
      });
    }
  });

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const data = await updateProductMutation.mutateAsync({ id, productData });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  });

  const deleteProduct = async (id: string) => {
    try {
      await deleteProductMutation.mutateAsync(id);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch
  };
};
