
import WhatsAppButton from './WhatsAppButton';
import CountdownTimer from './CountdownTimer';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // Create a mock offer end date (7 days from now) for products with "offer" in description
  const hasOffer = product.description?.toLowerCase().includes('offer') || 
                   product.description?.toLowerCase().includes('discount') ||
                   product.name.toLowerCase().includes('offer');
  
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 7); // 7 days from now

  return (
    <div className="product-card">
      <div className="relative">
        {hasOffer && (
          <div className="offer-badge">
            Special Offer!
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="product-title">
          {product.name}
        </h3>
        
        <div className="text-xs text-muted-foreground mb-3 space-y-1">
          {product.processor !== 'N/A' && (
            <div>Processor: {product.processor}</div>
          )}
          {product.ram !== 'N/A' && (
            <div>RAM: {product.ram}</div>
          )}
          {product.storage !== 'N/A' && (
            <div>Storage: {product.storage}</div>
          )}
          <div>Display: {product.display}</div>
        </div>
        
        <div className="product-price">
          KSh {product.price.toLocaleString()}
        </div>
        
        {hasOffer && (
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-medium">Offer ends in:</span>
            <CountdownTimer endDate={offerEndDate} />
          </div>
        )}
        
        <div className="flex gap-2">
          <WhatsAppButton
            productName={product.name}
            productPrice={product.price}
            productUrl={`/product/${product.id}`}
            className="flex-1 justify-center text-sm"
          />
          {onAddToCart && product.in_stock && (
            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
