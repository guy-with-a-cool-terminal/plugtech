import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import { useProducts } from '../hooks/useProducts';
import { Product, CartItem } from '@/types/product';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, loading } = useProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      product.processor.toLowerCase().includes(searchTerm) ||
      product.ram.toLowerCase().includes(searchTerm) ||
      product.storage.toLowerCase().includes(searchTerm) ||
      product.display.toLowerCase().includes(searchTerm) ||
      // Split search term by spaces and check if any word matches
      searchTerm.split(' ').some(word => 
        word.length > 0 && (
          productName.includes(word) ||
          productCategory.includes(word) ||
          product.processor.toLowerCase().includes(word) ||
          product.ram.toLowerCase().includes(word) ||
          product.storage.toLowerCase().includes(word) ||
          product.display.toLowerCase().includes(word)
        )
      )
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

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
