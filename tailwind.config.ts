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
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondaryBackground: "var(--secondary-background)", // Color de fondo secundario
        darkBackground: "var(--dark-background)",
        darkForeground: "var(--dark-foreground)",
        darkSecondaryBackground: "var(--dark-secondary-background)", // Color secundario en tema oscuro
      },
    },
  },
  plugins: [],
};

export default config;
