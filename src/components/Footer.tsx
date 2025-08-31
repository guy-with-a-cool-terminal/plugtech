
import { Phone, Instagram, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Plug Tech Business</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Your trusted partner for quality computer hardware in Kenya. We provide the best laptops, 
              desktops, and computer accessories at competitive prices.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/collo_thee_plug" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent-hover transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" style={{ color: '#E4405F' }} />
              </a>
              <a 
                href="https://tiktok.com/@plugtechbusiness" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#ff0050">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/category/laptops" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                  Laptops
                </a>
              </li>
              <li>
                <a href="/category/desktops" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                  Desktops
                </a>
              </li>
              <li>
                <a href="/category/gaming" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                  Gaming
                </a>
              </li>
              <li>
                <a href="/category/monitors" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                  Monitors
                </a>
              </li>
              <li>
                <a href="/category/accessories" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:0711483989" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  0711 483 989
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">WhatsApp for Orders</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-muted-foreground">
                  <div>Rasumal House, Shop No. 5, 1st Floor</div>
                  <div>Tom Mboya Street, Nairobi</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <div className="flex justify-between">
                    <span>Mon - Sat:</span>
                    <span>7AM - 9PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 Plug Tech Business. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Quality Guaranteed</span>
              <span>•</span>
              <span>Competitive Prices</span>
              <span>•</span>
              <span>Expert Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
