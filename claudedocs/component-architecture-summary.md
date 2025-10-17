# Component Architecture Summary
## Navbar & Footer System Overview

---

## Quick Reference

### Component Hierarchy

```
NAVBAR SYSTEM
├── Navbar (Organism) ..................... Main orchestrator with scroll logic
│   ├── NavbarDesktop ..................... Desktop navigation layout
│   │   ├── NavbarLogo .................... Animated logo component
│   │   ├── NavItem × N ................... Navigation links with indicators
│   │   ├── ThemeToggle ................... Light/dark mode switcher
│   │   └── CTAButton ..................... Primary action button
│   ├── NavbarMobile ...................... Mobile header layout
│   │   ├── NavbarLogo .................... Compact logo
│   │   ├── ThemeToggle ................... Theme switcher
│   │   └── MenuToggle .................... Hamburger animation
│   └── ScrollProgress .................... Reading progress indicator

MOBILE MENU (Overlay)
├── MobileMenu (Organism) ................. Full-screen overlay menu
│   ├── MobileMenuOverlay ................. Backdrop blur
│   ├── MobileMenuPanel ................... Sliding panel from right
│   │   ├── MobileNavItem × N ............. Large touch-friendly links
│   │   ├── CTAButton ..................... Full-width action
│   │   └── SocialLinks ................... Social platform links

FOOTER SYSTEM
├── Footer (Organism) ..................... Main footer container
│   ├── FooterMain ........................ Top content section
│   │   ├── FooterBrand ................... Logo, tagline, socials
│   │   ├── FooterNavGroup × N ............ Navigation columns
│   │   └── NewsletterForm ................ Email subscription
│   └── FooterBottom ...................... Legal/copyright bar
│       ├── Copyright ..................... Year and holder
│       └── LegalLinks .................... Privacy, terms, etc.
```

---

## State Management Flow

### Navbar State Machine

```
SCROLL POSITION → useScrollPosition hook
    ↓
VARIANT CALCULATION (transparent → solid → blur)
    ↓
AUTO-HIDE LOGIC (hide on down, show on up)
    ↓
NAVBAR ANIMATION (Framer Motion variants)
```

### Mobile Menu State

```
USER CLICKS TOGGLE → toggleMobileMenu()
    ↓
BODY SCROLL LOCK (prevent background scroll)
    ↓
FOCUS TRAP ACTIVATION (keyboard accessibility)
    ↓
MENU ANIMATION (slide in from right)
    ↓
ESC KEY LISTENER (close on escape)
```

---

## Animation Strategy

### Navbar Animations

**Scroll-Based Variants**:
- **Transparent**: `bg: rgba(10,10,10,0)`, no backdrop blur
- **Solid**: `bg: rgba(10,10,10,1)`, subtle shadow
- **Blur**: `bg: rgba(10,10,10,0.8)`, 12px backdrop blur

**Auto-Hide Behavior**:
- Scroll down > 150px → Hide navbar (y: -100px)
- Scroll up → Show navbar (y: 0)
- Mobile menu open → Force visible

### Mobile Menu Animations

**Panel Animation**:
```typescript
hidden: { x: '100%' }
visible: {
  x: 0,
  transition: {
    type: 'spring',
    damping: 30,
    stiffness: 300
  }
}
```

**Staggered Menu Items**:
```typescript
delay: 0.1 + index * 0.05  // 50ms stagger per item
```

### Footer Animations

**Scroll-Into-View**:
- Threshold: 0.1 (10% visible)
- Trigger once: true
- Stagger children: 100ms delay

---

## Key Hooks

### useNavbar (Core State Hook)

```typescript
Returns:
├── scrollState
│   ├── variant: 'transparent' | 'solid' | 'blur'
│   ├── isHidden: boolean
│   ├── hasScrolled: boolean
│   └── scrollProgress: 0-1
├── mobileMenuState
│   ├── isOpen: boolean
│   ├── activeSubmenu: string | null
│   └── focusTrapEnabled: boolean
├── isMobile: boolean
├── activeItem: string | null
├── toggleMobileMenu: () => void
├── closeMobileMenu: () => void
└── setActiveItem: (item: string) => void
```

### useScrollPosition

```typescript
Parameters:
├── threshold: number (default: 10)

Returns:
├── scrollY: number
├── isScrolled: boolean (scrollY > threshold)
└── scrollDirection: 'up' | 'down' | null
```

### useActiveSection

```typescript
Returns:
├── activeSection: string | null (current section ID in viewport)
```

### useTheme

```typescript
Returns:
├── theme: 'light' | 'dark'
├── toggleTheme: () => void
└── setTheme: (theme: 'light' | 'dark') => void
```

### useFocusTrap

```typescript
Parameters:
├── isActive: boolean

Returns:
├── ref: RefObject<HTMLElement>
```

---

## TypeScript Type System

### Core Navigation Types

```typescript
NavItem {
  label: string
  href: string
  external?: boolean
  badge?: string
  disabled?: boolean
  subitems?: NavItem[]
}

NavbarProps {
  items: NavItem[]
  logo?: { src, alt, width, height }
  cta?: { label, href, onClick }
  variant?: 'transparent' | 'solid' | 'blur'
  autoHide?: boolean
  scrollThreshold?: number
  showProgress?: boolean
}

NavbarScrollState {
  variant: NavbarVariant
  isHidden: boolean
  hasScrolled: boolean
  scrollProgress: number
}
```

### Footer Types

```typescript
FooterNavGroup {
  title: string
  links: FooterNavLink[]
}

FooterProps {
  brand?: { logo?, tagline? }
  navGroups?: FooterNavGroup[]
  socials?: SocialPlatform[]
  newsletter?: {
    enabled: boolean
    title?: string
    description?: string
    onSubmit?: (email: string) => Promise<void>
  }
  copyright?: {
    year?: number
    holder?: string
    customText?: string
  }
  legalLinks?: FooterNavLink[]
}
```

---

## Performance Optimizations

### Code Splitting

```typescript
// Lazy load mobile menu (only on mobile)
const MobileMenu = dynamic(
  () => import('@/app/components/organisms/MobileMenu'),
  { ssr: false }
);

// Lazy load newsletter (below fold)
const NewsletterForm = dynamic(
  () => import('@/app/components/molecules/NewsletterForm'),
  { ssr: false }
);
```

### Animation Performance

**GPU Acceleration**:
- Use `transform` instead of `top/left`
- Use `opacity` for fading
- Apply `will-change-transform` sparingly

**Event Optimization**:
- Debounce scroll handlers (16ms / ~60fps)
- Use passive event listeners
- Clean up listeners on unmount

### Hydration Strategy

```typescript
// Prevent flash of unstyled content
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return <NavbarSkeleton />;
```

---

## Accessibility Features

### Keyboard Navigation

| Action | Key | Result |
|--------|-----|--------|
| Navigate links | Tab / Shift+Tab | Focus next/previous |
| Activate link | Enter | Navigate to href |
| Close menu | Escape | Close mobile menu |
| Toggle theme | Enter / Space | Switch theme |

### ARIA Attributes

```html
<!-- Navbar -->
<header role="banner">
<nav role="navigation" aria-label="Main navigation">

<!-- Mobile menu toggle -->
<button
  aria-label="Open menu"
  aria-expanded="false"
  aria-controls="mobile-menu"
>

<!-- Mobile menu -->
<div
  id="mobile-menu"
  role="dialog"
  aria-modal="true"
  aria-label="Mobile navigation menu"
>
```

### Focus Management

- Focus trap in mobile menu
- Focus indicator: 2px accent ring
- Skip to main content link
- Logical tab order

### Reduced Motion

```typescript
const shouldReduceMotion = useReducedMotion();

const variants = shouldReduceMotion
  ? { initial: {}, animate: {} }  // No animation
  : normalVariants;               // Full animation
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
default:     < 768px   (mobile)
md:          ≥ 768px   (tablet)
lg:          ≥ 1024px  (desktop)
xl:          ≥ 1280px  (large desktop)
2xl:         ≥ 1536px  (extra large)
```

### Component Behavior

| Breakpoint | Navbar | Footer |
|------------|--------|--------|
| < 768px | Mobile menu (hamburger) | Stacked columns |
| ≥ 768px | Desktop horizontal nav | 2-column grid |
| ≥ 1024px | Full desktop nav | 3-column grid |

---

## Implementation Checklist

### Phase 1: Foundation ✓
- [ ] Create TypeScript types (navigation.ts, footer.ts)
- [ ] Build useScrollPosition hook
- [ ] Build useScrollDirection hook
- [ ] Build useTheme hook
- [ ] Build useFocusTrap hook
- [ ] Build useActiveSection hook

### Phase 2: Atoms ✓
- [ ] Logo component
- [ ] ActiveIndicator component
- [ ] ScrollProgress component
- [ ] Enhance Button with variants
- [ ] Add new Icon components

### Phase 3: Molecules ✓
- [ ] ThemeToggle
- [ ] NavbarLogo
- [ ] MobileNavItem
- [ ] FooterBrand
- [ ] FooterNavGroup
- [ ] NewsletterForm
- [ ] MenuOverlay
- [ ] Copyright
- [ ] SocialLinks

### Phase 4: Organisms ✓
- [ ] Navbar organism
  - [ ] NavbarDesktop
  - [ ] NavbarMobile
  - [ ] useNavbar hook
- [ ] MobileMenu organism
  - [ ] useMobileMenu hook
- [ ] Footer organism
  - [ ] FooterMain
  - [ ] FooterBottom

### Phase 5: Integration ✓
- [ ] Create MainNav wrapper
- [ ] Create MainFooter wrapper
- [ ] Update app/layout.tsx
- [ ] Replace existing Header
- [ ] Replace existing Footer

### Phase 6: Testing & Optimization ✓
- [ ] Unit tests for hooks
- [ ] Component tests
- [ ] E2E tests (Playwright)
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Browser compatibility testing

---

## File Creation Order

1. **Types** (Foundation)
   ```
   src/app/types/navigation.ts
   src/app/types/footer.ts
   ```

2. **Hooks** (State Management)
   ```
   src/app/hooks/useScrollDirection.ts
   src/app/hooks/useTheme.ts
   src/app/hooks/useFocusTrap.ts
   src/app/hooks/useScrollProgress.ts
   src/app/hooks/useActiveSection.ts
   ```

3. **Constants** (Configuration)
   ```
   src/app/constants/navigation.ts
   src/app/constants/footer.ts
   ```

4. **Atoms** (Building Blocks)
   ```
   src/app/components/atoms/Logo/index.tsx
   src/app/components/atoms/ActiveIndicator/index.tsx
   src/app/components/atoms/ScrollProgress/index.tsx
   ```

5. **Molecules** (Combinations)
   ```
   src/app/components/molecules/ThemeToggle/index.tsx
   src/app/components/molecules/NavbarLogo/index.tsx
   src/app/components/molecules/MobileNavItem/index.tsx
   src/app/components/molecules/FooterBrand/index.tsx
   src/app/components/molecules/FooterNavGroup/index.tsx
   src/app/components/molecules/NewsletterForm/index.tsx
   src/app/components/molecules/Copyright/index.tsx
   src/app/components/molecules/SocialLinks/index.tsx
   ```

6. **Organisms** (Complex Components)
   ```
   src/app/components/organisms/Navbar/
   src/app/components/organisms/MobileMenu/
   src/app/components/organisms/Footer/
   ```

7. **Layout Wrappers** (Integration)
   ```
   src/app/components/layout/MainNav.tsx
   src/app/components/layout/MainFooter.tsx
   ```

---

## Key Design Patterns

### 1. Composition Pattern
Components are composed from smaller reusable pieces:
```
Footer → FooterMain → FooterBrand → Logo + SocialLinks
```

### 2. Hook Extraction Pattern
Complex state logic extracted to custom hooks:
```
useNavbar → scrollState + mobileMenuState + handlers
```

### 3. Variant Pattern
Components adapt based on props and state:
```
NavbarVariant: transparent → solid → blur
```

### 4. Progressive Enhancement
Core functionality works without JavaScript:
```
Semantic HTML → CSS → JavaScript enhancements
```

---

## Browser & Device Support

### Desktop Browsers
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓

### Mobile Browsers
- iOS Safari 14+ ✓
- Chrome Mobile 90+ ✓
- Samsung Internet 14+ ✓

### Feature Fallbacks
- Backdrop filter → Solid background
- CSS Grid → Flexbox
- Intersection Observer → Scroll events
- ResizeObserver → Window resize events

---

## Performance Targets

### Core Web Vitals

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Image optimization, code splitting |
| FID | < 100ms | Debounced handlers, passive listeners |
| CLS | < 0.1 | Reserved space, font loading |
| FCP | < 1.5s | Critical CSS inline, lazy loading |

### Bundle Size

| Component | Size (gzip) | Loading Strategy |
|-----------|-------------|------------------|
| Navbar | ~8KB | Immediate |
| MobileMenu | ~6KB | Code split (lazy) |
| Footer | ~7KB | Immediate |
| NewsletterForm | ~4KB | Code split (lazy) |

---

## Common Patterns & Examples

### Pattern 1: Scroll-Based Variant

```typescript
// Navbar automatically changes style based on scroll
<Navbar
  items={NAV_ITEMS}
  autoHide={true}
  scrollThreshold={50}
  showProgress={true}
/>
```

### Pattern 2: Fixed Variant

```typescript
// Always use blur variant (override scroll behavior)
<Navbar
  items={NAV_ITEMS}
  variant="blur"
  autoHide={false}
/>
```

### Pattern 3: With Newsletter

```typescript
<Footer
  newsletter={{
    enabled: true,
    title: "Stay Updated",
    onSubmit: async (email) => {
      await subscribeToNewsletter(email);
    }
  }}
/>
```

### Pattern 4: Minimal Footer

```typescript
<Footer
  copyright={{ holder: "Aldo Matias" }}
  socials={SOCIAL_LINKS}
/>
```

---

## Debugging & Troubleshooting

### Common Issues

**Issue**: Navbar flickers on scroll
- **Solution**: Add `will-change-transform` to header

**Issue**: Mobile menu doesn't trap focus
- **Solution**: Ensure `useFocusTrap` ref is applied to menu container

**Issue**: Theme flash on page load
- **Solution**: Use mounting check before rendering theme-dependent UI

**Issue**: Layout shift when navbar changes variant
- **Solution**: Set fixed height on header element

### Debug Tools

```typescript
// Enable animation debug mode
<AnimatePresence mode="wait" initial={false}>

// Log scroll state
useEffect(() => {
  console.log('Scroll state:', scrollState);
}, [scrollState]);

// Visualize focus trap
document.activeElement // Check focus in console
```

---

## Next Steps

1. Review full specification: `navbar-footer-architecture.md`
2. Set up development environment
3. Create type definitions
4. Build hooks layer
5. Implement atoms → molecules → organisms
6. Integration and testing
7. Performance optimization
8. Accessibility audit

---

**Reference Documents**:
- Full Architecture: `navbar-footer-architecture.md`
- Current Implementation: `src/app/components/Header.tsx` (to replace)
- Current Footer: `src/app/components/Footer.tsx` (to replace)
