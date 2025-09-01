
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductCarouselSkeleton from './ProductCarouselSkeleton';
import { Product } from '@/types/product';

interface ProductCarouselProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  autoScroll?: boolean;
  title?: string;
  loading?: boolean;
}

const ProductCarousel = ({ 
  products, 
  onAddToCart, 
  autoScroll = false,
  title,
  loading = false
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (width < 768) {
        setItemsPerView(2); // Small tablet: 2 items
      } else if (width < 1024) {
        setItemsPerView(2); // Tablet: 2 items
      } else if (width < 1280) {
        setItemsPerView(3); // Small desktop: 3 items
      } else {
        setItemsPerView(4); // Large desktop: 4 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  useEffect(() => {
    if (autoScroll && products.length > itemsPerView && !loading) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % (maxIndex + 1));
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [autoScroll, maxIndex, products.length, itemsPerView, loading]);

  const scrollTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const nextSlide = () => {
    scrollTo(currentIndex + 1);
  };

  const prevSlide = () => {
    scrollTo(currentIndex - 1);
  };

  // Show skeleton while loading
  if (loading) {
    return <ProductCarouselSkeleton title={title} itemsPerView={itemsPerView} />;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {title && (
        <h3 className="text-xl font-bold text-foreground mb-6">{title}</h3>
      )}
      
      <div className="carousel-container">
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 1.5}rem / ${itemsPerView})` }}
            >
              <div className="h-full min-h-[500px] md:min-h-[550px]">
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {products.length > itemsPerView && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-secondary/90 text-secondary-foreground p-3 rounded-full shadow-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary/90 text-secondary-foreground p-3 rounded-full shadow-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {products.length > itemsPerView && (
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
