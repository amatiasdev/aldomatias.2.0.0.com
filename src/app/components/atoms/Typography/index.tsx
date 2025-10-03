"use client";

import { TypographyProps } from '@/app/types/components';

export default function Typography({
  as = 'p',
  variant = 'body',
  children,
  className = '',
  gradient = false,
}: TypographyProps) {
  const Component = as;

  const variants = {
    hero: 'font-display text-display-xl font-black uppercase tracking-tighter',
    h1: 'font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight',
    h2: 'font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight',
    h3: 'font-display text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-tight',
    h4: 'font-display text-xl md:text-2xl font-semibold uppercase tracking-wide',
    body: 'font-sans text-base leading-relaxed',
    caption: 'font-sans text-sm leading-normal text-fg-tertiary',
  };

  const gradientClass = gradient
    ? 'bg-gradient-to-r from-accent-500 to-accent-300 bg-clip-text text-transparent'
    : '';

  const classes = `${variants[variant]} ${gradientClass} ${className}`;

  return <Component className={classes}>{children}</Component>;
}
