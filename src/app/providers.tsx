"use client";

import { ThemeProvider } from '@/contexts/ThemeContext';
import { ReactNode } from 'react';

/**
 * Client-side providers wrapper
 * Wraps all client-side context providers
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
