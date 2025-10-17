"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ButtonProps } from '@/app/types/components';
import { buttonPress } from '@/app/constants/animations';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  ariaLabel,
  href,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-sm relative overflow-hidden group';

  const variants = {
    primary: 'bg-accent-500 text-fg-inverse border-2 border-accent-500 hover:bg-accent-600 hover:border-accent-600 shadow-lg hover:shadow-accent transform hover:-translate-y-0.5',
    secondary: 'bg-transparent text-fg-primary border-2 border-fg-primary hover:bg-fg-primary hover:text-bg-primary shadow-lg',
    outline: 'bg-transparent text-accent-500 border-2 border-accent-500 hover:bg-accent-500 hover:text-fg-inverse shadow-lg hover:shadow-accent',
    ghost: 'bg-transparent text-fg-secondary border-b-2 border-fg-tertiary hover:text-accent-500 hover:border-accent-500 px-0',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-12 py-5 text-base',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {children}
    </>
  );

  // If has onClick, render as button (even if it also has href)
  if (onClick) {
    return (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={classes}
        aria-label={ariaLabel}
        whileTap={!disabled ? buttonPress.whileTap : {}}
      >
        {content}
      </motion.button>
    );
  }

  // If only has href (no onClick), render as Link
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  // Default: render as button without onClick
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      className={classes}
      aria-label={ariaLabel}
      whileTap={!disabled ? buttonPress.whileTap : {}}
    >
      {content}
    </motion.button>
  );
}
