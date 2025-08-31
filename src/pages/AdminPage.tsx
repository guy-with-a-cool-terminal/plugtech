
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'plugtech2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
              <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Access</h1>
              
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admin Panel</h1>
          <p className="text-muted-foreground">Manage products and website content</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Product Management</h2>
          <p className="text-muted-foreground">
            Admin functionality will be implemented in the next phase. 
            Currently, products are managed through the products.json file.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
