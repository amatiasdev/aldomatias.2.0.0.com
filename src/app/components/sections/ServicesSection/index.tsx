"use client";

import Typography from '@/app/components/atoms/Typography';
import Button from '@/app/components/atoms/Button';
import Badge from '@/app/components/atoms/Badge';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface ServiceItem {
  name: string;
  tagline: string;
  problem: string;
  description: string;
  includes: string[];
  time: string;
  hook: string;
  comparison: string;
}

export default function ServicesSection() {
  const { t } = useTranslation();
  const items = t('services.items') as ServiceItem[];

  return (
    <SectionWrapper background="charcoal" padding="xl" id="services">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          {t('services.title') as string}
        </Typography>
        <Typography as="p" className="text-center text-fg-tertiary text-lg md:text-xl mb-12 md:mb-16">
          {t('services.subtitle') as string}
        </Typography>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {items.map((service, index) => (
          <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.15}>
            <div className="flex flex-col h-full border border-border-subtle bg-bg-secondary/30 hover:border-accent-500/40 transition-all duration-300 group">
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-border-subtle">
                <Badge variant="accent" size="sm" className="mb-3">
                  {service.tagline}
                </Badge>
                <Typography as="h3" variant="h3" className="text-fg-primary font-bold mb-2">
                  {service.name}
                </Typography>
                <Typography as="p" className="text-accent-500 font-semibold text-sm">
                  {service.problem}
                </Typography>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1">
                <Typography as="p" className="text-fg-secondary mb-6 leading-relaxed">
                  {service.description}
                </Typography>

                {/* Includes */}
                <ul className="space-y-2 mb-6">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-fg-tertiary">
                      <svg className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer - Delivery & CTA */}
              <div className="p-6 md:p-8 border-t border-border-subtle mt-auto">
                <Typography as="p" className="text-xs text-fg-tertiary mb-3 leading-relaxed">
                  {service.comparison}
                </Typography>
                <div className="mb-3">
                  <span className="text-lg font-bold text-fg-primary">{service.time}</span>
                </div>
                <Typography as="p" className="text-sm text-accent-500/80 italic">
                  {service.hook}
                </Typography>
                <Button variant="ghost" size="sm" href="#contact" className="mt-4">
                  {t('services.cta') as string}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* CTA after services */}
      <AnimatedSection animation="fadeInUp" delay={0.5}>
        <div className="flex justify-center mt-12 md:mt-16">
          <Button
            variant="primary"
            size="lg"
            href="#contact"
            className="text-lg px-10 py-4 font-bold"
          >
            {t('services.cta') as string}
          </Button>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
