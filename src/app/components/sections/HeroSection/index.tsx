"use client";

import Hero from '@/app/components/organisms/Hero';
import SectionWrapper from '@/app/components/templates/SectionWrapper';
import { useCVModal } from '@/contexts/CVModalContext';

export default function HeroSection() {
  const { openModal } = useCVModal();

  return (
    <SectionWrapper background="gradient" padding="lg" fullWidth id="home">
      <Hero
        title="ALDO MATIAS"
        subtitle="Cloud Infrastructure Engineer & Front-End Developer"
        description="Building scalable solutions with AWS, React, and modern web technologies. Based in Dublin, Ireland."
        ctaPrimary={{
          label: "View Projects",
          href: "#experience",
        }}
        ctaSecondary={{
          label: "View CV",
          onClick: openModal,
        }}
      />
    </SectionWrapper>
  );
}
