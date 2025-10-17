"use client";

import { StatCardProps } from '@/app/types/components';

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-bg-tertiary border border-border-default rounded">
      <p className="text-3xl font-bold text-accent-500">{value}</p>
      <p className="text-sm text-fg-tertiary uppercase tracking-wide">{label}</p>
    </div>
  );
}
