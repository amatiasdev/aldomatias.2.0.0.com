"use client";

import { useTranslation, type Locale } from "@/contexts/LanguageContext";

/**
 * Compact ES | EN language toggle for the Navbar.
 *
 * Matches the NavLink visual style: uppercase, tracking-[0.08em],
 * text-sm, font-semibold, with accent highlight on the active locale.
 */
export default function LanguageSelector({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useTranslation();

  const locales: Locale[] = ["es", "en"];

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="radiogroup"
      aria-label="Language selector"
    >
      {locales.map((code, index) => {
        const isActive = locale === code;

        return (
          <span key={code} className="flex items-center">
            {index > 0 && (
              <span
                className="text-fg-quaternary mx-1 select-none"
                aria-hidden="true"
              >
                |
              </span>
            )}
            <button
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={code === "es" ? "Espanol" : "English"}
              onClick={() => setLocale(code)}
              className={`
                uppercase tracking-[0.08em] text-sm font-semibold
                py-1 px-0.5
                ${
                  isActive
                    ? "text-accent-500"
                    : "text-fg-secondary hover:text-fg-primary"
                }
              `}
            >
              {code}
            </button>
          </span>
        );
      })}
    </div>
  );
}
