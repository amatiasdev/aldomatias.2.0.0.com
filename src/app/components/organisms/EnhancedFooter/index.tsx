"use client";

import FooterColumn from '@/app/components/molecules/FooterColumn';
import SocialLinks from '@/app/components/molecules/SocialLinks';
import { useTranslation } from '@/contexts/LanguageContext';

interface EnhancedFooterProps {
  className?: string;
}

export default function EnhancedFooter({
  className = '',
}: EnhancedFooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-bg-primary border-t border-border-subtle ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Quick Links */}
          <FooterColumn
            title={t('footer.quickLinks') as string}
            links={[
              { label: t('nav.home') as string, href: '#home' },
              { label: t('nav.services') as string, href: '#services' },
              { label: t('nav.credibility') as string, href: '#credibility' },
              { label: t('nav.contact') as string, href: '#contact' },
            ]}
          />

          {/* Services */}
          <FooterColumn
            title={t('footer.servicesTitle') as string}
            links={[
              { label: t('footer.automationLink') as string, href: '#services' },
              { label: t('footer.securityLink') as string, href: '#services' },
              { label: t('footer.awsLink') as string, href: '#services' },
            ]}
          />

          {/* Connect */}
          <FooterColumn title={t('footer.connect') as string}>
            <div className="space-y-4">
              <SocialLinks orientation="vertical" showLabels />
              <a
                href="mailto:contacto@aldomatias.com"
                className="block text-sm text-fg-tertiary hover:text-accent-500 transition-colors duration-300"
              >
                contacto@aldomatias.com
              </a>
            </div>
          </FooterColumn>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-fg-tertiary text-center">
              {(t('footer.copyright') as string).replace('{year}', String(currentYear))}
            </p>
            <p className="text-sm text-fg-quaternary text-center">
              {t('footer.builtWith') as string}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
