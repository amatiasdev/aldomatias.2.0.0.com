"use client";

import { motion, AnimatePresence } from 'framer-motion';

interface OverlayProps {
  isVisible: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Overlay({ isVisible, onClick, className = '' }: OverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 ${className}`}
          onClick={onClick}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
