"use client";

import { useState } from 'react';
import Typography from '@/app/components/atoms/Typography';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const { t } = useTranslation();
  const items = t('faq.items') as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper background="charcoal" padding="xl" id="faq">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-12 md:mb-16 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          {t('faq.title') as string}
        </Typography>
      </AnimatedSection>

      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, index) => (
          <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
            <div className="border border-border-subtle bg-bg-secondary/30">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-secondary/50 transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <Typography as="span" className="text-fg-primary font-semibold pr-4">
                  {item.question}
                </Typography>
                <svg
                  className={`w-5 h-5 text-accent-500 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6">
                  <Typography as="p" className="text-fg-tertiary leading-relaxed">
                    {item.answer}
                  </Typography>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
