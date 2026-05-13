import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { luxoraMotion } from '../../animations/variants';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency } from '../../utils/formatters';
import Button from '../ui/Button';

const CartDrawer = () => {
  const { isOpen, items, closeCart, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-luxora-espresso/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-[100dvh] w-full max-w-[420px] bg-bg-elevated/90 backdrop-blur-xl shadow-float flex flex-col border-l border-border-soft"
          >
            {/* Header */}
            <div className="px-6 py-8 flex items-center justify-between border-b border-border-soft">
              <h2 className="font-display text-2xl text-text-primary uppercase tracking-widest">Your Cart</h2>
              <button 
                onClick={closeCart}
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="font-display text-2xl text-text-secondary mb-4">Your cart is empty.</p>
                  <Button onClick={closeCart} variant="ghost">Continue Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedMaterial}`} className="flex gap-4">
                    <div className="w-24 h-32 flex-shrink-0 bg-bg-primary rounded-lg overflow-hidden border border-border-soft">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display text-lg text-text-primary leading-tight">{item.title}</h3>
                          <button 
                            onClick={() => removeItem(item.id, { color: item.selectedColor, material: item.selectedMaterial })}
                            className="text-text-secondary hover:text-accent transition-colors"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="font-body text-xs text-text-secondary uppercase tracking-widest mb-2">
                          {item.selectedMaterial && `${item.selectedMaterial} / `}{item.selectedColor}
                        </p>
                        <p className="font-body text-sm font-medium text-text-primary">{formatCurrency(item.price)}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border-soft rounded-full px-3 py-1 gap-4">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, { color: item.selectedColor, material: item.selectedMaterial })}
                            className="text-text-secondary hover:text-text-primary disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-body text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, { color: item.selectedColor, material: item.selectedMaterial })}
                            className="text-text-secondary hover:text-text-primary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border-soft bg-bg-primary/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-body text-sm text-text-secondary uppercase tracking-widest">Subtotal</span>
                  <span className="font-display text-2xl text-text-primary">{formatCurrency(getCartTotal())}</span>
                </div>
                <Button onClick={handleCheckout} variant="primary" className="w-full flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={18} />
                </Button>
                <p className="text-center font-body text-xs text-text-secondary mt-4">
                  Shipping &amp; taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
