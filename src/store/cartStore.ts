import { create } from 'zustand';
import { CartState, CartItem } from '@/types/product';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (product, quantity = 1) => {
    const { items } = get();
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      set({
        items: [...items, { product, quantity }]
      });
    }
  },
  
  removeItem: (productId) => {
    const { items } = get();
    set({
      items: items.filter(item => item.product.id !== productId)
    });
  },
  
  updateQuantity: (productId, quantity) => {
    const { items } = get();
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    set({
      items: items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    });
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },
  
  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
}));
