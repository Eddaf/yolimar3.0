import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getFromStorage, saveToStorage } from '@/utils/storage-utils';

export interface CartItem {
  id: number;
  name: string;
  type: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  isCustom?: boolean;
  designId?: number;
  designName?: string;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  total: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number, color: string, size: string) => void;
  updateQuantity: (productId: number, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = getFromStorage<CartItem[]>('cart', []);
    setCart(savedCart);
  }, []);

  useEffect(() => {
    saveToStorage('cart', cart);
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    const newTotal = cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotal(newTotal);
  };

  const addToCart = (product: CartItem) => {
    const existingItem = cart.find(item => 
      item.id === product.id && 
      item.color === product.color && 
      item.size === product.size &&
      item.isCustom === product.isCustom &&
      item.designId === product.designId
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && 
        item.color === product.color && 
        item.size === product.size &&
        item.isCustom === product.isCustom &&
        item.designId === product.designId
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
    }
  };

  const removeFromCart = (productId: number, color: string, size: string) => {
    setCart(cart.filter(item => 
      !(item.id === productId && item.color === color && item.size === size)
    ));
  };

  const updateQuantity = (productId: number, color: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
    } else {
      setCart(cart.map(item =>
        item.id === productId && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      setIsOpen,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};
