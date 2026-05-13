import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { luxoraMotion } from '../../animations/variants';
import { formatCurrency } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1, {
      color: product.colors?.[0]?.name,
      material: product.materials?.[0]
    });
  };

  return (
    <motion.div 
      initial="rest"
      whileHover="hover"
      className="group flex flex-col relative"
    >
      <Link to={`/product/${product.slug}`} className="absolute inset-0 z-20"></Link>
      
      <div className="relative w-full aspect-[4/5] bg-bg-elevated rounded-lg md:rounded-[16px] overflow-hidden mb-4 shadow-warm">
        <motion.img 
          variants={luxoraMotion.variants.imageHover}
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover" 
        />
        
        {/* Hover Overlay Desktop */}
        <div className="absolute inset-0 bg-bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-6 pointer-events-none">
          <motion.button 
            variants={{
              rest: { y: 20, opacity: 0 },
              hover: { y: 0, opacity: 1, transition: { duration: 0.3, ease: luxoraMotion.ease.reveal } }
            }}
            className="bg-accent text-luxora-noir font-body text-xs tracking-[0.12em] uppercase rounded-full px-8 py-3 shadow-warm pointer-events-auto hover:bg-luxora-champagne transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
      
      <div className="text-center z-10 px-2 pointer-events-none">
        <h3 className="font-display text-[20px] md:text-2xl text-text-primary mb-1">{product.title}</h3>
        <p className="font-body text-base text-text-secondary font-medium">{formatCurrency(product.price)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
