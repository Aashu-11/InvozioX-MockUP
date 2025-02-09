import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200';
  const variantStyles = variant === 'primary' ? 'bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90' : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]';
  const sizeStyles = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-md';

  return (
    <button
      className={cn(baseStyles, variantStyles, sizeStyles, className)}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};