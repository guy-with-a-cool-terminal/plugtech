import { Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const StickyContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showCnBTooltip, setShowCnBTooltip] = useState(false);

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

  const openCnBWebsite = () => {
    window.open('https://cnbcode.com', '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden flex flex-col items-end">
      {/* Expanded menu */}
      {isExpanded && (
        <div className="mb-4 space-y-2 animate-fade-in">
          {/* Call Button with Tooltip */}
          <div className="relative">
            <button
              onClick={handleCallClick}
              onMouseEnter={() => setHoveredButton('call')}
              onMouseLeave={() => setHoveredButton(null)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 w-full"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Call Now</span>
            </button>
            {hoveredButton === 'call' && (
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200">
                <div className="text-xs font-medium">Call Collins for more information</div>
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground"></div>
              </div>
            )}
          </div>

          {/* WhatsApp Button with Tooltip */}
          <div className="relative">
            <button
              onClick={handleWhatsAppClick}
              onMouseEnter={() => setHoveredButton('whatsapp')}
              onMouseLeave={() => setHoveredButton(null)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 w-full"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </button>
            {hoveredButton === 'whatsapp' && (
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200">
                <div className="text-xs font-medium">Message us, we respond fast!</div>
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground"></div>
              </div>
            )}
          </div>
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

      {/* CnB Code Badge - Always Visible Below Toggle */}
      <div className="relative">
        <button
          onClick={openCnBWebsite}
          onMouseEnter={() => setShowCnBTooltip(true)}
          onMouseLeave={() => setShowCnBTooltip(false)}
          className="mt-2 px-3 py-1.5 bg-foreground/10 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:bg-foreground/20 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 animate-pulse hover:animate-none"
          style={{ animationDuration: '3s' }}
        >
          <span>CnB Code</span>
          <ExternalLink className="w-3 h-3" />
        </button>
        
        {showCnBTooltip && (
          <div className="absolute bottom-full right-0 mb-2 bg-foreground text-background px-3 py-2 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="text-xs font-medium">Need a website like this?</div>
            <div className="text-xs text-primary font-semibold">cnbcode.com</div>
            <div className="absolute top-full right-4 border-4 border-transparent border-t-foreground"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyContact;