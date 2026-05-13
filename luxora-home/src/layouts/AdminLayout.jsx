import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const AdminLayout = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItemClass = (path) => {
    const isActive = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
    return `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70 hover:text-white'}`;
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-luxora-espresso text-bg-primary flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <Link to="/admin" className="font-display text-xl tracking-widest">
            LUXORA ADMIN
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 font-body text-sm">
          <Link to="/admin" className={navItemClass('/admin')}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/products" className={navItemClass('/admin/products')}>
            <Package size={18} /> Products
          </Link>
          <Link to="/admin/orders" className={navItemClass('/admin/orders')}>
            <ShoppingBag size={18} /> Orders
          </Link>
        </nav>
        <div className="p-6 border-t border-white/10 font-body">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-luxora-noir font-medium">
              {user?.displayName?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.displayName || 'Admin'}</p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border-soft bg-bg-elevated flex items-center px-8 justify-between shrink-0">
          <h1 className="font-display text-xl text-text-primary hidden md:block">Admin Portal</h1>
          <div className="md:hidden">
            <Link to="/admin" className="font-display text-xl tracking-widest text-text-primary">
              LUXORA ADMIN
            </Link>
          </div>
        </header>
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
