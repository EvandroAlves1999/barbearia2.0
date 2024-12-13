import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FormEvent, useState } from 'react';
import axios from 'axios';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await axios.post('/api/send-email.php', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white">Entre em Contato</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Estamos prontos para ajudar sua empresa a alcançar o próximo nível.
            Entre em contato para uma consulta gratuita.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto overflow-hidden bg-black/60 backdrop-blur-xl border border-blue-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-900 to-black p-12 text-white">
              <h3 className="text-2xl font-bold mb-8">Informações de Contato</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 mt-1 text-blue-400" />
                  <div>
                    <h4 className="font-semibold mb-1">Localização</h4>
                    <p className="text-blue-100">Av. Paulista, 1000 - São Paulo, SP</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 mt-1 text-blue-400" />
                  <div>
                    <h4 className="font-semibold mb-1">Telefone</h4>
                    <p className="text-blue-100">(11) 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 mt-1 text-blue-400" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-blue-100">evandroalvessanto@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Como podemos ajudar?"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="neon"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>

                {status === 'success' && (
                  <p className="text-green-400 text-center">
                    Mensagem enviada com sucesso!
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-red-400 text-center">
                    Erro ao enviar mensagem. Tente novamente.
                  </p>
                )}
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}