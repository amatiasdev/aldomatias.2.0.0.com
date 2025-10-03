"use client";

import { motion } from 'framer-motion';
import Icon from '@/app/components/atoms/Icon';

export type SocialPlatform = 'github' | 'linkedin' | 'leetcode' | 'email' | 'twitter' | 'facebook';

interface SocialIconProps {
  platform: SocialPlatform;
  url: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

const platformConfig: Record<SocialPlatform, { label: string; icon: string; ariaLabel: string }> = {
  github: {
    label: 'GitHub',
    icon: 'github',
    ariaLabel: 'Visit GitHub profile',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: 'linkedin',
    ariaLabel: 'Visit LinkedIn profile',
  },
  leetcode: {
    label: 'LeetCode',
    icon: 'code',
    ariaLabel: 'Visit LeetCode profile',
  },
  email: {
    label: 'Email',
    icon: 'email',
    ariaLabel: 'Send email',
  },
  twitter: {
    label: 'Twitter',
    icon: 'twitter',
    ariaLabel: 'Visit Twitter profile',
  },
  facebook: {
    label: 'Facebook',
    icon: 'facebook',
    ariaLabel: 'Visit Facebook profile',
  },
};

export default function SocialIcon({
  platform,
  url,
  size = 20,
  showLabel = false,
  className = '',
}: SocialIconProps) {
  const config = platformConfig[platform];

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-fg-tertiary hover:text-accent-500 transition-colors duration-300 group ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={config.ariaLabel}
    >
      <Icon
        name={config.icon}
        size={size}
        className="transition-transform duration-300 group-hover:rotate-6"
      />
      {showLabel && (
        <span className="text-sm font-medium uppercase tracking-wide">
          {config.label}
        </span>
      )}
    </motion.a>
  );
}
