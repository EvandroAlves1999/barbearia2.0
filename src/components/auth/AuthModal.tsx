import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-black border border-amber-500/20 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
            <h2 className="text-xl font-semibold text-white">
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </h2>
            <button
              onClick={onClose}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {isLogin ? (
              <LoginForm onSuccess={handleSuccess} />
            ) : (
              <RegisterForm onSuccess={handleSuccess} />
            )}

            <div className="mt-6 text-center">
              <p className="text-amber-100">
                {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
              </p>
              <Button
                variant="outline"
                onClick={() => setIsLogin(!isLogin)}
                className="mt-2"
              >
                {isLogin ? 'Criar conta' : 'Fazer login'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}