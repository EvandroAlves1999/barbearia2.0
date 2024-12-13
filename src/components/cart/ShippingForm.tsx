import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';

const shippingSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  address: z.string().min(5, 'Endereço é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado inválido'),
  zipCode: z.string().length(8, 'CEP inválido'),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
}

export function ShippingForm({ onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-6">Informações de Entrega</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-amber-100 mb-2">
            Nome Completo
          </label>
          <input
            {...register('fullName')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="Seu nome completo"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-amber-100 mb-2">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-amber-100 mb-2">
            Telefone
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="(11) 99999-9999"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-amber-100 mb-2">
            Endereço
          </label>
          <input
            {...register('address')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="Rua, Avenida, etc."
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-400">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium text-amber-100 mb-2">
            Número
          </label>
          <input
            {...register('number')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="123"
          />
          {errors.number && (
            <p className="mt-1 text-sm text-red-400">{errors.number.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="complement" className="block text-sm font-medium text-amber-100 mb-2">
            Complemento
          </label>
          <input
            {...register('complement')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="Apto, Sala, etc."
          />
        </div>

        <div>
          <label htmlFor="neighborhood" className="block text-sm font-medium text-amber-100 mb-2">
            Bairro
          </label>
          <input
            {...register('neighborhood')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="Seu bairro"
          />
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-red-400">{errors.neighborhood.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-amber-100 mb-2">
            CEP
          </label>
          <input
            {...register('zipCode')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="12345678"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-400">{errors.zipCode.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-amber-100 mb-2">
            Cidade
          </label>
          <input
            {...register('city')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="Sua cidade"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-amber-100 mb-2">
            Estado
          </label>
          <input
            {...register('state')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-black/60 border border-amber-500/20 text-white placeholder-amber-300"
            placeholder="SP"
            maxLength={2}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-400">{errors.state.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" variant="neon" fullWidth>
        Continuar para Pagamento
      </Button>
    </form>
  );
}