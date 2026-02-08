"use client";

import { Fragment } from 'react';
import Typography from '@/app/components/atoms/Typography';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

function ArrowConnector() {
  return (
    <div className="hidden md:flex items-center justify-center">
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-accent-500/30">
        <path d="M0 12H36M36 12L28 4M36 12L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function ProcessSection() {
  const { t } = useTranslation();
  const steps = t('process.steps') as ProcessStep[];

  return (
    <SectionWrapper background="gradient" padding="xl" id="process">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-12 md:mb-16 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          {t('process.title') as string}
        </Typography>
      </AnimatedSection>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 items-start">
          {steps.map((step, index) => (
            <Fragment key={`step-${index}`}>
              <AnimatedSection animation="fadeInUp" delay={index * 0.2}>
                <div className="text-center md:text-left">
                  <div className="text-6xl md:text-7xl font-black text-accent-500/20 mb-2 leading-none">
                    {step.number}
                  </div>
                  <Typography as="h3" variant="h3" className="text-fg-primary font-bold mb-3">
                    {step.title}
                  </Typography>
                  <Typography as="p" className="text-fg-tertiary leading-relaxed">
                    {step.description}
                  </Typography>
                </div>
              </AnimatedSection>
              {index < steps.length - 1 && (
                <AnimatedSection animation="fadeInUp" delay={index * 0.2 + 0.1}>
                  <div className="hidden md:flex items-center justify-center pt-8">
                    <ArrowConnector />
                  </div>
                </AnimatedSection>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
