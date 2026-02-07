"use client";

import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCVModal } from '@/contexts/CVModalContext';

// Lazy load modal content only when opened
const CVModalContent = lazy(() => import('./CVModalContent'));

export default function CVModal() {
  const { isOpen } = useCVModal();

  // Only render the modal content when it's open
  // This prevents loading framer-motion animations and PDF viewer until needed
  if (!isOpen) return null;

  return (
    <Suspense fallback={null}>
      <AnimatePresence>
        <CVModalContent />
      </AnimatePresence>
    </Suspense>
  );
}
