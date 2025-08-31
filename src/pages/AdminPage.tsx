
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Save, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import productsData from '../data/products.json';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
  };
  condition: string;
  inStock: boolean;
  dateAdded: string;
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'laptops',
    price: '',
    processor: '',
    ram: '',
    storage: '',
    display: '',
    condition: 'Refurbished',
    inStock: true,
    image: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'plugtech2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
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
      inStock: true,
      image: ''
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : `product_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
      specs: {
        processor: formData.processor,
        ram: formData.ram,
        storage: formData.storage,
        display: formData.display
      },
      condition: formData.condition,
      inStock: formData.inStock,
      dateAdded: editingProduct ? editingProduct.dateAdded : new Date().toISOString().split('T')[0]
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProducts(prev => [...prev, newProduct]);
    }

    resetForm();
    
    // In a real app, this would save to a database
    console.log('Product saved:', newProduct);
    alert('Product saved successfully!');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      processor: product.specs.processor,
      ram: product.specs.ram,
      storage: product.specs.storage,
      display: product.specs.display,
      condition: product.condition,
      inStock: product.inStock,
      image: product.image
    });
    setShowAddForm(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      alert('Product deleted successfully!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
              <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Access</h1>
              
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Login
                </button>
              </form>
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
      
      <div className="container-custom py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Admin Panel</h1>
            <p className="text-muted-foreground">Manage products and website content</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-foreground">
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
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="laptops">Laptops</option>
                  <option value="desktops">Desktops</option>
                  <option value="gaming">Gaming</option>
                  <option value="monitors">Monitors</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price (KSh)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Processor</label>
                <input
                  type="text"
                  value={formData.processor}
                  onChange={(e) => setFormData(prev => ({ ...prev, processor: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">RAM</label>
                <input
                  type="text"
                  value={formData.ram}
                  onChange={(e) => setFormData(prev => ({ ...prev, ram: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Storage</label>
                <input
                  type="text"
                  value={formData.storage}
                  onChange={(e) => setFormData(prev => ({ ...prev, storage: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Display</label>
                <input
                  type="text"
                  value={formData.display}
                  onChange={(e) => setFormData(prev => ({ ...prev, display: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="New">New</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="inStock" className="text-sm text-foreground">In Stock</label>
              </div>

              <div className="md:col-span-2 flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Products ({products.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground line-clamp-2 max-w-xs">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground capitalize">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 font-medium text-primary">
                      KSh {product.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-primary hover:bg-muted rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-muted rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
