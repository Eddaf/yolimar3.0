/**
 * CATÁLOGO CENTRALIZADO DE PRODUCTOS
 */

export interface ProductVariant {
  color: string;
  size: string;
  stock: number;
  price: number;
  sku: string;
}

export interface Product {
  id: number;
  type: string;
  name: string;
  code: string;
  description: string;
  material: string;
  variants: ProductVariant[];
  image: string;
  tag?: string;
  badge?: string;
}

export const CATALOG_PRODUCTS_SACO: Product[] = [
  {
    id: 1,
    type: 'saco',
    name: 'Saco Elegante Randa',
    code: 'SAC-001',
    description: 'Saco elegante con detalles de randa, perfecto para ocasiones especiales',
    material: 'Algodón Premium',
    variants: [
      { color: 'rosa', size: 'S', stock: 5, price: 100, sku: 'SAC-001-ROS-S' },
      { color: 'rosa', size: 'M', stock: 4, price: 100, sku: 'SAC-001-ROS-M' },
      { color: 'rosa', size: 'L', stock: 2, price: 100, sku: 'SAC-001-ROS-L' },
      { color: 'rosa', size: 'XL', stock: 1, price: 110, sku: 'SAC-001-ROS-XL' },
      { color: 'blanco', size: 'S', stock: 6, price: 100, sku: 'SAC-001-BLA-S' },
      { color: 'blanco', size: 'M', stock: 5, price: 100, sku: 'SAC-001-BLA-M' },
      { color: 'blanco', size: 'L', stock: 3, price: 100, sku: 'SAC-001-BLA-L' },
      { color: 'blanco', size: 'XL', stock: 2, price: 110, sku: 'SAC-001-BLA-XL' },
      { color: 'negro', size: 'S', stock: 4, price: 100, sku: 'SAC-001-NEG-S' },
      { color: 'negro', size: 'M', stock: 3, price: 100, sku: 'SAC-001-NEG-M' },
      { color: 'negro', size: 'L', stock: 2, price: 100, sku: 'SAC-001-NEG-L' },
    ],
    image: '/placeholder.svg',
    tag: 'TOP VENTA',
    badge: 'TOP VENTA'
  }
];

export const CATALOG_PRODUCTS_POLERA: Product[] = [
  {
    id: 2,
    type: 'polera',
    name: 'Polera Estampada Anime',
    code: 'POL-001',
    description: 'Polera con estampado de anime de alta calidad',
    material: 'Poliéster 100%',
    variants: [
      { color: 'blanco', size: 'S', stock: 15, price: 55, sku: 'POL-001-BLA-S' },
      { color: 'blanco', size: 'M', stock: 12, price: 55, sku: 'POL-001-BLA-M' },
      { color: 'blanco', size: 'L', stock: 10, price: 55, sku: 'POL-001-BLA-L' },
      { color: 'blanco', size: 'XL', stock: 8, price: 60, sku: 'POL-001-BLA-XL' },
      { color: 'negro', size: 'S', stock: 12, price: 55, sku: 'POL-001-NEG-S' },
      { color: 'negro', size: 'M', stock: 10, price: 55, sku: 'POL-001-NEG-M' },
      { color: 'negro', size: 'L', stock: 8, price: 55, sku: 'POL-001-NEG-L' },
      { color: 'negro', size: 'XL', stock: 6, price: 60, sku: 'POL-001-NEG-XL' }
    ],
    image: '/placeholder.svg',
    tag: 'TOP VENTA',
    badge: 'TOP VENTA'
  },
  {
    id: 3,
    type: 'polera',
    name: 'Polera Básica Algodón',
    code: 'POL-002',
    description: 'Polera básica de algodón brasilero, suave y cómoda',
    material: 'Algodón Brasilero 100%',
    variants: [
      { color: 'blanco', size: 'S', stock: 20, price: 55, sku: 'POL-002-BLA-S' },
      { color: 'blanco', size: 'M', stock: 18, price: 55, sku: 'POL-002-BLA-M' },
      { color: 'blanco', size: 'L', stock: 15, price: 55, sku: 'POL-002-BLA-L' },
      { color: 'blanco', size: 'XL', stock: 10, price: 60, sku: 'POL-002-BLA-XL' },
      { color: 'negro', size: 'S', stock: 18, price: 55, sku: 'POL-002-NEG-S' },
      { color: 'negro', size: 'M', stock: 15, price: 55, sku: 'POL-002-NEG-M' },
      { color: 'negro', size: 'L', stock: 12, price: 55, sku: 'POL-002-NEG-L' },
      { color: 'negro', size: 'XL', stock: 8, price: 60, sku: 'POL-002-NEG-XL' },
      { color: 'azul', size: 'S', stock: 10, price: 55, sku: 'POL-002-AZU-S' },
      { color: 'azul', size: 'M', stock: 8, price: 55, sku: 'POL-002-AZU-M' },
      { color: 'azul', size: 'L', stock: 6, price: 55, sku: 'POL-002-AZU-L' },
      { color: 'rojo', size: 'S', stock: 8, price: 55, sku: 'POL-002-ROJ-S' },
      { color: 'rojo', size: 'M', stock: 6, price: 55, sku: 'POL-002-ROJ-M' },
      { color: 'verde', size: 'M', stock: 5, price: 55, sku: 'POL-002-VER-M' },
      { color: 'verde', size: 'L', stock: 4, price: 55, sku: 'POL-002-VER-L' },
    ],
    image: '/placeholder.svg',
    badge: 'NUEVO'
  }
];

export const CATALOG_PRODUCTS_BLUSA: Product[] = [
  {
    id: 4,
    type: 'blusa',
    name: 'Blusa Elegante Seda',
    code: 'BLU-001',
    description: 'Blusa elegante de seda con corte moderno',
    material: 'Seda 100%',
    variants: [
      { color: 'rosa', size: 'S', stock: 5, price: 50, sku: 'BLU-001-ROS-S' },
      { color: 'rosa', size: 'M', stock: 4, price: 50, sku: 'BLU-001-ROS-M' },
      { color: 'rosa', size: 'L', stock: 3, price: 50, sku: 'BLU-001-ROS-L' },
      { color: 'blanco', size: 'S', stock: 6, price: 50, sku: 'BLU-001-BLA-S' },
      { color: 'blanco', size: 'M', stock: 5, price: 50, sku: 'BLU-001-BLA-M' },
      { color: 'blanco', size: 'L', stock: 4, price: 50, sku: 'BLU-001-BLA-L' },
      { color: 'negro', size: 'S', stock: 4, price: 50, sku: 'BLU-001-NEG-S' },
      { color: 'negro', size: 'M', stock: 3, price: 50, sku: 'BLU-001-NEG-M' },
    ],
    image: '/placeholder.svg',
  }
];

export const CATALOG_PRODUCTS_SOLERA: Product[] = [
  {
    id: 5,
    type: 'solera',
    name: 'Solera Tradicional',
    code: 'SOL-001',
    description: 'Solera tradicional de gasa, fresca y elegante',
    material: 'Gasa',
    variants: [
      { color: 'gris', size: 'S', stock: 3, price: 50, sku: 'SOL-001-GRI-S' },
      { color: 'gris', size: 'M', stock: 5, price: 50, sku: 'SOL-001-GRI-M' },
      { color: 'gris', size: 'L', stock: 4, price: 50, sku: 'SOL-001-GRI-L' },
      { color: 'gris', size: 'XL', stock: 2, price: 55, sku: 'SOL-001-GRI-XL' },
      { color: 'blanco', size: 'S', stock: 4, price: 50, sku: 'SOL-001-BLA-S' },
      { color: 'blanco', size: 'M', stock: 6, price: 50, sku: 'SOL-001-BLA-M' },
      { color: 'blanco', size: 'L', stock: 5, price: 50, sku: 'SOL-001-BLA-L' },
    ],
    image: '/placeholder.svg',
  }
];

export const CATALOG_PRODUCTS: Product[] = [
  ...CATALOG_PRODUCTS_SACO,
  ...CATALOG_PRODUCTS_POLERA,
  ...CATALOG_PRODUCTS_BLUSA,
  ...CATALOG_PRODUCTS_SOLERA
];
