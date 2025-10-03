"use client";

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver';
import { AnimatedSectionProps } from '@/app/types/components';
import { fadeInUp, slideInLeft, slideInRight, scaleIn, fadeIn } from '@/app/constants/animations';

export default function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  stagger = false,
  respectReducedMotion = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, {
    threshold,
    freezeOnceVisible: true,
  });

  const animations = {
    fadeIn,
    fadeInUp,
    slideLeft: slideInLeft,
    slideRight: slideInRight,
    scaleIn,
  } as const;

  const selectedAnimation = animations[animation] || fadeInUp;

  // Check for reduced motion preference
  const prefersReducedMotion = respectReducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={hasIntersected ? "animate" : "initial"}
      variants={stagger ? { animate: { transition: { staggerChildren: 0.1 } } } : selectedAnimation}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
