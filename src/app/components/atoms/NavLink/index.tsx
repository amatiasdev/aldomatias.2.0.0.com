"use client";

import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export default function NavLink({
  href,
  children,
  isActive = false,
  onClick,
  className = '',
  external = false,
}: NavLinkProps) {
  const baseClasses = 'relative uppercase tracking-[0.08em] text-sm font-semibold transition-colors duration-300 py-2 px-1 group';
  const colorClasses = isActive
    ? 'text-accent-500'
    : 'text-fg-secondary hover:text-fg-primary';

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-accent-500 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full ${
          isActive ? 'w-full' : 'w-0'
        }`}
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`${baseClasses} ${colorClasses} ${className}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${colorClasses} ${className}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {content}
    </Link>
  );
}
