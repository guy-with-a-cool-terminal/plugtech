
import { Home, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
