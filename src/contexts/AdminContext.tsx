import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

const ADMIN_EMAILS = [
  'evandroalvessanto@gmail.com',
  'gui_silvasantos@live.com',
  'sampaioananovais@gmail.com'
];

interface AdminContextType {
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const isAdmin = user ? ADMIN_EMAILS.includes(user.email) : false;

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}