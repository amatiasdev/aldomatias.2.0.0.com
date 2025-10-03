"use client";

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string; // For accessibility
  variant?: 'primary' | 'secondary' | 'ghost';
}

export default function IconButton({
  icon,
  label,
  variant = 'ghost',
  className = '',
  ...props
}: IconButtonProps) {
  const baseStyles = "p-3 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-accent-500 text-fg-inverse hover:bg-accent-600",
    secondary: "bg-bg-secondary text-fg-primary hover:bg-bg-tertiary border border-border-subtle",
    ghost: "text-fg-secondary hover:bg-bg-secondary hover:text-fg-primary"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={label}
      {...props}
    >
      {icon}
    </motion.button>
  );
}
