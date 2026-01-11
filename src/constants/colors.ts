/**
 * SISTEMA DE COLORES CENTRALIZADO
 * Todos los colores en HEX se definen aquí
 */

export const PRIMARY_COLOR_HEX = '#0d9488';

/**
 * Convierte HEX a RGBA
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Ajusta el brillo de un color HEX
 */
export const adjustHexColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
};

/**
 * SISTEMA DE COLORES COMPLETO
 */
export const COLOR_SYSTEM = {
  primary: PRIMARY_COLOR_HEX,
  primaryDark: adjustHexColor(PRIMARY_COLOR_HEX, -20),
  primaryLight: adjustHexColor(PRIMARY_COLOR_HEX, 20),
  primaryVeryLight: hexToRgba(PRIMARY_COLOR_HEX, 0.1),
  primaryHover: adjustHexColor(PRIMARY_COLOR_HEX, -10),
  secondary: '#ffffff',
  secondaryDark: '#f8fafc',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  textOnPrimary: '#ffffff',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  customAccent: '#a855f7',
  adminAccent: '#9333ea'
};

/**
 * MAPA DE COLORES DE PRENDAS
 */
export const COLOR_MAP: Record<string, string> = {
  'negro': '#000000',
  'blanco': '#FFFFFF',
  'rosa': '#E91E63',
  'rojo': '#F44336',
  'azul': '#2196F3',
  'verde': '#4CAF50',
  'amarillo': '#FFEB3B',
  'naranja': '#FF9800',
  'morado': '#9C27B0',
  'gris': '#9E9E9E',
  'beige': '#D7CCC8',
  'marron': '#795548',
  'bordo': '#880E4F',
  'dorado': '#FFD700',
  'plata': '#C0C0C0',
};

/**
 * NOMBRES DE COLORES EN ESPAÑOL
 */
export const COLOR_NAMES: Record<string, string> = {
  'negro': 'Negro',
  'blanco': 'Blanco',
  'rosa': 'Rosa',
  'rojo': 'Rojo',
  'azul': 'Azul',
  'verde': 'Verde',
  'amarillo': 'Amarillo',
  'naranja': 'Naranja',
  'morado': 'Morado',
  'gris': 'Gris',
  'beige': 'Beige',
  'marron': 'Marrón',
  'bordo': 'Bordó',
  'dorado': 'Dorado',
  'plata': 'Plata',
};
