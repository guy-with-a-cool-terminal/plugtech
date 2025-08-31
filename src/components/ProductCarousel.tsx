
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductCarouselProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  autoScroll?: boolean;
  title?: string;
}

const ProductCarousel = ({ 
  products, 
  onAddToCart, 
  autoScroll = false,
  title 
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const itemsPerView = 4; // Show 4 products at a time on desktop
  const maxIndex = Math.max(0, products.length - itemsPerView);

  useEffect(() => {
    if (autoScroll && products.length > itemsPerView) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % (maxIndex + 1));
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [autoScroll, maxIndex, products.length, itemsPerView]);

  const scrollTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const nextSlide = () => {
    scrollTo(currentIndex + 1);
  };

  const prevSlide = () => {
    scrollTo(currentIndex - 1);
  };

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
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="px-2">
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
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-secondary/80 text-secondary-foreground p-2 rounded-full shadow-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary/80 text-secondary-foreground p-2 rounded-full shadow-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {products.length > itemsPerView && (
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
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
