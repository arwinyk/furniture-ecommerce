import { motion } from 'framer-motion';
import { IndianRupee, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const AdminDashboard = () => {
  // Mock Data
  const stats = [
    { label: 'Total Revenue', value: 2450000, icon: IndianRupee, change: '+12.5%' },
    { label: 'Orders Today', value: 14, icon: ShoppingBag, change: '+2.4%' },
    { label: 'Active Customers', value: 892, icon: Users, change: '+18.2%' },
    { label: 'Conversion Rate', value: '3.2%', icon: TrendingUp, change: '+0.4%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl text-text-primary mb-2">Dashboard Overview</h2>
        <p className="font-body text-text-secondary">Welcome back to the admin portal.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-elevated p-6 rounded-2xl border border-border-soft shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-luxora-linen/30 flex items-center justify-center text-accent">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="font-body text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
              </div>
              <p className="font-body text-sm text-text-secondary uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="font-display text-3xl text-text-primary">
                {typeof stat.value === 'number' && stat.label.includes('Revenue') ? formatCurrency(stat.value) : stat.value}
              </h3>
            </motion.div>
          );
        })}
      </div>

      {/* placeholder for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bg-elevated p-6 rounded-2xl border border-border-soft min-h-[400px]">
          <h3 className="font-body text-sm text-text-primary uppercase tracking-widest mb-6">Revenue Over Time</h3>
          <div className="flex items-center justify-center h-[300px] text-text-secondary font-body border border-dashed border-border-soft rounded-lg">
            Chart coming soon (Recharts integration)
          </div>
        </div>
        <div className="bg-bg-elevated p-6 rounded-2xl border border-border-soft min-h-[400px]">
          <h3 className="font-body text-sm text-text-primary uppercase tracking-widest mb-6">Top Products</h3>
          <div className="flex items-center justify-center h-[300px] text-text-secondary font-body border border-dashed border-border-soft rounded-lg">
            Top products list coming soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
