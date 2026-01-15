# Integrations

This document details all third-party services integrated into the ACENAVI website.

---

## 1. Resend (Email Delivery Service)

### Purpose
Transactional email delivery for demo booking notifications.

### Usage in Codebase
**File**: `app/api/booking/route.ts`

Sends two emails per booking:
1. **Team Notification**: Sent to `acenavidemo@gmail.com` with booking details
2. **Customer Confirmation**: Sent to user's email with request confirmation

### Required Environment Variables
```
RESEND_API_KEY
```

### Setup Steps
1. Create account at https://resend.com
2. Verify domain `acenavi.in` in Resend dashboard
3. Generate API key from Resend dashboard
4. Add API key to environment variables (see DEPLOYMENT.md)

### Email Configuration
- **From Address**: `contact@acenavi.in`
- **Team Recipient**: `acenavidemo@gmail.com`
- **Reply-To**: User's submitted email (for team notification only)

### Dashboard Access
- **URL**: https://resend.com/emails
- **View**: Delivery logs, bounce reports, email analytics

### Email Templates
Both emails use inline HTML templates defined in `route.ts`:
- Modern responsive design
- Blue accent color (#1F44FF)
- Professional formatting with tables and cards
- Mobile-optimized layout

### Rate Limits
Handled by Resend service tier. Check dashboard for quota.

### Error Handling
```typescript
try {
  await resend.emails.send({ ... })
} catch (error) {
  console.error('Error sending email:', error)
  return NextResponse.json(
    { error: 'Failed to send request' },
    { status: 500 }
  )
}
```

### Testing
- Use Resend's test mode for development
- Check spam folder if emails not arriving
- Verify domain DNS records (SPF, DKIM, DMARC)

---

## 2. Calendly (Meeting Scheduling)

### Purpose
Optional meeting scheduling widget for demo bookings.

### Usage in Codebase
**File**: `app/layout.tsx`

Calendly scripts are loaded but **not actively used** in current implementation.
```tsx
<link 
  href="https://assets.calendly.com/assets/external/widget.css" 
  rel="stylesheet"
/>
<Script 
  src="https://assets.calendly.com/assets/external/widget.js" 
  strategy="lazyOnload"
/>
```

### Current Status
- Scripts loaded globally
- No Calendly embed component currently rendered
- Custom booking form used instead

### Integration Method (If Enabled)
To activate Calendly widget, uncomment in `booking-form.tsx` or replace custom form.

Example Calendly embed (not currently in code):
```tsx
<div 
  className="calendly-inline-widget"
  data-url="https://calendly.com/your-calendly-url"
  style={{ minWidth: '320px', height: '700px' }}
/>
```

### Required Configuration
- Calendly account with scheduling link
- No environment variables required (public embed)

### Dashboard Access
- **URL**: https://calendly.com
- **View**: Scheduled meetings, availability settings

### Why Not Currently Used
Custom form provides:
- Timezone selection dropdown
- Flexible time input (not restricted to availability slots)
- Full control over email templates
- Better branding consistency

### Future Use Case
May be used as alternative booking method or for specific team members.

---

## 3. Vercel (Hosting & Deployment)

### Purpose
Production hosting, serverless API routes, automatic deployments.

### Usage in Codebase
**Inferred from**: Project structure, Next.js configuration

Handles:
- Static page hosting
- Serverless function execution (`/api/booking`)
- Automatic builds from Git repository
- Environment variable management
- CDN distribution

### Required Environment Variables
Set in Vercel dashboard:
```
RESEND_API_KEY=your_resend_api_key
```

### Dashboard Access
- **URL**: https://vercel.com/dashboard
- **View**: Deployments, analytics, logs, environment variables

### Deployment Configuration
- **Framework**: Next.js (auto-detected)
- **Build Command**: `pnpm build` (or `npm run build`)
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

### Automatic Deployments
- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches or pull requests

### Domain Configuration
- **Production Domain**: acenavi.in
- **DNS**: Configure A/CNAME records to point to Vercel

### Custom Configuration
Check `vercel.json` if exists in root. Not identifiable from provided codebase.

### Performance Features
- Automatic image optimization via Next.js Image component
- Edge caching for static assets
- Automatic font optimization

---

## 4. Google Fonts (Outfit Font)

### Purpose
Web font loading for Outfit typeface.

### Usage in Codebase
**File**: `app/layout.tsx`
```tsx
import { Outfit } from "next/font/google"

const outfit = Outfit({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit"
})
```

### Integration Method
Next.js `next/font` automatically:
- Downloads font files at build time
- Self-hosts fonts (no external requests at runtime)
- Generates optimal `@font-face` CSS
- Eliminates layout shift (CLS)

### Configuration
- **Font Family**: Outfit
- **Subsets**: latin
- **Display Strategy**: swap (prevents FOIT)
- **CSS Variable**: `--font-outfit`

### No API Key Required
Automatic via Next.js optimization.

---

## 5. Social Media Platforms

### Purpose
Social sharing metadata and footer links.

### Configured Platforms

#### Open Graph (Facebook, LinkedIn, WhatsApp)
**File**: `app/layout.tsx`
```tsx
openGraph: {
  title: 'ACENAVI - AI-Powered HR Support',
  description: '...',
  url: 'https://acenavi.in',
  siteName: 'ACENAVI',
  images: [
    {
      url: '/acenavi_banner.png',
      width: 1200,
      height: 630,
    },
  ],
  locale: 'en_US',
  type: 'website',
}
```

#### Twitter Card
**File**: `app/layout.tsx`
```tsx
twitter: {
  card: 'summary_large_image',
  title: 'ACENAVI - AI-Powered HR Support',
  description: '...',
  images: ['/acenavi_banner.png'],
}
```

#### Social Links in Footer
**File**: `components/footer.tsx`

- **Instagram**: https://www.instagram.com/naviai.in/
- **LinkedIn**: https://www.linkedin.com/company/navihr/
- **YouTube**: https://www.youtube.com/@ACENAVINudges

### Testing
Use these tools to verify metadata:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

---

## 6. SEO Tools (Google Search Console, Sitemap)

### Purpose
Search engine optimization and indexing.

### Dynamic Sitemap Generation
**File**: `app/sitemap.ts`

Automatically generates `sitemap.xml` at:
```
https://acenavi.in/sitemap.xml
```

**Included URLs**:
- `/` (Homepage) - Priority 1.0, Weekly updates
- `/features` - Priority 0.9, Monthly updates
- `/pricing` - Priority 0.9, Monthly updates
- `/book-demo` - Priority 0.8, Monthly updates

### Robots.txt Configuration
**File**: `app/robots.ts`

Automatically generates `robots.txt` at:
```
https://acenavi.in/robots.txt
```

**Configuration**:
```
User-agent: *
Allow: /
Sitemap: https://acenavi.in/sitemap.xml
```

### Metadata Configuration
**File**: `app/layout.tsx`
```tsx
metadata: {
  title: "ACENAVI - AI-Powered HR Support",
  description: "...",
  keywords: ['HR support', 'AI assistant', ...],
  robots: {
    index: true,
    follow: true,
  },
}
```

### Google Search Console Setup
1. Verify ownership of acenavi.in
2. Submit sitemap URL
3. Monitor indexing status

**Not configured in codebase** - requires external setup.

---

## Integration Summary Table

| Service | Purpose | Environment Variables | Active Status |
|---------|---------|---------------------|---------------|
| Resend | Email notifications | `RESEND_API_KEY` | ✅ Active |
| Calendly | Meeting scheduling | None | ⚠️ Loaded but unused |
| Vercel | Hosting & deployment | Platform-managed | ✅ Active |
| Google Fonts | Typography | None | ✅ Active (self-hosted) |
| Social Platforms | Sharing metadata | None | ✅ Active |
| SEO Tools | Search indexing | None | ✅ Active |

---

## Adding New Integrations

### For Developers

1. **Add environment variables** in `.env.local` (development) and Vercel dashboard (production)
2. **Install SDK/package** via `pnpm add <package-name>`
3. **Import and use** in appropriate component or API route
4. **Document** in this file following the format above

### For Non-Developers

Contact technical team if integration requires:
- API keys or credentials
- Code changes
- Third-party account setup

---

## Security Notes

1. **Never commit API keys** to Git repository
2. **Use environment variables** for all secrets
3. **Restrict API key permissions** to minimum required scope
4. **Rotate keys** if compromised
5. **Monitor usage** in service dashboards for suspicious activity

---

## Troubleshooting Integrations

### Resend Emails Not Sending
1. Check API key is correctly set in environment variables
2. Verify domain is verified in Resend dashboard
3. Check spam/junk folders
4. Review Resend logs for delivery errors
5. Confirm DNS records (SPF, DKIM) are configured

### Calendly Not Loading
1. Check browser console for script errors
2. Verify Calendly scripts are loaded in `layout.tsx`
3. Ensure Calendly URL is correct (if embedding)

### Social Media Previews Not Working
1. Use debug tools (listed above) to test
2. Verify `/acenavi_banner.png` exists in `/public`
3. Check image dimensions (1200x630 recommended)
4. Clear cache in social platform debuggers

### Vercel Deployment Failures
1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Confirm `pnpm build` runs locally without errors
4. Check for TypeScript compilation errors

---

**Last Updated**: January 2026