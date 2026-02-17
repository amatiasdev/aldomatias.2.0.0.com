"use client";

import { useState } from 'react';
import Typography from '@/app/components/atoms/Typography';
import Button from '@/app/components/atoms/Button';

interface NewsletterProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function Newsletter({
  title = 'Stay Updated',
  description = 'Get notified about new projects and opportunities',
  className = '',
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // TODO: Implement newsletter API integration
    // For now, just simulate success
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <Typography as="h3" variant="h4" className="text-fg-primary mb-2">
          {title}
        </Typography>
        <p className="text-sm text-fg-tertiary">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 bg-bg-tertiary text-fg-primary text-sm border-2 border-border-default focus:border-accent-500 rounded-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Email address"
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === 'loading' || status === 'success'}
          loading={status === 'loading'}
          className="w-full"
        >
          {status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </Button>

        {status === 'error' && (
          <p className="text-xs text-red-500 animate-fade-in-up">
            Please enter a valid email address
          </p>
        )}

        {status === 'success' && (
          <p className="text-xs text-accent-500 animate-fade-in-up">
            Thanks for subscribing!
          </p>
        )}
      </form>
    </div>
  );
}
