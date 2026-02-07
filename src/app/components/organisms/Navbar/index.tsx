"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/app/hooks/useScrollDirection';
import NavBrand from '@/app/components/molecules/NavBrand';
import NavMenu from '@/app/components/molecules/NavMenu';
import SocialLinks from '@/app/components/molecules/SocialLinks';
import LanguageSelector from '@/app/components/atoms/LanguageSelector';
import Button from '@/app/components/atoms/Button';
import { useTranslation } from '@/contexts/LanguageContext';

interface NavbarProps {
  variant?: 'transparent' | 'solid' | 'auto';
  hideOnScroll?: boolean;
  className?: string;
}

export default function Navbar({
  variant = 'auto',
  hideOnScroll = false,
  className = '',
}: NavbarProps) {
  const { t } = useTranslation();
  const { scrollDirection, scrollY } = useScrollDirection({ threshold: 10 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isScrolled = scrollY > 50;
  const shouldHide = hideOnScroll && scrollDirection === 'down' && scrollY > 200;

  const getNavbarStyle = () => {
    if (variant === 'solid') return 'solid';
    if (variant === 'transparent') return 'transparent';
    return isScrolled ? 'solid' : 'transparent';
  };

  const navbarStyle = getNavbarStyle();

  const baseClasses = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
  const styleClasses = navbarStyle === 'solid'
    ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle'
    : 'bg-transparent';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className={`${baseClasses} ${styleClasses} ${className}`}
        initial={{ y: 0 }}
        animate={{ y: shouldHide ? '-100%' : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <NavBrand />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <NavMenu />
              <div className="flex items-center gap-4">
                <LanguageSelector />
                <SocialLinks size={18} />
                <Button variant="primary" size="md" href="#contact">
                  {t('cta.getInTouch') as string}
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-4">
              <LanguageSelector />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-bg-tertiary hover:bg-bg-elevated rounded-sm transition-colors duration-300"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.span
                  className="w-6 h-0.5 bg-fg-primary"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-fg-primary"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-fg-primary"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();

  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-40 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="absolute top-20 left-0 right-0 bottom-0 bg-bg-primary border-t border-border-subtle overflow-y-auto"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="px-6 py-8 space-y-8">
          <NavMenu
            onItemClick={onClose}
            className="flex-col items-start gap-6"
          />

          <div className="pt-6 border-t border-border-subtle">
            <SocialLinks showLabels orientation="vertical" />
          </div>

          <Button
            variant="primary"
            size="lg"
            href="#contact"
            onClick={onClose}
            className="w-full"
          >
            {t('cta.getInTouch') as string}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
