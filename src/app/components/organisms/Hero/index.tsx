"use client";

import { motion } from 'framer-motion';
import Typography from '@/app/components/atoms/Typography';
import Button from '@/app/components/atoms/Button';
import { fadeInUp, staggerContainer } from '@/app/constants/animations';

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
    <motion.div
      className="min-h-screen flex items-center justify-center text-center px-6 -mt-16 sm:-mt-20 relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Subtle background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-accent-500/5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl relative z-10">
        <motion.div variants={fadeInUp}>
          <h1
            className="text-7xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 sm:mb-8 bg-gradient-to-br from-fg-primary via-fg-secondary to-accent-500 bg-clip-text text-transparent leading-[0.9]"
          >
            {title}
          </h1>
        </motion.div>

        {subtitle && (
          <motion.div variants={fadeInUp}>
            <Typography
              as="h2"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-accent-500 mb-8 sm:mb-10 tracking-tight uppercase"
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}

        <motion.div variants={fadeInUp}>
          <Typography as="p" className="text-fg-secondary text-lg md:text-xl lg:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed">
            {description}
          </Typography>
        </motion.div>

        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {ctaPrimary && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  href={ctaPrimary.href}
                  onClick={ctaPrimary.onClick}
                  className="text-base sm:text-lg px-8 sm:px-10 md:px-12 py-4 sm:py-5 shadow-accent-lg hover:shadow-accent font-bold"
                >
                  {ctaPrimary.label}
                </Button>
              </motion.div>
            )}
            {ctaSecondary && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  href={ctaSecondary.href}
                  onClick={ctaSecondary.onClick}
                  className="text-base sm:text-lg px-8 sm:px-10 md:px-12 py-4 sm:py-5 font-bold"
                >
                  {ctaSecondary.label}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
