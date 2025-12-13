// Blocking script to prevent FOUC (Flash of Unstyled Content)
// This must execute synchronously BEFORE any React rendering
// NOTE: Site design is dark-themed, so we always force dark mode

export const themeScript = `
(function() {
  // Always apply dark mode - site design requires dark theme
  document.documentElement.classList.add('dark');
  document.documentElement.setAttribute('data-theme', 'dark');
})();
`;
