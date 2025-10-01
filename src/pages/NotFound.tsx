import { Home, ArrowLeft, ExternalLink, Zap } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  const [showDevCredit, setShowDevCredit] = useState(false);

  const openCnBWebsite = () => {
    window.open('https://cnbcode.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl sm:text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <a
              href="/"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home Page
            </a>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>Popular Categories:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <a href="/category/laptops" className="text-primary hover:underline">Laptops</a>
              <span>•</span>
              <a href="/category/desktops" className="text-primary hover:underline">Desktops</a>
              <span>•</span>
              <a href="/category/gaming" className="text-primary hover:underline">Gaming</a>
              <span>•</span>
              <a href="/category/monitors" className="text-primary hover:underline">Monitors</a>
            </div>
          </div>

          {/* Developer Credit Card */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-6 backdrop-blur-sm border border-border/50">
              <p className="text-xs font-medium text-muted-foreground mb-4 text-center">
                Built with precision by
              </p>
              
              <button
                onClick={openCnBWebsite}
                onMouseEnter={() => setShowDevCredit(true)}
                onMouseLeave={() => setShowDevCredit(false)}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <span className="text-sm font-semibold tracking-wide">CnB Code</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                
                {showDevCredit && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-foreground text-background px-4 py-3 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200 min-w-[240px]">
                    <div className="text-xs font-semibold mb-1">Need a website like this?</div>
                    <div className="text-xs text-primary font-medium mb-2">Professional Web Development</div>
                    <div className="text-[10px] opacity-80">Click to visit cnbcode.com</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
                  </div>
                )}
              </button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Web Development • E-commerce • SEO • Digital Solutions
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;