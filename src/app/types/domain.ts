/**
 * Domain types for business entities
 * Shared types used across the application
 */

/**
 * Job/Experience information
 * Used for displaying employment history and experience
 */
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  period: string;
  city: string;
  description: string[];
  technologies?: string[];
  metrics?: Array<{ value: string; label: string }>;
  leadership?: boolean;
  highlightedProject?: {
    title: string;
    description: string[];
    technologies: string[];
    screenshots?: string[];
  };
}


/**
 * Form validation error
 */
export interface FormError {
  field: string;
  message: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
