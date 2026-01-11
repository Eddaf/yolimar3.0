import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVBAR_CONFIG } from '@/constants/navbar-config';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Menu, X, Palette, ShoppingBag, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenAdmin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">{NAVBAR_CONFIG.brand.logo}</span>
            <div className="flex flex-col">
              <span className="text-xl font-black text-primary tracking-tight group-hover:text-primary/80 transition-colors">
                {NAVBAR_CONFIG.brand.name}
              </span>
              <span className="text-[10px] text-muted-foreground -mt-1 hidden sm:block">
                {NAVBAR_CONFIG.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAVBAR_CONFIG.menu.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.id === 'catalog' && <ShoppingBag className="w-4 h-4" />}
                {item.id === 'designer' && <Palette className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenAdmin}
              className="hidden sm:flex hover:bg-accent"
            >
              <Settings className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={onOpenCart}
              className="relative border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {NAVBAR_CONFIG.menu.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  {item.id === 'catalog' && <ShoppingBag className="w-5 h-5" />}
                  {item.id === 'designer' && <Palette className="w-5 h-5" />}
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  onOpenAdmin();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-all flex items-center gap-3"
              >
                <Settings className="w-5 h-5" />
                Admin
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
