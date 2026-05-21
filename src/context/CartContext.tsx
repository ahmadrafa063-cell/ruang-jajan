import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bitedash-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bitedash-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cart.find(item => item.id === product.id);
    
    setCart(prev => {
      const isExisting = prev.find(item => item.id === product.id);
      if (isExisting) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    const prefix = product.category === 'Drinks' ? 'Minuman' : 'Makanan';
    toast.success(`${prefix} ${product.name} telah masuk dikeranjang`);

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        event: "Add to Cart", 
        data: { message: `Ditambahkan ke keranjang: ${product.name} (x${quantity})` } 
      })
    }).catch(err => console.error("Failed to track add to cart:", err));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal;
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      subtotal, 
      total, 
      itemCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within CartProvider');
  return context;
};
