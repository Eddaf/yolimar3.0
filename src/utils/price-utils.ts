/**
 * UTILIDADES DE CÁLCULO DE PRECIOS
 */

import { Product } from '@/constants/products';
import { COLOR_NAMES } from '@/constants/colors';

export const getMinPriceFromProduct = (product: Product): number => {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.min(...product.variants.map(v => v.price));
};

export const getMaxPriceFromProduct = (product: Product): number => {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.max(...product.variants.map(v => v.price));
};

export const getTotalStockFromProduct = (product: Product): number => {
  if (!product.variants || product.variants.length === 0) return 0;
  return product.variants.reduce((sum, v) => sum + v.stock, 0);
};

export const getColorsFromProduct = (product: Product): string[] => {
  if (!product.variants || product.variants.length === 0) return [];
  return [...new Set(product.variants.map(v => v.color))];
};

export const getSizesFromProduct = (product: Product): string[] => {
  if (!product.variants || product.variants.length === 0) return [];
  return [...new Set(product.variants.map(v => v.size))];
};

export const getColorNamesFromProduct = (product: Product): string => {
  const colors = getColorsFromProduct(product);
  return colors.map(c => COLOR_NAMES[c] || c).join(', ');
};

export const getSizeNamesFromProduct = (product: Product): string => {
  const sizes = getSizesFromProduct(product);
  return sizes.join(', ');
};

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
  discount?: number;
}

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

export const calculateCartDiscount = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    if (item.discount) {
      return total + (item.discount * item.quantity);
    }
    return total;
  }, 0);
};
