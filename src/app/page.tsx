"use client";

import HeroSection from '@/app/components/sections/HeroSection';
import ProblemSection from '@/app/components/sections/ProblemSection';
import ServicesSection from '@/app/components/sections/ServicesSection';
import CredibilitySection from '@/app/components/sections/CredibilitySection';
import ProcessSection from '@/app/components/sections/ProcessSection';
import ContactSection from '@/app/components/sections/ContactSection';
import FAQSection from '@/app/components/sections/FAQSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      <CredibilitySection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
