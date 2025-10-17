import { Variants } from 'framer-motion';

// Easing functions
export const easing = {
  default: [0.4, 0, 0.2, 1],
  linear: [0, 0, 1, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  inOut: [0.4, 0, 0.2, 1],
  sharp: [0.4, 0, 0.6, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// Duration tokens (in seconds)
export const duration = {
  instant: 0.1,
  fast: 0.2,
  base: 0.3,
  moderate: 0.5,
  slow: 0.7,
  slower: 1.0,
} as const;

// Fade in animations
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.moderate }
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.moderate }
  },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.moderate, ease: easing.default }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: duration.moderate, ease: easing.default }
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.moderate, ease: easing.default }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: duration.moderate, ease: easing.default }
  },
};

// Slide animations
export const slideIn: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.base, ease: easing.default }
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: duration.base, ease: easing.default }
  },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.moderate, ease: easing.default }
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: duration.moderate, ease: easing.default }
  },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.moderate, ease: easing.default }
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: duration.moderate, ease: easing.default }
  },
};

export const slideInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.moderate, ease: easing.default }
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: { duration: duration.moderate, ease: easing.default }
  },
};

// Scale animations
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.moderate, ease: easing.bounce }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: duration.moderate, ease: easing.bounce }
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { duration: duration.fast },
};

// Stagger animations
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerFadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.moderate,
      ease: easing.default,
    }
  },
};

// Button animations
export const buttonPress = {
  whileTap: { scale: 0.98 },
  transition: { duration: duration.instant },
};

// Card animations
export const cardHover = {
  whileHover: {
    y: -4,
    transition: { duration: duration.base, ease: easing.default }
  },
};

// Link underline animation
export const linkUnderline: Variants = {
  initial: { width: '0%' },
  animate: {
    width: '100%',
    transition: { duration: duration.base, ease: easing.default }
  },
};

// Mobile menu animations
export const mobileMenuSlide: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.base, ease: easing.default }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: duration.fast, ease: easing.default }
  },
};

// Loading spinner animation
export const spinnerRotate = {
  animate: {
    rotate: 360,
  },
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: 'linear',
  },
};

// Notification slide in
export const notificationSlideIn: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.base, ease: easing.bounce }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: duration.fast, ease: easing.default }
  },
};

// Utility function to check for reduced motion
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation variant based on preference
export const getAnimationVariant = (
  variant: Variants,
  respectReducedMotion: boolean = true
): Variants => {
  if (respectReducedMotion && shouldReduceMotion()) {
    return {
      initial: {},
      animate: {},
      exit: {},
    };
  }
  return variant;
};

// Paul Taylor inspired dramatic animations
export const dramaticFadeInUp: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.slow,
      ease: easing.bounce,
    }
  },
  exit: { opacity: 0, y: 60, scale: 0.95 },
};

export const dramaticSlideIn: Variants = {
  initial: { opacity: 0, x: -80, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: duration.slow,
      ease: easing.out,
    }
  },
  exit: { opacity: 0, x: -80, scale: 0.9 },
};

export const pulseScale = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easing.inOut,
    }
  }
};

export const floatAnimation = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easing.inOut,
    }
  }
};
