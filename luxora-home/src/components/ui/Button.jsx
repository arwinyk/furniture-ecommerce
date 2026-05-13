import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const Button = ({ children, variant = 'primary', className = '', to, onClick, ...props }) => {
  const baseClasses = "inline-flex justify-center items-center px-8 py-4 font-body text-xs uppercase tracking-[0.12em] rounded-full transition-colors shadow-warm cursor-pointer";
  
  const variants = {
    primary: "bg-accent text-luxora-noir hover:bg-luxora-champagne",
    ghost: "border border-text-primary text-text-primary hover:bg-text-primary hover:text-luxora-linen"
  };

  if (to) {
    return (
      <MotionLink 
        to={to}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
