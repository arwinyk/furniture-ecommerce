import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CartDrawer from '../components/common/CartDrawer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Navbar />
      <main className="flex-grow relative z-10 pt-24">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default MainLayout;
