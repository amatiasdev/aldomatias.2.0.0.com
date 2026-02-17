"use client";

import Typography from '@/app/components/atoms/Typography';
import Button from '@/app/components/atoms/Button';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface ProblemItem {
  title: string;
  description: string;
}

const icons = [
  // Gear/cog icon for manual processes
  <svg key="gear" className="w-8 h-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.204-.107-.397.165-.71.505-.78.929l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Shield icon for security
  <svg key="shield" className="w-8 h-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
  </svg>,
  // Cloud icon for infrastructure
  <svg key="cloud" className="w-8 h-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
  </svg>,
];

export default function ProblemSection() {
  const { t } = useTranslation();
  const items = t('problem.items') as ProblemItem[];

  return (
    <SectionWrapper background="dark" padding="xl" id="problem">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          {t('problem.title') as string}
        </Typography>
        <Typography as="p" className="text-center text-fg-tertiary text-lg md:text-xl mb-12 md:mb-16">
          {t('problem.subtitle') as string}
        </Typography>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.15}>
            <div className="p-6 md:p-8 border border-border-subtle bg-bg-secondary/50 hover:border-accent-500/30">
              <div className="mb-4">
                {icons[index]}
              </div>
              <Typography as="h3" variant="h3" className="text-fg-primary font-bold mb-3 text-xl md:text-2xl">
                {item.title}
              </Typography>
              <Typography as="p" className="text-fg-tertiary leading-relaxed">
                {item.description}
              </Typography>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* CTA after problem */}
      <AnimatedSection animation="fadeInUp" delay={0.5}>
        <div className="text-center mt-12 md:mt-16">
          <Button variant="outline" size="lg" href="#contact" className="text-lg px-10 py-4 font-bold">
            {t('problem.cta') as string}
          </Button>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
