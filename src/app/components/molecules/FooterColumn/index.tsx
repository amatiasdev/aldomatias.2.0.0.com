"use client";

import Typography from '@/app/components/atoms/Typography';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

interface FooterColumnProps {
  title: string;
  links?: FooterLink[];
  children?: React.ReactNode;
  className?: string;
}

export default function FooterColumn({
  title,
  links = [],
  children,
  className = '',
}: FooterColumnProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Typography as="h3" variant="h4" className="text-fg-primary uppercase tracking-wider text-sm font-bold">
        {title}
      </Typography>

      {children ? (
        children
      ) : (
        <ul className="space-y-2" role="list">
          {links.map((link, index) => (
            <li key={link.href || `link-${index}`}>
              {link.onClick ? (
                <button
                  onClick={link.onClick}
                  className="text-sm text-fg-tertiary hover:text-accent-500 transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ) : link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-tertiary hover:text-accent-500 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href!}
                  className="text-sm text-fg-tertiary hover:text-accent-500 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
