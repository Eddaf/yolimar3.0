import React, { useState } from 'react';
import { POLERA_TYPES, AVAILABLE_COLORS, DESIGNS_DB, getMaterial } from '@/constants/designs';
import { COLOR_MAP, COLOR_NAMES } from '@/constants/colors';
import { getPriceByTypeAndSize } from '@/constants/config';
import { formatCurrency } from '@/utils/format-utils';
import { useCart, CartItem } from '@/contexts/CartContext';
import { Palette, Shirt, Image, ShoppingCart, Check, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const DesignerTool: React.FC = () => {
  const [selectedType, setSelectedType] = useState(POLERA_TYPES[0].id);
  const [selectedColor, setSelectedColor] = useState('blanco');
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchDesign, setSearchDesign] = useState('');

  const { addToCart, setIsOpen } = useCart();

  const price = getPriceByTypeAndSize('polera', selectedSize || 'M', true);
  const material = getMaterial(selectedType);
  const currentDesign = DESIGNS_DB.find(d => d.id === selectedDesign);

  const filteredDesigns = DESIGNS_DB.filter(design => 
    design.name.toLowerCase().includes(searchDesign.toLowerCase()) ||
    design.referencia.some(ref => ref.toLowerCase().includes(searchDesign.toLowerCase()))
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Selecciona una talla');
      return;
    }
    if (!selectedDesign) {
      toast.error('Selecciona un diseño');
      return;
    }

    const cartItem: CartItem = {
      id: Date.now(),
      name: `Polera Personalizada`,
      type: 'polera',
      color: selectedColor,
      size: selectedSize,
      price: price,
      quantity: quantity,
      image: '/placeholder.svg',
      isCustom: true,
      designId: selectedDesign,
      designName: currentDesign?.name,
    };

    addToCart(cartItem);
    toast.success('¡Diseño agregado al carrito!', {
      description: `${currentDesign?.name} - ${COLOR_NAMES[selectedColor]} - ${selectedSize}`,
      action: {
        label: 'Ver carrito',
        onClick: () => setIsOpen(true),
      },
    });
  };

  const handleReset = () => {
    setSelectedType(POLERA_TYPES[0].id);
    setSelectedColor('blanco');
    setSelectedDesign(null);
    setSelectedSize(null);
    setQuantity(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent to-primary/5 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-black text-foreground">
            Diseñador
          </h1>
        </div>
        <p className="text-muted-foreground">
          Personaliza tu polera con nuestros diseños exclusivos
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Preview Panel */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Vista Previa
          </h2>
          
          <div 
            className="relative aspect-square rounded-xl flex items-center justify-center overflow-hidden"
            style={{ 
              backgroundColor: selectedColor === 'blanco' ? '#f8fafc' : COLOR_MAP[selectedColor] || '#f8fafc'
            }}
          >
            {/* Polera Base */}
            <div className="relative w-3/4">
              <img
                src="/placeholder.svg"
                alt="Polera"
                className="w-full h-auto polera-blend"
              />
              {/* Design Overlay */}
              {currentDesign && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={currentDesign.img}
                    alt={currentDesign.name}
                    className="w-1/3 h-auto object-contain"
                    style={{ 
                      position: 'absolute',
                      top: '35%',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Tipo: {POLERA_TYPES.find(t => t.id === selectedType)?.name}</p>
                  <p className="text-xs text-muted-foreground">Material: {material}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Precio</p>
                  <p className="text-lg font-black text-primary">{formatCurrency(price)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <Button variant="outline" className="w-full mt-4" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar diseño
          </Button>
        </div>

        {/* Options Panel */}
        <div className="space-y-6">
          {/* Polera Type */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shirt className="w-5 h-5 text-primary" />
              Tipo de Polera
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {POLERA_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-bold">{type.name}</p>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <h3 className="font-bold text-lg mb-4">Color</h3>
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`color-swatch w-10 h-10 ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: COLOR_MAP[color] || '#ccc' }}
                  title={COLOR_NAMES[color] || color}
                >
                  {selectedColor === color && (
                    <Check className="w-4 h-4 text-white mix-blend-difference m-auto" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Seleccionado: {COLOR_NAMES[selectedColor]}
            </p>
          </div>

          {/* Design Selection */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Image className="w-5 h-5 text-primary" />
              Diseño / Estampado
            </h3>
            
            <Input
              placeholder="Buscar diseños..."
              value={searchDesign}
              onChange={(e) => setSearchDesign(e.target.value)}
              className="mb-4"
            />

            <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto">
              {filteredDesigns.map((design) => (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesign(design.id)}
                  className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                    selectedDesign === design.id
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={design.img}
                    alt={design.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {currentDesign && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="font-medium">{currentDesign.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentDesign.referencia.filter(r => r).map((ref, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {ref}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Size & Quantity */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <h3 className="font-bold text-lg mb-4">Talla y Cantidad</h3>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full"
            disabled={!selectedSize || !selectedDesign}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Agregar al carrito - {formatCurrency(price * quantity)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignerTool;
