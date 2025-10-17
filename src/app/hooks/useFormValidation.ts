"use client";

import { useState, useCallback } from 'react';

export type ValidationSchema<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

export interface UseFormValidationReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (field: keyof T) => (value: T[keyof T]) => void;
  handleBlur: (field: keyof T) => () => void;
  validate: () => boolean;
  resetForm: () => void;
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
}

export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  validationSchema: ValidationSchema<T>
): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]): string | undefined => {
      const validator = validationSchema[field];
      return validator ? validator(value) : undefined;
    },
    [validationSchema]
  );

  const handleChange = useCallback(
    (field: keyof T) => (value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Validate on change if field has been touched
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      // Validate on blur
      const error = validateField(field, values[field]);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [values, validateField]
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationSchema).forEach((key) => {
      const field = key as keyof T;
      const error = validateField(field, values[field]);

      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Partial<Record<keyof T, boolean>>
    );
    setTouched(allTouched);

    return isValid;
  }, [validationSchema, values, validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    resetForm,
    setFieldValue,
  };
}
