import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { luxoraMotion } from '../../animations/variants';
import { productService } from '../../services/productService';
import { formatCurrency } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import Button from '../../components/ui/Button';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getProductBySlug(slug);
        if (data) {
          setProduct(data);
          setSelectedColor(data.colors?.[0]?.name || '');
          setSelectedMaterial(data.materials?.[0] || '');
        }
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return <div className="min-h-screen pt-32 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen pt-32 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem(product, quantity, { color: selectedColor, material: selectedMaterial });
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary pt-24 pb-32">
      <div className="max-w-[1920px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* LEFT - Media Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: luxoraMotion.ease.reveal }}
            className="w-full aspect-[4/3] md:aspect-[4/5] lg:aspect-square bg-bg-elevated rounded-2xl overflow-hidden shadow-warm"
          >
            <img src={product.images[activeImage] || product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
          </motion.div>
          
          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - Product Info */}
        <div className="lg:col-span-5 flex flex-col pt-4 lg:pt-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 font-body text-xs text-text-secondary uppercase tracking-widest mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to={`/shop?category=${product.category}`} className="hover:text-accent transition-colors">{product.category}</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary">{product.title}</span>
          </nav>

          {/* Title & Price */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-text-primary mb-4"
          >
            {product.title}
          </motion.h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="font-body text-sm text-text-secondary underline decoration-border-soft underline-offset-4 cursor-pointer">{product.reviewCount} Reviews</span>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-display text-3xl md:text-4xl text-text-primary">{formatCurrency(product.price)}</span>
            {product.comparePrice > product.price && (
              <span className="font-display text-xl text-text-secondary line-through opacity-60">{formatCurrency(product.comparePrice)}</span>
            )}
          </div>

          <p className="font-body text-lg text-text-secondary leading-relaxed mb-12">
            {product.description}
          </p>

          <hr className="border-border-soft mb-8" />

          {/* Selectors */}
          <div className="flex flex-col gap-8 mb-12">
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="font-body text-xs text-text-primary uppercase tracking-widest mb-4 block">Color: <span className="text-text-secondary ml-2">{selectedColor}</span></span>
                <div className="flex gap-4">
                  {product.colors.map(color => (
                    <button 
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-accent p-1' : 'border-transparent'}`}
                    >
                      <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div>
                <span className="font-body text-xs text-text-primary uppercase tracking-widest mb-4 block">Material</span>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map(mat => (
                    <button 
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`px-6 py-3 font-body text-xs uppercase tracking-widest rounded-full border transition-colors ${selectedMaterial === mat ? 'border-accent text-accent bg-accent/5' : 'border-border-soft text-text-secondary hover:border-text-primary hover:text-text-primary'}`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex items-center border border-border-soft rounded-full px-4 h-[56px] w-32 justify-between">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-text-secondary hover:text-text-primary p-2">-</button>
              <span className="font-body text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-text-secondary hover:text-text-primary p-2">+</button>
            </div>
            
            <Button onClick={handleAddToCart} variant="primary" className="flex-grow h-[56px]">
              Add to Cart — {formatCurrency(product.price * quantity)}
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-luxora-cream rounded-2xl mb-12">
            <div className="flex items-start gap-4">
              <Truck className="text-accent flex-shrink-0" size={24} strokeWidth={1.5} />
              <div>
                <h4 className="font-body text-sm text-text-primary font-medium mb-1">White-Glove Delivery</h4>
                <p className="font-body text-xs text-text-secondary">Complimentary assembly in room of choice.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-accent flex-shrink-0" size={24} strokeWidth={1.5} />
              <div>
                <h4 className="font-body text-sm text-text-primary font-medium mb-1">10-Year Warranty</h4>
                <p className="font-body text-xs text-text-secondary">Guaranteed craftsmanship.</p>
              </div>
            </div>
          </div>

          {/* Accordion (Simplified) */}
          <div className="border-t border-border-soft flex flex-col">
            <details className="group py-6 border-b border-border-soft cursor-pointer">
              <summary className="font-body text-sm text-text-primary uppercase tracking-widest font-medium flex justify-between items-center list-none">
                Details &amp; Dimensions
                <span className="text-accent group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="pt-6 font-body text-text-secondary leading-relaxed">
                <p className="mb-4">{product.longDescription}</p>
                <ul className="space-y-2">
                  <li>Width: {product.dimensions?.W} cm</li>
                  <li>Depth: {product.dimensions?.D} cm</li>
                  <li>Height: {product.dimensions?.H} cm</li>
                  <li>Weight: {product.weight} kg</li>
                </ul>
              </div>
            </details>
            <details className="group py-6 border-b border-border-soft cursor-pointer">
              <summary className="font-body text-sm text-text-primary uppercase tracking-widest font-medium flex justify-between items-center list-none">
                Material &amp; Care
                <span className="text-accent group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="pt-6 font-body text-text-secondary leading-relaxed">
                Vacuum regularly. Wipe spills immediately with a clean, dry cloth. Professional cleaning recommended for tough stains. Keep out of direct sunlight to prevent fading.
              </div>
            </details>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
