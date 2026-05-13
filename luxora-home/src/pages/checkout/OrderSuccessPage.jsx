import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';

const OrderSuccessPage = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen pt-32 pb-32 flex flex-col items-center justify-center bg-bg-primary px-6 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="mb-8"
      >
        <CheckCircle2 size={80} className="text-accent" strokeWidth={1} />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-display text-4xl md:text-5xl text-text-primary mb-4"
      >
        Thank you for your order
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-body text-text-secondary max-w-md mb-8"
      >
        Your order <span className="font-medium text-text-primary">#{orderId}</span> has been confirmed. We've sent a confirmation email with your order details.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button variant="ghost" className="border border-border-soft">
          Track Order
        </Button>
        <Link to="/shop">
          <Button variant="primary">
            Continue Shopping
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
