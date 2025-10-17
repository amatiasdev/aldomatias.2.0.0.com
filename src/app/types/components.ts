import { ReactNode } from 'react';

// Animation types
export interface AnimationVariant {
  initial: object;
  animate: object;
  exit?: object;
  transition?: object;
}

// Button types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  href?: string;
}

// Typography types
export type TypographyVariant = 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
export type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';

export interface TypographyProps {
  as?: TypographyElement;
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

// Input types
export type InputType = 'text' | 'email' | 'tel' | 'textarea';

export interface InputProps {
  type?: InputType;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  id: string;
  rows?: number;
}

// Badge types
export type BadgeVariant = 'default' | 'accent' | 'muted';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

// Icon types
export interface IconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
}

// Link types
export interface LinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

// FormField types
export interface FormFieldProps {
  input: InputProps;
  helperText?: string;
  errorMessage?: string;
  showError?: boolean;
}

// SocialLink types
export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'email';

export interface SocialLinkProps {
  platform: SocialPlatform;
  url: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

// NavItem types
export interface NavItemProps {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
}

// SkillCard types
export interface SkillCardProps {
  skill: string;
  category?: string;
  level?: string;
}

// StatCard types
export interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
}

// Section types
export type SectionBackground = 'white' | 'dark' | 'darker' | 'darkest' | 'charcoal' | 'slate' | 'warm' | 'gradient' | 'gradientWarm';
export type SectionPadding = 'sm' | 'md' | 'lg' | 'xl';

export interface SectionProps {
  children: ReactNode;
  background?: SectionBackground;
  padding?: SectionPadding;
  fullWidth?: boolean;
  id?: string;
  className?: string;
}

// AnimatedSection types
export type AnimationType = 'fadeIn' | 'fadeInUp' | 'slideLeft' | 'slideRight' | 'scaleIn';

export interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  stagger?: boolean;
  respectReducedMotion?: boolean;
}

// Contact Form types
export interface ContactFormData extends Record<string, unknown> {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}
