"use client";

import { InputProps } from '@/app/types/components';

export default function Input({
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  label,
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
  id,
  rows = 4,
}: InputProps) {
  const baseStyles = 'w-full px-4 py-3 bg-transparent border-b-2 text-fg-primary placeholder-fg-quaternary transition-all duration-300 focus:outline-none';
  const borderStyles = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-border-strong focus:border-accent-500';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = `${baseStyles} ${borderStyles} ${disabledStyles}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold uppercase tracking-wide mb-2 text-fg-secondary"
        >
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`${classes} resize-vertical min-h-[100px]`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-required={required ? 'true' : 'false'}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={classes}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-required={required ? 'true' : 'false'}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
