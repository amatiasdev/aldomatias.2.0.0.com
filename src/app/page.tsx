"use client";

import HeroSection from '@/app/components/sections/HeroSection';
import ExperienceSection from '@/app/components/sections/ExperienceSection';
import SkillsSection from '@/app/components/sections/SkillsSection';
import ContactSection from '@/app/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
