
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import CountdownTimer from './CountdownTimer';
import WhatsAppButton from './WhatsAppButton';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // Check if product has an active offer (assuming products with discount have offers)
  const hasOffer = product.price < 50000; // Example: products under 50k have offers
  const offerEndDate = hasOffer ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null; // 24 hours from now

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group w-full h-full flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        {product.in_stock ? (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            In Stock
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </span>
        )}
        {hasOffer && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            Offer!
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-foreground mb-2 text-base leading-tight line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4 flex-1">
          <p><span className="font-medium">Processor:</span> <span className="break-words">{product.processor}</span></p>
          <p><span className="font-medium">RAM:</span> {product.ram}</p>
          <p><span className="font-medium">Storage:</span> {product.storage}</p>
          <p><span className="font-medium">Display:</span> <span className="break-words">{product.display}</span></p>
        </div>

        {hasOffer && offerEndDate && (
          <div className="mb-4">
            <CountdownTimer endDate={offerEndDate} />
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-primary">
              KSh {product.price.toLocaleString()}
            </span>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.in_stock}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            
            <WhatsAppButton
              productName={product.name}
              productPrice={product.price}
              productUrl={`/product/${product.id}`}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
