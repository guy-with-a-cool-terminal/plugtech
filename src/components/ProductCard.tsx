
import WhatsAppButton from './WhatsAppButton';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="relative">
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
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded ${
            product.condition === 'New' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {product.condition}
          </span>
        </div>
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
