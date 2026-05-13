import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import Button from '../../components/ui/Button';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const displayName = `${firstName} ${lastName}`.trim();
      
      // Update Auth Profile
      await updateProfile(user, {
        displayName: displayName
      });
      
      // Create Firestore User Document
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        role: 'customer',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });
      
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error("Registration Error Details:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Error: Email/Password sign-in is not enabled in your Firebase Console.');
      } else {
        // Display the actual error message so we know what's wrong
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-32 flex flex-col items-center justify-center bg-bg-primary px-6">
      <div className="w-full max-w-md">
        <h1 className="font-display text-4xl text-text-primary text-center mb-8">Create Account</h1>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 font-body text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" 
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" 
            />
          </div>
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
              minLength="6"
              className="w-full bg-transparent border-b border-border-soft py-3 px-2 font-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors" 
            />
          </div>

          <Button type="submit" variant="primary" className="w-full mt-8" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-8 text-center font-body text-sm text-text-secondary">
          Already have an account? <Link to="/login" className="text-text-primary hover:underline underline-offset-4">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
