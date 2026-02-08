"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function FloatingCTA() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pastHero = window.scrollY > window.innerHeight;
      const contactSection = document.getElementById('contact');
      let contactVisible = false;

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        contactVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }

      setVisible(pastHero && !contactVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#contact"
      className="fixed bottom-6 right-6 z-50 bg-accent-500 text-black font-bold px-6 py-3 rounded-full shadow-accent-lg hover:shadow-accent transition-all duration-300 flex items-center gap-2 text-sm"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      {t('cta.getInTouch') as string}
    </a>
  );
}
