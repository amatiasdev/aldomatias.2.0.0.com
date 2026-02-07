"use client";

import Image from 'next/image';
import Typography from '@/app/components/atoms/Typography';
import Badge from '@/app/components/atoms/Badge';
import StatCard from '@/app/components/molecules/StatCard';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface StatItem {
  value: string;
  label: string;
}

const techStack = ['AWS', 'n8n', 'Docker', 'Node.js', 'React', 'OWASP'];

export default function CredibilitySection() {
  const { t } = useTranslation();
  const stats = t('credibility.stats') as StatItem[];

  return (
    <SectionWrapper background="warm" padding="xl" id="credibility">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-12 md:mb-16 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          {t('credibility.title') as string}
        </Typography>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-12">
        {stats.map((stat, index) => (
          <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
            <StatCard value={stat.value} label={stat.label} />
          </AnimatedSection>
        ))}
      </div>

      {/* Experience line with BBVA logo */}
      <AnimatedSection animation="fadeInUp" delay={0.3}>
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <Image
              src="/bbva-logo.png"
              alt="BBVA Bank — experiencia en banca y servicios financieros"
              width={80}
              height={80}
              className="rounded"
            />
            <Typography as="p" className="text-fg-secondary text-base md:text-lg">
              {t('credibility.experience') as string}
            </Typography>
          </div>
        </div>
      </AnimatedSection>

      {/* Differentiator */}
      <AnimatedSection animation="fadeInUp" delay={0.35}>
        <div className="text-center mb-10">
          <Typography as="p" className="text-accent-500 font-semibold text-base md:text-lg max-w-2xl mx-auto">
            {t('credibility.differentiator') as string}
          </Typography>
        </div>
      </AnimatedSection>

      {/* Tech Stack */}
      <AnimatedSection animation="fadeInUp" delay={0.4}>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <Badge key={tech} variant="accent" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
