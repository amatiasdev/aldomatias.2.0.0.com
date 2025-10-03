// Blocking script to prevent FOUC (Flash of Unstyled Content)
// This must execute synchronously BEFORE any React rendering

export const themeScript = `
(function() {
  const storageKey = 'theme';
  const defaultTheme = 'system';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function resolveTheme(theme) {
    return theme === 'system' ? getSystemTheme() : theme;
  }

  function applyTheme() {
    try {
      const stored = localStorage.getItem(storageKey);
      const theme = stored || defaultTheme;
      const resolved = resolveTheme(theme);

      const root = document.documentElement;

      if (resolved === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      // Store resolved theme as attribute for debugging
      root.setAttribute('data-theme', resolved);
    } catch (e) {
      // Fallback if localStorage fails (private browsing, etc.)
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  applyTheme();
})();
`;
