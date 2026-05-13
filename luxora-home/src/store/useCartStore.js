import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      addItem: (product, quantity = 1, options = {}) => set((state) => {
        const existingItem = state.items.find(item => 
          item.id === product.id && 
          item.selectedColor === options.color && 
          item.selectedMaterial === options.material
        );
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === existingItem.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            isOpen: true
          };
        }
        
        return {
          items: [...state.items, { ...product, quantity, ...options }],
          isOpen: true
        };
      }),
      
      removeItem: (itemId, options = {}) => set((state) => ({
        items: state.items.filter(item => 
          !(item.id === itemId && item.selectedColor === options.color && item.selectedMaterial === options.material)
        )
      })),
      
      updateQuantity: (itemId, quantity, options = {}) => set((state) => ({
        items: state.items.map(item => 
          item.id === itemId && item.selectedColor === options.color && item.selectedMaterial === options.material
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'luxora-cart-storage',
    }
  )
);
