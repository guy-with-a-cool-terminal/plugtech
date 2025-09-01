
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface FeaturedProductCardProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  loading?: boolean;
}

const FeaturedProductCard = ({ products, onAddToCart, loading = false }: FeaturedProductCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading || products.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium animate-pulse">
            ⚡ Featured Deals - Limited Time!
          </span>
        </div>
        <div className="min-h-[500px] animate-pulse bg-muted rounded-lg"></div>
      </div>
    );
  }

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-center mb-6">
        <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium animate-pulse">
          ⚡ Featured Deals - Limited Time!
        </span>
      </div>
      
      <div 
        className="min-h-[500px] cursor-pointer group"
        onMouseEnter={nextProduct}
      >
        <div className="transform transition-all duration-500 group-hover:scale-105">
          <ProductCard 
            product={products[currentIndex]} 
            onAddToCart={onAddToCart}
          />
        </div>
        
        {products.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
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

export default FeaturedProductCard;
