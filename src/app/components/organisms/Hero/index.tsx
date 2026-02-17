"use client";

import Typography from '@/app/components/atoms/Typography';
import Button from '@/app/components/atoms/Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaPrimary?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  ctaSecondary?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-center px-6 -mt-16 sm:-mt-20 relative overflow-hidden"
    >
      {/* Subtle background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-accent-500/5 animate-bg-pulse" />

      <div className="max-w-7xl relative z-10">
        <div className="animate-hero-stagger-1">
          <h1
            className="text-7xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 sm:mb-8 bg-gradient-to-br from-fg-primary via-fg-secondary to-accent-500 bg-clip-text text-transparent leading-[0.9]"
          >
            {title}
          </h1>
        </div>

        {subtitle && (
          <div className="animate-hero-stagger-2">
            <Typography
              as="h2"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-accent-500 mb-8 sm:mb-10 tracking-tight uppercase"
            >
              {subtitle}
            </Typography>
          </div>
        )}

        <div className="animate-hero-stagger-3">
          <Typography as="p" className="text-fg-secondary text-lg md:text-xl lg:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed">
            {description}
          </Typography>
        </div>

        {(ctaPrimary || ctaSecondary) && (
          <div className="animate-hero-stagger-4 flex flex-col sm:flex-row gap-6 justify-center items-center">
            {ctaPrimary && (
              <div className="hover:scale-105 active:scale-95 transition-transform">
                <Button
                  variant="primary"
                  size="lg"
                  href={ctaPrimary.href}
                  onClick={ctaPrimary.onClick}
                  className="text-base sm:text-lg px-8 sm:px-10 md:px-12 py-4 sm:py-5 shadow-accent-lg hover:shadow-accent font-bold"
                >
                  {ctaPrimary.label}
                </Button>
              </div>
            )}
            {ctaSecondary && (
              <div className="hover:scale-105 active:scale-95 transition-transform">
                <Button
                  variant="outline"
                  size="lg"
                  href={ctaSecondary.href}
                  onClick={ctaSecondary.onClick}
                  className="text-base sm:text-lg px-8 sm:px-10 md:px-12 py-4 sm:py-5 font-bold"
                >
                  {ctaSecondary.label}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
