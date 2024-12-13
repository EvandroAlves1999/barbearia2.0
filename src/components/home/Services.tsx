import { Scissors, Ruler, Droplet, Coffee, Star, Clock } from 'lucide-react';
import { Card } from '../ui/Card';

const services = [
  {
    icon: Scissors,
    title: 'Corte de Cabelo',
    description: 'Cortes modernos e clássicos realizados por profissionais experientes.',
    price: 'R$ 45',
  },
  {
    icon: Ruler,
    title: 'Barba',
    description: 'Acabamento perfeito com toalha quente e produtos premium.',
    price: 'R$ 35',
  },
  {
    icon: Droplet,
    title: 'Tratamentos',
    description: 'Hidratação profunda e tratamentos capilares especializados.',
    price: 'A partir de R$ 50',
  },
  {
    icon: Coffee,
    title: 'Ambiente Premium',
    description: 'Espaço confortável com café, bebidas e Wi-Fi gratuito.',
    price: 'Cortesia',
  },
  {
    icon: Star,
    title: 'Produtos Exclusivos',
    description: 'Linha completa de produtos profissionais para seus cuidados.',
    price: 'Consulte',
  },
  {
    icon: Clock,
    title: 'Horário Estendido',
    description: 'Atendimento até 20h para sua conveniência.',
    price: '-',
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      {/* Vintage barbershop background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?auto=format&fit=crop&q=80&w=2070)',
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
            Nossos Serviços
          </h2>
          <p className="text-white max-w-2xl mx-auto text-lg">
            Excelência em cada detalhe para você se sentir único
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 group bg-[rgba(8,8,8,0.9)] backdrop-blur-xl border border-[#3a2c1f]/30 hover:bg-[#1c1917]/80 transition-all duration-300"
            >
              <service.icon className="w-12 h-12 text-[#bf9b7a] mb-6" />
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-[#d4b69b] group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <span className="text-[#bf9b7a] font-bold">
                  {service.price}
                </span>
              </div>
              <p className="text-[#a89386] group-hover:text-gray-200 transition-colors duration-300">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}