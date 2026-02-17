"use client";

import { useEffect, useState } from 'react';
import Icon from '@/app/components/atoms/Icon';

export interface ToastProps {
  variant?: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

const variantStyles = {
  success: 'bg-green-500/10 border-green-500 text-green-500',
  error: 'bg-red-500/10 border-red-500 text-red-500',
  info: 'bg-accent-500/10 border-accent-500 text-accent-500',
  warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-500',
};

const iconNames = {
  success: 'check' as const,
  error: 'close' as const,
  info: 'info' as const,
  warning: 'warning' as const,
};

export default function Toast({
  variant = 'info',
  message,
  onClose,
  duration = 5000,
  className = '',
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation on next frame
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 200);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 200);
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 border-2 rounded-sm backdrop-blur-sm
        transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-5 scale-95'}
        ${variantStyles[variant]}
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      <Icon name={iconNames[variant]} size={20} />

      <p className="flex-1 text-sm font-medium">{message}</p>

      {onClose && (
        <button
          onClick={handleClose}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="Close notification"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
}

/**
 * Toast Container Component
 * Manages multiple toasts with stacking
 */
export interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>;
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export function ToastContainer({
  toasts,
  onRemove,
  position = 'top-right',
}: ToastContainerProps) {
  return (
    <div
      className={`
        fixed z-[100] flex flex-col gap-2 min-w-[320px] max-w-md
        ${positionStyles[position]}
      `}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
