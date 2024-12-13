import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import axios from 'axios';

const consultationSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
  projectType: z.enum(['website', 'mobile', 'desktop', 'other'], {
    errorMap: () => ({ message: 'Selecione um tipo de projeto' }),
  }),
  budget: z.enum(['small', 'medium', 'large', 'enterprise'], {
    errorMap: () => ({ message: 'Selecione uma faixa de orçamento' }),
  }),
  description: z.string().min(10, 'Descreva seu projeto com mais detalhes'),
  deadline: z.string().optional(),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

interface ConsultationFormProps {
  onSuccess: () => void;
}

export function ConsultationForm({ onSuccess }: ConsultationFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setStatus('loading');
    try {
      await axios.post('/api/send-consultation.php', data);
      setStatus('success');
      setTimeout(onSuccess, 2000);
    } catch (error) {
      setStatus('error');
    }
  };

  const projectTypes = [
    { value: 'website', label: 'Website' },
    { value: 'mobile', label: 'Aplicativo Mobile' },
    { value: 'desktop', label: 'Software Desktop' },
    { value: 'other', label: 'Outro' },
  ];

  const budgetRanges = [
    { value: 'small', label: 'Até R$ 10.000' },
    { value: 'medium', label: 'R$ 10.000 - R$ 50.000' },
    { value: 'large', label: 'R$ 50.000 - R$ 100.000' },
    { value: 'enterprise', label: 'Acima de R$ 100.000' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-2">
              Nome Completo
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white placeholder-blue-300"
              placeholder="Seu nome"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white placeholder-blue-300"
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-2">
              Telefone
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white placeholder-blue-300"
              placeholder="(11) 99999-9999"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-blue-100 mb-2">
              Empresa
            </label>
            <input
              {...register('company')}
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white placeholder-blue-300"
              placeholder="Nome da sua empresa"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-400">{errors.company.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-blue-100 mb-2">
              Tipo de Projeto
            </label>
            <select
              {...register('projectType')}
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
            >
              <option value="">Selecione o tipo de projeto</option>
              {projectTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p className="mt-1 text-sm text-red-400">{errors.projectType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-blue-100 mb-2">
              Orçamento Previsto
            </label>
            <select
              {...register('budget')}
              className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
            >
              <option value="">Selecione a faixa de orçamento</option>
              {budgetRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-400">{errors.budget.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-blue-100 mb-2">
            Descrição do Projeto
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white placeholder-blue-300"
            placeholder="Descreva brevemente seu projeto e suas necessidades"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-blue-100 mb-2">
            Prazo Desejado (opcional)
          </label>
          <input
            {...register('deadline')}
            type="date"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-blue-500/20 text-white"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            type="submit"
            variant="neon"
            fullWidth
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar Solicitação'}
          </Button>

          {status === 'success' && (
            <p className="text-green-400 text-center">
              Solicitação enviada com sucesso! Entraremos em contato em breve.
            </p>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-center">
              Erro ao enviar solicitação. Por favor, tente novamente.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}