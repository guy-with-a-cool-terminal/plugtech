
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    'category': 'Categories',
    'laptops': 'Laptops',
    'desktops': 'Desktop Computers',
    'gaming': 'Gaming Computers',
    'monitors': 'Monitors',
    'accessories': 'Computer Accessories',
    'search': 'Search Results',
    'contact': 'Contact Us',
    'admin': 'Admin Panel'
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-muted/50 py-3">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </li>
          
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
            
            return (
              <li key={pathname} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
                {isLast ? (
                  <span className="text-foreground font-medium">{displayName}</span>
                ) : (
                  <Link 
                    to={routeTo}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
