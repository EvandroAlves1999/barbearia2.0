import { Hero } from './components/home/Hero';
import { Services } from './components/home/Services';
import { Store } from './components/home/Store';
import { Schedule } from './components/scheduling/Schedule';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { SchedulingProvider } from './contexts/SchedulingContext';
import { CartDrawer } from './components/cart/CartDrawer';

export function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <SchedulingProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-black text-white">
              <Header />
              <main className="flex-grow">
                <Hero />
                <Services />
                <Schedule />
                <Store />
              </main>
              <Footer />
              <CartDrawer />
            </div>
          </CartProvider>
        </SchedulingProvider>
      </AdminProvider>
    </AuthProvider>
  );
}