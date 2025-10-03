"use client";

import { BadgeProps } from '@/app/types/components';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-bg-tertiary text-fg-secondary border-border-default',
    accent: 'bg-accent-subtle text-accent-500 border-accent-500',
    muted: 'bg-bg-elevated text-fg-tertiary border-border-subtle',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const classes = `inline-flex items-center justify-center font-medium uppercase tracking-wide border transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  return <span className={classes}>{children}</span>;
}
