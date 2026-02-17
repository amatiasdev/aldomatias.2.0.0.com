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

interface CaseStudy {
  title: string;
  description: string;
}

const techStack = ['AWS', 'n8n', 'Docker', 'Node.js', 'React', 'OWASP'];

export default function CredibilitySection() {
  const { t } = useTranslation();
  const stats = t('credibility.stats') as StatItem[];
  const caseStudy = t('credibility.caseStudy') as CaseStudy;

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

      {/* Companies logo bar */}
      <AnimatedSection animation="fadeInUp" delay={0.2}>
        <div className="text-center mb-10">
          <Typography as="p" className="text-fg-tertiary text-sm uppercase tracking-wider mb-6">
            {t('credibility.companiesTitle') as string}
          </Typography>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-60">
            <Image src="/bbva-logo.png" alt="BBVA Bank" width={48} height={48} className="rounded" sizes="48px" />
            <Image src="/IT-KEEPER-logo.png" alt="IT-KEEPER" width={48} height={48} className="rounded" sizes="48px" />
            <Image src="/AHEA-logo.png" alt="AHEA University" width={48} height={48} className="rounded" sizes="48px" />
            <Image src="/ksh.png" alt="Kristal Software House" width={48} height={48} className="rounded" sizes="48px" />
            <Image src="/admon-oaxaca.jpg" alt="Gobierno de Oaxaca" width={48} height={48} className="rounded" sizes="48px" />
          </div>
        </div>
      </AnimatedSection>

      {/* Experience line with BBVA logo */}
      <AnimatedSection animation="fadeInUp" delay={0.3}>
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <Image
              src="/bbva-logo.png"
              alt="BBVA Bank"
              width={80}
              height={80}
              className="rounded"
              sizes="80px"
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

      {/* Micro case study */}
      <AnimatedSection animation="fadeInUp" delay={0.4}>
        <div className="max-w-2xl mx-auto mb-10 border border-border-subtle bg-bg-secondary/30 overflow-hidden">
          <Image
            src="/whatsappsummary-dashboard.png"
            alt="WhatsApp Executive Summary — AI-powered executive intelligence platform"
            width={800}
            height={400}
            className="w-full"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div className="p-6">
            <Typography as="p" className="text-fg-primary font-semibold mb-2">
              {caseStudy.title}
            </Typography>
            <Typography as="p" className="text-fg-tertiary text-sm leading-relaxed">
              {caseStudy.description}
            </Typography>
          </div>
        </div>
      </AnimatedSection>

      {/* Tech Stack */}
      <AnimatedSection animation="fadeInUp" delay={0.45}>
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
