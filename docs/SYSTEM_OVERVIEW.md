# System Overview

## Architecture Pattern

This is a **server-rendered Next.js application** using the App Router architecture with:
- Static page generation where possible
- Server-side rendering for dynamic content
- API routes for form submissions
- Client-side interactivity via React hooks

## Folder Structure Responsibilities

### `/app` Directory (Next.js App Router)
```
app/
├── api/
│   └── booking/
│       └── route.ts              # POST endpoint for demo bookings
├── [page-routes]/
│   └── page.tsx                  # Route segments (features, pricing, book-demo)
├── layout.tsx                    # Root layout wrapper (fonts, metadata, scripts)
├── globals.css                   # CSS custom properties and Tailwind base
├── providers.tsx                 # Client-side providers (theme)
├── robots.ts                     # SEO: robots.txt generation
└── sitemap.ts                    # SEO: sitemap.xml generation
```

**Key Responsibilities**:
- Routing and page components
- API endpoints for server-side logic
- Global configuration (metadata, fonts, external scripts)
- SEO file generation

### `/components` Directory
```
components/
├── [page-sections]/              # Page-specific components
│   ├── booking/                  # Demo booking form + hero
│   ├── features/                 # Features page sections
│   ├── pricing/                  # Pricing page sections
│   └── sections/                 # Homepage sections
├── ui/                           # Reusable UI primitives
├── navigation.tsx                # Global nav (sticky, animated scroll state)
└── footer.tsx                    # Global footer
```

**Key Responsibilities**:
- Presentational components
- Reusable UI elements
- Page-specific section logic
- Animation and interaction handlers

### `/public` Directory

Static assets served directly by Next.js:
- Logo files (SVG/PNG)
- Integration partner logos
- Demo video (MP4)
- OG images for social sharing

### Root Configuration Files

- `testimonials.json` - Testimonial data source
- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript compiler options
- `next.config.js` - Next.js build configuration (if exists)

## Core Data Flows

### 1. Demo Booking Flow
```
User fills form → Submit → POST /api/booking/route.ts
                              ↓
                    Validate form data
                              ↓
                    Send email via Resend API
                              ↓
          ┌─────────────────┴──────────────────┐
          ↓                                     ↓
   Email to team                      Email to customer
   (acenavidemo@gmail.com)           (confirmation)
          ↓                                     ↓
        Success response ← ← ← ← ← ← ← ← ← ← ← ┘
          ↓
   Show success message to user
```

**Key Files**:
- `components/booking/booking-form.tsx` (client-side form)
- `app/api/booking/route.ts` (server-side handler)

**Data Validation**:
- Name (required)
- Email (required)
- Timezone (required)
- Preferred times (required)
- Message (optional)

### 2. Page Rendering Flow (SSR/SSG)
```
User visits route → Next.js App Router
                         ↓
              Check route in /app
                         ↓
              Render page.tsx
                         ↓
         Fetch static data (if any)
                         ↓
       Render layout.tsx wrapper
                         ↓
      Include Navigation + Footer
                         ↓
           Send HTML to browser
                         ↓
      Hydrate React on client
```

### 3. Navigation State Flow
```
Page loads → useEffect checks scroll position
                    ↓
      scrollY > 100px ?
         /           \
       Yes            No
        ↓              ↓
  Compact mode    Expanded mode
  (rounded nav)   (full-width nav)
        ↓              ↓
  Update CSS classes via state
        ↓
  Animate with Tailwind transitions
```

**Key File**: `components/navigation.tsx`

**States Tracked**:
- `scrolled` (boolean) - Triggers compact mode
- `mobileMenuOpen` (boolean) - Mobile menu visibility
- `pathname` (string) - Active route highlighting

### 4. Email Notification Flow
```
POST /api/booking/route.ts
         ↓
Extract form data from request body
         ↓
Validate required fields
         ↓
Build HTML email templates (2 versions)
         ↓
Call Resend API (2 separate calls)
    /            \
   Team         Customer
  Email         Email
   ↓              ↓
Return success/error response
```

**Email Recipients**:
- **Team**: acenavidemo@gmail.com
- **Customer**: User's submitted email
- **Reply-To**: User's email (for team notification)

## Key Technical Decisions

### 1. Custom Booking Form vs. Calendly Embed

**Decision**: Implemented custom form with timezone dropdown and time request input.

**Rationale** (inferred):
- Greater control over UX/branding
- Ability to capture custom data (timezone, flexible times)
- No iframe dependency
- Full control over email templates

**Note**: Calendly script is loaded in `layout.tsx` but not actively used. May be for future integration or fallback option.

### 2. Server-Side Email Sending

**Decision**: Use Resend API from Next.js API route rather than client-side.

**Rationale**:
- Keeps API keys secure (never exposed to browser)
- Prevents email spoofing/abuse
- Server-side validation before sending
- Cleaner error handling

### 3. Static Logo Animation on Scroll

**Decision**: Implement smooth logo swap between full logo and symbol based on scroll position.

**Implementation**:
- Two separate images conditionally rendered
- CSS transitions for smooth opacity/scale changes
- Navigation bar shrinks and becomes rounded on scroll
- Icon-only navigation in compact mode with tooltips

### 4. Client-Side Animations with Intersection Observer

**Decision**: Trigger animations when elements enter viewport.

**Files Using This**:
- `features-grid.tsx`
- `features-workflow.tsx`
- `features-connection.tsx`
- `features-testimonials.tsx`
- `lifecycle.tsx`
- `pricing-plans.tsx`

**Pattern**:
```typescript
const [isVisible, setIsVisible] = useState(false)
const sectionRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true)
    }
  }, { threshold: 0.2 })
  
  if (sectionRef.current) {
    observer.observe(sectionRef.current)
  }
  
  return () => observer.disconnect()
}, [])
```

### 5. Testimonials Architecture

**Decision**: Store testimonials in JSON file rather than CMS or database.

**Current State**: Testimonials section is commented out in `app/features/page.tsx` because ACENAVI has no testimonials yet.

**Rationale** (inferred):
- Simple content management for small dataset
- No database overhead for static content
- Easy for non-technical team to update
- Version controlled with codebase

**File**: `testimonials.json`

### 6. CSS Custom Properties for Theming

**Decision**: Use CSS variables in `globals.css` for all colors.

**Rationale**:
- Single source of truth for color system
- Easy theme updates without code changes
- Tailwind can reference these variables
- Consistent across entire application

**Variables Defined**:
```css
--background, --foreground, --card, --accent,
--muted, --border, --primary, --secondary, etc.
```

### 7. Framer Motion for Complex Animations

**Decision**: Use Framer Motion library for hero video modal and lifecycle stages.

**Used In**:
- `hero.tsx` (video modal with backdrop blur)
- `lifecycle-stage.tsx` (staggered entrance animations)
- `final-cta.tsx` (scroll-based opacity)

**Rationale**:
- Smoother animation control than CSS alone
- Built-in AnimatePresence for mount/unmount
- Spring physics for natural motion

### 8. Infinite Scroll Logo Animation

**Decision**: Triple the logo array and animate via CSS keyframes.

**File**: `features-connection.tsx`

**Implementation**:
- Duplicate logo array 3x
- Animate `transform: translate3d()` 
- First row: left-to-right
- Second row: right-to-left
- Seamless loop by moving exactly 1/3 of width

## Component Interaction Patterns

### Navigation ↔ Pages

- Navigation reads `usePathname()` to highlight active route
- Navigation hides CTA button on `/book-demo` page
- Navigation changes CTA text on `/pricing` page ("Contact Sales")

### Form ↔ API Route

- Form validates client-side before submission
- Form shows loading state during API call
- Form displays success/error messages
- API route handles all server-side logic

### Section Components ↔ Animation State

- Most sections use Intersection Observer pattern
- Parent passes visibility state to children
- Children apply staggered animation delays via `style` prop
- Hover states tracked with local `useState`

## Performance Optimizations

1. **Image Loading**:
   - Critical images: `priority` flag (hero, above fold)
   - Below-fold images: Lazy loading by default
   - Logo scroll: `loading="eager"` for smooth animation

2. **Font Loading**:
   - Outfit font loaded via `next/font` (automatic optimization)
   - `display: swap` to prevent FOIT (Flash of Invisible Text)

3. **Animation Performance**:
   - CSS `transform` and `opacity` (GPU-accelerated)
   - `will-change: transform` on animated elements
   - `transform: translateZ(0)` for hardware acceleration

4. **Code Splitting**:
   - Automatic via Next.js App Router
   - Each page route is a separate bundle

5. **Reduced Motion Support**:
   - Media query `@media (prefers-reduced-motion: reduce)` in logo scroll
   - Animations disabled for accessibility

## State Management

**Approach**: Local component state only (no global state management).

**Why**: 
- No complex shared state across pages
- Each page is self-contained
- Form state doesn't need to persist
- Navigation state is ephemeral (scroll position)

**Libraries Used**: React `useState` and `useEffect` hooks only.

## Error Handling

### Client-Side
- Form validation before submission
- Try-catch blocks around API calls
- Error messages displayed in UI

### Server-Side (API Route)
- Request body validation
- Resend API error catching
- HTTP status codes (400, 500)
- Error objects returned in JSON response

## Security Considerations

1. **API Key Protection**:
   - Resend API key in environment variable
   - Never exposed to client-side code
   - API route runs server-side only

2. **Email Validation**:
   - Basic format validation client-side
   - No email injection vulnerabilities (Resend handles sanitization)

3. **Rate Limiting**:
   - Not identifiable from codebase
   - May be handled by Vercel/hosting layer

4. **CORS**:
   - API routes automatically handle same-origin requests
   - No explicit CORS configuration visible

## Known Limitations (Inferred)

1. **No Database**: All content is static or in JSON files
2. **No Authentication**: Public marketing site only
3. **No Analytics Integration**: Not identifiable from codebase
4. **No A/B Testing**: Static content variations require code changes
5. **No Form Persistence**: If user navigates away, form data is lost

## Future Extension Points (Inferred)

1. **Calendly Integration**: Script already loaded in layout
2. **Testimonials**: Component exists but commented out
3. **CMS Integration**: JSON structure allows easy CMS migration
4. **Analytics**: Clean structure for adding tracking

---

**Last Updated**: January 2026