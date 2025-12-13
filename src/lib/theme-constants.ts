// Shared theme constants and logic used by both blocking script and React provider
// This ensures no hydration mismatches

export const THEME_STORAGE_KEY = 'theme';
export const THEMES = ['light', 'dark', 'system'] as const;

export type Theme = typeof THEMES[number];
export type ResolvedTheme = 'light' | 'dark';

export const DEFAULT_THEME: Theme = 'dark';

/**
 * Get system color scheme preference
 * @returns 'dark' | 'light'
 */
export const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/**
 * Resolve theme to actual display theme
 * @param theme - User preference ('light' | 'dark' | 'system')
 * @returns Resolved theme ('light' | 'dark')
 */
export const resolveTheme = (theme: Theme): ResolvedTheme => {
  return theme === 'system' ? getSystemTheme() : theme;
};

/**
 * Get initial theme from storage or system
 * @returns Theme preference
 */
export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return stored && THEMES.includes(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};
