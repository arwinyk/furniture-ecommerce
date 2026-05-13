import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { productService } from '../../services/productService';
import Button from '../../components/ui/Button';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-3xl text-text-primary mb-2">Products</h2>
          <p className="font-body text-text-secondary">Manage your catalog, inventory, and pricing.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={18} /> Add Product
        </Button>
      </div>

      <div className="bg-bg-elevated border border-border-soft rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="bg-luxora-linen/20 text-text-secondary text-xs uppercase tracking-widest border-b border-border-soft">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-text-secondary">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-text-secondary">No products found. Add one to get started.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-luxora-cream transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 rounded border border-border-soft overflow-hidden bg-bg-primary flex-shrink-0">
                          <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-display text-lg text-text-primary mb-1">{product.title}</p>
                          <p className="text-xs text-text-secondary">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm capitalize text-text-secondary">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-primary">{formatCurrency(product.price)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">{product.stock} in stock</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-text-secondary hover:text-accent transition-colors" title="View on Store">
                          <ExternalLink size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-text-primary transition-colors" title="Edit">
                          <Edit3 size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsManager;
