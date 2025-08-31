
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const ShoppingCart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: ShoppingCartProps) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const cartItemsForWhatsApp = items.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Shopping Cart ({items.length})</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>Your cart is empty</p>
                <p className="text-sm mt-2">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border border-border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md bg-muted"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-primary">
                          KSh {item.price.toLocaleString()}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 hover:bg-muted rounded transition-colors duration-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted rounded transition-colors duration-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors duration-200 ml-2"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">
                  KSh {total.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <WhatsAppButton
                  cartItems={cartItemsForWhatsApp}
                  className="w-full justify-center"
                />
                
                <button
                  onClick={onClearCart}
                  className="w-full px-4 py-2 text-sm border border-border hover:bg-muted rounded-lg transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
