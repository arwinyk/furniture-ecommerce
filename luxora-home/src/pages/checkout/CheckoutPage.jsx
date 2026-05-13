import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Lock } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency } from '../../utils/formatters';
import { loadScript } from '../../utils/loadScript';
import Button from '../../components/ui/Button';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = 0; // Free white-glove delivery
  const tax = subtotal * 0.18; // 18% GST (mock)
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    setIsProcessing(true);

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    // Since we don't have a secure backend to generate an order_id right now,
    // we use the legacy frontend-only approach for testing purposes.
    const options = {
      key: "rzp_test_SoxTe3T8Z32EyG",
      currency: "INR",
      amount: Math.round(total * 100).toString(), // amount in paise
      name: "LUXORA HOME",
      description: "Purchase of Premium Furniture",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=200&h=200", // A nice placeholder logo
      handler: function (response) {
        // Payment successful
        setIsProcessing(false);
        clearCart();
        navigate(`/order-success/${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#2C2C2C" // match luxora-noir/espresso
      },
      modal: {
        ondismiss: function() {
          // Payment cancelled by user
          setIsProcessing(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-bg-primary">
        <h1 className="font-display text-4xl mb-4 text-text-primary">Your cart is empty</h1>
        <Button onClick={() => navigate('/shop')} variant="primary">Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-bg-primary pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left - Forms */}
        <div className="flex flex-col">
          <Link to="/shop" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-body text-sm mb-12">
            <ChevronLeft size={16} /> Back to Shop
          </Link>
          
          <h1 className="font-display text-3xl md:text-4xl text-text-primary mb-12">Checkout</h1>

          <div className="space-y-12">
            {/* Contact */}
            <section>
              <h2 className="font-body text-sm text-text-primary uppercase tracking-widest mb-6">1. Contact Information</h2>
              <div className="space-y-4">
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="font-body text-sm text-text-primary uppercase tracking-widest mb-6">2. Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="col-span-1 bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" />
                <input type="text" placeholder="Last Name" className="col-span-1 bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" />
                <input type="text" placeholder="Address Line 1" className="col-span-2 bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" />
                <input type="text" placeholder="City" className="col-span-1 bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" />
                <input type="text" placeholder="Postal Code" className="col-span-1 bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" />
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-body text-sm text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                3. Payment <Lock size={14} className="text-text-secondary" />
              </h2>
              <div className="p-6 border border-border-soft rounded-xl bg-bg-elevated text-center">
                <p className="font-body text-sm text-text-secondary mb-4">Click below to simulate a successful payment flow.</p>
                <Button 
                  onClick={handlePayment} 
                  variant="primary" 
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ${formatCurrency(total)}`}
                </Button>
              </div>
            </section>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="lg:pl-16 lg:border-l border-border-soft">
          <div className="sticky top-32">
            <h2 className="font-body text-sm text-text-primary uppercase tracking-widest mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto scrollbar-hide pr-2">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedMaterial}`} className="flex gap-4">
                  <div className="w-16 h-20 flex-shrink-0 bg-bg-elevated rounded overflow-hidden relative">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-text-secondary text-bg-primary text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10">{item.quantity}</span>
                  </div>
                  <div className="flex-grow flex justify-between">
                    <div>
                      <h4 className="font-display text-sm text-text-primary mb-1">{item.title}</h4>
                      <p className="font-body text-[10px] text-text-secondary uppercase tracking-widest">
                        {item.selectedMaterial && `${item.selectedMaterial} / `}{item.selectedColor}
                      </p>
                    </div>
                    <span className="font-body text-sm font-medium text-text-primary">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-border-soft">
              <div className="flex justify-between font-body text-sm text-text-secondary">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-text-secondary">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-body text-sm text-text-secondary">
                <span>Taxes (18%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end pt-6 mt-6 border-t border-border-soft">
              <span className="font-body text-sm text-text-primary uppercase tracking-widest">Total</span>
              <span className="font-display text-3xl text-text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
