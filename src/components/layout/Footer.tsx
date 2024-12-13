import { Scissors } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-12 text-white">
      {/* Vintage barbershop background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2074)',
          opacity: '0.15'
        }}
      />
      
      {/* Textured overlay for vintage feel */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-6 w-6 text-amber-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
                Barbearia Vintage
              </h3>
            </div>
            <p className="text-amber-100">
              Tradição e excelência em cada corte. Transformando seu estilo desde 2020.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contato</h3>
            <div className="space-y-2">
              <p className="text-amber-100">Email: contato@barbeariavintage.com</p>
              <p className="text-amber-100">Telefone: (11) 1234-5678</p>
              <p className="text-amber-100">Endereço: Rua da Barbearia, 123</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Horário de Funcionamento</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-amber-100">
                <span>Segunda a Sexta</span>
                <span>09:00 - 20:00</span>
              </div>
              <div className="flex justify-between text-amber-100">
                <span>Sábado</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between text-amber-100">
                <span>Domingo</span>
                <span>Fechado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-amber-500/20 text-center">
          <p className="text-amber-100">
            &copy; {new Date().getFullYear()} Barbearia Vintage. O lugar onde o estilo encontra a tradição.
          </p>
        </div>
      </div>
    </footer>
  );
}