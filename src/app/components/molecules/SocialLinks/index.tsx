"use client";

import SocialIcon, { SocialPlatform } from '@/app/components/atoms/SocialIcon';

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
  size?: number;
  showLabels?: boolean;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const defaultLinks: SocialLink[] = [
  { platform: 'github', url: 'https://github.com/amatiasdev' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/in/aldomatias-' },
  { platform: 'leetcode', url: 'https://leetcode.com/u/ASovvEqAIE/' },
];

export default function SocialLinks({
  links = defaultLinks,
  size = 20,
  showLabels = false,
  className = '',
  orientation = 'horizontal',
}: SocialLinksProps) {
  const containerClasses = orientation === 'horizontal'
    ? 'flex items-center gap-4'
    : 'flex flex-col items-start gap-3';

  return (
    <div
      className={`${containerClasses} ${className}`}
      role="list"
      aria-label="Social media links"
    >
      {links.map((link) => (
        <div key={link.platform} role="listitem">
          <SocialIcon
            platform={link.platform}
            url={link.url}
            size={size}
            showLabel={showLabels}
          />
        </div>
      ))}
    </div>
  );
}
