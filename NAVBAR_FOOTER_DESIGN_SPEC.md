# Navbar & Footer Visual Design Specification

## Design Philosophy

Inspired by Paul Taylor Comedy's minimalist aesthetic with professional polish for tech portfolio context:

- **Minimal & Refined**: Clean typography, generous whitespace, subtle interactions
- **Professional Polish**: Sophisticated hover states, smooth animations, attention to detail
- **Purposeful Contrast**: Strategic use of accent color (#00e6c8) for hierarchy and focus
- **Responsive Excellence**: Mobile-first approach with elegant breakpoint transitions

---

## 1. NAVBAR VISUAL SPECIFICATIONS

### 1.1 Design Variants

#### Variant A: Transparent (Home Page Hero)
**Use Case**: Top of homepage before scroll
```css
Background: transparent
Backdrop: none
Border: none
Transition: Becomes solid on scroll (threshold: 80px)
```

**Tailwind Classes**:
```tsx
className="fixed top-0 left-0 w-full z-100 transition-all duration-500 ease-out"
// Conditional: scrolled ? "bg-bg-primary/95 backdrop-blur-xl border-b border-border-subtle" : "bg-transparent"
```

#### Variant B: Solid Sticky (Internal Pages & Scrolled)
**Use Case**: All internal pages, homepage after scroll
```css
Background: rgba(10, 10, 10, 0.95) with backdrop-blur
Border Bottom: 1px solid #2a2a2a
Shadow: 0 4px 24px rgba(0, 0, 0, 0.4)
```

**Tailwind Classes**:
```tsx
className="fixed top-0 left-0 w-full z-100 bg-bg-primary/95 backdrop-blur-xl border-b border-border-subtle shadow-2xl transition-all duration-500 ease-out"
```

#### Variant C: Mobile Menu Overlay
**Use Case**: Mobile hamburger menu expanded
```css
Background: #0a0a0a (solid, no blur)
Position: Fixed fullscreen overlay
Z-index: 200
Animation: Fade + slide from top
```

**Tailwind Classes**:
```tsx
className="fixed inset-0 z-200 bg-bg-primary flex flex-col items-center justify-center animate-fadeSlideDown"
```

---

### 1.2 Typography System

#### Logo/Brand Treatment
```css
Font Family: Space Grotesk
Font Weight: 700 (Bold)
Font Size: Desktop: 20px (1.25rem) | Mobile: 18px (1.125rem)
Letter Spacing: -0.02em (tight)
Color: #ffffff
Hover: color → #00e6c8 (transition: 300ms)
```

**Tailwind Classes**:
```tsx
className="font-display font-bold text-xl md:text-2xl tracking-tight text-fg-primary hover:text-accent-500 transition-colors duration-300"
```

**Alternative**: Image logo (current implementation)
- Size: 48px × 48px (desktop) | 40px × 40px (mobile)
- Hover effect: scale(1.05) + subtle glow
```tsx
className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(0,230,200,0.4)]"
```

#### Navigation Links
```css
Font Family: Inter
Font Weight: 500 (Medium)
Font Size: 15px (0.9375rem)
Letter Spacing: 0.01em (slightly open)
Text Transform: NONE (sentence case for professionalism)
Color: #e5e5e5 (fg-secondary)
Line Height: 1.5
```

**Tailwind Classes**:
```tsx
className="font-sans font-medium text-[15px] tracking-wide text-fg-secondary hover:text-fg-primary transition-colors duration-300 relative"
```

**Paul Taylor Inspiration**: Uppercase minimal links
```css
Text Transform: uppercase
Font Size: 13px (0.8125rem)
Font Weight: 600 (Semi-bold)
Letter Spacing: 0.08em (very open, tracking-wider)
```

**Alternative Tailwind (Paul Taylor Style)**:
```tsx
className="font-sans font-semibold text-[13px] uppercase tracking-[0.08em] text-fg-secondary hover:text-fg-primary transition-colors duration-300"
```

#### CTA Button (View CV)
```css
Background: transparent
Border: 1.5px solid #00e6c8
Color: #00e6c8
Padding: 10px 20px (py-2.5 px-5)
Border Radius: 6px (rounded-md)
Font Weight: 600
Font Size: 14px
Hover State:
  Background: #00e6c8
  Color: #0a0a0a
  Box Shadow: 0 0 20px rgba(0, 230, 200, 0.3)
  Transform: translateY(-1px)
```

**Tailwind Classes**:
```tsx
className="border-[1.5px] border-accent-500 text-accent-500 px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-accent-500 hover:text-fg-inverse hover:shadow-accent transition-all duration-300 hover:-translate-y-0.5"
```

---

### 1.3 Layout Structure

#### Desktop (≥768px)
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                    [Link] [Link] [Link] [🌙] [Button]│
│  48px                                           Right-aligned │
└─────────────────────────────────────────────────────────────┘
```

**Container**:
```tsx
className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between"
```

**Navigation Group**:
```tsx
className="hidden md:flex items-center gap-8"
// Links: gap-8 (32px between items)
```

#### Mobile (<768px)
**Collapsed State**:
```
┌──────────────────────────────────┐
│  [Logo]           [🌙] [☰]      │
└──────────────────────────────────┘
```

**Expanded State (Fullscreen Overlay)**:
```
┌──────────────────────────────────┐
│                [✕]               │
│                                  │
│          [Large Logo]            │
│                                  │
│        [Link - Large]            │
│        [Link - Large]            │
│        [Link - Large]            │
│        [Button - Large]          │
│                                  │
│          [🌙 Theme]              │
└──────────────────────────────────┘
```

**Mobile Link Styling**:
```css
Font Size: 24px (text-2xl)
Font Weight: 600
Padding: 16px vertical
Width: 100%
Text Align: center
Spacing: 8px between items
```

**Tailwind Classes**:
```tsx
className="text-2xl font-semibold text-center py-4 w-full text-fg-primary hover:text-accent-500 transition-colors duration-300"
```

---

### 1.4 Interactive States & Animations

#### Link Hover States

**Option 1: Underline Slide (Recommended - Paul Taylor Style)**
```css
Position: relative
After Element:
  content: ''
  position: absolute
  bottom: -4px
  left: 0
  width: 0
  height: 2px
  background: #00e6c8
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1)
Hover:
  after { width: 100% }
  color: #ffffff
```

**Tailwind Implementation**:
```tsx
className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent-500 after:transition-all after:duration-300 hover:after:w-full hover:text-fg-primary"
```

**Option 2: Accent Glow**
```css
Text Shadow: 0 0 0 transparent
Transition: text-shadow 300ms
Hover:
  text-shadow: 0 0 12px rgba(0, 230, 200, 0.6)
  color: #00e6c8
```

**Tailwind Implementation**:
```tsx
className="transition-all duration-300 hover:text-accent-500 hover:drop-shadow-[0_0_12px_rgba(0,230,200,0.6)]"
```

#### Scroll Behavior Animation

**Navbar Transform on Scroll**:
```javascript
// Scroll threshold: 80px
const [isScrolled, setIsScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 80)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**Transition**:
```css
Transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1)
Properties:
  - background-color
  - backdrop-filter
  - border-color
  - box-shadow
  - padding (optional: py-4 → py-3)
```

#### Mobile Menu Animation

**Entry Animation**:
```css
@keyframes fadeSlideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
Duration: 400ms
Easing: cubic-bezier(0.16, 1, 0.3, 1) (spring-like)
```

**Tailwind Config Extension**:
```typescript
// tailwind.config.ts - add to theme.extend
animation: {
  'fadeSlideDown': 'fadeSlideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  'fadeSlideUp': 'fadeSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
}
keyframes: {
  fadeSlideDown: {
    '0%': { opacity: '0', transform: 'translateY(-20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeSlideUp: {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-20px)' },
  }
}
```

**Link Stagger Animation** (Mobile Menu):
```tsx
// Each link appears with increasing delay
{links.map((link, index) => (
  <Link
    key={link.href}
    className={`... animate-fadeSlideDown`}
    style={{ animationDelay: `${index * 80}ms` }}
  >
    {link.label}
  </Link>
))}
```

#### Theme Toggle Animation
```css
Icon Transition: rotate 180deg + fade
Duration: 400ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

**Tailwind Classes**:
```tsx
className="w-6 h-6 transition-all duration-400 ease-out hover:rotate-180 hover:text-accent-500"
```

---

### 1.5 Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| **Mobile** | <768px | - Hamburger menu<br>- Fullscreen overlay navigation<br>- Stacked logo + icons<br>- Logo: 40px |
| **Tablet** | 768px-1023px | - Horizontal navigation<br>- Reduced spacing (gap-6)<br>- Logo: 48px |
| **Desktop** | ≥1024px | - Full spacing (gap-8)<br>- Max container width<br>- Logo: 48px |
| **Wide** | ≥1536px | - Max-width constraint (2xl)<br>- Increased padding (px-12) |

**Container Padding Scale**:
```tsx
className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
```

---

### 1.6 Accessibility Specifications

#### Focus States
```css
Outline: 2px solid #00e6c8
Outline Offset: 4px
Border Radius: 4px
Transition: outline 200ms
```

**Tailwind Classes**:
```tsx
className="focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4 focus-visible:rounded transition-all"
```

#### ARIA Labels
```tsx
<nav aria-label="Primary navigation">
  <Link href="/" aria-label="Home - Aldo Matias">
    <Image alt="Aldo Matias logo" />
  </Link>

  <button
    onClick={toggleMenu}
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    aria-expanded={isMenuOpen}
    aria-controls="mobile-menu"
  >
    {/* Icon */}
  </button>

  <button
    onClick={toggleTheme}
    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
  >
    {/* Icon */}
  </button>
</nav>
```

#### Keyboard Navigation
- Tab order: Logo → Links → Theme toggle → CTA button
- Mobile: Logo → Theme → Hamburger
- Escape key closes mobile menu
- Focus trap in mobile menu overlay

---

## 2. FOOTER VISUAL SPECIFICATIONS

### 2.1 Design Variants

#### Variant A: Minimal Single-Row (Current)
**Use Case**: Standard footer for all pages
```css
Background: #000000 (pure black - stronger than navbar)
Border Top: 1px solid #1a1a1a (subtle separation)
Padding: 48px vertical (py-12)
```

**Tailwind Classes**:
```tsx
className="bg-black border-t border-bg-secondary py-12 px-6 md:px-12"
```

#### Variant B: Expanded with Newsletter (Paul Taylor Inspired)
**Use Case**: Homepage footer with engagement focus
```css
Background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%)
Padding: 80px vertical (py-20)
Structure: Multi-row grid
```

---

### 2.2 Typography System

#### Copyright Text
```css
Font Family: Inter
Font Size: 13px (text-xs)
Font Weight: 400 (Regular)
Color: #a3a3a3 (fg-tertiary)
Letter Spacing: 0.02em
```

**Tailwind Classes**:
```tsx
className="font-sans text-xs font-normal text-fg-tertiary tracking-wide"
```

#### Social Links
**Option 1: Text Links (Current)**
```css
Font Family: Inter
Font Size: 15px (text-[15px])
Font Weight: 500 (Medium)
Color: #e5e5e5 (fg-secondary)
Hover: #00e6c8 (accent-500)
Transition: 300ms
```

**Tailwind Classes**:
```tsx
className="font-sans text-[15px] font-medium text-fg-secondary hover:text-accent-500 transition-colors duration-300"
```

**Option 2: Icon Links (Paul Taylor Style)**
```css
Size: 24px × 24px
Color: #e5e5e5
Hover: #00e6c8 + scale(1.1)
Transition: all 300ms
```

**Tailwind Classes**:
```tsx
className="w-6 h-6 text-fg-secondary hover:text-accent-500 hover:scale-110 transition-all duration-300"
```

#### Newsletter/CTA Heading (Expanded Variant)
```css
Font Family: Space Grotesk
Font Size: 32px (text-3xl)
Font Weight: 700 (Bold)
Color: #ffffff
Letter Spacing: -0.02em
Margin Bottom: 16px
```

**Tailwind Classes**:
```tsx
className="font-display text-3xl md:text-4xl font-bold text-fg-primary tracking-tight mb-4"
```

#### Newsletter Input (Expanded Variant)
```css
Background: #1a1a1a (bg-secondary)
Border: 1px solid #2a2a2a (border-subtle)
Border Radius: 8px (rounded-lg)
Padding: 14px 20px
Font Size: 15px
Color: #ffffff
Focus:
  Border: 1px solid #00e6c8
  Box Shadow: 0 0 0 3px rgba(0, 230, 200, 0.1)
```

**Tailwind Classes**:
```tsx
className="bg-bg-secondary border border-border-subtle rounded-lg px-5 py-3.5 text-[15px] text-fg-primary placeholder:text-fg-quaternary focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-300"
```

#### Secondary Links (Terms, Privacy)
```css
Font Size: 12px (text-xs)
Font Weight: 400
Color: #737373 (fg-quaternary)
Hover: #e5e5e5 (fg-secondary)
Text Decoration: underline (subtle)
```

**Tailwind Classes**:
```tsx
className="text-xs font-normal text-fg-quaternary hover:text-fg-secondary underline underline-offset-2 transition-colors duration-300"
```

---

### 2.3 Layout Structure

#### Single-Row Layout (Current - Mobile-First)

**Mobile (<768px)**:
```
┌────────────────────────────────┐
│    © 2025 Aldo Matias         │
│                                │
│  [LinkedIn] [LeetCode] [GitHub]│
└────────────────────────────────┘
```

**Desktop (≥768px)**:
```
┌───────────────────────────────────────────────┐
│  © 2025 Aldo Matias    [LinkedIn] [LeetCode] [GitHub] │
└───────────────────────────────────────────────┘
```

**Tailwind Structure**:
```tsx
<footer className="bg-black border-t border-bg-secondary py-12 px-6 md:px-12">
  <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
    <p className="text-xs text-fg-tertiary">© {year} Aldo Matias</p>
    <div className="flex items-center gap-6">
      {/* Social links */}
    </div>
  </div>
</footer>
```

#### Expanded Layout (Paul Taylor Inspired)

**Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              [Newsletter Heading]                       │
│         [Email Input] [Subscribe Button]                │
│                                                         │
│  ─────────────────────────────────────────────────     │
│                                                         │
│  [LinkedIn] [LeetCode] [GitHub]  |  [Terms] [Privacy]  │
│                                                         │
│              © 2025 Aldo Matias                        │
└─────────────────────────────────────────────────────────┘
```

**Tailwind Structure**:
```tsx
<footer className="bg-gradient-to-b from-bg-primary to-black border-t border-bg-secondary py-20 px-6 md:px-12">
  <div className="max-w-screen-xl mx-auto">
    {/* Newsletter Section */}
    <div className="text-center mb-16">
      <h3 className="font-display text-3xl md:text-4xl font-bold text-fg-primary tracking-tight mb-4">
        Stay Updated
      </h3>
      <p className="text-fg-secondary mb-6 max-w-md mx-auto">
        Get notified about new projects and articles
      </p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 bg-bg-secondary border border-border-subtle rounded-lg px-5 py-3.5 text-[15px] text-fg-primary placeholder:text-fg-quaternary focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-300"
        />
        <button className="bg-accent-500 text-fg-inverse px-6 py-3.5 rounded-lg font-semibold hover:bg-accent-600 hover:shadow-accent transition-all duration-300">
          Subscribe
        </button>
      </form>
    </div>

    {/* Divider */}
    <div className="border-t border-border-subtle mb-12" />

    {/* Links Grid */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
      {/* Social Links */}
      <div className="flex items-center gap-6">
        {/* Links */}
      </div>

      {/* Legal Links */}
      <div className="flex items-center gap-6">
        {/* Terms, Privacy */}
      </div>
    </div>

    {/* Copyright */}
    <div className="text-center">
      <p className="text-xs text-fg-tertiary">
        © {year} Aldo Matias. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

---

### 2.4 Social Link Treatments

#### Text Link Style (Current)
```tsx
const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/aldomatias-',
    hoverColor: 'hover:text-blue-400'
  },
  {
    name: 'LeetCode',
    href: 'https://leetcode.com/u/ASovvEqAIE/',
    hoverColor: 'hover:text-yellow-400'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/amatiasdev',
    hoverColor: 'hover:text-accent-500'
  },
]

// Render
{socialLinks.map(link => (
  <a
    key={link.name}
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className={`font-sans text-[15px] font-medium text-fg-secondary ${link.hoverColor} transition-colors duration-300`}
  >
    {link.name}
  </a>
))}
```

#### Icon Link Style (Alternative)
```tsx
import {
  SiLinkedin,
  SiLeetcode,
  SiGithub
} from 'react-icons/si'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '...',
    icon: SiLinkedin,
    hoverColor: 'hover:text-blue-400'
  },
  // ...
]

// Render
{socialLinks.map(link => (
  <a
    key={link.name}
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.name}
    className={`w-6 h-6 text-fg-secondary ${link.hoverColor} hover:scale-110 transition-all duration-300`}
  >
    <link.icon className="w-full h-full" />
  </a>
))}
```

#### Combined Style (Text + Icon)
```tsx
<a
  href={link.href}
  className="flex items-center gap-2 text-fg-secondary hover:text-accent-500 transition-colors duration-300"
>
  <link.icon className="w-5 h-5" />
  <span className="font-medium text-[15px]">{link.name}</span>
</a>
```

---

### 2.5 Interactive States

#### Link Hover Effect (Minimal)
```css
Transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1)
Hover: color changes to accent or platform color
```

#### Link Hover Effect (Enhanced - Paul Taylor Style)
```css
Transform: translateY(-2px)
Text Shadow: 0 4px 8px rgba(0, 230, 200, 0.2)
Transition: all 300ms
```

**Tailwind Classes**:
```tsx
className="transition-all duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_4px_8px_rgba(0,230,200,0.2)]"
```

#### Newsletter Subscribe Button
```css
Default:
  Background: #00e6c8
  Color: #0a0a0a
  Border Radius: 8px
  Padding: 14px 24px
  Font Weight: 600

Hover:
  Background: #00b39e (accent-600)
  Box Shadow: 0 8px 24px rgba(0, 230, 200, 0.25)
  Transform: translateY(-2px)

Active:
  Transform: translateY(0)
  Box Shadow: 0 4px 12px rgba(0, 230, 200, 0.15)

Disabled:
  Background: #2a2a2a
  Color: #737373
  Cursor: not-allowed
  Opacity: 0.6
```

**Tailwind Classes**:
```tsx
className="bg-accent-500 text-fg-inverse px-6 py-3.5 rounded-lg font-semibold hover:bg-accent-600 hover:shadow-accent hover:-translate-y-0.5 active:translate-y-0 disabled:bg-bg-tertiary disabled:text-fg-quaternary disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-300"
```

---

### 2.6 Responsive Behavior

| Breakpoint | Layout | Spacing | Typography |
|------------|--------|---------|------------|
| **Mobile** (<640px) | Stacked vertical<br>Center-aligned | py-12, px-4<br>gap-4 | Copyright: 12px<br>Links: 15px |
| **Tablet** (640px-1023px) | Horizontal row<br>Space-between | py-12, px-8<br>gap-6 | Copyright: 13px<br>Links: 15px |
| **Desktop** (≥1024px) | Horizontal row<br>Max-width container | py-16, px-12<br>gap-8 | Copyright: 13px<br>Links: 16px |

**Newsletter Section (Expanded Variant)**:
- Mobile: Full-width input, stacked button below
- Tablet+: Flexbox row, input grows, fixed button width

```tsx
<form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
  <input className="flex-1 ..." />
  <button className="sm:w-auto ..." />
</form>
```

---

## 3. ANIMATION SPECIFICATIONS

### 3.1 Timing Functions

```css
/* Smooth, professional animations */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1)      /* Default transitions */
--ease-in-out: cubic-bezier(0.4, 0, 0.6, 1)   /* Symmetrical motion */
--spring: cubic-bezier(0.16, 1, 0.3, 1)       /* Bouncy, delightful */
--snap: cubic-bezier(0.87, 0, 0.13, 1)        /* Quick, decisive */
```

**Tailwind Config**:
```typescript
// tailwind.config.ts
theme: {
  extend: {
    transitionTimingFunction: {
      'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      'snap': 'cubic-bezier(0.87, 0, 0.13, 1)',
    }
  }
}
```

### 3.2 Scroll Behaviors

#### Navbar Hide on Scroll Down, Show on Scroll Up
```javascript
const [isVisible, setIsVisible] = useState(true)
const [lastScrollY, setLastScrollY] = useState(0)

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY < 80) {
      setIsVisible(true) // Always show at top
    } else if (currentScrollY > lastScrollY) {
      setIsVisible(false) // Scrolling down
    } else {
      setIsVisible(true) // Scrolling up
    }

    setLastScrollY(currentScrollY)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [lastScrollY])
```

**Tailwind Implementation**:
```tsx
<nav
  className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  }`}
>
```

#### Link Underline Draw Animation
```css
/* Animated underline that draws from left to right */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00e6c8, #00b39e);
  transition: width 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover::after {
  width: 100%;
}
```

**Tailwind Implementation**:
```tsx
className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-accent-500 after:to-accent-600 after:transition-all after:duration-400 after:ease-spring hover:after:w-full"
```

#### Footer Link Lift on Hover
```css
Transform: translateY(-2px)
Transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1)
Text Shadow: 0 4px 8px rgba(0, 230, 200, 0.2)
```

**Tailwind Implementation**:
```tsx
className="transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:drop-shadow-[0_4px_8px_rgba(0,230,200,0.2)]"
```

---

## 4. COMPONENT STATES MATRIX

### Navbar States

| State | Background | Border | Shadow | Visibility |
|-------|------------|--------|--------|------------|
| **Default (Top)** | Transparent | None | None | Visible |
| **Scrolled** | bg-primary/95 + blur | border-subtle | shadow-2xl | Visible |
| **Scroll Down** | bg-primary/95 + blur | border-subtle | shadow-2xl | Hidden (-translate-y-full) |
| **Scroll Up** | bg-primary/95 + blur | border-subtle | shadow-2xl | Visible |
| **Mobile Menu Open** | bg-primary (solid) | None | None | Fullscreen overlay |

### Link States

| State | Color | Underline | Transform | Shadow |
|-------|-------|-----------|-----------|--------|
| **Default** | fg-secondary | None | None | None |
| **Hover** | fg-primary | width: 100% | None | Optional glow |
| **Active** | accent-500 | width: 100% | None | Glow |
| **Focus** | fg-primary | width: 100% | None | Outline |
| **Disabled** | fg-quaternary | None | None | None |

### Button States (CTA)

| State | Background | Border | Color | Transform | Shadow |
|-------|------------|--------|-------|-----------|--------|
| **Default** | transparent | accent-500 | accent-500 | None | None |
| **Hover** | accent-500 | accent-500 | fg-inverse | translateY(-1px) | shadow-accent |
| **Active** | accent-600 | accent-600 | fg-inverse | translateY(0) | shadow-accent-lg |
| **Focus** | accent-500 | accent-500 | fg-inverse | None | Outline + shadow-accent |
| **Disabled** | transparent | border-subtle | fg-quaternary | None | None |

---

## 5. DESIGN TOKENS SUMMARY

### Color Palette
```css
/* Backgrounds */
--bg-primary: #0a0a0a      /* Main background, navbar solid */
--bg-secondary: #1a1a1a    /* Footer border, input backgrounds */
--bg-tertiary: #2a2a2a     /* Hover states, disabled states */
--bg-black: #000000        /* Pure black footer */

/* Foregrounds */
--fg-primary: #ffffff      /* Primary text, headings */
--fg-secondary: #e5e5e5    /* Body text, navigation links */
--fg-tertiary: #a3a3a3     /* Muted text, copyright */
--fg-quaternary: #737373   /* Very subtle text, placeholders */

/* Accents */
--accent-500: #00e6c8      /* Primary accent, CTAs, hover states */
--accent-600: #00b39e      /* Darker accent, active states */
--accent-subtle: rgba(0, 230, 200, 0.15)  /* Transparent overlays */

/* Borders */
--border-subtle: #2a2a2a   /* Very subtle dividers */
--border-default: #404040  /* Standard borders */
```

### Typography Scale
```css
/* Families */
--font-display: 'Space Grotesk'  /* Headings, logo, bold statements */
--font-sans: 'Inter'             /* Body text, UI elements */
--font-mono: 'JetBrains Mono'    /* Code, technical content */

/* Sizes */
--text-xs: 0.75rem (12px)       /* Legal links, meta info */
--text-sm: 0.875rem (14px)      /* Button text, small UI */
--text-base: 0.9375rem (15px)   /* Navigation links, body */
--text-lg: 1rem (16px)          /* Emphasized body text */
--text-xl: 1.25rem (20px)       /* Section subheadings */
--text-2xl: 1.5rem (24px)       /* Mobile menu links */
--text-3xl: 1.875rem (30px)     /* Footer headings */
--text-4xl: 2.25rem (36px)      /* Desktop headings */

/* Weights */
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Spacing System
```css
/* Consistent spacing based on 4px base unit */
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
```

### Animation Tokens
```css
--duration-fast: 200ms      /* Quick feedback, icon changes */
--duration-base: 300ms      /* Standard transitions */
--duration-slow: 500ms      /* Navbar transforms, overlays */

--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)
--ease-snap: cubic-bezier(0.87, 0, 0.13, 1)
```

---

## 6. IMPLEMENTATION PRIORITY

### Phase 1: Core Visual Improvements (Immediate)
1. Update navbar typography (uppercase links, tighter tracking)
2. Implement link underline hover animation
3. Enhance CTA button hover state with shadow + lift
4. Add backdrop blur to scrolled navbar
5. Improve mobile menu animation (stagger effect)

### Phase 2: Footer Enhancement (Next)
1. Add border-top for subtle separation
2. Implement social link hover effects (lift + glow)
3. Update typography scale for consistency
4. Add expanded footer variant with newsletter
5. Improve responsive spacing

### Phase 3: Advanced Interactions (Future)
1. Implement navbar hide/show on scroll direction
2. Add link active state indicators
3. Create smooth page transition animations
4. Implement accessibility focus indicators
5. Add prefers-reduced-motion support

---

## 7. DESIGN RATIONALE

### Paul Taylor Comedy Inspiration
**What We're Adopting**:
- Minimal, refined aesthetic with generous whitespace
- Uppercase navigation links with wide tracking
- Subtle hover states that enhance without overpowering
- Clean typography hierarchy with limited font weights
- Newsletter-focused footer engagement

**What We're Adapting**:
- Professional color palette (cyan accent vs comedy branding)
- Tech portfolio context (GitHub/LeetCode vs social media)
- Refined animations (professional vs playful)
- Accessibility compliance (WCAG AA standards)
- B2B communication tone (business email validation)

### Strategic Design Decisions

#### Navbar Transparency
- **Decision**: Start transparent, become solid on scroll
- **Rationale**: Maximizes hero impact, provides context awareness
- **Technical**: Scroll threshold at 80px prevents jitter

#### Accent Color Usage
- **Decision**: Cyan (#00e6c8) as primary accent, limited application
- **Rationale**: Tech-forward color, high contrast on dark, distinctive
- **Application**: CTAs, hover states, focus indicators only

#### Typography Choice
- **Decision**: Space Grotesk for display, Inter for UI
- **Rationale**: Modern geometric sans for tech credibility, excellent readability
- **Technical**: Variable fonts for performance, wide weight range

#### Animation Philosophy
- **Decision**: Spring-like easing (cubic-bezier 0.16, 1, 0.3, 1)
- **Rationale**: Adds personality without feeling unprofessional
- **Technical**: 300ms sweet spot for perceived responsiveness

#### Mobile Menu Approach
- **Decision**: Fullscreen overlay vs slide-in drawer
- **Rationale**: Eliminates cognitive load, clear focus, Paul Taylor style
- **Technical**: Staggered link animation creates perceived polish

---

## 8. ACCESSIBILITY CHECKLIST

- [ ] All interactive elements have min 44×44px touch target
- [ ] Focus indicators visible on all focusable elements
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation fully functional
- [ ] ARIA labels on icon buttons and controls
- [ ] Skip to main content link (optional enhancement)
- [ ] Reduced motion alternative animations
- [ ] Screen reader announcements for state changes
- [ ] Semantic HTML structure (nav, footer, headings)
- [ ] Mobile menu focus trap implemented

---

## 9. BROWSER SUPPORT

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Backdrop blur | 76+ | 103+ | 9+ | 79+ |
| CSS Grid | 57+ | 52+ | 10.1+ | 16+ |
| Flexbox gap | 84+ | 63+ | 14.1+ | 84+ |
| Custom properties | 49+ | 31+ | 9.1+ | 15+ |
| Scroll behavior | 61+ | 36+ | 15.4+ | 79+ |

**Fallbacks**:
- Backdrop blur: Solid background with slightly increased opacity
- CSS Grid: Flexbox with calculated widths
- Flexbox gap: Margin-based spacing

---

## 10. PERFORMANCE NOTES

### Optimization Strategies
1. **Navbar Shadow**: Use box-shadow instead of filter drop-shadow (GPU-accelerated)
2. **Backdrop Blur**: Apply only when scrolled (conditional rendering)
3. **Font Loading**: Use `font-display: swap` to prevent FOIT
4. **Animation**: Use `transform` and `opacity` only (compositor properties)
5. **Mobile Menu**: Use `will-change: transform` for overlay

### Lighthouse Targets
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

---

## COMPLETE COMPONENT CODE EXAMPLES

### Navbar Component (Complete)
```tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToElement = (hash: string) => {
    const yOffset = -100
    const element = document.querySelector(hash)
    if (element) {
      const y = (element as HTMLElement).getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const goToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const currentPath = pathname
    if (currentPath !== "/") {
      router.push("/#contact")
      setTimeout(() => scrollToElement("#contact"), 300)
    } else {
      scrollToElement("#contact")
    }
  }

  const onViewCVClick = () => {
    window.open("/aldo matias cv.pdf", "_blank")
  }

  const navLinks = [
    { label: "Employment History", href: "/experience" },
    { label: "Contact", href: "/#contact", onClick: goToContact },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-bg-primary/95 backdrop-blur-xl border-b border-border-subtle shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Home - Aldo Matias">
            <Image
              src="/main-icon.png"
              alt="Aldo Matias logo"
              className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(0,230,200,0.4)]"
              width={200}
              height={200}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="w-6 h-6 text-fg-secondary hover:text-accent-500 transition-all duration-300 hover:rotate-180 focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4"
            >
              {isDarkMode ? (
                <SunIcon className="w-full h-full" />
              ) : (
                <MoonIcon className="w-full h-full" />
              )}
            </button>

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.onClick}
                className="font-sans font-semibold text-[13px] uppercase tracking-[0.08em] text-fg-secondary hover:text-fg-primary transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-accent-500 after:to-accent-600 after:transition-all after:duration-400 after:ease-spring hover:after:w-full focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4"
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Button */}
            <button
              onClick={onViewCVClick}
              className="border-[1.5px] border-accent-500 text-accent-500 px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-accent-500 hover:text-fg-inverse hover:shadow-accent transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4"
            >
              View CV
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="w-6 h-6 text-fg-secondary hover:text-accent-500 transition-all duration-300"
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="focus:outline-none z-200 w-6 h-6 text-fg-primary"
            >
              {isMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="fixed inset-0 z-200 bg-bg-primary flex flex-col items-center justify-center animate-fadeSlideDown"
          aria-label="Mobile navigation"
        >
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="absolute top-6 right-6 w-8 h-8 text-fg-primary hover:text-accent-500 transition-colors duration-300"
          >
            <XMarkIcon />
          </button>

          {/* Logo */}
          <Image
            src="/main-icon.png"
            alt="Aldo Matias logo"
            className="w-16 h-16 mb-12 opacity-60"
            width={200}
            height={200}
          />

          {/* Mobile Links */}
          <div className="flex flex-col items-center gap-2 mb-12">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  link.onClick?.(e as any)
                  toggleMenu()
                }}
                className="text-2xl font-semibold text-center py-4 w-full text-fg-primary hover:text-accent-500 transition-colors duration-300 animate-fadeSlideDown"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                onViewCVClick()
                toggleMenu()
              }}
              className="text-2xl font-semibold text-center py-4 w-full text-accent-500 hover:text-accent-400 transition-colors duration-300 animate-fadeSlideDown"
              style={{ animationDelay: `${navLinks.length * 80}ms` }}
            >
              View CV
            </button>
          </div>
        </nav>
      )}
    </>
  )
}
```

### Footer Component (Minimal)
```tsx
import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aldomatias-',
      hoverColor: 'hover:text-blue-400',
    },
    {
      name: 'LeetCode',
      href: 'https://leetcode.com/u/ASovvEqAIE/',
      hoverColor: 'hover:text-yellow-400',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/amatiasdev',
      hoverColor: 'hover:text-accent-500',
    },
  ]

  return (
    <footer className="bg-black border-t border-bg-secondary py-12 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
        {/* Copyright */}
        <p className="font-sans text-xs font-normal text-fg-tertiary tracking-wide">
          © {currentYear} Aldo Matias. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-sans text-[15px] font-medium text-fg-secondary ${link.hoverColor} transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:drop-shadow-[0_4px_8px_rgba(0,230,200,0.15)] focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

### Footer Component (Expanded with Newsletter)
```tsx
'use client'

import React, { useState } from 'react'

export default function FooterExpanded() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/aldomatias-', hoverColor: 'hover:text-blue-400' },
    { name: 'LeetCode', href: 'https://leetcode.com/u/ASovvEqAIE/', hoverColor: 'hover:text-yellow-400' },
    { name: 'GitHub', href: 'https://github.com/amatiasdev', hoverColor: 'hover:text-accent-500' },
  ]

  const legalLinks = [
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setMessage('Thanks for subscribing!')
      setEmail('')
      setIsSubmitting(false)
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

  return (
    <footer className="bg-gradient-to-b from-bg-primary to-black border-t border-bg-secondary py-20 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-fg-primary tracking-tight mb-4">
            Stay Updated
          </h3>
          <p className="text-fg-secondary mb-6 max-w-md mx-auto text-[15px]">
            Get notified about new projects, articles, and technical insights
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-bg-secondary border border-border-subtle rounded-lg px-5 py-3.5 text-[15px] text-fg-primary placeholder:text-fg-quaternary focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-300 focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent-500 text-fg-inverse px-6 py-3.5 rounded-lg font-semibold hover:bg-accent-600 hover:shadow-accent hover:-translate-y-0.5 active:translate-y-0 disabled:bg-bg-tertiary disabled:text-fg-quaternary disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-accent-500 text-sm font-medium animate-fadeSlideDown">
              {message}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border-subtle mb-12" />

        {/* Links Grid */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-sans text-[15px] font-medium text-fg-secondary ${link.hoverColor} transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:drop-shadow-[0_4px_8px_rgba(0,230,200,0.15)]`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-normal text-fg-quaternary hover:text-fg-secondary underline underline-offset-2 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-sans text-xs font-normal text-fg-tertiary tracking-wide">
            © {currentYear} Aldo Matias. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## Final Notes

This specification provides a comprehensive visual design system for navbar and footer components inspired by Paul Taylor Comedy's minimalist aesthetic, adapted for a professional tech portfolio context.

**Key Strengths**:
- Professional polish with personality
- Accessibility-first approach (WCAG AA compliance)
- Performance-optimized animations
- Responsive excellence across all devices
- Consistent design token system
- Clear implementation guidance

**Implementation Flexibility**:
- Two footer variants (minimal vs expanded)
- Multiple link styling options (text, icons, combined)
- Optional navbar behaviors (transparent, solid, hide/show)
- Customizable animation preferences

**Next Steps**:
1. Review specifications with stakeholders
2. Implement Phase 1 core improvements
3. Test across browsers and devices
4. Validate accessibility compliance
5. Iterate based on user feedback
