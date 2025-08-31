
import { useState } from 'react';
import { Phone, Instagram, ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartItemsCount?: number;
  onCartOpen?: () => void;
}

const Header = ({ cartItemsCount = 0, onCartOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Laptops', path: '/category/laptops' },
    { name: 'Desktops', path: '/category/desktops' },
    { name: 'Gaming', path: '/category/gaming' },
    { name: 'Monitors', path: '/category/monitors' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:0711483989" className="contact-link text-primary-foreground hover:text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">0711 483 989</span>
              </a>
              <div className="hidden md:flex items-center gap-4">
                <a 
                  href="https://instagram.com/collo_thee_plug" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link text-primary-foreground hover:text-primary-foreground/80"
                >
                  <Instagram className="w-4 h-4" style={{ color: '#E4405F' }} />
                  <span>@collo_thee_plug</span>
                </a>
                <a 
                  href="https://tiktok.com/@plugtechbusiness" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link text-primary-foreground hover:text-primary-foreground/80"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#ff0050">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z"/>
                  </svg>
                  <span>@plugtechbusiness</span>
                </a>
              </div>
            </div>
            <div className="text-primary-foreground">
              Quality Computer Hardware • Best Prices in Kenya
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              Plug Tech Business
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                />
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </form>

            {/* Cart */}
            {onCartOpen && (
              <button
                onClick={onCartOpen}
                className="relative p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </form>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="nav-link block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
