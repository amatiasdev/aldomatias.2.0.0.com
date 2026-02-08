"use client";

import HeroSection from '@/app/components/sections/HeroSection';
import ProblemSection from '@/app/components/sections/ProblemSection';
import CredibilitySection from '@/app/components/sections/CredibilitySection';
import ServicesSection from '@/app/components/sections/ServicesSection';
import ProcessSection from '@/app/components/sections/ProcessSection';
import FAQSection from '@/app/components/sections/FAQSection';
import ContactSection from '@/app/components/sections/ContactSection';
import FloatingCTA from '@/app/components/molecules/FloatingCTA';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <CredibilitySection />
      <ServicesSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
      <FloatingCTA />
    </main>
  );
}
