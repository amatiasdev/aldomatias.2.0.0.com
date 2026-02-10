"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Typography from '@/app/components/atoms/Typography';
import FormField from '@/app/components/molecules/FormField';
import Button from '@/app/components/atoms/Button';
import SocialLinks from '@/app/components/molecules/SocialLinks';
import { useFormValidation } from '@/app/hooks/useFormValidation';
import { ContactFormData, ContactFormProps } from '@/app/types/components';
import { fadeInUp } from '@/app/constants/animations';

import { useTranslation } from '@/contexts/LanguageContext';

export default function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const initialValues: ContactFormData = {
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  };

  const serviceOptions = useMemo(() => {
    const opts = t('contact.form.serviceOptions') as Record<string, string>;
    return Object.entries(opts).map(([value, label]) => ({ value, label }));
  }, [t]);

  const budgetOptions = useMemo(() => {
    const opts = t('contact.form.budgetOptions') as Record<string, string>;
    return Object.entries(opts).map(([value, label]) => ({ value, label }));
  }, [t]);

  const validationSchema = useMemo(() => ({
    name: (value: unknown) => {
      const strValue = value as string;
      if (!strValue.trim()) return t('contact.validation.nameRequired') as string;
      return undefined;
    },
    email: (value: unknown) => {
      const strValue = value as string;
      if (!strValue.trim()) return t('contact.validation.emailRequired') as string;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(strValue)) return t('contact.validation.emailInvalid') as string;
      return undefined;
    },
    company: () => {
      return undefined;
    },
    service: () => {
      return undefined;
    },
    budget: () => {
      return undefined;
    },
    message: (value: unknown) => {
      const strValue = value as string;
      if (!strValue.trim()) return t('contact.validation.messageRequired') as string;
      if (strValue.trim().length < 10) return t('contact.validation.messageMinLength') as string;
      return undefined;
    },
  }), [t]);

  const { values, errors, touched, handleChange, handleBlur, validate, resetForm } =
    useFormValidation(initialValues, validationSchema);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setSubmitting(true);

    try {
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
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'contact',
          event_label: values.service || 'general',
        });
      }
      onSuccess?.();
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error && error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else {
        errorMessage = error instanceof Error ? error.message : 'An error occurred';
      }
      setApiError(errorMessage);
      onError?.(errorMessage);
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
          {t('contact.form.successTitle') as string}
        </Typography>
        <Typography as="p" className="text-fg-secondary mb-6">
          {t('contact.form.successMessage') as string}
        </Typography>
        <Button variant="ghost" onClick={() => setSubmitted(false)}>
          {t('contact.form.sendAnother') as string}
        </Button>
        <div className="mt-6 pt-6 border-t border-border-subtle">
          <Typography as="p" className="text-fg-tertiary text-sm mb-3">
            {t('contact.form.connectWhileWaiting') as string}
          </Typography>
          <SocialLinks orientation="horizontal" />
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={submitting}>
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
          label: t('contact.form.name') as string,
          placeholder: t('contact.form.namePlaceholder') as string,
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
          label: t('contact.form.email') as string,
          placeholder: t('contact.form.emailPlaceholder') as string,
          value: values.email,
          onChange: handleChange('email'),
          onBlur: handleBlur('email'),
          required: true,
          autoComplete: 'email',
        }}
        errorMessage={touched.email ? errors.email : undefined}
        showError={!!touched.email}
        helperText={t('contact.form.emailHelper') as string}
      />

      <FormField
        input={{
          id: 'company',
          label: t('contact.form.company') as string,
          placeholder: t('contact.form.companyPlaceholder') as string,
          value: values.company,
          onChange: handleChange('company'),
          onBlur: handleBlur('company'),
          required: false,
        }}
        errorMessage={touched.company ? errors.company : undefined}
        showError={!!touched.company}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          input={{
            id: 'service',
            type: 'select',
            label: t('contact.form.service') as string,
            placeholder: t('contact.form.selectPlaceholder') as string,
            value: values.service,
            onChange: handleChange('service'),
            onBlur: handleBlur('service'),
            required: false,
            options: serviceOptions,
          }}
          errorMessage={touched.service ? errors.service : undefined}
          showError={!!touched.service}
        />

        <FormField
          input={{
            id: 'budget',
            type: 'select',
            label: t('contact.form.budget') as string,
            placeholder: t('contact.form.selectPlaceholder') as string,
            value: values.budget ?? '',
            onChange: handleChange('budget'),
            onBlur: handleBlur('budget'),
            required: false,
            options: budgetOptions,
          }}
          errorMessage={touched.budget ? errors.budget : undefined}
          showError={!!touched.budget}
        />
      </div>

      <FormField
        input={{
          id: 'message',
          type: 'textarea',
          label: t('contact.form.message') as string,
          placeholder: t('contact.form.messagePlaceholder') as string,
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
        {submitting ? t('contact.form.submitting') as string : t('contact.form.submit') as string}
      </Button>
    </form>
  );
}
