import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider, useCart } from "@/contexts/CartContext";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import AdminLoginModal from "@/components/admin/AdminLoginModal";
import FloatingActions from "@/components/floating/FloatingActions";
import Index from "./pages/Index";
import Designer from "./pages/Designer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isOpen: isCartOpen, setIsOpen: setCartOpen } = useCart();
  const [isAdminOpen, setAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onOpenCart={() => setCartOpen(true)} 
        onOpenAdmin={() => setAdminOpen(true)} 
      />
      
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/disenador" element={<Designer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setCartOpen(false)} 
      />
      
      <AdminLoginModal 
        isOpen={isAdminOpen} 
        onClose={() => setAdminOpen(false)} 
      />

      <FloatingActions />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
