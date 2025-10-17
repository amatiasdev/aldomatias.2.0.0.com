import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';
import { supabase } from '../../../utils/supabaseClient';
import { validateBusinessEmail } from '@/app/constants/validation';

// ===================================================================
// VALIDATION SCHEMA with Zod
// ===================================================================
const ContactSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .trim()
    .optional(),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .max(255, 'Email must be less than 255 characters')
    .trim()
    .toLowerCase(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
});

type ContactInput = z.infer<typeof ContactSchema>;

// ===================================================================
// HELPER FUNCTIONS
// ===================================================================

/**
 * Extract client IP address with proper validation
 */
function getClientIP(request: NextRequest): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  // Trust Vercel's headers in production
  if (process.env.VERCEL === '1') {
    if (forwardedFor) {
      // Take rightmost IP (closest to server) from proxy chain
      const ips = forwardedFor.split(',').map(ip => ip.trim());
      return ips[ips.length - 1] || null;
    }
    if (realIP) {
      return realIP.trim();
    }
  }

  // Development fallback
  return null;
}

/**
 * Validate origin for CSRF protection
 */
function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
  ].filter(Boolean) as string[];

  // Check origin header
  if (origin && allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return true;
  }

  // Fallback to referer check
  if (referer && allowedOrigins.some(allowed => referer.startsWith(allowed))) {
    return true;
  }

  // If no origin or referer, reject (potential CSRF)
  return false;
}

/**
 * Sanitize HTML from user input
 */
function sanitizeInput(value: string): string {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [], // Strip all attributes
  }).trim();
}

// ===================================================================
// API ROUTE HANDLER
// ===================================================================
export async function POST(request: NextRequest) {
  try {
    // ---------------------------------------------------------------
    // 1. CSRF PROTECTION - Validate origin
    // ---------------------------------------------------------------
    if (!isValidOrigin(request)) {
      console.warn('[Contact API] Invalid origin detected');
      return NextResponse.json(
        { error: 'Forbidden - Invalid request origin' },
        { status: 403 }
      );
    }

    // ---------------------------------------------------------------
    // 2. PARSE REQUEST BODY
    // ---------------------------------------------------------------
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------------
    // 3. VALIDATE SCHEMA with Zod
    // ---------------------------------------------------------------
    let validatedData: ContactInput;
    try {
      validatedData = ContactSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstIssue = error.issues[0];
        return NextResponse.json(
          { error: firstIssue?.message || 'Validation failed' },
          { status: 400 }
        );
      }
      throw error;
    }

    // ---------------------------------------------------------------
    // 4. BUSINESS EMAIL VALIDATION
    // ---------------------------------------------------------------
    const emailValidation = validateBusinessEmail(validatedData.email);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: emailValidation.error || 'Invalid business email' },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------------
    // 5. SANITIZE INPUTS (XSS Protection)
    // ---------------------------------------------------------------
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      company: validatedData.company ? sanitizeInput(validatedData.company) : null,
      email: validatedData.email, // Email already validated
      message: sanitizeInput(validatedData.message),
    };

    // ---------------------------------------------------------------
    // 6. GET CLIENT IP
    // ---------------------------------------------------------------
    const ip = getClientIP(request);

    // ---------------------------------------------------------------
    // 7. INSERT TO SUPABASE
    // ---------------------------------------------------------------
    const { error } = await supabase.from('contact_messages').insert({
      name: sanitizedData.name,
      company: sanitizedData.company,
      email: sanitizedData.email,
      message: sanitizedData.message,
      ip_address: ip,
      created_at: new Date().toISOString(),
    });

    if (error) {
      // Log error internally but don't expose details to client
      console.error('[Contact API] Supabase error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { error: 'Unable to save message. Please try again later.' },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------------
    // 8. SUCCESS RESPONSE
    // ---------------------------------------------------------------
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 201 }
    );

  } catch (error) {
    // Catch-all for unexpected errors
    console.error('[Contact API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
