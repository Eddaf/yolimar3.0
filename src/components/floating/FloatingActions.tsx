import React from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAVBAR_CONFIG } from '@/constants/navbar-config';

const FloatingActions: React.FC = () => {
  const handleWhatsApp = () => {
    const phone = NAVBAR_CONFIG.contact.whatsapp.replace(/\s/g, '');
    const message = '¡Hola! 👋 Me gustaría hacer una consulta sobre sus productos.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Scroll to Top */}
      <Button
        variant="outline"
        size="icon"
        className="fab w-12 h-12 bg-background hover:bg-accent"
        onClick={handleScrollTop}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>

      {/* WhatsApp */}
      <Button
        size="icon"
        className="fab w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white animate-pulse-glow"
        onClick={handleWhatsApp}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default FloatingActions;
