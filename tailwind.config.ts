import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors (preserved)
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondaryBackground: "var(--secondary-background)",
        darkBackground: "var(--dark-background)",
        darkForeground: "var(--dark-foreground)",
        darkSecondaryBackground: "var(--dark-secondary-background)",

        // New design system colors - using CSS variables for theme switching
        accent: {
          50: '#e6fffa',
          100: '#b3fff0',
          200: '#80ffe6',
          300: '#4dffdc',
          400: '#1affd2',
          500: 'var(--accent-500)',
          600: 'var(--accent-600)',
          700: '#008074',
          800: '#004d4a',
          900: '#001a20',
          subtle: 'var(--accent-subtle)',
        },
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          elevated: 'var(--bg-elevated)',
          overlay: 'var(--bg-overlay)',
          warm: 'var(--bg-warm)',
        },
        fg: {
          primary: 'var(--fg-primary)',
          secondary: 'var(--fg-secondary)',
          tertiary: 'var(--fg-tertiary)',
          quaternary: 'var(--fg-quaternary)',
          inverse: 'var(--fg-inverse)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          default: 'var(--border-default)',
          strong: 'var(--border-strong)',
          emphasis: 'var(--border-emphasis)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xxl': ['10rem', { lineHeight: '0.95', letterSpacing: '-0.06em', fontWeight: '900' }], // Paul Taylor inspired
        'display-xl': ['8rem', { lineHeight: '1.0', letterSpacing: '-0.055em', fontWeight: '900' }],
        'display-lg': ['6rem', { lineHeight: '1.05', letterSpacing: '-0.045em', fontWeight: '900' }],
        'display-md': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'accent': '0 8px 32px rgba(0, 230, 200, 0.15)',
        'accent-lg': '0 16px 48px rgba(0, 230, 200, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};

export default config;
