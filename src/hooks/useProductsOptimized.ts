import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

interface UseProductsOptions {
  category?: string;
  limit?: number;
  offset?: number;
  enabled?: boolean;
}

export const useProductsOptimized = (options: UseProductsOptions = {}) => {
  const { category, limit = 50, offset = 0, enabled = true } = options;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch products with specific columns only
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products', category, limit, offset],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Product[];
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at')
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
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, productData }: { id: string; productData: Partial<Product> }) => {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select('id, name, category, price, image, image_version, processor, ram, storage, display, condition, in_stock, date_added, created_at')
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
    },
  });

  // Delete product mutation
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
    },
  });

  return {
    products,
    loading: isLoading,
    error,
    addProduct: addProductMutation.mutateAsync,
    updateProduct: (id: string, productData: Partial<Product>) => 
      updateProductMutation.mutateAsync({ id, productData }),
    deleteProduct: deleteProductMutation.mutateAsync,
    refetch,
  };
};