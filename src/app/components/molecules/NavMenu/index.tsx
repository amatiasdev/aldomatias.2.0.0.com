"use client";

import NavLink from '@/app/components/atoms/NavLink';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface NavMenuProps {
  onItemClick?: () => void;
  className?: string;
}

const SECTION_IDS = ['home', 'credibility', 'services', 'process', 'faq', 'contact'];

export default function NavMenu({
  onItemClick,
  className = '',
}: NavMenuProps) {
  const { t } = useTranslation();

  const items = [
    { label: t('nav.home') as string, href: '#home' },
    { label: t('nav.credibility') as string, href: '#credibility' },
    { label: t('nav.services') as string, href: '#services' },
    { label: t('nav.process') as string, href: '#process' },
    { label: t('nav.faq') as string, href: '#faq' },
    { label: t('nav.contact') as string, href: '#contact' },
  ];

  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <nav className={`flex items-center gap-8 ${className}`} role="navigation">
      {items.map((item) => {
        const isActive = item.href.startsWith('#')
          ? activeSection === item.href.slice(1)
          : false;

        return (
          <NavLink
            key={item.href}
            href={item.href}
            isActive={isActive}
            onClick={onItemClick}
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
