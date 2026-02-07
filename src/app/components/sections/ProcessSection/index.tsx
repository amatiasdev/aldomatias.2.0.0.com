"use client";

import Typography from '@/app/components/atoms/Typography';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export default function ProcessSection() {
  const { t } = useTranslation();
  const steps = t('process.steps') as ProcessStep[];

  return (
    <SectionWrapper background="dark" padding="xl" id="process">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-12 md:mb-16 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          {t('process.title') as string}
        </Typography>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.2}>
              <div className="text-center md:text-left">
                {/* Step number */}
                <div className="text-6xl md:text-7xl font-black text-accent-500/20 mb-2 leading-none">
                  {step.number}
                </div>

                {/* Arrow connector (desktop only, between steps) */}
                <Typography as="h3" variant="h3" className="text-fg-primary font-bold mb-3">
                  {step.title}
                </Typography>
                <Typography as="p" className="text-fg-tertiary leading-relaxed">
                  {step.description}
                </Typography>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
