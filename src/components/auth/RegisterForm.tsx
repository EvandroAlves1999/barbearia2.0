import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register: registerUser } = useAuth();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.name, data.email, data.password);
      onSuccess();
    } catch (error) {
      setError('Falha ao criar conta. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-blue-100">
          Nome
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md bg-black/60 border border-blue-500/20 text-white px-4 py-3"
          placeholder="Seu nome"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-blue-100">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-md bg-black/60 border border-blue-500/20 text-white px-4 py-3"
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-blue-100">
          Senha
        </label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 block w-full rounded-md bg-black/60 border border-blue-500/20 text-white px-4 py-3"
          placeholder="******"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-100">
          Confirmar Senha
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="mt-1 block w-full rounded-md bg-black/60 border border-blue-500/20 text-white px-4 py-3"
          placeholder="******"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <Button
        type="submit"
        variant="neon"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Criando conta...' : 'Criar conta'}
      </Button>
    </form>
  );
}