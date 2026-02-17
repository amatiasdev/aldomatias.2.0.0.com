"use client";

import Image from 'next/image';
import Typography from '@/app/components/atoms/Typography';
import Button from '@/app/components/atoms/Button';
import { useTranslation } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary to-accent-500/10" />

      {/* Subtle animated accent */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-accent-500/5 via-transparent to-accent-500/5 animate-bg-pulse"
      />

      {/* Gradient fade to black at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[5]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-20 max-w-5xl mx-auto">
        {/* Circular photo - CSS animation for instant LCP */}
        <div className="animate-hero-photo">
          <Image
            src="/aldo-matias.jpg"
            alt="Aldo Matias"
            width={120}
            height={120}
            className="rounded-full mx-auto mb-6 border-2 border-accent-500/30"
            priority
            sizes="120px"
          />
        </div>

        {/* Name - eyebrow label */}
        <div className="animate-hero-stagger-1">
          <Typography as="p" className="text-sm sm:text-base font-medium uppercase tracking-[0.2em] text-fg-tertiary mb-6">
            {t('hero.name') as string}
          </Typography>
        </div>

        {/* Headline - Value proposition (dominant) */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-fg-primary leading-tight max-w-4xl mx-auto animate-fade-in-up"
        >
          {t('hero.headline') as string}
        </h1>

        {/* Headline support line */}
        <div className="animate-hero-stagger-2">
          <Typography as="p" className="text-fg-secondary text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            {t('hero.headlineSupport') as string}
          </Typography>
        </div>

        {/* Proof line with BBVA logo */}
        <div className="animate-hero-stagger-3">
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
            <Image src="/bbva-logo.png" alt="BBVA Bank" width={48} height={48} className="rounded opacity-70 w-7 h-7" sizes="48px" />
            <Typography as="p" className="text-fg-secondary font-medium text-base md:text-lg">
              {t('hero.proofBadge') as string}
            </Typography>
            <span className="text-fg-tertiary">·</span>
            <Typography as="p" className="text-fg-secondary font-medium text-base md:text-lg">
              {t('hero.proofMetrics') as string}
            </Typography>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-hero-stagger-4 flex flex-col items-center">
          <Button
            variant="primary"
            size="lg"
            href="#contact"
            className="text-lg px-12 py-5 shadow-accent-lg hover:shadow-accent font-bold"
          >
            {t('hero.cta') as string}
          </Button>
          <Typography as="p" className="text-fg-secondary text-sm mt-4">
            {t('hero.ctaSubtext') as string}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            href="#process"
            className="text-fg-tertiary hover:text-accent-500 mt-3"
          >
            {t('hero.ctaSecondary') as string} ↓
          </Button>
        </div>
      </div>
    </section>
  );
}
