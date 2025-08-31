
import { useState, useEffect } from 'react';
import { Laptop, Monitor, Gamepad2, HardDrive, Headphones, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import WhatsAppButton from '../components/WhatsAppButton';
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

const Index = () => {
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('plugtech-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

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

  const categories = [
    { 
      name: 'Laptops', 
      icon: Laptop, 
      count: products.filter(p => p.category === 'laptops').length,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop&crop=center'
    },
    { 
      name: 'Desktops', 
      icon: HardDrive, 
      count: products.filter(p => p.category === 'desktops').length,
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=200&h=150&fit=crop&crop=center'
    },
    { 
      name: 'Gaming', 
      icon: Gamepad2, 
      count: products.filter(p => p.category === 'gaming').length,
      image: 'https://images.unsplash.com/photo-1593640393637-2ed698cb2682?w=200&h=150&fit=crop&crop=center'
    },
    { 
      name: 'Monitors', 
      icon: Monitor, 
      count: products.filter(p => p.category === 'monitors').length,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=150&fit=crop&crop=center'
    },
    { 
      name: 'Accessories', 
      icon: Headphones, 
      count: products.filter(p => p.category === 'accessories').length,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=150&fit=crop&crop=center'
    },
  ];

  const featuredProduct = products.find(p => p.id === 'hp-probook-440-g10');
  const latestProducts = products.slice(0, 8);
  const laptops = products.filter(p => p.category === 'laptops').slice(0, 4);
  const gaming = products.filter(p => p.category === 'gaming');
  const desktops = products.filter(p => p.category === 'desktops');
  const monitors = products.filter(p => p.category === 'monitors');
  const accessories = products.filter(p => p.category === 'accessories');

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartOpen={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Quality Computer Hardware at 
                <span className="text-primary"> Best Prices</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Find the perfect laptop, desktop, or computer accessory for your needs. 
                We offer both new and refurbished computers with guaranteed quality and competitive prices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
                <WhatsAppButton className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors duration-200 text-center font-medium" />
                <a href="/category/laptops" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-lg transition-colors duration-200 text-center font-medium">
                  Browse Laptops
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>Quality Guaranteed</span>
                </div>
                <div>Competitive Prices</div>
                <div>Expert Support</div>
              </div>
            </div>

            {featuredProduct && (
              <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="text-center mb-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured Deal
                  </span>
                </div>
                <ProductCard 
                  product={featuredProduct} 
                  onAddToCart={addToCart}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <a
                  key={category.name}
                  href={`/category/${category.name.toLowerCase()}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-24 sm:h-32 lg:h-40">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-2 sm:p-3 lg:p-4 text-center">
                    <h3 className="font-semibold text-foreground mb-1 text-xs sm:text-sm lg:text-base">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} Products</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-12 sm:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12">Latest Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {latestProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/category/laptops" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors duration-200 inline-block font-medium">
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Laptops Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Popular Laptops</h2>
            <a href="/category/laptops" className="text-primary hover:text-primary-hover font-medium">
              View All Laptops →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {laptops.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Section */}
      <section className="py-16 bg-muted/50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Gaming Computers</h2>
            <a href="/category/gaming" className="text-primary hover:text-primary-hover font-medium">
              View All Gaming →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {gaming.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Desktops & Monitors */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Desktops */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h2 className="text-xl font-bold text-foreground">Desktop Computers</h2>
                <a href="/category/desktops" className="text-primary hover:text-primary-hover font-medium text-sm">
                  View All →
                </a>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {desktops.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow duration-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md bg-muted flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-primary font-bold mb-2">KSh {product.price.toLocaleString()}</p>
                      <WhatsAppButton
                        productName={product.name}
                        productPrice={product.price}
                        className="text-xs px-3 py-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitors */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h2 className="text-xl font-bold text-foreground">Monitors</h2>
                <a href="/category/monitors" className="text-primary hover:text-primary-hover font-medium text-sm">
                  View All →
                </a>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {monitors.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow duration-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md bg-muted flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-primary font-bold mb-2">KSh {product.price.toLocaleString()}</p>
                      <WhatsAppButton
                        productName={product.name}
                        productPrice={product.price}
                        className="text-xs px-3 py-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="py-16 bg-muted/50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Computer Accessories</h2>
            <a href="/category/accessories" className="text-primary hover:text-primary-hover font-medium">
              View All Accessories →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {accessories.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

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

export default Index;
