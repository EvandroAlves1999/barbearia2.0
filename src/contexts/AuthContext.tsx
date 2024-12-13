import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
    } catch (error) {
      throw new Error('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
    } catch (error) {
      throw new Error('Falha ao criar conta. Tente novamente.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}