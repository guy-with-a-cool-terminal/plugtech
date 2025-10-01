import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Save, X, Search, LogOut, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  image_version: number;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  condition: string;
  in_stock: boolean;
  date_added: string;
}

const AdminPage = () => {
  const { user, isAdmin, signIn, signOut, loading: authLoading } = useAuth();
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Product form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'laptops',
    price: '',
    processor: '',
    ram: '',
    storage: '',
    display: '',
    condition: 'Refurbished',
    in_stock: true,
    image: ''
  });

  useEffect(() => {
    // Log current auth state for debugging
    console.log('Admin page - Auth state:', { 
      user: user ? { id: user.id, email: user.email } : null, 
      isAdmin, 
      authLoading 
    });
  }, [user, isAdmin, authLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "You have successfully logged in.",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setEmail('');
    setPassword('');
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '2592000', // 30 days cache
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'laptops',
      price: '',
      processor: '',
      ram: '',
      storage: '',
      display: '',
      condition: 'Refurbished',
      in_stock: true,
      image: ''
    });
    setSelectedFile(null);
    setImagePreview('');
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to modify products.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      let imageUrl = formData.image;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price),
        image: imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
        image_version: editingProduct?.image_version || 1,
        processor: formData.processor,
        ram: formData.ram,
        storage: formData.storage,
        display: formData.display,
        condition: formData.condition,
        in_stock: formData.in_stock,
        date_added: editingProduct ? editingProduct.date_added : new Date().toISOString().split('T')[0]
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast({
          title: "Product Updated",
          description: "Product has been successfully updated.",
        });
      } else {
        await addProduct(productData);
        toast({
          title: "Product Added",
          description: "Product has been successfully added.",
        });
      }

      resetForm();
    } catch (error: any) {
      console.error('Product save error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to edit products.",
        variant: "destructive",
      });
      return;
    }
    
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      processor: product.processor,
      ram: product.ram,
      storage: product.storage,
      display: product.display,
      condition: product.condition,
      in_stock: product.in_stock,
      image: product.image
    });
    setImagePreview(product.image);
    setShowAddForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (!user || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to delete products.",
        variant: "destructive",
      });
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        toast({
          title: "Product Deleted",
          description: "Product has been successfully deleted.",
        });
      } catch (error) {
        console.error('Delete product error:', error);
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show ONLY login form if not authenticated or not admin - no products visible
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
                <p className="text-muted-foreground">
                  Access restricted to administrators only
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="admin-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    disabled={loginLoading}
                    placeholder="Enter your admin email"
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="admin-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      disabled={loginLoading}
                      minLength={6}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={loginLoading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loginLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/auth')}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  Forgot password? Reset it here
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage products and website content
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
            <button
              onClick={handleSignOut}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="laptops">Laptops</option>
                  <option value="desktops">Desktops</option>
                  <option value="gaming">Gaming</option>
                  <option value="monitors">Monitors</option>
                  <option value="accessories">Accessories</option>
                  <option value="all-in-one">All in One</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price (KSh)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Processor</label>
                <input
                  type="text"
                  value={formData.processor}
                  onChange={(e) => setFormData(prev => ({ ...prev, processor: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                  placeholder="e.g., Intel i7-12700H"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">RAM</label>
                <input
                  type="text"
                  value={formData.ram}
                  onChange={(e) => setFormData(prev => ({ ...prev, ram: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                  placeholder="e.g., 16GB DDR4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Storage</label>
                <input
                  type="text"
                  value={formData.storage}
                  onChange={(e) => setFormData(prev => ({ ...prev, storage: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                  placeholder="e.g., 512GB SSD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Display</label>
                <input
                  type="text"
                  value={formData.display}
                  onChange={(e) => setFormData(prev => ({ ...prev, display: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                  placeholder="e.g., 15.6 FHD IPS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="New">New</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Ex UK">Ex UK</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Product Image</label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Upload an image file or paste an image URL below:
                  </div>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, image: e.target.value }));
                      if (e.target.value && !selectedFile) {
                        setImagePreview(e.target.value);
                      }
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.in_stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, in_stock: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="inStock" className="text-sm text-foreground">In Stock</label>
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg flex items-center gap-2 justify-center disabled:opacity-50"
                >
                  {uploading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {uploading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                </button>
                <button type="button" onClick={resetForm} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Products */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">
              Products ({filteredProducts.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No products found. Add some products to get started.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">Image</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">Name</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">Category</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">Price</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">Stock</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/50">
                      <td className="px-2 sm:px-4 py-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center';
                          }}
                        />
                      </td>
                      <td className="px-2 sm:px-4 py-3">
                        <div className="font-medium text-foreground text-xs sm:text-sm line-clamp-2 max-w-xs">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-muted-foreground capitalize">
                        {product.category}
                      </td>
                      <td className="px-2 sm:px-4 py-3 font-medium text-primary text-xs sm:text-sm">
                        KSh {product.price.toLocaleString()}
                      </td>
                      <td className="px-2 sm:px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          product.in_stock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-3">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1 sm:p-2 text-primary hover:bg-muted rounded-lg"
                            title="Edit product"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1 sm:p-2 text-red-600 hover:bg-muted rounded-lg"
                            title="Delete product"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
