import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Phone, Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  cartItemsCount?: number;
  onCartOpen?: () => void;
}

const Header = ({ cartItemsCount = 0, onCartOpen }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(''); // Clear search after navigation
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
            <div className="flex items-center gap-4">
              <a href="tel:0711483989" className="flex items-center gap-1 hover:underline">
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">0711 483 989</span>
              </a>
              <span className="hidden md:inline">Rasumal House, Shop 5, 1st Floor, Tom Mboya St, Nairobi (Ask For Collins)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs">Follow us:</span>
              <a 
                href="https://instagram.com/collo_thee_plug" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" 
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a 
                href="https://tiktok.com/@plugtechbusiness" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" 
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-xl sm:text-2xl font-bold text-primary">
              Plug Tech Business
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/category/laptops" className="text-foreground hover:text-primary transition-colors">Laptops</Link>
            <Link to="/category/desktops" className="text-foreground hover:text-primary transition-colors">Desktops</Link>
            <Link to="/category/gaming" className="text-foreground hover:text-primary transition-colors">Gaming</Link>
            <Link to="/category/monitors" className="text-foreground hover:text-primary transition-colors">Monitors</Link>
            <Link to="/category/accessories" className="text-foreground hover:text-primary transition-colors">Accessories</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-md mx-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
          </form>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            {onCartOpen && (
              <button
                onClick={onCartOpen}
                className="relative p-2 text-foreground hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </form>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/category/laptops" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Laptops</Link>
              <Link to="/category/desktops" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Desktops</Link>
              <Link to="/category/gaming" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Gaming</Link>
              <Link to="/category/monitors" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Monitors</Link>
              <Link to="/category/accessories" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Accessories</Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;