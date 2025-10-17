# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Aldo Matias's personal portfolio website built with Next.js 15, React 19 (RC), TypeScript, and Tailwind CSS. The site showcases employment history, skills, and provides a contact form integrated with Supabase for storing messages.

## Development Commands

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Architecture & Key Patterns

### Application Structure

- **App Router**: Uses Next.js 15 App Router (`src/app/`) with server and client components
- **Components**: Located in `src/app/components/`, all client components use `"use client"` directive
- **API Routes**: Contact form endpoint at `src/app/api/contact/route.ts`
- **Public Assets**: Static files in `public/`, including `jobs.json` for employment data
- **Utilities**: Shared utilities in `src/utils/` (e.g., Supabase client)

### Component Patterns

**Client vs Server Components**:
- Pages that use hooks or browser APIs must have `"use client"` directive at the top
- Layout components (`layout.tsx`) are server components by default
- Interactive components (forms, state management) are client components

**Data Loading Pattern**:
- Employment data is loaded from `public/jobs.json` via client-side fetch in `useEffect`
- Contact form submissions go to `/api/contact` API route
- No server-side data fetching or static generation currently used

### Styling Approach

**Tailwind CSS with Custom Theme**:
- Dark mode enabled via `darkMode: "class"` in `tailwind.config.ts`
- Custom CSS variables defined in `globals.css` for theme colors
- Dark mode is forced on via client-side script in `page.tsx:10`
- Responsive design with mobile-first approach (e.g., `md:flex-row`)

**Custom Color Variables**:
```css
--background, --foreground
--secondary-background
--dark-background, --dark-foreground, --dark-secondary-background
```

### Supabase Integration

**Configuration**:
- Supabase client initialized in `src/utils/supabaseClient.ts`
- Requires environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Contact Form Flow**:
1. User submits form in `ContactForm.tsx`
2. POST request to `/api/contact`
3. API route inserts data into `contact_messages` table
4. Captures user IP from `x-forwarded-for` header
5. Email validation blocks personal email domains (Gmail, Hotmail, etc.)

### TypeScript Configuration

- Path alias `@/*` maps to `./src/*` for cleaner imports
- Strict mode enabled
- Target: ES2017
- Import pattern: `import Component from '@/app/components/Component'`

### Navigation & Routing

**Pages**:
- `/` - Home page with employment summary and contact form
- `/experience` - Full employment history with hash-based scrolling

**Hash Navigation**:
- Experience page supports hash links (e.g., `/experience#bbva`)
- Smooth scrolling with offset for fixed headers implemented
- Hash change listener handles browser back/forward navigation

### Image Handling

- Next.js Image component used for optimization
- Profile images and company logos stored in `public/`
- GIF animations use `unoptimized` prop to preserve animation

## Key Business Logic

**Contact Form Validation**:
- Personal email domains are blocked to ensure business inquiries
- Validation happens on blur with immediate user feedback
- Form state management handles submission, success, and error states

**Job Data Structure**:
```typescript
{
  id: string;        // Used for hash navigation
  title: string;
  company: string;
  companyLogo: string;
  period: string;
  city: string;
  description: string[];
}
```

## Important Notes

- The site uses React 19 RC - be aware of potential API changes
- All form submissions require business email addresses
- Dark mode is hardcoded to always be active
- Job data is managed in static JSON file, not CMS
- IP tracking is implemented for contact form submissions
