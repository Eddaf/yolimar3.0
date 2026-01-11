import React, { useState } from 'react';
import { Product } from '@/constants/products';
import { COLOR_MAP, COLOR_NAMES } from '@/constants/colors';
import { getMinPriceFromProduct, getColorsFromProduct, getSizesFromProduct, getTotalStockFromProduct } from '@/utils/price-utils';
import { formatCurrency, capitalize } from '@/utils/format-utils';
import { ShoppingCart, Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, CartItem } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { addToCart, setIsOpen } = useCart();
  
  const colors = getColorsFromProduct(product);
  const sizes = getSizesFromProduct(product);
  const minPrice = getMinPriceFromProduct(product);
  const totalStock = getTotalStockFromProduct(product);

  const getVariant = (color: string, size: string) => {
    return product.variants.find(v => v.color === color && v.size === size);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Selecciona color y talla');
      return;
    }

    const variant = getVariant(selectedColor, selectedSize);
    if (!variant || variant.stock === 0) {
      toast.error('Producto no disponible');
      return;
    }

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      type: product.type,
      color: selectedColor,
      size: selectedSize,
      price: variant.price,
      quantity: 1,
      image: product.image,
    };

    addToCart(cartItem);
    toast.success('¡Agregado al carrito!', {
      description: `${product.name} - ${COLOR_NAMES[selectedColor]} - ${selectedSize}`,
      action: {
        label: 'Ver carrito',
        onClick: () => setIsOpen(true),
      },
    });
  };

  const getAvailableSizes = (color: string) => {
    return product.variants
      .filter(v => v.color === color && v.stock > 0)
      .map(v => v.size);
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-b from-muted/50 to-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge === 'TOP VENTA' && (
            <Badge className="bg-warning text-warning-foreground font-bold">
              🔥 TOP VENTA
            </Badge>
          )}
          {product.badge === 'NUEVO' && (
            <Badge className="bg-success text-success-foreground font-bold">
              ✨ NUEVO
            </Badge>
          )}
          {totalStock < 5 && totalStock > 0 && (
            <Badge variant="destructive" className="font-bold">
              ¡Últimas unidades!
            </Badge>
          )}
        </div>

        {/* Quick View Button */}
        {onQuickView && (
          <Button
            variant="secondary"
            size="sm"
            className={`absolute top-3 right-3 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
            onClick={() => onQuickView(product)}
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver
          </Button>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold shadow-lg">
          {formatCurrency(minPrice)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Type Badge */}
        <Badge variant="outline" className="text-xs">
          {capitalize(product.type)}
        </Badge>

        {/* Name & Description */}
        <div>
          <h3 className="font-bold text-lg text-foreground line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>

        {/* Material */}
        <p className="text-xs text-muted-foreground">
          Material: {product.material}
        </p>

        {/* Color Selection */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Color:</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize(null);
                }}
                className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: COLOR_MAP[color] || '#ccc' }}
                title={COLOR_NAMES[color] || color}
              >
                {selectedColor === color && (
                  <Check className="w-3 h-3 text-white mix-blend-difference m-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        {selectedColor && (
          <div className="space-y-2 animate-fade-in">
            <p className="text-xs font-medium text-muted-foreground">Talla:</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const available = getAvailableSizes(selectedColor).includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => available && setSelectedSize(size)}
                    disabled={!available}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <Button
          className="w-full mt-4"
          disabled={!selectedColor || !selectedSize}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
