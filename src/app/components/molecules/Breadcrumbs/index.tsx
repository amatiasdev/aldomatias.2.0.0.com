"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/contexts/LanguageContext';

const SLUG_LABELS: Record<string, { es: string; en: string }> = {
  'automatizacion-n8n': { es: 'Automatizacion n8n', en: 'n8n Automation' },
  'auditoria-seguridad': { es: 'Auditoria de Seguridad', en: 'Security Audit' },
  'infraestructura-aws': { es: 'Infraestructura AWS', en: 'AWS Infrastructure' },
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { locale } = useTranslation();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const homeLabel = locale === 'en' ? 'Home' : 'Inicio';

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24">
      <ol className="flex items-center gap-2 text-sm text-fg-tertiary">
        <li>
          <Link href="/" className="hover:text-accent-500 transition-colors">
            {homeLabel}
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const slugLabel = SLUG_LABELS[segment];
          const label = slugLabel
            ? (locale === 'en' ? slugLabel.en : slugLabel.es)
            : segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={href} className="flex items-center gap-2">
              <span className="text-fg-quaternary">/</span>
              {isLast ? (
                <span className="text-fg-secondary font-medium">{label}</span>
              ) : (
                <Link href={href} className="hover:text-accent-500 transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
