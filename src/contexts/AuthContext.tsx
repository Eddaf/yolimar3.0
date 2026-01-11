import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getFromStorage, saveToStorage, removeFromStorage } from '@/utils/storage-utils';
import { ADMIN_USERS } from '@/constants/navbar-config';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'editor';
  loginTime: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: () => boolean;
  isEditor: () => boolean;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = getFromStorage<User | null>('currentUser', null);
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    setIsLoading(true);
    setError(null);

    const foundUser = ADMIN_USERS.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData: User = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      saveToStorage('currentUser', userData);
      setIsLoading(false);
      return true;
    } else {
      setError('Credenciales inválidas');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    removeFromStorage('currentUser');
  };

  const isAdmin = () => user?.role === 'admin';
  const isEditor = () => user?.role === 'editor';
  const isAuthenticated = () => user !== null;

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      error,
      login,
      logout,
      isAdmin,
      isEditor,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
