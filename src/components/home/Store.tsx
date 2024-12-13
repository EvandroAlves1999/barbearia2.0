import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Pomada Modeladora',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1581582784783-69a2e4b90138?auto=format&fit=crop&q=80&w=800',
    description: 'Pomada modeladora com fixação forte e acabamento natural',
    category: 'Finalização'
  },
  {
    id: 2,
    name: 'Óleo para Barba',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=800',
    description: 'Óleo hidratante para barba com fragrância masculina',
    category: 'Barba'
  },
  {
    id: 3,
    name: 'Shampoo Premium',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800',
    description: 'Shampoo profissional para todos os tipos de cabelo',
    category: 'Cabelo'
  },
  {
    id: 4,
    name: 'Kit Barba',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=800',
    description: 'Kit completo para cuidados com a barba',
    category: 'Barba'
  }
];

export function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();

  const categories = Array.from(new Set(products.map(p => p.category)));
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <section id="store" className="py-32 relative">
      {/* Vintage barbershop background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2070)',
          opacity: '0.15'
        }}
      />
      
      {/* Textured overlay for vintage feel */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Produtos Profissionais
          </h2>
          <p className="text-white max-w-2xl mx-auto text-lg">
            Mantenha seu estilo com nossa linha exclusiva de produtos
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === null ? 'neon' : 'outline'}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'neon' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group bg-[rgba(8,8,8,0.9)] backdrop-blur-xl border border-[#3a2c1f]/30 overflow-hidden hover:border-[#3a2c1f]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#d4b69b]">
                  {product.name}
                </h3>
                <p className="text-[#a89386] mb-4 text-sm">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#bf9b7a]">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Button
                    variant="neon"
                    icon={ShoppingCart}
                    onClick={() => addToCart(product)}
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}