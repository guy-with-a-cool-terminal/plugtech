
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import CountdownTimer from './CountdownTimer';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // Check if product has an active offer (assuming products with discount have offers)
  const hasOffer = product.price < 50000; // Example: products under 50k have offers
  const offerEndDate = hasOffer ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null; // 24 hours from now

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {product.in_stock ? (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            In Stock
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </span>
        )}
        {hasOffer && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Offer!
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        <div className="space-y-1 text-sm text-muted-foreground mb-3">
          <p><span className="font-medium">Processor:</span> {product.processor}</p>
          <p><span className="font-medium">RAM:</span> {product.ram}</p>
          <p><span className="font-medium">Storage:</span> {product.storage}</p>
          <p><span className="font-medium">Display:</span> {product.display}</p>
        </div>

        {hasOffer && offerEndDate && (
          <div className="mb-3">
            <CountdownTimer endDate={offerEndDate} />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            KSh {product.price.toLocaleString()}
          </span>
          <div className="flex gap-2">
            <button
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              title="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.in_stock}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
