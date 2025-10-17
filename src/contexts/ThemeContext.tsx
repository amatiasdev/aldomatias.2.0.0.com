"use client";

import { createContext, useEffect, useState, useMemo, ReactNode } from 'react';
import {
  Theme,
  ResolvedTheme,
  THEME_STORAGE_KEY,
  DEFAULT_THEME,
  resolveTheme,
  getSystemTheme,
  getInitialTheme,
} from '@/lib/theme-constants';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setMounted(true);

    const initialTheme = getInitialTheme();
    setThemeState(initialTheme);
    setResolvedTheme(resolveTheme(initialTheme));
  }, []);

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (!mounted) return;

    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);

    const root = document.documentElement;

    // Add transitioning class for smooth animations
    root.classList.add('transitioning');

    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.setAttribute('data-theme', resolved);

    // Remove transitioning class after transition completes
    const timeout = setTimeout(() => {
      root.classList.remove('transitioning');
    }, 200);

    return () => clearTimeout(timeout);
  }, [theme, mounted]);

  // Listen for system theme changes when theme is 'system'
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const newSystemTheme = getSystemTheme();
      setResolvedTheme(newSystemTheme);

      const root = document.documentElement;
      root.classList.add('transitioning');

      if (newSystemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      root.setAttribute('data-theme', newSystemTheme);

      setTimeout(() => {
        root.classList.remove('transitioning');
      }, 200);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Listen for cross-tab theme changes
  useEffect(() => {
    if (!mounted) return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme !== theme) {
          setThemeState(newTheme);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [mounted, theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      // Handle localStorage errors (private browsing, etc.)
      console.warn('Failed to save theme preference:', e);
    }
  };

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, mounted }),
    [theme, resolvedTheme, mounted]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
