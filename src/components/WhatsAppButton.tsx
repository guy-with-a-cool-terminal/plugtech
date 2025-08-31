
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productName?: string;
  productPrice?: number;
  productUrl?: string;
  cartItems?: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  className?: string;
}

const WhatsAppButton = ({ 
  productName, 
  productPrice, 
  productUrl, 
  cartItems, 
  className = "" 
}: WhatsAppButtonProps) => {
  const phoneNumber = "254711483989"; // Updated phone number without extra digit

  const generateMessage = () => {
    if (cartItems && cartItems.length > 0) {
      // Multi-product cart message
      let message = "🛒 *CART CHECKOUT REQUEST*\n\n";
      message += "Hello! I would like to purchase the following items:\n\n";
      let total = 0;
      
      cartItems.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   💰 Price: KSh ${item.price.toLocaleString()}\n`;
        message += `   📦 Quantity: ${item.quantity}\n`;
        message += `   💵 Subtotal: KSh ${(item.price * item.quantity).toLocaleString()}\n\n`;
        total += item.price * item.quantity;
      });
      
      message += `*TOTAL AMOUNT: KSh ${total.toLocaleString()}*\n\n`;
      message += "Please confirm availability and delivery details.\n";
      message += "Thank you! 🙏";
      return message;
    } else if (productName && productPrice) {
      // Single product message with better formatting
      let message = "🚀 *QUICK ORDER REQUEST*\n\n";
      message += "Hello! I'm interested in purchasing:\n\n";
      message += `📱 *Product:* ${productName}\n`;
      message += `💰 *Price:* KSh ${productPrice.toLocaleString()}\n`;
      
      if (productUrl) {
        message += `🔗 *Product Link:* ${window.location.origin}${productUrl}\n`;
      }
      
      message += "\n📋 *Request Details:*\n";
      message += "• Please confirm product availability\n";
      message += "• Delivery options and charges\n";
      message += "• Payment methods accepted\n";
      message += "• Warranty information\n\n";
      message += "Looking forward to your response! 🙏";
      
      return message;
    }
    
    // General inquiry
    return "👋 Hello!\n\nI'm interested in your computer products and would like to see your catalog.\n\nPlease share available products and pricing.\n\nThank you! 🙏";
  };

  const openWhatsApp = () => {
    const message = generateMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className={`btn-whatsapp ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      {cartItems ? 'WhatsApp Checkout' : 'Quick Order'}
    </button>
  );
};

export default WhatsAppButton;
