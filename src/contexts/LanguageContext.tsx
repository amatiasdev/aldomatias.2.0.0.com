"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import es from "@/app/i18n/es.json";

/**
 * Supported locales for the application.
 */
export type Locale = "es" | "en";

const STORAGE_KEY = "lang";
const DEFAULT_LOCALE: Locale = "es";

/**
 * Traverse a nested object using a dot-notation key path.
 *
 * Supports:
 *  - Nested objects: `"hero.headline"` -> `dictionaries[locale].hero.headline`
 *  - Array access:   `"problem.items"` -> returns the full array
 *  - Array indexing: `"problem.items.0.title"` -> returns the first item's title
 *
 * Returns the key itself as a fallback when the path is not found,
 * making missing translations immediately visible during development.
 */
function getNestedValue(obj: Record<string, unknown>, keyPath: string): unknown {
  const segments = keyPath.split(".");
  let current: unknown = obj;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return keyPath;
    }

    if (Array.isArray(current)) {
      const index = Number(segment);
      if (Number.isNaN(index)) {
        return keyPath;
      }
      current = current[index];
    } else if (typeof current === "object") {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return keyPath;
    }
  }

  return current ?? keyPath;
}

/**
 * Detect if the browser's primary language is English.
 * Used only on the very first visit when no preference is stored.
 */
function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
    if (browserLang.toLowerCase().startsWith("en")) {
      return "en";
    }
  } catch {
    // Ignore any access errors in restricted environments
  }

  return DEFAULT_LOCALE;
}

/**
 * Resolve the initial locale from localStorage or browser detection.
 */
function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      return stored;
    }
  } catch {
    // localStorage unavailable (private browsing, SSR, etc.)
  }

  return detectBrowserLocale();
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface LanguageContextValue {
  /** Current active locale */
  locale: Locale;
  /** Update the locale and persist to localStorage */
  setLocale: (locale: Locale) => void;
  /**
   * Retrieve a translation by dot-notation key.
   *
   * @example
   * t("hero.headline")            // string
   * t("problem.items")            // array of objects
   * t("problem.items.0.title")    // string from array element
   */
  t: (key: string) => unknown;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);
  const [dictionaries, setDictionaries] = useState<Record<Locale, Record<string, unknown>>>({
    es,
    en: es, // Fallback to Spanish until English dictionary loads
  });

  // Load English dictionary on demand
  const loadEnglish = useCallback(() => {
    import("@/app/i18n/en.json").then((mod) => {
      setDictionaries((prev) => ({ ...prev, en: mod.default }));
    });
  }, []);

  // Hydrate locale from storage / browser detection after mount
  useEffect(() => {
    const initial = getInitialLocale();
    setLocaleState(initial);
    if (initial === "en") {
      loadEnglish();
    }
    setMounted(true);
  }, [loadEnglish]);

  // Sync the `lang` attribute on <html> whenever locale changes
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
  }, [locale, mounted]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (next === "en") {
      loadEnglish();
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Silently handle storage errors
    }
  }, [loadEnglish]);

  const t = useCallback(
    (key: string): unknown => {
      return getNestedValue(dictionaries[locale], key);
    },
    [locale, dictionaries],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the i18n context from any client component.
 *
 * @example
 * const { t, locale, setLocale } = useTranslation();
 * <h1>{t("hero.headline") as string}</h1>
 */
export function useTranslation() {
  const ctx = useContext(LanguageContext);

  if (ctx === undefined) {
    throw new Error(
      "useTranslation must be used within a <LanguageProvider>. " +
      "Wrap your application tree with <LanguageProvider> in providers.tsx.",
    );
  }

  return ctx;
}
