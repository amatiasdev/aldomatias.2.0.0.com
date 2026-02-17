"use client";

import { useState } from 'react';
import Link from 'next/link';
import Typography from '@/app/components/atoms/Typography';
import Button from '@/app/components/atoms/Button';
import Badge from '@/app/components/atoms/Badge';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface RelatedService {
  name: string;
  href: string;
}

interface ServicePageTemplateProps {
  translationPrefix: string;
  relatedServices: RelatedService[];
}

export default function ServicePageTemplate({
  translationPrefix,
  relatedServices,
}: ServicePageTemplateProps) {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const name = t(`${translationPrefix}.name`) as string;
  const tagline = t(`${translationPrefix}.tagline`) as string;
  const heroDescription = t(`${translationPrefix}.heroDescription`) as string;
  const problemTitle = t(`${translationPrefix}.problemTitle`) as string;
  const problemDescription = t(`${translationPrefix}.problemDescription`) as string;
  const solutionTitle = t(`${translationPrefix}.solutionTitle`) as string;
  const solutionDescription = t(`${translationPrefix}.solutionDescription`) as string;
  const includes = t(`${translationPrefix}.includes`) as string[];
  const deliveryTime = t(`${translationPrefix}.deliveryTime`) as string;
  const hook = t(`${translationPrefix}.hook`) as string;
  const faqs = t(`${translationPrefix}.faqs`) as ServiceFAQ[];
  const ctaText = t(`${translationPrefix}.cta`) as string;
  const faqTitle = t(`${translationPrefix}.faqTitle`) as string;
  const includesTitle = t(`${translationPrefix}.includesTitle`) as string;
  const relatedTitle = t(`${translationPrefix}.relatedTitle`) as string;

  return (
    <>
      {/* Hero */}
      <SectionWrapper background="dark" padding="xl">
        <AnimatedSection animation="fadeInUp">
          <Badge variant="accent" size="sm" className="mb-4">
            {tagline}
          </Badge>
          <Typography as="h1" variant="h1" className="mb-6 text-fg-primary">
            {name}
          </Typography>
          <Typography as="p" className="text-fg-secondary text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
            {heroDescription}
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" href="/#contact">
              {ctaText}
            </Button>
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* Problem */}
      <SectionWrapper background="charcoal" padding="xl">
        <AnimatedSection animation="fadeInUp">
          <Typography as="h2" variant="h2" className="mb-6 text-fg-primary">
            {problemTitle}
          </Typography>
          <Typography as="p" className="text-fg-secondary text-lg leading-relaxed max-w-4xl">
            {problemDescription}
          </Typography>
        </AnimatedSection>
      </SectionWrapper>

      {/* Solution + Deliverables */}
      <SectionWrapper background="dark" padding="xl">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <AnimatedSection animation="fadeInUp">
            <Typography as="h2" variant="h3" className="mb-6 text-fg-primary">
              {solutionTitle}
            </Typography>
            <Typography as="p" className="text-fg-secondary leading-relaxed mb-6">
              {solutionDescription}
            </Typography>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-accent-500">{deliveryTime}</span>
            </div>
            <Typography as="p" className="text-sm text-accent-500/80 italic">
              {hook}
            </Typography>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.15}>
            <Typography as="h3" variant="h4" className="mb-6 text-fg-primary">
              {includesTitle}
            </Typography>
            <ul className="space-y-3">
              {includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-fg-secondary">
                  <svg className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="charcoal" padding="xl">
        <AnimatedSection animation="fadeInUp">
          <Typography as="h2" variant="h2" className="text-center mb-12 text-fg-primary">
            {faqTitle}
          </Typography>
        </AnimatedSection>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
              <div className="border border-border-subtle bg-bg-secondary/30">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-secondary/50 transition-colors duration-200"
                    aria-expanded={openFAQ === index}
                  >
                    <span className="text-fg-primary font-semibold pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-accent-500 flex-shrink-0 transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </h3>
                <div
                  aria-hidden={openFAQ !== index}
                  className={`overflow-hidden transition-all duration-200 ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6">
                    <Typography as="p" className="text-fg-tertiary leading-relaxed">
                      {faq.answer}
                    </Typography>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </SectionWrapper>

      {/* Related Services */}
      <SectionWrapper background="dark" padding="xl">
        <AnimatedSection animation="fadeInUp">
          <Typography as="h2" variant="h3" className="text-center mb-8 text-fg-primary">
            {relatedTitle}
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {relatedServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="px-6 py-4 border border-border-subtle bg-bg-secondary/30 hover:border-accent-500/40 transition-colors text-center"
              >
                <span className="text-fg-primary font-semibold">{service.name}</span>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper background="charcoal" padding="xl">
        <AnimatedSection animation="fadeInUp">
          <div className="text-center">
            <Typography as="h2" variant="h3" className="mb-6 text-fg-primary">
              {t(`${translationPrefix}.finalCta`) as string}
            </Typography>
            <Button variant="primary" size="lg" href="/#contact">
              {ctaText}
            </Button>
          </div>
        </AnimatedSection>
      </SectionWrapper>
    </>
  );
}
