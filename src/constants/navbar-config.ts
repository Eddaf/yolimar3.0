/**
 * CONFIGURACIÓN DEL NAVBAR
 */

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

export interface ActionItem {
  id: string;
  label: string;
  icon: string;
  action: string;
}

export interface ContactInfo {
  whatsapp: string;
  location: string;
  hours: string;
}

export interface NavbarConfig {
  brand: {
    name: string;
    logo: string;
    tagline: string;
  };
  menu: MenuItem[];
  actions: ActionItem[];
  contact: ContactInfo;
}

export const NAVBAR_CONFIG: NavbarConfig = {
  brand: {
    name: 'YOLIMAR',
    logo: '👗',
    tagline: 'Ropa & Diseños Personalizados'
  },
  menu: [
    {
      id: 'catalog',
      label: 'Catálogo',
      path: '/',
      icon: '🛍️'
    },
    {
      id: 'designer',
      label: 'Diseñador',
      path: '/disenador',
      icon: '🎨'
    }
  ],
  actions: [
    {
      id: 'cart',
      label: 'Carrito',
      icon: '🛒',
      action: 'openCart'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: '⚙️',
      action: 'openAdmin'
    }
  ],
  contact: {
    whatsapp: '+591 76319999',
    location: 'Feria Barrio Lindo Pasillo Potosi Puesto NRO. 1038',
    hours: 'Miércoles y Sábado 5:00 AM - 18:00 PM'
  }
};

export const ADMIN_USERS = [
  {
    email: 'admin@yolimar.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin' as const
  },
  {
    email: 'ventas@yolimar.com',
    password: 'ventas123',
    name: 'Ventas',
    role: 'editor' as const
  }
];
