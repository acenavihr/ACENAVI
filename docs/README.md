# ACENAVI Website

## Project Overview

ACENAVI is an AI-powered HR support platform that integrates with Slack and Microsoft Teams. This repository contains the marketing website and demo booking system.

**Live URL**: https://acenavi.in

## Purpose

- Marketing landing page showcasing ACENAVI's features and capabilities
- Custom demo booking system with timezone support
- Integration showcase with HR workplace systems
- Pricing information and FAQ
- Lead generation and sales funnel

## Tech Stack

### Core Framework
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**

### Styling & UI
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Custom UI components** (shadcn/ui style)

### Integrations
- **Resend** (transactional emails)
- **Calendly** (meeting scheduling widget)
- **Vercel** (hosting & deployment)

### Build Tools
- **pnpm** (package manager)
- **PostCSS**
- **TypeScript Compiler**

## High-Level Architecture
```
┌─────────────────────────────────────────┐
│         Static Marketing Pages          │
│  (Hero, Features, Pricing, Lifecycle)   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│        Custom Booking System            │
│  - Timezone selection dropdown          │
│  - Custom time request form             │
│  - Email notifications (Resend API)     │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         External Integrations           │
│  - Calendly widget (commented option)   │
│  - Resend SMTP (booking confirmations)  │
└─────────────────────────────────────────┘
```

## Project Structure
```
acenavi-website/
├── app/
│   ├── api/
│   │   └── booking/
│   │       └── route.ts          # Custom booking API endpoint
│   ├── book-demo/
│   │   └── page.tsx              # Demo booking page
│   ├── features/
│   │   └── page.tsx              # Features showcase page
│   ├── pricing/
│   │   └── page.tsx              # Pricing page
│   ├── layout.tsx                # Root layout (metadata, fonts)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles & CSS variables
│   ├── providers.tsx             # Theme provider wrapper
│   ├── robots.ts                 # SEO robots configuration
│   └── sitemap.ts                # Dynamic sitemap generation
├── components/
│   ├── booking/
│   │   ├── booking-form.tsx      # Custom demo request form
│   │   └── booking-hero.tsx      # Booking page header
│   ├── features/
│   │   ├── features-hero.tsx
│   │   ├── features-grid.tsx
│   │   ├── features-workflow.tsx
│   │   ├── features-connection.tsx  # Integration logos scroll
│   │   ├── features-testimonials.tsx # (Commented in features/page.tsx)
│   │   └── features-cta.tsx
│   ├── pricing/
│   │   ├── pricing-hero.tsx
│   │   ├── pricing-plans.tsx
│   │   ├── pricing-faq.tsx
│   │   └── pricing-cta.tsx
│   ├── sections/
│   │   ├── hero.tsx              # Homepage hero with video modal
│   │   ├── hero-background.tsx   # Animated canvas background
│   │   ├── problem-solution.tsx  # Toggle view section
│   │   ├── lifecycle.tsx         # Employee lifecycle visualization
│   │   ├── lifecycle-stage.tsx   # Individual lifecycle stage component
│   │   ├── integrations.tsx      # Integration logos section
│   │   └── final-cta.tsx         # Bottom CTA section
│   ├── ui/
│   │   ├── animated-button.tsx   # Primary CTA button
│   │   ├── secondary-button.tsx  # Secondary CTA button
│   │   └── button.tsx            # Base button component
│   ├── navigation.tsx            # Global navigation bar
│   └── footer.tsx                # Global footer
├── public/
│   ├── navi_logo.png             # Full logo
│   ├── navi_symbol.png           # Logo symbol (favicon)
│   ├── acenavi_banner.png        # OG image for social sharing
│   ├── acenavi_vid.mp4           # Hero demo video
│   └── [integration-logos].svg   # Various integration logos
├── testimonials.json             # Testimonials data
└── docs/                         # Documentation (this folder)
```

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Git

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd acenavi-website
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
RESEND_API_KEY=your_resend_api_key_here
```

See `INTEGRATIONS.md` for detailed environment variable setup.

4. **Run the development server**
```bash
pnpm dev
```

5. **Open browser**
```
http://localhost:3000
```

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm start
```

## Key Features

### Custom Booking System
- Timezone-aware demo requests
- Custom time input (alternative to Calendly)
- Dual email notifications (team + customer)
- Professional HTML email templates

### Animated Components
- Canvas-based hero background
- Infinite scroll integration logos
- Interactive lifecycle visualization
- Smooth page transitions

### SEO Optimized
- Dynamic sitemap generation
- Robots.txt configuration
- Open Graph metadata
- Twitter Card support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Image optimization via Next.js Image component
- Font optimization with `next/font`
- CSS-in-JS via Tailwind (minimal runtime)
- Code splitting via Next.js App Router

## Documentation

For detailed information, see:
- `SYSTEM_OVERVIEW.md` - Architecture and data flow
- `INTEGRATIONS.md` - Third-party service setup
- `CONTENT_EDITING.md` - Non-technical content updates
- `DEPLOYMENT.md` - Hosting and deployment process
- `MAINTENANCE.md` - Troubleshooting and maintenance

## Contact

For technical issues or questions:
- **Email**: contact@acenavi.in
- **Website**: https://acenavi.in

---

**Last Updated**: January 2026
**Version**: 1.0.0