import { X, Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { CheckoutForm } from './CheckoutForm';
import type { CheckoutStep } from './CheckoutForm';

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    total,
    isCartOpen,
    setIsCartOpen,
    clearCart
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('shipping');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handlePayment = (checkoutData: any) => {
    console.log('Processing order:', checkoutData);
    // Here you would integrate with your payment processing service
    alert('Pedido processado com sucesso!');
    clearCart();
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black border-l border-amber-500/20">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-amber-500/20 p-4">
            <div className="flex items-center gap-2">
              {isCheckingOut && (
                <button
                  onClick={() => {
                    if (checkoutStep === 'payment') {
                      setCheckoutStep('shipping');
                    } else {
                      setIsCheckingOut(false);
                    }
                  }}
                  className="text-amber-400 hover:text-amber-300 transition-colors mr-2"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              )}
              <ShoppingBag className="h-6 w-6 text-amber-400" />
              <h2 className="text-lg font-semibold text-white">
                {isCheckingOut
                  ? checkoutStep === 'shipping'
                    ? 'Informações de Entrega'
                    : 'Pagamento'
                  : 'Carrinho'}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {!isCheckingOut ? (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-amber-400">
                    <ShoppingBag className="h-12 w-12 mb-4" />
                    <p className="text-lg">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 bg-amber-900/20 rounded-lg p-4 border border-amber-500/20"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{item.name}</h3>
                          <p className="text-sm text-amber-400">
                            R$ {item.price.toFixed(2)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-amber-400 hover:text-amber-300 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-amber-400 hover:text-amber-300 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto p-1 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-amber-500/20 p-4 space-y-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="w-full"
                    >
                      Limpar
                    </Button>
                    <Button
                      variant="neon"
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full"
                    >
                      Finalizar
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <CheckoutForm
                total={total}
                onSubmit={handlePayment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}