"use client";

import { ReactNode, MouseEvent } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  label: string; // For accessibility
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function IconButton({
  icon,
  label,
  variant = 'ghost',
  className = '',
  onClick,
  disabled,
  type = 'button',
}: IconButtonProps) {
  const baseStyles = "p-3 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";

  const variantStyles = {
    primary: "bg-accent-500 text-fg-inverse hover:bg-accent-600",
    secondary: "bg-bg-secondary text-fg-primary hover:bg-bg-tertiary border border-border-subtle",
    ghost: "text-fg-secondary hover:bg-bg-secondary hover:text-fg-primary"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon}
    </button>
  );
}
