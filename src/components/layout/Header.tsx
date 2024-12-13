import { Menu, ShoppingBag, User, Scissors } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { items, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: '#services', label: 'Serviços' },
    { href: '#schedule', label: 'Agendamento' },
    { href: '#store', label: 'Loja' }
  ];

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="fixed w-full bg-black/30 backdrop-blur-md z-50 border-b border-amber-500/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2"
            >
              <Scissors className="h-6 w-6 text-amber-400" />
            </Button>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-grow">
              <div className="flex space-x-8">
                {navLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text hover:from-amber-300 hover:to-amber-500 transition-all duration-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-amber-400">{user.name}</span>
                  <button
                    onClick={logout}
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline">Entrar</span>
                </button>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2 hover:bg-amber-500/10 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} className="text-amber-400" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-amber-500/10">
              <div className="flex flex-col space-y-4">
                {navLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text hover:from-amber-300 hover:to-amber-500 transition-all duration-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}