
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Safely handle localStorage operations
  const safeLocalStorageGet = (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  };

  const safeLocalStorageSet = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Silently fail if localStorage is not available
    }
  };

  // Listen for product updates from admin panel
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'plugtech-products' && e.newValue) {
        try {
          const updatedProducts = JSON.parse(e.newValue);
          setProducts(updatedProducts);
        } catch (error) {
          // Ignore parsing errors
        }
      }
    };

    // Load products from localStorage if available
    const savedProducts = safeLocalStorageGet('plugtech-products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        // Use default products if parsing fails
      }
    }

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = safeLocalStorageGet('plugtech-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        // Use empty cart if parsing fails
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    safeLocalStorageSet('plugtech-cart', JSON.stringify(cartItems));
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

  // Improved search filter - more flexible matching
  const searchResults = products.filter(product => {
    if (!query.trim()) return false;
    
    const searchTerm = query.toLowerCase().trim();
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();
    const productCondition = product.condition.toLowerCase();
    
    // Check if search term matches any part of the product
    return (
      productName.includes(searchTerm) ||
      productCategory.includes(searchTerm) ||
      productCondition.includes(searchTerm) ||
      product.specs.processor.toLowerCase().includes(searchTerm) ||
      product.specs.ram.toLowerCase().includes(searchTerm) ||
      product.specs.storage.toLowerCase().includes(searchTerm) ||
      product.specs.display.toLowerCase().includes(searchTerm) ||
      // Split search term by spaces and check if any word matches
      searchTerm.split(' ').some(word => 
        word.length > 0 && (
          productName.includes(word) ||
          productCategory.includes(word) ||
          product.specs.processor.toLowerCase().includes(word) ||
          product.specs.ram.toLowerCase().includes(word) ||
          product.specs.storage.toLowerCase().includes(word) ||
          product.specs.display.toLowerCase().includes(word)
        )
      )
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartOpen={() => setIsCartOpen(true)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Search Results
          </h1>
          {query && (
            <p className="text-muted-foreground text-sm sm:text-base">
              Showing results for "{query}" ({searchResults.length} found)
            </p>
          )}
        </div>

        {query ? (
          searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {searchResults.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground">
                No products match your search for "{query}". Try different keywords or check your spelling.
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-foreground mb-2">Enter a search term</h2>
            <p className="text-muted-foreground">
              Use the search bar above to find products.
            </p>
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

export default SearchPage;
