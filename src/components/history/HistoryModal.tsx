import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { HistoryCarousel } from './HistoryCarousel';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  if (!isOpen) return null;

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
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto relative bg-black border border-blue-500/20 rounded-lg shadow-xl">
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 bg-black border border-blue-500/20 rounded-full text-blue-400 hover:text-blue-300 transition-colors shadow-lg hover:shadow-blue-500/20"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Nossa História</h2>
            
            <div className="mb-12">
              <HistoryCarousel />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Nossa Jornada</h3>
                <div className="space-y-4 text-blue-100">
                  <p>
                    Desde nossa fundação em 2020, a Saga tem se dedicado a transformar o cenário 
                    tecnológico brasileiro. Começamos como uma pequena equipe de desenvolvedores 
                    apaixonados por tecnologia e hoje somos referência em soluções digitais 
                    inovadoras.
                  </p>
                  <p>
                    Ao longo dos anos, expandimos nossa expertise para diversas áreas da tecnologia, 
                    desde desenvolvimento web e mobile até soluções em cloud computing e inteligência 
                    artificial. Nossa equipe cresceu, mas mantivemos nossa essência de buscar 
                    sempre a excelência e a inovação.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Nossa Visão de Futuro</h3>
                <div className="space-y-4 text-blue-100">
                  <p>
                    Olhando para o futuro, nossa visão é nos tornar líderes em transformação 
                    digital na América Latina. Queremos ser reconhecidos não apenas pela qualidade 
                    técnica de nossas soluções, mas também pelo impacto positivo que geramos 
                    nos negócios de nossos clientes.
                  </p>
                  <p>
                    Investimos constantemente em pesquisa e desenvolvimento, explorando novas 
                    tecnologias e metodologias que possam trazer ainda mais valor para nossos 
                    clientes. Acreditamos que a tecnologia deve ser uma força transformadora 
                    para criar um futuro mais eficiente e sustentável.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-blue-500/20">
              <h3 className="text-xl font-semibold text-blue-400 mb-6">Nossos Valores</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Inovação</h4>
                  <p className="text-blue-100">
                    Buscamos constantemente novas soluções e tecnologias para superar desafios.
                  </p>
                </div>
                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Excelência</h4>
                  <p className="text-blue-100">
                    Comprometimento com a qualidade em cada linha de código que escrevemos.
                  </p>
                </div>
                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Colaboração</h4>
                  <p className="text-blue-100">
                    Trabalhamos em parceria com nossos clientes para alcançar resultados extraordinários.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-blue-500/20 bg-black/60">
            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}