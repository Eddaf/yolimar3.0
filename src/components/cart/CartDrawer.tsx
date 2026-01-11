import React from 'react';
import { useCart, CartItem } from '@/contexts/CartContext';
import { COLOR_NAMES } from '@/constants/colors';
import { formatCurrency, capitalize } from '@/utils/format-utils';
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAVBAR_CONFIG } from '@/constants/navbar-config';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const orderDetails = cart.map((item) => {
      const colorName = COLOR_NAMES[item.color] || item.color;
      return `• ${item.name} (${colorName}, ${item.size}) x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`;
    }).join('\n');

    const message = `¡Hola! 👋 Me interesa realizar el siguiente pedido:\n\n${orderDetails}\n\n*Total: ${formatCurrency(total)}*\n\n¿Podrían confirmarme disponibilidad?`;
    
    const phone = NAVBAR_CONFIG.contact.whatsapp.replace(/\s/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="drawer-overlay"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="drawer-content w-full max-w-md animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Tu Carrito</h2>
                <p className="text-sm text-muted-foreground">
                  {cart.length} producto{cart.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="font-bold text-lg mb-2">Carrito vacío</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  ¡Agrega productos para comenzar tu pedido!
                </p>
                <Button variant="outline" onClick={onClose}>
                  Explorar catálogo
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <CartItemCard
                  key={`${item.id}-${item.color}-${item.size}`}
                  item={item}
                  onRemove={() => removeFromCart(item.id, item.color, item.size)}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, item.color, item.size, qty)}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-border p-4 space-y-4 bg-muted/30">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-2xl font-black text-primary">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  className="w-full gap-2"
                  size="lg"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir por WhatsApp
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={clearCart}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vaciar carrito
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const colorName = COLOR_NAMES[item.color] || item.color;

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
              <p className="text-xs text-muted-foreground">
                {capitalize(item.type)} • {colorName} • {item.size}
              </p>
              {item.isCustom && item.designName && (
                <p className="text-xs text-primary">
                  🎨 Diseño: {item.designName}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={onRemove}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Quantity & Price */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.quantity - 1)}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.quantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <span className="font-bold text-primary">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
