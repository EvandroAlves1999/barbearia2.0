import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScheduling } from '../../contexts/SchedulingContext';
import { useAuth } from '../../contexts/AuthContext';

const appointmentSchema = z.object({
  service: z.string().min(1, 'Selecione um serviço'),
  barber: z.string().min(1, 'Selecione um barbeiro'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  time: string | null;
}

const services = [
  { id: 'haircut', name: 'Corte de Cabelo', price: 'R$ 45' },
  { id: 'beard', name: 'Barba', price: 'R$ 35' },
  { id: 'haircut-beard', name: 'Corte + Barba', price: 'R$ 70' },
  { id: 'hair-design', name: 'Design de Cabelo', price: 'R$ 55' },
];

const barbers = [
  { id: 'john', name: 'João Silva' },
  { id: 'mike', name: 'Miguel Santos' },
  { id: 'peter', name: 'Pedro Oliveira' },
];

export function AppointmentForm({ isOpen, onClose, date, time }: AppointmentFormProps) {
  const { bookAppointment } = useScheduling();
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });

  if (!isOpen || !date || !time) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      await bookAppointment({
        ...data,
        date: date.toISOString().split('T')[0],
        time,
      });
      reset();
      onClose();
      alert('Agendamento realizado com sucesso!');
    } catch (error) {
      alert('Erro ao realizar agendamento. Tente novamente.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative w-full max-w-md bg-black border border-amber-500/20 rounded-lg shadow-xl">
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 bg-black border border-amber-500/20 rounded-full text-amber-400 hover:text-amber-300 transition-colors shadow-lg hover:shadow-amber-500/20"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6 border-b border-amber-500/20">
            <h2 className="text-xl font-semibold text-white">Agendar Horário</h2>
            <p className="mt-2 text-amber-200">
              Preencha os dados abaixo para confirmar seu agendamento
            </p>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Data e Hora Selecionadas
                </label>
                <p className="text-white">
                  {date.toLocaleDateString('pt-BR')} às {time}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Serviço
                </label>
                <select
                  {...register('service')}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white"
                >
                  <option value="">Selecione um serviço</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-400">{errors.service.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Barbeiro
                </label>
                <select
                  {...register('barber')}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white"
                >
                  <option value="">Selecione um barbeiro</option>
                  {barbers.map(barber => (
                    <option key={barber.id} value={barber.id}>
                      {barber.name}
                    </option>
                  ))}
                </select>
                {errors.barber && (
                  <p className="mt-1 text-sm text-red-400">{errors.barber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Nome
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Telefone
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white"
                />
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-amber-500/20 bg-black/60">
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="neon" onClick={handleSubmit(onSubmit)}>
                Confirmar Agendamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}