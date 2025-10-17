"use client";

import FooterColumn from '@/app/components/molecules/FooterColumn';
import SocialLinks from '@/app/components/molecules/SocialLinks';
import Newsletter from '@/app/components/molecules/Newsletter';
import { useCVModal } from '@/contexts/CVModalContext';

interface EnhancedFooterProps {
  variant?: 'minimal' | 'expanded';
  showNewsletter?: boolean;
  className?: string;
}

export default function EnhancedFooter({
  variant = 'expanded',
  showNewsletter = true,
  className = '',
}: EnhancedFooterProps) {
  const currentYear = new Date().getFullYear();
  const { openModal } = useCVModal();

  if (variant === 'minimal') {
    return (
      <footer className={`bg-bg-primary border-t border-border-subtle py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-fg-tertiary text-center">
              © {currentYear} Aldo Matias. All rights reserved.
            </p>
            <SocialLinks />
          </div>
        </div>
      </footer>
    );
  }

  // Expanded variant
  return (
    <footer className={`bg-bg-primary border-t border-border-subtle ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Quick Links */}
          <FooterColumn
            title="Quick Links"
            links={[
              { label: 'Home', href: '#home' },
              { label: 'Experience', href: '#experience' },
              { label: 'Skills', href: '#skills' },
              { label: 'Contact', href: '#contact' },
            ]}
          />

          {/* Resources */}
          <FooterColumn
            title="Resources"
            links={[
              { label: 'View CV', onClick: openModal },
              { label: 'View Projects', href: '#experience' },
              { label: 'GitHub', href: 'https://github.com/amatiasdev', external: true },
            ]}
          />

          {/* Connect */}
          <FooterColumn title="Connect">
            <div className="space-y-4">
              <SocialLinks orientation="vertical" showLabels />
              <a
                href="mailto:contacto@aldomatias.com"
                className="block text-sm text-fg-tertiary hover:text-accent-500 transition-colors duration-300"
              >
                contacto@aldomatias.com
              </a>
              <p className="text-sm text-fg-quaternary">
                Dublin, Ireland
              </p>
            </div>
          </FooterColumn>

          {/* Newsletter */}
          {showNewsletter && (
            <FooterColumn title="Stay Updated">
              <Newsletter
                title=""
                description="Get notified about new projects and blog posts"
              />
            </FooterColumn>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-fg-tertiary text-center">
              © {currentYear} Aldo Matias. Designed & built with Next.js, React, and Tailwind CSS.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-sm text-fg-quaternary hover:text-accent-500 transition-colors duration-300"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-sm text-fg-quaternary hover:text-accent-500 transition-colors duration-300"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
