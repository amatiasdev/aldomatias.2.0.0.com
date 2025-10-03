"use client";

import Input from '@/app/components/atoms/Input';
import { FormFieldProps } from '@/app/types/components';

export default function FormField({
  input,
  helperText,
  errorMessage,
  showError = true,
}: FormFieldProps) {
  return (
    <div className="w-full space-y-1">
      <Input {...input} error={showError ? errorMessage : undefined} />
      {helperText && !errorMessage && (
        <p className="text-sm text-fg-tertiary">{helperText}</p>
      )}
    </div>
  );
}
