import { LucideIcon } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'neon';
  icon?: LucideIcon;
  fullWidth?: boolean;
  size?: 'default' | 'icon';
}

export function Button({
  children,
  variant = 'primary',
  icon: Icon,
  fullWidth,
  size = 'default',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 transform hover:scale-105';
  
  const sizeStyles = {
    default: 'px-6 py-3',
    icon: 'p-2 w-10 h-10'
  };
  
  const variants = {
    primary: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-amber-600 hover:bg-amber-50',
    outline: 'border-2 border-amber-600 text-amber-600 hover:bg-amber-50',
    neon: 'bg-amber-600 text-white border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.7)] hover:bg-amber-500',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}