import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Button from '../../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-32 flex flex-col items-center justify-center bg-bg-primary px-6">
      <div className="w-full max-w-md">
        <h1 className="font-display text-4xl text-text-primary text-center mb-8">Sign In</h1>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 font-body text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" 
            />
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <Link to="/forgot-password" className="font-body text-xs text-text-secondary hover:text-text-primary transition-colors">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-8 text-center font-body text-sm text-text-secondary">
          Don't have an account? <Link to="/register" className="text-text-primary hover:underline underline-offset-4">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
