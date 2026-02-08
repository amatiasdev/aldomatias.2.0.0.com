"use client";

import { StatCardProps } from '@/app/types/components';

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-bg-secondary/30 border border-border-subtle rounded">
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-500">{value}</p>
      <p className="text-sm text-fg-tertiary uppercase tracking-wide">{label}</p>
    </div>
  );
}
