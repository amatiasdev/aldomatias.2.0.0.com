# Navigation & Footer Component Architecture
## Paul Taylor-Inspired Design System

**Date**: 2025-10-02
**Stack**: Next.js 15 + React 19 RC + TypeScript + Framer Motion + Tailwind CSS
**Design Philosophy**: Micro-interactions, fluid animations, accessibility-first

---

## Table of Contents
1. [Component Tree Architecture](#component-tree-architecture)
2. [TypeScript Interfaces & Types](#typescript-interfaces--types)
3. [File Structure](#file-structure)
4. [Navbar Architecture](#navbar-architecture)
5. [Footer Architecture](#footer-architecture)
6. [Shared Patterns](#shared-patterns)
7. [Performance Optimization](#performance-optimization)
8. [Implementation Guide](#implementation-guide)

---

## Component Tree Architecture

### Navbar Component Tree
```
Navbar (Organism)
├── NavbarContainer (wrapper with scroll logic)
│   ├── NavbarLogo (Molecule)
│   │   └── Link (Atom)
│   │       └── Logo/Image
│   ├── NavbarMenu (Molecule - Desktop)
│   │   ├── NavItem (Molecule) × N
│   │   │   ├── Link (Atom)
│   │   │   └── ActiveIndicator (animated underline)
│   │   ├── ThemeToggle (Molecule)
│   │   │   └── Icon (Atom)
│   │   └── CTAButton (Molecule)
│   │       └── Button (Atom)
│   └── MobileNavToggle (Molecule - Mobile)
│       └── Icon (Atom)
│
└── MobileMenu (Organism - Conditional)
    ├── MobileMenuOverlay (backdrop)
    ├── MobileMenuPanel (sliding panel)
    │   ├── MobileMenuHeader
    │   │   ├── Logo
    │   │   └── CloseButton
    │   ├── MobileNavList
    │   │   └── MobileNavItem × N
    │   ├── MobileActions
    │   │   ├── ThemeToggle
    │   │   └── CTAButton
    │   └── MobileSocials
    │       └── SocialLink × N
```

### Footer Component Tree
```
Footer (Organism)
├── FooterContainer
│   ├── FooterMain (top section)
│   │   ├── FooterBrand (Molecule - Left)
│   │   │   ├── Logo
│   │   │   ├── Typography (tagline)
│   │   │   └── SocialLinks (Molecule)
│   │   │       └── SocialLink (Atom) × N
│   │   ├── FooterNav (Molecule - Center)
│   │   │   └── FooterNavGroup × N
│   │   │       ├── Typography (heading)
│   │   │       └── FooterNavLink (Atom) × N
│   │   └── FooterNewsletter (Molecule - Right)
│   │       ├── Typography (heading)
│   │       ├── Typography (description)
│   │       └── NewsletterForm (Molecule)
│   │           ├── Input (Atom)
│   │           └── Button (Atom)
│   └── FooterBottom (bottom section)
│       ├── Copyright (Molecule)
│       │   └── Typography
│       └── LegalLinks (Molecule)
│           └── Link (Atom) × N
```

---

## TypeScript Interfaces & Types

### Core Navigation Types

```typescript
// src/app/types/navigation.ts

import { ReactNode } from 'react';

/**
 * Navigation item configuration
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
  disabled?: boolean;
  subitems?: NavItem[];
}

/**
 * Navbar variant types
 */
export type NavbarVariant = 'transparent' | 'solid' | 'blur';

/**
 * Navbar state derived from scroll position
 */
export interface NavbarScrollState {
  variant: NavbarVariant;
  isHidden: boolean;
  hasScrolled: boolean;
  scrollProgress: number; // 0-1 for progress indicators
}

/**
 * Navbar component props
 */
export interface NavbarProps {
  /** Navigation items to display */
  items: NavItem[];

  /** Logo configuration */
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };

  /** CTA button configuration */
  cta?: {
    label: string;
    href: string;
    onClick?: () => void;
  };

  /** Initial variant (overrides scroll behavior) */
  variant?: NavbarVariant;

  /** Enable/disable auto-hide on scroll down */
  autoHide?: boolean;

  /** Scroll threshold for state changes (px) */
  scrollThreshold?: number;

  /** Show progress indicator */
  showProgress?: boolean;

  /** Custom className */
  className?: string;
}

/**
 * Mobile menu state
 */
export interface MobileMenuState {
  isOpen: boolean;
  activeSubmenu: string | null;
  focusTrapEnabled: boolean;
}

/**
 * Theme toggle props
 */
export interface ThemeToggleProps {
  /** Current theme */
  theme: 'light' | 'dark';

  /** Theme change handler */
  onToggle: (theme: 'light' | 'dark') => void;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Show label */
  showLabel?: boolean;
}
```

### Footer Types

```typescript
// src/app/types/footer.ts

import { ReactNode } from 'react';

/**
 * Footer navigation group
 */
export interface FooterNavGroup {
  title: string;
  links: FooterNavLink[];
}

/**
 * Footer navigation link
 */
export interface FooterNavLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

/**
 * Social platform configuration
 */
export interface SocialPlatform {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'leetcode' | 'stackoverflow';
  url: string;
  label?: string;
}

/**
 * Newsletter form state
 */
export interface NewsletterFormData {
  email: string;
}

export interface NewsletterFormState {
  data: NewsletterFormData;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

/**
 * Footer component props
 */
export interface FooterProps {
  /** Brand/logo configuration */
  brand?: {
    logo?: string;
    tagline?: string;
  };

  /** Navigation groups */
  navGroups?: FooterNavGroup[];

  /** Social links */
  socials?: SocialPlatform[];

  /** Newsletter configuration */
  newsletter?: {
    enabled: boolean;
    title?: string;
    description?: string;
    onSubmit?: (email: string) => Promise<void>;
  };

  /** Copyright configuration */
  copyright?: {
    year?: number;
    holder?: string;
    customText?: string;
  };

  /** Legal/policy links */
  legalLinks?: FooterNavLink[];

  /** Custom className */
  className?: string;
}

/**
 * Footer section animation config
 */
export interface FooterAnimationConfig {
  enabled: boolean;
  threshold: number;
  staggerDelay: number;
}
```

### Shared Component Types

```typescript
// src/app/types/components.ts (additions)

/**
 * Active link indicator props
 */
export interface ActiveIndicatorProps {
  isActive: boolean;
  variant?: 'underline' | 'pill' | 'dot';
  color?: string;
}

/**
 * Logo component props
 */
export interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Newsletter form props
 */
export interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  placeholder?: string;
  buttonLabel?: string;
  variant?: 'inline' | 'stacked';
}

/**
 * Menu overlay props
 */
export interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: 'blur' | 'solid' | 'gradient';
}

/**
 * Scroll progress indicator props
 */
export interface ScrollProgressProps {
  variant?: 'line' | 'circle' | 'percentage';
  color?: string;
  position?: 'top' | 'bottom';
  showOnScroll?: boolean;
}
```

---

## File Structure

```
src/app/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   └── index.tsx (existing - enhance with variants)
│   │   ├── Icon/
│   │   │   └── index.tsx (existing - add new icons)
│   │   ├── Link/
│   │   │   └── index.tsx (existing)
│   │   ├── Logo/
│   │   │   └── index.tsx (NEW)
│   │   ├── ActiveIndicator/
│   │   │   └── index.tsx (NEW)
│   │   └── ScrollProgress/
│   │       └── index.tsx (NEW)
│   │
│   ├── molecules/
│   │   ├── NavItem/
│   │   │   └── index.tsx (existing - enhance)
│   │   ├── MobileNavItem/
│   │   │   └── index.tsx (NEW)
│   │   ├── ThemeToggle/
│   │   │   └── index.tsx (NEW)
│   │   ├── NavbarLogo/
│   │   │   └── index.tsx (NEW)
│   │   ├── SocialLink/
│   │   │   └── index.tsx (existing - enhance)
│   │   ├── SocialLinks/
│   │   │   └── index.tsx (NEW)
│   │   ├── FooterBrand/
│   │   │   └── index.tsx (NEW)
│   │   ├── FooterNavGroup/
│   │   │   └── index.tsx (NEW)
│   │   ├── NewsletterForm/
│   │   │   └── index.tsx (NEW)
│   │   ├── MenuOverlay/
│   │   │   └── index.tsx (NEW)
│   │   └── Copyright/
│   │       └── index.tsx (NEW)
│   │
│   ├── organisms/
│   │   ├── Navbar/
│   │   │   ├── index.tsx (NEW)
│   │   │   ├── NavbarDesktop.tsx (NEW)
│   │   │   ├── NavbarMobile.tsx (NEW)
│   │   │   └── useNavbar.ts (NEW - hook)
│   │   ├── MobileMenu/
│   │   │   ├── index.tsx (NEW)
│   │   │   └── useMobileMenu.ts (NEW - hook)
│   │   └── Footer/
│   │       ├── index.tsx (NEW)
│   │       ├── FooterMain.tsx (NEW)
│   │       └── FooterBottom.tsx (NEW)
│   │
│   └── layout/
│       ├── MainNav.tsx (NEW - navbar wrapper for layout)
│       └── MainFooter.tsx (NEW - footer wrapper for layout)
│
├── hooks/
│   ├── useScrollPosition.ts (existing)
│   ├── useMediaQuery.ts (existing)
│   ├── useScrollDirection.ts (NEW)
│   ├── useTheme.ts (NEW)
│   ├── useFocusTrap.ts (NEW)
│   ├── useScrollProgress.ts (NEW)
│   └── useActiveSection.ts (NEW)
│
├── constants/
│   ├── animations.ts (existing - add navbar/footer variants)
│   ├── navigation.ts (NEW)
│   └── footer.ts (NEW)
│
└── types/
    ├── components.ts (existing - extend)
    ├── navigation.ts (NEW)
    └── footer.ts (NEW)
```

---

## Navbar Architecture

### 1. Main Navbar Component

**File**: `src/app/components/organisms/Navbar/index.tsx`

```typescript
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useNavbar } from './useNavbar';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';
import MobileMenu from '@/app/components/organisms/MobileMenu';
import ScrollProgress from '@/app/components/atoms/ScrollProgress';
import { NavbarProps } from '@/app/types/navigation';

export default function Navbar({
  items,
  logo,
  cta,
  variant: initialVariant,
  autoHide = true,
  scrollThreshold = 50,
  showProgress = false,
  className = '',
}: NavbarProps) {
  const {
    scrollState,
    mobileMenuState,
    isMobile,
    activeItem,
    toggleMobileMenu,
    closeMobileMenu,
    setActiveItem,
  } = useNavbar({
    autoHide,
    scrollThreshold,
    initialVariant,
  });

  const navbarVariants = {
    transparent: {
      backgroundColor: 'rgba(10, 10, 10, 0)',
      backdropFilter: 'blur(0px)',
      borderColor: 'rgba(255, 255, 255, 0)',
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    },
    solid: {
      backgroundColor: 'rgba(10, 10, 10, 1)',
      backdropFilter: 'blur(0px)',
      borderColor: 'rgba(42, 42, 42, 1)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    blur: {
      backgroundColor: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(12px)',
      borderColor: 'rgba(42, 42, 42, 0.5)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  };

  const hideVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-90 border-b ${className}`}
        initial="transparent"
        animate={scrollState.variant}
        variants={navbarVariants}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          animate={scrollState.isHidden ? 'hidden' : 'visible'}
          variants={hideVariants}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Desktop Navbar */}
          {!isMobile && (
            <NavbarDesktop
              items={items}
              logo={logo}
              cta={cta}
              activeItem={activeItem}
              onItemClick={setActiveItem}
              hasScrolled={scrollState.hasScrolled}
            />
          )}

          {/* Mobile Navbar */}
          {isMobile && (
            <NavbarMobile
              logo={logo}
              isMenuOpen={mobileMenuState.isOpen}
              onMenuToggle={toggleMobileMenu}
              hasScrolled={scrollState.hasScrolled}
            />
          )}
        </motion.div>

        {/* Scroll Progress Indicator */}
        {showProgress && (
          <ScrollProgress
            variant="line"
            position="bottom"
            color="var(--accent-500)"
            showOnScroll
          />
        )}
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && mobileMenuState.isOpen && (
          <MobileMenu
            items={items}
            cta={cta}
            isOpen={mobileMenuState.isOpen}
            onClose={closeMobileMenu}
            activeItem={activeItem}
            onItemClick={(item) => {
              setActiveItem(item);
              closeMobileMenu();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
```

### 2. Navbar Hook (State Management)

**File**: `src/app/components/organisms/Navbar/useNavbar.ts`

```typescript
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useScrollPosition } from '@/app/hooks/useScrollPosition';
import { useScrollDirection } from '@/app/hooks/useScrollDirection';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import { useActiveSection } from '@/app/hooks/useActiveSection';
import { NavbarVariant, NavbarScrollState, MobileMenuState } from '@/app/types/navigation';

interface UseNavbarProps {
  autoHide?: boolean;
  scrollThreshold?: number;
  initialVariant?: NavbarVariant;
}

export function useNavbar({
  autoHide = true,
  scrollThreshold = 50,
  initialVariant,
}: UseNavbarProps = {}) {
  const { scrollY, isScrolled } = useScrollPosition(scrollThreshold);
  const scrollDirection = useScrollDirection();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const activeSection = useActiveSection();

  // Navbar scroll state
  const [scrollState, setScrollState] = useState<NavbarScrollState>({
    variant: initialVariant || 'transparent',
    isHidden: false,
    hasScrolled: false,
    scrollProgress: 0,
  });

  // Mobile menu state
  const [mobileMenuState, setMobileMenuState] = useState<MobileMenuState>({
    isOpen: false,
    activeSubmenu: null,
    focusTrapEnabled: false,
  });

  // Active navigation item
  const [activeItem, setActiveItem] = useState<string | null>(activeSection);

  // Update navbar variant based on scroll
  useEffect(() => {
    if (initialVariant) {
      setScrollState(prev => ({ ...prev, variant: initialVariant }));
      return;
    }

    let variant: NavbarVariant = 'transparent';

    if (scrollY > scrollThreshold * 2) {
      variant = 'blur';
    } else if (scrollY > scrollThreshold) {
      variant = 'solid';
    }

    setScrollState(prev => ({
      ...prev,
      variant,
      hasScrolled: isScrolled,
      scrollProgress: Math.min(scrollY / 1000, 1),
    }));
  }, [scrollY, scrollThreshold, isScrolled, initialVariant]);

  // Auto-hide on scroll down
  useEffect(() => {
    if (!autoHide) return;

    const shouldHide =
      scrollDirection === 'down' &&
      scrollY > scrollThreshold * 3 &&
      !mobileMenuState.isOpen;

    setScrollState(prev => ({
      ...prev,
      isHidden: shouldHide,
    }));
  }, [scrollDirection, scrollY, scrollThreshold, autoHide, mobileMenuState.isOpen]);

  // Sync active item with active section
  useEffect(() => {
    setActiveItem(activeSection);
  }, [activeSection]);

  // Mobile menu handlers
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
      focusTrapEnabled: !prev.isOpen,
    }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuState({
      isOpen: false,
      activeSubmenu: null,
      focusTrapEnabled: false,
    });
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuState.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuState.isOpen]);

  return {
    scrollState,
    mobileMenuState,
    isMobile,
    activeItem,
    toggleMobileMenu,
    closeMobileMenu,
    setActiveItem,
  };
}
```

### 3. Desktop Navbar

**File**: `src/app/components/organisms/Navbar/NavbarDesktop.tsx`

```typescript
"use client";

import { motion } from 'framer-motion';
import NavbarLogo from '@/app/components/molecules/NavbarLogo';
import NavItem from '@/app/components/molecules/NavItem';
import ThemeToggle from '@/app/components/molecules/ThemeToggle';
import Button from '@/app/components/atoms/Button';
import { NavItem as NavItemType, NavbarProps } from '@/app/types/navigation';

interface NavbarDesktopProps {
  items: NavItemType[];
  logo?: NavbarProps['logo'];
  cta?: NavbarProps['cta'];
  activeItem: string | null;
  onItemClick: (item: string) => void;
  hasScrolled: boolean;
}

export default function NavbarDesktop({
  items,
  logo,
  cta,
  activeItem,
  onItemClick,
  hasScrolled,
}: NavbarDesktopProps) {
  return (
    <nav className="container mx-auto px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {logo && <NavbarLogo {...logo} />}
        </motion.div>

        {/* Navigation Items */}
        <motion.div
          className="flex items-center space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <NavItem
                label={item.label}
                href={item.href}
                external={item.external}
                active={activeItem === item.href}
                onClick={() => onItemClick(item.href)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Actions (Theme + CTA) */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <ThemeToggle size="md" />

          {cta && (
            <Button
              variant="primary"
              size="md"
              onClick={cta.onClick}
              href={cta.href}
            >
              {cta.label}
            </Button>
          )}
        </motion.div>
      </div>
    </nav>
  );
}
```

### 4. Mobile Navbar

**File**: `src/app/components/organisms/Navbar/NavbarMobile.tsx`

```typescript
"use client";

import { motion } from 'framer-motion';
import NavbarLogo from '@/app/components/molecules/NavbarLogo';
import ThemeToggle from '@/app/components/molecules/ThemeToggle';
import Icon from '@/app/components/atoms/Icon';
import { NavbarProps } from '@/app/types/navigation';

interface NavbarMobileProps {
  logo?: NavbarProps['logo'];
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  hasScrolled: boolean;
}

export default function NavbarMobile({
  logo,
  isMenuOpen,
  onMenuToggle,
  hasScrolled,
}: NavbarMobileProps) {
  return (
    <nav className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {logo && <NavbarLogo {...logo} width={40} height={40} />}
        </motion.div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle size="sm" />

          <motion.button
            onClick={onMenuToggle}
            className="relative z-100 w-10 h-10 flex items-center justify-center"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-6 h-5">
              <motion.span
                className="absolute left-0 h-0.5 bg-fg-primary"
                style={{ width: '100%' }}
                animate={isMenuOpen ? {
                  top: '50%',
                  rotate: 45,
                  translateY: '-50%'
                } : {
                  top: '0%',
                  rotate: 0,
                  translateY: '0%'
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.span
                className="absolute left-0 top-1/2 h-0.5 bg-fg-primary -translate-y-1/2"
                style={{ width: '100%' }}
                animate={isMenuOpen ? {
                  opacity: 0,
                  scale: 0
                } : {
                  opacity: 1,
                  scale: 1
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.span
                className="absolute left-0 h-0.5 bg-fg-primary"
                style={{ width: '100%' }}
                animate={isMenuOpen ? {
                  bottom: '50%',
                  rotate: -45,
                  translateY: '50%'
                } : {
                  bottom: '0%',
                  rotate: 0,
                  translateY: '0%'
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
```

### 5. Mobile Menu Overlay

**File**: `src/app/components/organisms/MobileMenu/index.tsx`

```typescript
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useFocusTrap } from '@/app/hooks/useFocusTrap';
import MobileNavItem from '@/app/components/molecules/MobileNavItem';
import Button from '@/app/components/atoms/Button';
import SocialLinks from '@/app/components/molecules/SocialLinks';
import { NavItem, NavbarProps } from '@/app/types/navigation';
import { SOCIAL_LINKS } from '@/app/constants/footer';

interface MobileMenuProps {
  items: NavItem[];
  cta?: NavbarProps['cta'];
  isOpen: boolean;
  onClose: () => void;
  activeItem: string | null;
  onItemClick: (href: string) => void;
}

export default function MobileMenu({
  items,
  cta,
  isOpen,
  onClose,
  activeItem,
  onItemClick,
}: MobileMenuProps) {
  const menuRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      }
    },
    exit: {
      x: '100%',
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1],
      }
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-80 bg-bg-primary/95 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            className="fixed top-0 right-0 bottom-0 z-90 w-full max-w-md bg-bg-secondary border-l border-border-default overflow-y-auto"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full p-6">
              {/* Menu Items */}
              <nav className="flex-1 pt-20">
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.href}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <MobileNavItem
                        {...item}
                        active={activeItem === item.href}
                        onClick={() => onItemClick(item.href)}
                      />
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA Button */}
              {cta && (
                <motion.div
                  className="py-6 border-t border-border-subtle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={cta.onClick}
                    href={cta.href}
                    className="w-full"
                  >
                    {cta.label}
                  </Button>
                </motion.div>
              )}

              {/* Social Links */}
              <motion.div
                className="py-6 border-t border-border-subtle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <SocialLinks
                  platforms={SOCIAL_LINKS}
                  size="lg"
                  align="center"
                />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## Footer Architecture

### 1. Main Footer Component

**File**: `src/app/components/organisms/Footer/index.tsx`

```typescript
"use client";

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver';
import FooterMain from './FooterMain';
import FooterBottom from './FooterBottom';
import { FooterProps } from '@/app/types/footer';
import { fadeInUp, staggerContainer } from '@/app/constants/animations';

export default function Footer({
  brand,
  navGroups = [],
  socials = [],
  newsletter,
  copyright,
  legalLinks = [],
  className = '',
}: FooterProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.footer
      ref={ref}
      className={`bg-bg-primary border-t border-border-subtle ${className}`}
      initial="initial"
      animate={isIntersecting ? 'animate' : 'initial'}
      variants={staggerContainer}
    >
      {/* Main Footer Content */}
      <FooterMain
        brand={brand}
        navGroups={navGroups}
        socials={socials}
        newsletter={newsletter}
      />

      {/* Bottom Bar */}
      <FooterBottom
        copyright={copyright}
        legalLinks={legalLinks}
      />
    </motion.footer>
  );
}
```

### 2. Footer Main Section

**File**: `src/app/components/organisms/Footer/FooterMain.tsx`

```typescript
"use client";

import { motion } from 'framer-motion';
import FooterBrand from '@/app/components/molecules/FooterBrand';
import FooterNavGroup from '@/app/components/molecules/FooterNavGroup';
import NewsletterForm from '@/app/components/molecules/NewsletterForm';
import Typography from '@/app/components/atoms/Typography';
import { FooterProps } from '@/app/types/footer';
import { fadeInUp } from '@/app/constants/animations';

interface FooterMainProps {
  brand?: FooterProps['brand'];
  navGroups: FooterProps['navGroups'];
  socials: FooterProps['socials'];
  newsletter?: FooterProps['newsletter'];
}

export default function FooterMain({
  brand,
  navGroups = [],
  socials = [],
  newsletter,
}: FooterMainProps) {
  return (
    <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Brand Section */}
        <motion.div
          className="lg:col-span-4"
          variants={fadeInUp}
        >
          <FooterBrand
            logo={brand?.logo}
            tagline={brand?.tagline}
            socials={socials}
          />
        </motion.div>

        {/* Navigation Groups */}
        <motion.div
          className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8"
          variants={fadeInUp}
        >
          {navGroups.map((group, index) => (
            <FooterNavGroup
              key={group.title}
              title={group.title}
              links={group.links}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Newsletter Section */}
        {newsletter?.enabled && (
          <motion.div
            className="lg:col-span-3"
            variants={fadeInUp}
          >
            <Typography variant="h4" className="mb-2">
              {newsletter.title || 'Stay Updated'}
            </Typography>
            <Typography
              variant="body"
              className="text-fg-tertiary mb-6"
            >
              {newsletter.description || 'Get the latest updates and insights.'}
            </Typography>
            <NewsletterForm
              onSubmit={newsletter.onSubmit || (async () => {})}
              placeholder="your@email.com"
              buttonLabel="Subscribe"
              variant="stacked"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

### 3. Footer Bottom Section

**File**: `src/app/components/organisms/Footer/FooterBottom.tsx`

```typescript
"use client";

import { motion } from 'framer-motion';
import Copyright from '@/app/components/molecules/Copyright';
import Link from '@/app/components/atoms/Link';
import { FooterProps } from '@/app/types/footer';
import { fadeInUp } from '@/app/constants/animations';

interface FooterBottomProps {
  copyright?: FooterProps['copyright'];
  legalLinks: FooterProps['legalLinks'];
}

export default function FooterBottom({
  copyright,
  legalLinks = [],
}: FooterBottomProps) {
  return (
    <motion.div
      className="border-t border-border-subtle"
      variants={fadeInUp}
    >
      <div className="container mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <Copyright
            year={copyright?.year}
            holder={copyright?.holder}
            customText={copyright?.customText}
          />

          {/* Legal Links */}
          {legalLinks.length > 0 && (
            <div className="flex items-center space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  external={link.external}
                  className="text-sm text-fg-tertiary hover:text-accent-500 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

---

## Shared Patterns

### Key Reusable Components

#### 1. ActiveIndicator

**File**: `src/app/components/atoms/ActiveIndicator/index.tsx`

```typescript
"use client";

import { motion } from 'framer-motion';
import { ActiveIndicatorProps } from '@/app/types/components';

export default function ActiveIndicator({
  isActive,
  variant = 'underline',
  color = 'var(--accent-500)',
}: ActiveIndicatorProps) {
  if (variant === 'underline') {
    return (
      <motion.span
        className="absolute bottom-0 left-0 h-0.5"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: isActive ? '100%' : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    );
  }

  if (variant === 'pill') {
    return (
      <motion.span
        className="absolute inset-0 rounded-full -z-10"
        style={{ backgroundColor: color, opacity: 0.15 }}
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    );
  }

  if (variant === 'dot') {
    return (
      <motion.span
        className="absolute -right-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    );
  }

  return null;
}
```

#### 2. Enhanced NavItem

**File**: `src/app/components/molecules/NavItem/index.tsx`

```typescript
"use client";

import { motion } from 'framer-motion';
import Link from '@/app/components/atoms/Link';
import ActiveIndicator from '@/app/components/atoms/ActiveIndicator';
import Badge from '@/app/components/atoms/Badge';
import { NavItemProps } from '@/app/types/navigation';

interface EnhancedNavItemProps extends NavItemProps {
  onClick?: () => void;
  badge?: string;
  showIndicator?: boolean;
}

export default function NavItem({
  label,
  href,
  active = false,
  external = false,
  badge,
  showIndicator = true,
  onClick,
}: EnhancedNavItemProps) {
  return (
    <motion.div
      className="relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        external={external}
        className={`
          relative inline-flex items-center gap-2 text-sm font-semibold
          uppercase tracking-wider transition-colors duration-300
          ${active ? 'text-accent-500' : 'text-fg-tertiary hover:text-fg-primary'}
        `}
        onClick={onClick}
      >
        {label}
        {badge && (
          <Badge variant="accent" size="sm">
            {badge}
          </Badge>
        )}
        {showIndicator && (
          <ActiveIndicator isActive={active} variant="underline" />
        )}
      </Link>
    </motion.div>
  );
}
```

#### 3. ThemeToggle

**File**: `src/app/components/molecules/ThemeToggle/index.tsx`

```typescript
"use client";

import { motion } from 'framer-motion';
import { useTheme } from '@/app/hooks/useTheme';
import { ThemeToggleProps } from '@/app/types/navigation';

export default function ThemeToggle({
  size = 'md',
  showLabel = false,
}: Omit<ThemeToggleProps, 'theme' | 'onToggle'>) {
  const { theme, toggleTheme } = useTheme();

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={toggleTheme}
        className={`
          ${sizes[size]} relative flex items-center justify-center
          rounded-full bg-bg-elevated hover:bg-bg-tertiary
          transition-colors duration-300
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : 180,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="absolute"
        >
          {/* Moon Icon */}
          <svg
            width={iconSizes[size]}
            height={iconSizes[size]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-accent-500"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : -180,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="absolute"
        >
          {/* Sun Icon */}
          <svg
            width={iconSizes[size]}
            height={iconSizes[size]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-accent-500"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </motion.div>
      </motion.button>

      {showLabel && (
        <span className="text-sm font-medium text-fg-secondary">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      )}
    </div>
  );
}
```

#### 4. ScrollProgress

**File**: `src/app/components/atoms/ScrollProgress/index.tsx`

```typescript
"use client";

import { motion, useScroll, useSpring } from 'framer-motion';
import { ScrollProgressProps } from '@/app/types/components';

export default function ScrollProgress({
  variant = 'line',
  color = 'var(--accent-500)',
  position = 'top',
  showOnScroll = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (variant === 'line') {
    return (
      <motion.div
        className={`absolute ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 h-0.5 origin-left`}
        style={{
          scaleX,
          backgroundColor: color,
          opacity: showOnScroll ? scrollYProgress : 1,
        }}
      />
    );
  }

  return null;
}
```

---

## Performance Optimization

### 1. Code Splitting Strategy

```typescript
// Lazy load mobile menu only when needed
const MobileMenu = dynamic(
  () => import('@/app/components/organisms/MobileMenu'),
  { ssr: false }
);

// Lazy load newsletter form
const NewsletterForm = dynamic(
  () => import('@/app/components/molecules/NewsletterForm'),
  { ssr: false }
);
```

### 2. Animation Performance

```typescript
// Use transform and opacity for GPU acceleration
const optimizedVariants = {
  hidden: {
    opacity: 0,
    transform: 'translateY(20px)' // Better than y: 20
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0)'
  },
};

// Use will-change sparingly
className="will-change-transform"

// Reduce motion for accessibility
const shouldReduceMotion = useReducedMotion();
const variants = shouldReduceMotion ? staticVariants : animatedVariants;
```

### 3. Hydration Strategy

```typescript
// Prevent hydration mismatch for theme
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <NavbarSkeleton />; // SSR placeholder
}

return <Navbar {...props} />;
```

### 4. Scroll Performance

```typescript
// Debounce scroll events
const handleScroll = useMemo(
  () => debounce(() => {
    // Scroll logic
  }, 16), // ~60fps
  []
);

// Use passive listeners
useEffect(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [handleScroll]);
```

---

## Implementation Guide

### Step 1: Create New Hooks

```bash
# Required new hooks
src/app/hooks/useScrollDirection.ts
src/app/hooks/useTheme.ts
src/app/hooks/useFocusTrap.ts
src/app/hooks/useScrollProgress.ts
src/app/hooks/useActiveSection.ts
```

### Step 2: Create Atomic Components

```bash
# New atoms
src/app/components/atoms/Logo/index.tsx
src/app/components/atoms/ActiveIndicator/index.tsx
src/app/components/atoms/ScrollProgress/index.tsx

# Enhanced atoms
src/app/components/atoms/Button/index.tsx (add variants)
src/app/components/atoms/Icon/index.tsx (add icons)
```

### Step 3: Create Molecular Components

```bash
# New molecules
src/app/components/molecules/ThemeToggle/index.tsx
src/app/components/molecules/NavbarLogo/index.tsx
src/app/components/molecules/MobileNavItem/index.tsx
src/app/components/molecules/FooterBrand/index.tsx
src/app/components/molecules/FooterNavGroup/index.tsx
src/app/components/molecules/NewsletterForm/index.tsx
src/app/components/molecules/MenuOverlay/index.tsx
src/app/components/molecules/Copyright/index.tsx
src/app/components/molecules/SocialLinks/index.tsx
```

### Step 4: Create Organisms

```bash
# Navbar
src/app/components/organisms/Navbar/index.tsx
src/app/components/organisms/Navbar/NavbarDesktop.tsx
src/app/components/organisms/Navbar/NavbarMobile.tsx
src/app/components/organisms/Navbar/useNavbar.ts

# Mobile Menu
src/app/components/organisms/MobileMenu/index.tsx
src/app/components/organisms/MobileMenu/useMobileMenu.ts

# Footer
src/app/components/organisms/Footer/index.tsx
src/app/components/organisms/Footer/FooterMain.tsx
src/app/components/organisms/Footer/FooterBottom.tsx
```

### Step 5: Create Constants & Types

```bash
# Constants
src/app/constants/navigation.ts
src/app/constants/footer.ts

# Types
src/app/types/navigation.ts
src/app/types/footer.ts
```

### Step 6: Update Animations

```typescript
// Add to src/app/constants/animations.ts
export const navbarSlideDown: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
};

export const mobileMenuPanel: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    }
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    }
  },
};
```

### Step 7: Integration Example

```typescript
// app/layout.tsx
import MainNav from '@/app/components/layout/MainNav';
import MainFooter from '@/app/components/layout/MainFooter';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainNav />
        <main>{children}</main>
        <MainFooter />
      </body>
    </html>
  );
}
```

---

## Accessibility Features

### Keyboard Navigation
- Tab order follows visual flow
- Focus trap in mobile menu
- Escape key closes overlays
- Arrow keys for menu navigation

### Screen Reader Support
- Semantic HTML elements
- ARIA labels and roles
- Live region announcements
- Skip navigation links

### Visual Accessibility
- High contrast mode support
- Focus indicators (2px accent ring)
- Reduced motion preferences
- Color-blind friendly palette

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks
- CSS Grid with flexbox fallback
- Backdrop filter with solid color fallback
- Intersection Observer with scroll event fallback

---

## Testing Strategy

```typescript
// Unit tests
describe('Navbar', () => {
  it('changes variant on scroll', () => {});
  it('auto-hides on scroll down', () => {});
  it('shows on scroll up', () => {});
});

// E2E tests (Playwright)
test('mobile menu opens and closes', async ({ page }) => {
  await page.click('[aria-label="Open menu"]');
  await expect(page.locator('[role="dialog"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[role="dialog"]')).not.toBeVisible();
});

// Accessibility tests
test('navbar is keyboard navigable', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.locator('nav a:first-child')).toBeFocused();
});
```

---

## Performance Metrics

### Target Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total Blocking Time: < 200ms

### Optimization Checklist
- [ ] Code splitting for mobile menu
- [ ] Lazy load newsletter form
- [ ] Debounced scroll handlers
- [ ] Passive event listeners
- [ ] GPU-accelerated animations
- [ ] Preload critical fonts
- [ ] Minimize layout shifts
- [ ] Optimize images (Next/Image)

---

## Migration Path

### Phase 1: Foundation (Week 1)
1. Create all TypeScript types
2. Build atomic components
3. Implement core hooks

### Phase 2: Molecules (Week 2)
1. Build navigation molecules
2. Build footer molecules
3. Add theme system

### Phase 3: Organisms (Week 3)
1. Build navbar organism
2. Build mobile menu
3. Build footer organism

### Phase 4: Integration (Week 4)
1. Replace existing Header
2. Replace existing Footer
3. Testing and refinement

---

This architecture provides a scalable, performant, and accessible foundation for Paul Taylor-inspired navigation and footer components while maintaining the existing Next.js 15 + React 19 + TypeScript stack.
