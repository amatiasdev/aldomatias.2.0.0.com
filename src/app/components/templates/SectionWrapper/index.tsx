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
    dark: 'bg-black',
    darker: 'bg-black',
    darkest: 'bg-black',
    charcoal: 'bg-black',
    slate: 'bg-black',
    warm: 'bg-black',
    gradient: 'bg-black',
    gradientWarm: 'bg-black',
  };

  const paddings = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-12 md:py-16',
    xl: 'py-12 md:py-16',
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
