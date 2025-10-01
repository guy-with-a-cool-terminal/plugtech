
import { ShoppingCart, Star, Clock, Shield } from 'lucide-react';
import { Product } from '@/types/product';
import CountdownTimer from './CountdownTimer';
import WhatsAppButton from './WhatsAppButton';
import { getOptimizedImageUrl, getImageSrcSet } from '@/utils/imageOptimization';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // Check if product has an active offer (assuming products with discount have offers)
  const hasOffer = product.price < 50000; // Example: products under 50k have offers
  const offerEndDate = hasOffer ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null; // 24 hours from now
  
  // Simulate stock levels for urgency
  const stockLevel = Math.floor(Math.random() * 8) + 1;
  const isLimitedStock = stockLevel <= 3;

  // Get condition badge styling
  const getConditionBadgeStyle = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'refurbished':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ex uk':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group w-full h-full flex flex-col transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3] bg-muted">
        <img
          src={getOptimizedImageUrl(product.image, product.image_version, { width: 400, height: 300, quality: 85 })}
          srcSet={getImageSrcSet(product.image, product.image_version)}
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        
        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.in_stock ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
          
          {isLimitedStock && product.in_stock && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Only {stockLevel} left
            </span>
          )}
        </div>

        {/* Condition Badge */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {hasOffer && (
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium animate-pulse">
              Limited Offer!
            </div>
          )}
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getConditionBadgeStyle(product.condition)}`}>
            {product.condition}
          </div>
        </div>

        {/* Warranty badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Shield className="w-3 h-3" />
          30-day warranty
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-foreground mb-2 text-base leading-tight line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4 flex-1">
          <p><span className="font-medium text-foreground">Processor:</span> <span className="break-words">{product.processor}</span></p>
          <p><span className="font-medium text-foreground">RAM:</span> {product.ram}</p>
          <p><span className="font-medium text-foreground">Storage:</span> {product.storage}</p>
          <p><span className="font-medium text-foreground">Display:</span> <span className="break-words">{product.display}</span></p>
        </div>

        {hasOffer && offerEndDate && (
          <div className="mb-4 p-2 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs text-primary font-medium mb-1">⚡ Limited Time Offer Ends In:</p>
            <CountdownTimer endDate={offerEndDate} />
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xl font-bold text-primary">
                KSh {product.price.toLocaleString()}
              </span>
              {hasOffer && (
                <div className="text-xs text-muted-foreground line-through">
                  KSh {(product.price * 1.2).toLocaleString()}
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-xs text-green-600 font-medium">✓ Warranty Included</div>
              <div className="text-xs text-muted-foreground">Free inspection</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.in_stock}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium transform hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isLimitedStock ? 'Buy Now - Limited Stock!' : 'Add to Cart'}</span>
            </button>
            
            <WhatsAppButton
              productName={product.name}
              productPrice={product.price}
              productUrl={`/product/${product.id}`}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-sm font-medium transform hover:scale-105 active:scale-95"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
