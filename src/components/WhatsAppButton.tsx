
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
  const phoneNumber = "254711448398"; // Fixed format without the extra 9

  const generateMessage = () => {
    if (cartItems && cartItems.length > 0) {
      // Multi-product cart message
      let message = "Hello, I want to purchase:\n\n";
      let total = 0;
      
      cartItems.forEach(item => {
        message += `*${item.name}*\n*Quantity:* ${item.quantity}\n*Price:* KSh ${item.price.toLocaleString()}\n\n`;
        total += item.price * item.quantity;
      });
      
      message += `*TOTAL:* KSh ${total.toLocaleString()}\n\nThank you!`;
      return message;
    } else if (productName && productPrice) {
      // Single product message
      return `Hello, I want to purchase:

*${productName}*
*Price:* KSh ${productPrice.toLocaleString()}${productUrl ? `\n*URL:* ${window.location.origin}${productUrl}` : ''}

Thank you!`;
    }
    
    // General inquiry
    return "Hello, I'm interested in your computer products. Please send me your catalog. Thank you!";
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
