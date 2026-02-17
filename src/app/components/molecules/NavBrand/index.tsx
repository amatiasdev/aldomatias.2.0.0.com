"use client";

import Link from 'next/link';
import Image from 'next/image';

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
  const logoSrc = logo || '/aldo-logo.png';

  return (
    <Link href={href} className={`flex items-center ${className}`} aria-label="Home">
      <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-200">
        <Image
          src={logoSrc}
          alt="Aldo Matias Logo"
          width={48}
          height={48}
          sizes="48px"
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
