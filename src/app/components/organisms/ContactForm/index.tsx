"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Typography from '@/app/components/atoms/Typography';
import FormField from '@/app/components/molecules/FormField';
import Button from '@/app/components/atoms/Button';
import { useFormValidation } from '@/app/hooks/useFormValidation';
import { ContactFormData, ContactFormProps } from '@/app/types/components';
import { fadeInUp } from '@/app/constants/animations';
import { isPersonalEmail } from '@/app/constants/validation';

export default function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const initialValues: ContactFormData = {
    name: '',
    email: '',
    company: '',
    message: '',
  };

  // Memoize validation schema to prevent re-creation on every render
  const validationSchema = useMemo(() => ({
    name: (value: unknown) => {
      const strValue = value as string;
      if (!strValue.trim()) return 'Name is required';
      return undefined;
    },
    email: (value: unknown) => {
      const strValue = value as string;
      if (!strValue.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(strValue)) return 'Invalid email format';

      // Business email validation using shared constants
      if (isPersonalEmail(strValue)) {
        return 'Please use a business email address';
      }
      return undefined;
    },
    message: (value: unknown) => {
      const strValue = value as string;
      if (!strValue.trim()) return 'Message is required';
      if (strValue.trim().length < 10) return 'Message must be at least 10 characters';
      return undefined;
    },
  }), []);

  const { values, errors, touched, handleChange, handleBlur, validate, resetForm } =
    useFormValidation(initialValues, validationSchema);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null); // Clear previous errors

    if (!validate()) return;

    // Abort any previous request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setSubmitting(true);

    try {
      // Add 10 second timeout
      const timeoutId = setTimeout(() => {
        abortControllerRef.current?.abort();
      }, 10000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setSubmitted(true);
      resetForm();
      onSuccess?.();
    } catch (error) {
      // Ignore abort errors (user navigated away or timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        setApiError('Request timed out. Please check your connection and try again.');
      } else {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setApiError(errorMessage);
      }

      const errorMsg = apiError || 'Unknown error';
      onError?.(errorMsg);
      console.error('Contact form error:', error);
    } finally {
      setSubmitting(false);
      abortControllerRef.current = null;
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="bg-bg-secondary border-2 border-accent-500 p-8 text-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <Typography as="h3" variant="h3" className="text-accent-500 mb-4">
          Message Sent!
        </Typography>
        <Typography as="p" className="text-fg-secondary mb-6">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </Typography>
        <Button variant="ghost" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={submitting}>
      <Typography as="h3" variant="h3" className="mb-6">
        Get In Touch
      </Typography>

      {/* Error Alert */}
      {apiError && (
        <div
          className="bg-red-50 dark:bg-red-950/30 border-2 border-red-500 p-4 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          <Typography as="p" className="font-semibold text-red-700 dark:text-red-400 mb-1">
            Error
          </Typography>
          <Typography as="p" className="text-red-600 dark:text-red-300 text-sm">
            {apiError}
          </Typography>
          <button
            type="button"
            onClick={() => setApiError(null)}
            className="text-sm text-red-600 dark:text-red-400 underline mt-2 hover:text-red-800 dark:hover:text-red-200"
          >
            Dismiss
          </button>
        </div>
      )}

      <FormField
        input={{
          id: 'name',
          label: 'Name',
          placeholder: 'Your name',
          value: values.name,
          onChange: handleChange('name'),
          onBlur: handleBlur('name'),
          required: true,
        }}
        errorMessage={touched.name ? errors.name : undefined}
        showError={!!touched.name}
      />

      <FormField
        input={{
          id: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'your.email@company.com',
          value: values.email,
          onChange: handleChange('email'),
          onBlur: handleBlur('email'),
          required: true,
          autoComplete: 'email',
        }}
        errorMessage={touched.email ? errors.email : undefined}
        showError={!!touched.email}
        helperText="Please use a business email address"
      />

      <FormField
        input={{
          id: 'company',
          label: 'Company',
          placeholder: 'Your company (optional)',
          value: values.company || '',
          onChange: handleChange('company'),
          onBlur: handleBlur('company'),
        }}
      />

      <FormField
        input={{
          id: 'message',
          type: 'textarea',
          label: 'Message',
          placeholder: 'Your message...',
          value: values.message,
          onChange: handleChange('message'),
          onBlur: handleBlur('message'),
          required: true,
          rows: 4,
        }}
        errorMessage={touched.message ? errors.message : undefined}
        showError={!!touched.message}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={submitting}
        disabled={submitting}
        className="w-full"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
