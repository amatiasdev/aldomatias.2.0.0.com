"use client";

import { useRef, useEffect } from 'react';
import { AnimatedSectionProps } from '@/app/types/components';

// Single shared IntersectionObserver for all AnimatedSection instances on the page.
// Replaces per-instance observers + MediaQueryList listeners + useState.
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated-visible');
            sharedObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  }
  return sharedObserver;
}

export default function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const observer = getSharedObserver();
    if (el) {
      observer.observe(el);
    }
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`animated-section animated-section--${animation}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
