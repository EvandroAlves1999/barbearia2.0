import { Scissors } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { ServicesModal } from '../services/ServicesModal';

export function Hero() {
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2074)',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-4 relative text-center">
        <div className="inline-flex items-center px-4 py-2 bg-amber-900/30 text-amber-400 rounded-full mb-8 animate-fade-in">
          <Scissors className="w-4 h-4 mr-2" />
          Estilo & Tradição
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slide-up">
          Sua{' '}
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
            melhor versão
          </span>
          {' '}começa aqui
        </h1>
        
        <p className="text-xl text-amber-100 mb-12 max-w-2xl mx-auto animate-slide-up-delayed">
          Cortes modernos, barba impecável e um ambiente exclusivo para você se sentir único
        </p>
        
        <div className="flex justify-center gap-4 animate-fade-in-delayed">
          <Button
            variant="neon"
            onClick={() => {
              const scheduleSection = document.getElementById('schedule');
              scheduleSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Agendar Horário
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsServicesModalOpen(true)}
          >
            Nossos Serviços
          </Button>
        </div>

        {/* Featured services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-black/60 backdrop-blur-sm border border-amber-500/20 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-2">Corte Moderno</h3>
            <p className="text-amber-100">Cortes personalizados para seu estilo</p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm border border-amber-500/20 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-2">Barba Tradicional</h3>
            <p className="text-amber-100">Acabamento perfeito e hidratação</p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm border border-amber-500/20 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-2">Tratamentos</h3>
            <p className="text-amber-100">Hidratação e cuidados especiais</p>
          </div>
        </div>
      </div>

      <ServicesModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
      />
    </div>
  );
}