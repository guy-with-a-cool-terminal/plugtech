
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
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
}

interface CartItem extends Product {
  quantity: number;
}

interface CategoryPageProps {
  category: string;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Listen for product updates from admin panel
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'plugtech-products' && e.newValue) {
        const updatedProducts = JSON.parse(e.newValue);
        setProducts(updatedProducts);
      }
    };

    // Load products from localStorage if available
    const savedProducts = localStorage.getItem('plugtech-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('plugtech-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('plugtech-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const filteredProducts = products.filter(product => product.category === category);
  
  const categoryTitles = {
    laptops: 'Laptops',
    desktops: 'Desktop Computers',
    gaming: 'Gaming Computers',
    monitors: 'Monitors & Displays',
    accessories: 'Computer Accessories'
  };

  const categoryTitle = categoryTitles[category as keyof typeof categoryTitles] || 'Products';

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartOpen={() => setIsCartOpen(true)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{categoryTitle}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Quality {categoryTitle.toLowerCase()} at competitive prices. All products come with warranty and expert support.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-foreground mb-2">No products available</h2>
            <p className="text-muted-foreground">Check back soon for new {categoryTitle.toLowerCase()}.</p>
          </div>
        )}
      </div>

      <Footer />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
};

export default CategoryPage;
