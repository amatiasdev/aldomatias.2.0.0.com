// Design tokens and style constants

export const colors = {
  accent: {
    50: '#e6fffa',
    100: '#b3fff0',
    200: '#80ffe6',
    300: '#4dffdc',
    400: '#1affd2',
    500: '#00e6c8',
    600: '#00b39e',
    700: '#008074',
    800: '#004d4a',
    900: '#001a20',
  },
  bg: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    tertiary: '#2a2a2a',
    elevated: '#353535',
  },
  fg: {
    primary: '#ffffff',
    secondary: '#e5e5e5',
    tertiary: '#a3a3a3',
    quaternary: '#737373',
  },
  border: {
    subtle: '#2a2a2a',
    default: '#404040',
    strong: '#525252',
    emphasis: '#737373',
  }
} as const;

export const spacing = {
  section: {
    y: {
      mobile: '4rem',
      tablet: '6rem',
      desktop: '8rem',
      large: '10rem',
    },
    x: {
      mobile: '1.5rem',
      tablet: '3rem',
      desktop: '4rem',
    }
  },
  container: {
    mobile: '1rem',
    tablet: '2rem',
    desktop: '4rem',
  }
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Space Grotesk', 'Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  fontSize: {
    hero: 'clamp(3rem, 10vw, 6rem)',
    'display-xl': 'clamp(2.5rem, 8vw, 4.5rem)',
    'display-lg': 'clamp(2rem, 6vw, 3.5rem)',
    h1: 'clamp(2rem, 5vw, 3rem)',
    h2: 'clamp(1.5rem, 4vw, 2.25rem)',
    h3: 'clamp(1.25rem, 3vw, 1.875rem)',
    h4: 'clamp(1.125rem, 2.5vw, 1.5rem)',
    body: '1rem',
    'body-lg': '1.125rem',
    'body-sm': '0.875rem',
    caption: '0.75rem',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }
} as const;

export const breakpoints = {
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
  md: '0 4px 8px rgba(0, 0, 0, 0.6)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.7)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.8)',
  accent: '0 8px 32px rgba(0, 230, 200, 0.15)',
  'accent-lg': '0 16px 48px rgba(0, 230, 200, 0.25)',
} as const;
