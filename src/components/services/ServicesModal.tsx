import { X, Scissors, Ruler, Droplet } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  {
    icon: Scissors,
    title: 'Corte de Cabelo',
    description: 'Cortes modernos e clássicos realizados por profissionais experientes.',
    price: 'R$ 45',
    duration: '30 min',
    details: [
      'Lavagem com produtos premium',
      'Finalização com produtos profissionais',
      'Acabamento com máquina ou tesoura',
      'Consulta de estilo personalizada'
    ]
  },
  {
    icon: Ruler,
    title: 'Barba',
    description: 'Acabamento perfeito com toalha quente e produtos premium.',
    price: 'R$ 35',
    duration: '30 min',
    details: [
      'Toalha quente para amaciar',
      'Hidratação com óleos especiais',
      'Acabamento com navalha',
      'Aplicação de balm pós-barba'
    ]
  },
  {
    icon: Droplet,
    title: 'Tratamentos',
    description: 'Hidratação profunda e tratamentos capilares especializados.',
    price: 'A partir de R$ 50',
    duration: '45 min',
    details: [
      'Diagnóstico capilar',
      'Hidratação profunda',
      'Tratamento para queda',
      'Reconstrução capilar'
    ]
  }
];

export function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  if (!isOpen) return null;

  const handleScheduleClick = () => {
    onClose();
    const scheduleSection = document.getElementById('schedule');
    scheduleSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto relative bg-black border border-amber-500/20 rounded-lg shadow-xl">
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 bg-black border border-amber-500/20 rounded-full text-amber-400 hover:text-amber-300 transition-colors shadow-lg hover:shadow-amber-500/20"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Nossos Serviços</h2>
            <p className="text-amber-200 text-lg mb-8">
              Conheça nossos serviços especializados para seu estilo
            </p>

            <div className="space-y-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="p-6 bg-[rgba(8,8,8,0.9)] backdrop-blur-xl border border-[#3a2c1f]/30 hover:bg-[#1c1917]/80 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <service.icon className="w-12 h-12 text-amber-400 flex-shrink-0" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[#d4b69b] group-hover:text-white transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-[#a89386]">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-amber-400">{service.price}</p>
                          <p className="text-sm text-[#a89386]">{service.duration}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {service.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-[#a89386] group-hover:text-white transition-colors duration-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="neon" onClick={handleScheduleClick}>
                Agendar Horário
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}