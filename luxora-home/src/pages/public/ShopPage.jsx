import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { luxoraMotion } from '../../animations/variants';
import { productService } from '../../services/productService';
import ProductCard from '../../components/common/ProductCard';

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getProducts(categoryFilter ? { category: categoryFilter } : {});
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryFilter]);

  return (
    <div className="w-full min-h-screen bg-bg-primary pt-12">
      {/* Header */}
      <section className="px-6 md:px-16 py-12 md:py-24 text-center">
        <h1 className="font-display text-4xl md:text-[80px] italic text-text-primary uppercase mix-blend-color-burn">
          {categoryFilter ? categoryFilter.replace('-', ' ') : 'ALL COLLECTIONS'}
        </h1>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-16 pb-32 max-w-[1920px] mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar (Desktop) */}
        <aside className="w-full md:w-64 flex-shrink-0 hidden md:block">
          <div className="sticky top-32 space-y-8">
            <div>
              <h3 className="font-body text-xs text-accent uppercase tracking-widest mb-4">Categories</h3>
              <ul className="space-y-3 font-body text-text-secondary">
                <li><Link to="/shop" className={`hover:text-text-primary transition-colors ${!categoryFilter ? 'text-text-primary font-medium' : ''}`}>All Collections</Link></li>
                <li><Link to="/shop?category=sofas" className={`hover:text-text-primary transition-colors ${categoryFilter === 'sofas' ? 'text-text-primary font-medium' : ''}`}>Sofas &amp; Sectionals</Link></li>
                <li><Link to="/shop?category=dining" className={`hover:text-text-primary transition-colors ${categoryFilter === 'dining' ? 'text-text-primary font-medium' : ''}`}>Dining</Link></li>
                <li><Link to="/shop?category=beds" className={`hover:text-text-primary transition-colors ${categoryFilter === 'beds' ? 'text-text-primary font-medium' : ''}`}>Beds</Link></li>
                <li><Link to="/shop?category=decor" className={`hover:text-text-primary transition-colors ${categoryFilter === 'decor' ? 'text-text-primary font-medium' : ''}`}>Decor</Link></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-grow">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-border-soft pb-4">
            <div className="flex items-center justify-between w-full md:w-auto gap-4 mb-4 md:mb-0">
              <button className="flex items-center gap-2 font-body text-xs text-text-primary tracking-widest px-6 py-3 rounded-full border border-border-soft hover:bg-luxora-linen/50 transition-colors uppercase md:hidden">
                <SlidersHorizontal size={18} />
                Filters
              </button>
              <span className="font-body text-text-secondary md:hidden">{products.length} Products</span>
            </div>
            
            <div className="flex items-center justify-between w-full md:w-auto gap-6 hidden md:flex">
              <span className="font-body text-text-secondary">Showing {products.length} products</span>
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="font-body text-text-primary">Sort by: <span className="font-medium">Featured</span></span>
                <ChevronDown size={18} className="text-text-primary group-hover:translate-y-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-luxora-linen/40 aspect-[4/5] rounded-2xl mb-4" />
                  <div className="bg-luxora-linen/40 h-5 rounded w-3/4 mb-2 mx-auto" />
                  <div className="bg-luxora-linen/40 h-4 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={luxoraMotion.variants.stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-8"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={luxoraMotion.variants.fadeUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-32">
              <p className="font-display text-2xl text-text-secondary">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
