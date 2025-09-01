
import { Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const StickyContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "254711483989";
    const message = "👋 Hello! I'm interested in your computer products. Can you help me?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = "tel:0711483989";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      {/* Expanded menu */}
      {isExpanded && (
        <div className="mb-4 space-y-2 animate-fade-in">
          <button
            onClick={handleCallClick}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            <span className="font-medium">Call Now</span>
          </button>
          
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">WhatsApp</span>
          </button>
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg transition-all duration-300 transform ${
          isExpanded ? 'rotate-45' : 'hover:scale-110'
        }`}
      >
        {isExpanded ? (
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-current"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-4 bg-current"></div>
            </div>
          </div>
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default StickyContact;
