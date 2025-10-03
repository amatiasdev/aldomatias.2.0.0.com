"use client";

import NavLink from '@/app/components/atoms/NavLink';
import { useActiveSection } from '@/app/hooks/useActiveSection';

interface NavMenuItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavMenuProps {
  items: NavMenuItem[];
  onItemClick?: () => void;
  className?: string;
}

const defaultItems: NavMenuItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function NavMenu({
  items = defaultItems,
  onItemClick,
  className = '',
}: NavMenuProps) {
  const sectionIds = items
    .filter(item => item.href.startsWith('#'))
    .map(item => item.href.slice(1));

  const activeSection = useActiveSection(sectionIds);

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
            external={item.external}
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
