"use client";

import { motion } from 'framer-motion';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
  animate?: boolean;
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  animate = true,
}: SkeletonProps) {
  const baseClasses = 'bg-bg-tertiary';

  const variantClasses = {
    text: 'rounded-sm h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-sm',
    card: 'rounded-sm',
  };

  const variantDefaults = {
    text: { width: '100%', height: '1rem' },
    circular: { width: '3rem', height: '3rem' },
    rectangular: { width: '100%', height: '12rem' },
    card: { width: '100%', height: '20rem' },
  };

  const finalWidth = width ?? variantDefaults[variant].width;
  const finalHeight = height ?? variantDefaults[variant].height;

  const skeletonStyles = {
    width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
    height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
  };

  const Component = animate ? motion.div : 'div';

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={skeletonStyles}
      {...(animate && {
        animate: {
          opacity: [0.5, 1, 0.5],
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      })}
      aria-busy="true"
      aria-live="polite"
    />
  );
}

/**
 * Skeleton variants for common use cases
 */

export function SkeletonText({
  lines = 1,
  className = '',
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-4 p-6 bg-bg-secondary rounded-sm ${className}`}>
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  );
}

export function SkeletonJobCard({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-4 p-8 bg-bg-secondary rounded-sm border-2 border-bg-tertiary ${className}`}>
      <div className="flex items-start gap-4">
        <Skeleton variant="rectangular" width={64} height={64} />
        <div className="flex-1 space-y-3">
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={16} />
          <Skeleton variant="text" width="30%" height={16} />
        </div>
      </div>
      <SkeletonText lines={4} />
      <div className="flex gap-2 flex-wrap">
        <Skeleton variant="rectangular" width={80} height={28} />
        <Skeleton variant="rectangular" width={100} height={28} />
        <Skeleton variant="rectangular" width={90} height={28} />
      </div>
    </div>
  );
}

export function SkeletonList({
  count = 3,
  variant = 'card',
  className = '',
}: {
  count?: number;
  variant?: 'card' | 'job';
  className?: string;
}) {
  const SkeletonComponent = variant === 'job' ? SkeletonJobCard : SkeletonCard;

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
}
