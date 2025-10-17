"use client";

import { SectionProps } from '@/app/types/components';

export default function SectionWrapper({
  children,
  background = 'dark',
  padding = 'lg',
  fullWidth = false,
  id,
  className = '',
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    dark: 'bg-bg-primary',
    darker: 'bg-bg-secondary',
    darkest: 'bg-bg-primary',
    charcoal: 'bg-bg-secondary',
    slate: 'bg-bg-tertiary',
    warm: 'bg-bg-warm', // Theme-aware warm tones
    gradient: 'bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary',
    gradientWarm: 'bg-gradient-to-br from-bg-secondary via-bg-warm to-bg-secondary',
  };

  const paddings = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
    xl: 'py-24 md:py-40',
  };

  const containerClass = fullWidth
    ? 'w-full px-6 md:px-12 lg:px-16'
    : 'max-w-7xl mx-auto px-6 md:px-12 lg:px-16';

  return (
    <section
      id={id}
      className={`w-full ${backgrounds[background]} ${paddings[padding]} ${className}`}
    >
      <div className={containerClass}>{children}</div>
    </section>
  );
}
