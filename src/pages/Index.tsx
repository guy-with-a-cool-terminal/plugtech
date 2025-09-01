
import { useState, useEffect } from 'react';
import { Laptop, Monitor, Gamepad2, HardDrive, Headphones, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ShoppingCart from '../components/ShoppingCart';
import WhatsAppButton from '../components/WhatsAppButton';
import TrustBadges from '../components/TrustBadges';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import StickyContact from '../components/StickyContact';
import SEO from '../components/SEO';
import { useProducts } from '../hooks/useProducts';
import { Product, CartItem } from '@/types/product';
import ProductCarousel from '../components/ProductCarousel';

const Index = () => {
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

  const categories = [
    { 
      name: 'Laptops', 
      icon: Laptop, 
      count: loading ? 0 : products.filter(p => p.category === 'laptops').length,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop&crop=center'
    },
    { 
      name: 'Desktops', 
      icon: HardDrive, 
      count: loading ? 0 : products.filter(p => p.category === 'desktops').length,
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=200&h=150&fit=crop&crop=center'
    },
    { 
      name: 'Gaming', 
      icon: Gamepad2, 
      count: loading ? 0 : products.filter(p => p.category === 'gaming').length,
      image: 'https://images.unsplash.com/photo-1593640393637-2ed698cb2682?w=200&h=150&fit=crop&crop=center'
    },
    { 
      name: 'Monitors', 
      icon: Monitor, 
      count: loading ? 0 : products.filter(p => p.category === 'monitors').length,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=150&fit=crop&crop=center'
    },
    { 
      name: 'Accessories', 
      icon: Headphones, 
      count: loading ? 0 : products.filter(p => p.category === 'accessories').length,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=150&fit=crop&crop=center'
    },
  ];

  const featuredProduct = loading ? null : products.find(p => p.name.includes('HP ProBook'));
  const latestProducts = loading ? [] : products.slice(0, 8);
  const laptops = loading ? [] : products.filter(p => p.category === 'laptops');
  const gaming = loading ? [] : products.filter(p => p.category === 'gaming');
  const desktops = loading ? [] : products.filter(p => p.category === 'desktops');
  const monitors = loading ? [] : products.filter(p => p.category === 'monitors');
  const accessories = loading ? [] : products.filter(p => p.category === 'accessories');

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Header cartItemsCount={cartItemsCount} onCartOpen={() => setIsCartOpen(true)} />

      {/* Hero Section - Always visible */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Quality Computer Hardware at 
                <span className="text-primary"> Best Prices</span> in Nairobi
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Find the perfect laptop, desktop, or computer accessory for your needs. 
                We offer both new and refurbished computers with guaranteed quality and competitive prices. 
                Located in Nairobi CBD with 5+ years of experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
                <WhatsAppButton className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-center font-medium" />
                <a href="/category/laptops" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-center font-medium">
                  Browse Laptops
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>30-Day Warranty</span>
                </div>
                <div>5+ Years Experience</div>
                <div>Nairobi CBD Location</div>
                <div>Expert Support</div>
              </div>
            </div>

            {/* Featured Product with loading state */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  ⚡ Featured Deal - Limited Time!
                </span>
              </div>
              {loading || !featuredProduct ? (
                <ProductCardSkeleton />
              ) : (
                <ProductCard 
                  product={featuredProduct} 
                  onAddToCart={addToCart}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Always visible */}
      <TrustBadges />

      {/* Categories - Always visible */}
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
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                >
                  <div className="relative h-24 sm:h-32 lg:h-40">
                    <img
                      src={category.image}
                      alt={`${category.name} - Best prices in Nairobi`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="p-2 sm:p-3 lg:p-4 text-center">
                    <h3 className="font-semibold text-foreground mb-1 text-xs sm:text-sm lg:text-base group-hover:text-primary transition-colors duration-200">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {loading ? "Loading..." : `${category.count} Products Available`}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Products Carousel with loading state */}
      <section className="py-12 sm:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12">Latest Products</h2>
          <ProductCarousel 
            products={latestProducts}
            onAddToCart={addToCart}
            autoScroll={true}
            loading={loading}
          />
          <div className="text-center mt-8">
            <a href="/category/laptops" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 inline-block font-medium">
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Always visible */}
      <WhyChooseUs />

      {/* Product Category Carousels with loading states */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Popular Laptops in Nairobi</h2>
            <a href="/category/laptops" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
              View All Laptops →
            </a>
          </div>
          <ProductCarousel 
            products={laptops}
            onAddToCart={addToCart}
            loading={loading}
          />
        </div>
      </section>

      {/* Gaming Carousel */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Gaming Computers & Laptops</h2>
            <a href="/category/gaming" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
              View All Gaming →
            </a>
          </div>
          <ProductCarousel 
            products={gaming}
            onAddToCart={addToCart}
            loading={loading}
          />
        </div>
      </section>

      {/* Desktops Carousel */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Desktop Computers</h2>
            <a href="/category/desktops" className="text-primary hover:text-primary-hover font-medium">
              View All Desktops →
            </a>
          </div>
          <ProductCarousel 
            products={desktops}
            onAddToCart={addToCart}
            loading={loading}
          />
        </div>
      </section>

      {/* Monitors Carousel */}
      <section className="py-16 bg-muted/50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Monitors</h2>
            <a href="/category/monitors" className="text-primary hover:text-primary-hover font-medium">
              View All Monitors →
            </a>
          </div>
          <ProductCarousel 
            products={monitors}
            onAddToCart={addToCart}
            loading={loading}
          />
        </div>
      </section>

      {/* Accessories Carousel */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Computer Accessories</h2>
            <a href="/category/accessories" className="text-primary hover:text-primary-hover font-medium">
              View All Accessories →
            </a>
          </div>
          <ProductCarousel 
            products={accessories}
            onAddToCart={addToCart}
            loading={loading}
          />
        </div>
      </section>

      {/* FAQ Section - Always visible */}
      <FAQ />

      <Footer />

      {/* Sticky Contact Button for Mobile - Always visible */}
      <StickyContact />

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
