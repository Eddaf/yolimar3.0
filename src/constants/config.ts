/**
 * CONFIGURACIÓN CENTRALIZADA DE PRECIOS Y DESCUENTOS
 */

export interface PriceGroup {
  id: string;
  base: number;
  label: string;
}

export interface DiscountConfig {
  enabled: boolean;
  percentage: number;
  minQuantity: number;
  description: string;
}

export interface TypeConfig {
  id: string;
  name: string;
  image: string;
  hasSizes: string[];
  pricesBySizeGroup: Record<string, PriceGroup>;
  discount: DiscountConfig;
  description: string;
}

export const TYPE_IMAGES: Record<string, string> = {
  polera: '/placeholder.svg',
  saco: '/placeholder.svg',
  blusa: '/placeholder.svg',
  solera: '/placeholder.svg'
};

export const CONFIG_DATA = {
  types: {
    polera: {
      id: 'polera',
      name: 'Polera',
      image: TYPE_IMAGES.polera,
      hasSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      pricesBySizeGroup: {
        'S': { id: 'pg_polera_s', base: 55, label: 'Talla S' },
        'ML': { id: 'pg_polera_ml', base: 55, label: 'Tallas M, L' },
        'XL': { id: 'pg_polera_xl', base: 60, label: 'Tallas XL, XXL' }
      },
      discount: {
        enabled: true,
        percentage: 8.333,
        minQuantity: 3,
        description: 'Descuento de 5Bs. por mayor (+3 prendas).'
      },
      description: 'Poleras básicas de algodón'
    } as TypeConfig,
    saco: {
      id: 'saco',
      name: 'Saco',
      image: TYPE_IMAGES.saco,
      hasSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      pricesBySizeGroup: {
        'S': { id: 'pg_saco_s', base: 100, label: 'Talla S' },
        'ML': { id: 'pg_saco_ml', base: 100, label: 'Tallas M, L' },
        'XL': { id: 'pg_saco_xl', base: 110, label: 'Tallas XL, XXL' }
      },
      discount: {
        enabled: true,
        percentage: 8.333,
        minQuantity: 3,
        description: 'Descuento de 5Bs. por mayor (+3 prendas).'
      },
      description: 'Abrigos y sacos formales'
    } as TypeConfig,
    blusa: {
      id: 'blusa',
      name: 'Blusa',
      image: TYPE_IMAGES.blusa,
      hasSizes: ['XS', 'S', 'M', 'L', 'XL'],
      pricesBySizeGroup: {
        'S': { id: 'pg_blusa_s', base: 50, label: 'Talla S' },
        'ML': { id: 'pg_blusa_ml', base: 50, label: 'Tallas M, L' },
        'XL': { id: 'pg_blusa_xl', base: 55, label: 'Talla XL' }
      },
      discount: {
        enabled: true,
        percentage: 8.333,
        minQuantity: 3,
        description: 'Descuento de 5Bs. por mayor (+3 prendas).'
      },
      description: 'Blusas y tops elegantes'
    } as TypeConfig,
    solera: {
      id: 'solera',
      name: 'Solera',
      image: TYPE_IMAGES.solera,
      hasSizes: ['S', 'M', 'L', 'XL'],
      pricesBySizeGroup: {
        'S': { id: 'pg_solera_s', base: 50, label: 'Talla S' },
        'ML': { id: 'pg_solera_ml', base: 50, label: 'Tallas M, L' },
        'XL': { id: 'pg_solera_xl', base: 55, label: 'Talla XL' }
      },
      discount: {
        enabled: true,
        percentage: 8.333,
        minQuantity: 3,
        description: 'Descuento de 5Bs. por mayor (+3 prendas).'
      },
      description: 'Prendas tradicionales'
    } as TypeConfig
  },
  customConfig: {
    id: 'custom',
    name: 'Polera Personalizada',
    emoji: '🎨',
    basePrice: 60,
    pricesBySizeGroup: {
      'S': { id: 'pg_custom_s', base: 60, label: 'Talla S' },
      'ML': { id: 'pg_custom_ml', base: 60, label: 'Tallas M, L' },
      'XL': { id: 'pg_custom_xl', base: 65, label: 'Tallas XL, XXL' }
    },
    discount: {
      enabled: true,
      percentage: 8.333,
      minQuantity: 12,
      description: 'Descuento de 5Bs. a partir de +12 prendas.'
    },
    description: 'Poleras personalizadas del diseñador'
  }
};

export const SIZE_GROUPS: Record<string, string> = {
  'S': 'S',
  'XS': 'S',
  'M': 'ML',
  'L': 'ML',
  'XL': 'XL',
  'XXL': 'XL'
};

export const getPriceFromConfig = (typeId: string, size: string): number => {
  const config = CONFIG_DATA.types[typeId as keyof typeof CONFIG_DATA.types];
  if (!config) return 0;
  const group = SIZE_GROUPS[size] || 'ML';
  return config.pricesBySizeGroup[group]?.base || 0;
};

export const getPriceByTypeAndSize = (type: string, size: string, isCustom = false): number => {
  if (isCustom) {
    const config = CONFIG_DATA.customConfig;
    const group = SIZE_GROUPS[size] || 'ML';
    return config.pricesBySizeGroup[group]?.base || 60;
  }
  const config = CONFIG_DATA.types[type as keyof typeof CONFIG_DATA.types];
  if (!config) return 55;
  const group = SIZE_GROUPS[size] || 'ML';
  return config.pricesBySizeGroup[group]?.base || 55;
};

export interface PriceWithDiscount {
  basePrice: number;
  discountedPrice: number;
  hasDiscount: boolean;
  discountPercentage?: number;
  savings?: number;
  minQuantity?: number;
}

export const getPriceWithDiscount = (
  type: string, 
  size: string, 
  quantity: number, 
  isCustom = false
): PriceWithDiscount => {
  const config = isCustom 
    ? CONFIG_DATA.customConfig 
    : CONFIG_DATA.types[type as keyof typeof CONFIG_DATA.types];
  
  if (!config) return { basePrice: 0, discountedPrice: 0, hasDiscount: false };

  const group = SIZE_GROUPS[size] || 'ML';
  const basePrice = config.pricesBySizeGroup[group]?.base || 0;

  if (!config.discount.enabled || quantity < config.discount.minQuantity) {
    return { basePrice, discountedPrice: basePrice, hasDiscount: false };
  }

  const discountAmount = basePrice * (config.discount.percentage / 100);
  return {
    basePrice,
    discountedPrice: basePrice - discountAmount,
    discountPercentage: config.discount.percentage,
    hasDiscount: true,
    savings: discountAmount * quantity,
    minQuantity: config.discount.minQuantity
  };
};
