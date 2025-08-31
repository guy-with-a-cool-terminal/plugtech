
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
  };
  condition: string;
  inStock: boolean;
}

interface CategoryPageProps {
  category: string;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const [products] = useState<Product[]>(productsData.products);
  
  const filteredProducts = products.filter(product => product.category === category);
  
  const categoryTitles = {
    laptops: 'Laptops',
    desktops: 'Desktop Computers',
    gaming: 'Gaming Computers',
    monitors: 'Monitors & Displays',
    accessories: 'Computer Accessories'
  };

  const categoryTitle = categoryTitles[category as keyof typeof categoryTitles] || 'Products';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{categoryTitle}</h1>
          <p className="text-muted-foreground">
            Quality {categoryTitle.toLowerCase()} at competitive prices. All products come with warranty and expert support.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-foreground mb-2">No products available</h2>
            <p className="text-muted-foreground">Check back soon for new {categoryTitle.toLowerCase()}.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
