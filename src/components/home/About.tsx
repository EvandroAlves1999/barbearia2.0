import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useState } from 'react';
import { HistoryModal } from '../history/HistoryModal';

export function About() {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-blue-900/20" />
      
      {/* Neon grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-black/60 backdrop-blur-xl border border-blue-500/20 p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                  Sobre a Saga
                </h2>
                <div className="space-y-4 text-blue-800">
                  <p>
                    Fundada em 2020, a Saga nasceu da visão de transformar o cenário tecnológico brasileiro, 
                    oferecendo soluções inovadoras e personalizadas para empresas de todos os portes.
                  </p>
                  <p>
                    Nossa equipe é formada por especialistas apaixonados por tecnologia, 
                    comprometidos em entregar excelência em cada projeto. Combinamos expertise 
                    técnica com uma profunda compreensão das necessidades dos negócios.
                  </p>
                  <p>
                    Acreditamos que a tecnologia deve ser uma aliada no crescimento das empresas, 
                    não um obstáculo. Por isso, desenvolvemos soluções que são não apenas 
                    tecnicamente robustas, mas também intuitivas e alinhadas aos objetivos 
                    dos nossos clientes.
                  </p>
                </div>
                <div className="mt-8">
                  <Button
                    variant="neon"
                    onClick={() => setIsHistoryModalOpen(true)}
                  >
                    Conheça Nossa História
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-6 rounded-lg border border-blue-400/20">
                    <h3 className="text-4xl font-bold text-blue-100 mb-2">50+</h3>
                    <p className="text-blue-200">Projetos Entregues</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900 to-black p-6 rounded-lg border border-blue-500/20">
                    <h3 className="text-4xl font-bold text-blue-100 mb-2">98%</h3>
                    <p className="text-blue-200">Satisfação</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-gradient-to-br from-blue-900 to-black p-6 rounded-lg border border-blue-500/20">
                    <h3 className="text-4xl font-bold text-blue-100 mb-2">24/7</h3>
                    <p className="text-blue-200">Suporte</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-6 rounded-lg border border-blue-400/20">
                    <h3 className="text-4xl font-bold text-blue-100 mb-2">15+</h3>
                    <p className="text-blue-200">Especialistas</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </section>
  );
}