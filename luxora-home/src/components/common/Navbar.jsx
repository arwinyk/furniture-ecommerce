import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { luxoraMotion } from '../../animations/variants';
import { useCartStore } from '../../store/useCartStore';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getCartCount } = useCartStore();
  const cartCount = getCartCount();

  return (
    <>
      <motion.header 
        initial="hidden"
        animate="visible"
        variants={luxoraMotion.variants.fadeUp}
        className="fixed top-0 w-full z-50 glass-panel flex justify-between items-center px-6 md:px-16 py-6"
      >
        <button 
          aria-label="Menu" 
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-text-primary hover:text-accent transition-colors duration-300"
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
        
        <Link to="/" className="font-display text-2xl md:text-3xl uppercase tracking-widest text-text-primary">
          LUXORA HOME
        </Link>
        
        <button 
          aria-label="Cart" 
          onClick={toggleCart}
          className="text-text-primary hover:text-accent transition-colors duration-300 relative"
        >
          <ShoppingBag size={28} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-luxora-noir text-[10px] font-body font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.5, ease: luxoraMotion.ease.reveal }}
            className="fixed inset-0 z-[60] bg-bg-primary flex flex-col px-6 md:px-16 py-8"
          >
            <div className="flex justify-between items-center mb-16">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text-primary hover:text-accent transition-colors"
              >
                <X size={32} strokeWidth={1.5} />
              </button>
              <span className="font-display text-xl uppercase tracking-widest text-text-primary">Menu</span>
              <div className="w-8"></div> {/* Spacer to center title */}
            </div>

            <nav className="flex flex-col space-y-8 mt-12 items-center">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="font-display text-4xl text-text-primary hover:text-accent transition-colors">Home</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop" className="font-display text-4xl text-text-primary hover:text-accent transition-colors">Shop Collection</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/design" className="font-display text-4xl text-text-primary hover:text-accent transition-colors">AI Designer</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/journal" className="font-display text-4xl text-text-primary hover:text-accent transition-colors">Journal</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="font-display text-4xl text-text-primary hover:text-accent transition-colors">Sign In</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
