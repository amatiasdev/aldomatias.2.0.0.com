"use client";

import { motion } from 'framer-motion';
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
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-accent-500/5 via-transparent to-accent-500/5"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient fade to black at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[5]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-20 max-w-5xl mx-auto">
        {/* Name - eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <Typography as="p" className="text-sm sm:text-base font-medium uppercase tracking-[0.2em] text-fg-tertiary mb-6">
            {t('hero.name') as string}
          </Typography>
        </motion.div>

        {/* Headline - Value proposition (dominant) */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-fg-primary leading-tight max-w-4xl mx-auto animate-fade-in-up"
        >
          {t('hero.headline') as string}
        </h1>

        {/* Headline support line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography as="p" className="text-fg-secondary text-lg md:text-xl mb-6 max-w-3xl mx-auto">
            {t('hero.headlineSupport') as string}
          </Typography>
        </motion.div>

        {/* Subheadline - Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography as="p" className="text-accent-500 text-lg md:text-xl lg:text-2xl font-semibold mb-3">
            {t('hero.subheadline') as string}
          </Typography>
        </motion.div>

        {/* Proof line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typography as="p" className="text-fg-tertiary font-medium text-base md:text-lg mb-10">
            {t('hero.proofLine') as string}
          </Typography>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <Button
            variant="primary"
            size="lg"
            href="#contact"
            className="text-lg px-12 py-5 shadow-accent-lg hover:shadow-accent font-bold"
          >
            {t('hero.cta') as string}
          </Button>
          <Typography as="p" className="text-fg-tertiary text-sm mt-4">
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
        </motion.div>
      </div>
    </section>
  );
}
