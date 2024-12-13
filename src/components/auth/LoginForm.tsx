import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      onSuccess();
    } catch (error) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <Button
        type="submit"
        variant="neon"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}