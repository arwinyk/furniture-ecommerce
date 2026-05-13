import { motion } from 'framer-motion';
import { Search, Filter, Eye } from 'lucide-react';
import Button from '../../components/ui/Button';

const OrdersManager = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-3xl text-text-primary mb-2">Orders</h2>
          <p className="font-body text-text-secondary">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="bg-bg-elevated border border-border-soft rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border-soft flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search by order ID, customer name..." 
              className="w-full pl-10 pr-4 py-2 bg-bg-primary border border-border-soft rounded-lg font-body text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <Button variant="ghost" className="flex items-center gap-2 border border-border-soft text-sm px-4 py-2 h-auto">
            <Filter size={16} /> Filter
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="bg-luxora-linen/20 text-text-secondary text-xs uppercase tracking-widest border-b border-border-soft">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              <tr className="hover:bg-luxora-cream transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text-primary">#LX-8492</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">Oct 12, 2023</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-primary">Priya Sharma</div>
                  <div className="text-xs text-text-secondary">priya@example.com</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Delivered
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text-primary">₹32,000</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-text-secondary hover:text-accent transition-colors" title="View Details">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersManager;
