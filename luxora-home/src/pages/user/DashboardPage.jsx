import { motion } from 'framer-motion';
import { Package, Heart, MapPin, LogOut } from 'lucide-react';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-primary pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-32 space-y-8">
            <div className="mb-8">
              <h2 className="font-display text-2xl text-text-primary mb-1">Welcome,</h2>
              <p className="font-body text-text-secondary">{user?.displayName || 'Guest'}</p>
            </div>
            <nav className="space-y-4">
              <a href="#orders" className="flex items-center gap-3 font-body text-text-primary font-medium p-3 bg-luxora-linen/20 rounded-lg transition-colors">
                <Package size={18} /> Orders
              </a>
              <a href="#wishlist" className="flex items-center gap-3 font-body text-text-secondary hover:text-text-primary hover:bg-luxora-linen/20 p-3 rounded-lg transition-colors">
                <Heart size={18} /> Wishlist
              </a>
              <a href="#addresses" className="flex items-center gap-3 font-body text-text-secondary hover:text-text-primary hover:bg-luxora-linen/20 p-3 rounded-lg transition-colors">
                <MapPin size={18} /> Addresses
              </a>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 font-body text-text-secondary hover:text-red-600 hover:bg-red-50 p-3 rounded-lg transition-colors mt-8">
                <LogOut size={18} /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <h1 className="font-display text-3xl md:text-4xl text-text-primary mb-12">Order History</h1>
          
          <div className="space-y-6">
            {/* Mock Order */}
            <div className="border border-border-soft rounded-2xl p-6 bg-bg-elevated flex flex-col md:flex-row gap-6">
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-body text-xs text-text-secondary uppercase tracking-widest block mb-1">Order #LX-8492</span>
                    <h3 className="font-display text-xl text-text-primary">Delivered</h3>
                  </div>
                  <span className="font-body text-sm font-medium text-text-primary">₹32,000</span>
                </div>
                <p className="font-body text-sm text-text-secondary mb-6">Placed on Oct 12, 2023</p>
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-bg-primary rounded border border-border-soft overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80" alt="Product" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <Button variant="ghost" className="border border-border-soft text-sm">View Details</Button>
              </div>
            </div>
            
            {/* Empty State */}
            <div className="border border-border-soft rounded-2xl p-12 bg-transparent text-center border-dashed">
              <Package size={48} className="mx-auto text-text-secondary opacity-50 mb-4" strokeWidth={1} />
              <h3 className="font-display text-xl text-text-primary mb-2">No more orders</h3>
              <p className="font-body text-sm text-text-secondary mb-6">When you place an order, it will appear here.</p>
              <Button variant="primary" onClick={() => navigate('/shop')}>Start Shopping</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
