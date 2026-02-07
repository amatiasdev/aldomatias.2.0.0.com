"use client";

import Typography from '@/app/components/atoms/Typography';
import ContactForm from '@/app/components/organisms/ContactForm';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <SectionWrapper background="slate" padding="xl" id="contact">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          {t('contact.title') as string}
        </Typography>
        <Typography as="p" className="text-center text-fg-tertiary text-lg md:text-xl mb-12 md:mb-16 max-w-2xl mx-auto">
          {t('contact.subtitle') as string}
        </Typography>
      </AnimatedSection>

      <div className="max-w-2xl mx-auto">
        <AnimatedSection animation="fadeInUp" delay={0.1}>
          <Typography as="p" className="text-center text-accent-500/80 text-sm mb-6">
            {t('contact.trustLine') as string}
          </Typography>
          <ContactForm />
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
