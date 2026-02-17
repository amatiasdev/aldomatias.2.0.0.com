"use client";

import Typography from '@/app/components/atoms/Typography';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import AnimatedSection from '@/app/components/templates/AnimatedSection';
import { useTranslation } from '@/contexts/LanguageContext';

interface IndustryItem {
  name: string;
  description: string;
}

const icons = [
  // Bank icon for Fintech
  <svg key="bank" className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
  </svg>,
  // Rocket icon for SaaS
  <svg key="rocket" className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>,
  // Shopping cart for E-commerce
  <svg key="cart" className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>,
  // Briefcase for Professional Services
  <svg key="briefcase" className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>,
  // Cog/factory for Manufacturing
  <svg key="factory" className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.58 3.14a1.266 1.266 0 01-1.84-1.12V9.825a1.266 1.266 0 01.627-1.092l5.58-3.14a1.266 1.266 0 011.84 1.12v7.363a1.266 1.266 0 01-.627 1.092zM17.42 15.17l-5.58 3.14a1.266 1.266 0 01-1.84-1.12V9.825a1.266 1.266 0 01.627-1.092l5.58-3.14a1.266 1.266 0 011.84 1.12v7.363a1.266 1.266 0 01-.627 1.092z" />
  </svg>,
  // Academic cap for Education
  <svg key="education" className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>,
];

export default function IndustriesSection() {
  const { t } = useTranslation();
  const items = t('industries.items') as IndustryItem[];

  return (
    <SectionWrapper background="dark" padding="xl" id="industries">
      <AnimatedSection animation="fadeInUp">
        <Typography as="h2" variant="h2" className="text-center mb-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          {t('industries.title') as string}
        </Typography>
        <Typography as="p" className="text-center text-fg-tertiary text-lg md:text-xl mb-12 md:mb-16">
          {t('industries.subtitle') as string}
        </Typography>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
            <div className="p-6 border border-border-subtle bg-bg-secondary/30 hover:border-accent-500/30 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                {icons[index]}
                <Typography as="h3" variant="h3" className="text-fg-primary font-bold text-lg">
                  {item.name}
                </Typography>
              </div>
              <Typography as="p" className="text-fg-tertiary text-sm leading-relaxed">
                {item.description}
              </Typography>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
