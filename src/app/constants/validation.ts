/**
 * Validation constants and utilities
 * Centralized validation rules for forms and user input
 */

/**
 * Personal email domains that should be blocked for business contact forms
 * Consolidated list from multiple sources for consistency
 */
export const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'protonmail.com',
  'aol.com',
  'gmx.com',
  'mail.com',
  'zoho.com',
  'yandex.com',
  'qq.com',
  'naver.com',
  '163.com',
  '126.com',
  'rediffmail.com',
] as const;

/**
 * Email validation regex pattern
 * RFC 5322 compliant basic email validation
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates if an email belongs to a personal email domain
 * @param email - Email address to validate
 * @returns true if email is from a personal domain
 */
export function isPersonalEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Split by @ and ensure exactly 2 parts (handles edge cases like multiple @)
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false; // Invalid email format
  }

  const domain = parts[1]?.toLowerCase().trim();
  if (!domain) {
    return false;
  }

  return PERSONAL_EMAIL_DOMAINS.includes(domain as typeof PERSONAL_EMAIL_DOMAINS[number]);
}

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns true if email format is valid
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validates if email is suitable for business contact
 * @param email - Email address to validate
 * @returns Object with validation result and error message
 */
export function validateBusinessEmail(email: string): {
  isValid: boolean;
  error?: string;
} {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  if (isPersonalEmail(email)) {
    return {
      isValid: false,
      error: 'Please use your business email address',
    };
  }

  return { isValid: true };
}
