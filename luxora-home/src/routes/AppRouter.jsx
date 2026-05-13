import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/public/HomePage';
import ShopPage from '../pages/public/ShopPage';
import ProductPage from '../pages/public/ProductPage';
import CheckoutPage from '../pages/checkout/CheckoutPage';
import OrderSuccessPage from '../pages/checkout/OrderSuccessPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/user/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductsManager from '../pages/admin/ProductsManager';
import OrdersManager from '../pages/admin/OrdersManager';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="orders" element={<OrdersManager />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
