"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/app/hooks/useTheme';

interface NavBrandProps {
  logo?: string;
  href?: string;
  className?: string;
}

export default function NavBrand({
  logo,
  href = '/',
  className = '',
}: NavBrandProps) {
  const { resolvedTheme } = useTheme();

  // Use theme-aware logo if no custom logo provided
  const logoSrc = logo || (resolvedTheme === 'light'
    ? '/aldo-logo-for-light.png'
    : '/aldo-logo.png');

  return (
    <Link href={href} className={`flex items-center ${className}`} aria-label="Home">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 flex items-center justify-center overflow-hidden"
      >
        <Image
          src={logoSrc}
          alt="Aldo Matias Logo"
          width={48}
          height={48}
          className="object-contain"
          priority
        />
      </motion.div>
    </Link>
  );
}
