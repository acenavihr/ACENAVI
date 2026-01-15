# Content Editing Guide

This guide is for non-technical team members who need to update website content without touching code.

---

## Safe-to-Edit Files

### 1. Testimonials (`testimonials.json`)

**Location**: Root directory → `testimonials.json`

**Purpose**: Manage customer testimonials displayed on the Features page.

#### Current Status
The testimonials section is **currently hidden** because ACENAVI has no testimonials yet.

#### How to Enable Testimonials Section

1. Navigate to: `app/features/page.tsx`
2. Find this line (around line 23):
```tsx
   {/*<FeaturesTestimonials />*/}
```
3. Remove the comment markers `{/*` and `*/}` to make it:
```tsx
   <FeaturesTestimonials />
```
4. Save the file
5. Deploy changes (see DEPLOYMENT.md)

#### How to Add/Edit Testimonials

**File Format**:
```json
{
  "testimonials": [
    {
      "id": 1,
      "name": "Priya Sharma",
      "role": "Head of People Operations",
      "company": "TechCorp India",
      "content": "ACENAVI transformed how our 500+ employees interact with HR...",
      "rating": 5,
      "avatar": "priya-sharma.jpg"
    }
  ]
}
```

#### Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | ✅ Yes | Unique number for each testimonial | `1`, `2`, `3` |
| `name` | ✅ Yes | Full name of person giving testimonial | `"Rajesh Kumar"` |
| `role` | ✅ Yes | Job title of person | `"VP of Engineering"` |
| `company` | ✅ Yes | Company name | `"StartupXYZ"` |
| `content` | ✅ Yes | Testimonial text (2-4 sentences recommended) | `"ACENAVI helped us..."` |
| `rating` | ✅ Yes | Star rating (always use 5) | `5` |
| `avatar` | ⚠️ Optional | Filename of profile image | `"rajesh.jpg"` |

#### Adding Profile Images (Optional)

If you want to show a photo instead of initials:

1. **Prepare image**:
   - Format: JPG or PNG
   - Size: Square (recommended 200x200 pixels minimum)
   - File size: Under 500KB
   - Naming: Use lowercase, no spaces (e.g., `priya-sharma.jpg`)

2. **Add image to website**:
   - Place image in `/public` folder
   - Use exact filename in `avatar` field

3. **Example with image**:
```json
   {
     "id": 1,
     "name": "Priya Sharma",
     "avatar": "priya-sharma.jpg"
   }
```

4. **Example without image** (shows initials):
```json
   {
     "id": 1,
     "name": "Priya Sharma"
   }
```
   This will display "PS" in a colored circle.

#### Step-by-Step: Adding a New Testimonial

1. Open `testimonials.json`
2. Copy an existing testimonial block
3. Paste it at the end of the list (before the closing `]`)
4. Add a comma after the previous testimonial
5. Update all fields with new information
6. Increment the `id` number
7. Save the file
8. Deploy changes

**Example**:
```json
{
  "testimonials": [
    {
      "id": 1,
      "name": "Existing Person",
      ...
    },
    {
      "id": 2,
      "name": "New Person",
      "role": "Chief HR Officer",
      "company": "New Company",
      "content": "This is the new testimonial text.",
      "rating": 5
    }
  ]
}
```

#### Important Rules

✅ **DO**:
- Keep `id` numbers unique and sequential
- Use proper quotation marks (double quotes: `"`)
- Keep testimonial text concise (2-4 sentences)
- Always use rating of `5`
- Add commas between testimonials

❌ **DON'T**:
- Change the structure of the JSON file
- Use special characters in image filenames
- Make testimonials too long (slows down carousel)
- Forget commas between testimonials (breaks the site)

#### Maximum Testimonials
Recommended: 6-10 testimonials for optimal performance.

---

## DO NOT EDIT (Risk of Breaking Site)

### Critical Files - Developer Changes Only

**Never modify these files without developer assistance**:

- Any file ending in `.tsx` or `.ts` (except as noted above for enabling testimonials)
- Any file ending in `.css`
- Any file in `/components` folder
- Any file in `/app` folder (except `features/page.tsx` for uncommenting testimonials)
- `package.json`
- `tailwind.config.js`
- `tsconfig.json`
- `.env.local` or `.env`

### Why These Are Dangerous

Editing these files can:
- Break the entire website
- Cause deployment failures
- Break email notifications
- Corrupt styling and layout
- Require developer intervention to fix

---

## Text Content That Requires Code Changes

The following content is **embedded in code** and requires a developer to change:

### Homepage
- Hero headline: "AI-Powered People Support – Right Inside Teams"
- Sub-headline text
- Button text ("Book a Demo", "Watch 60-Second Overview")
- Problem/solution section text
- Lifecycle stage descriptions

**File locations**: `components/sections/hero.tsx`, `problem-solution.tsx`, `lifecycle.tsx`

### Features Page
- Page headline
- Feature descriptions in grid
- Workflow section (8 capabilities)
- Integration partner logos

**File locations**: `components/features/features-hero.tsx`, `features-grid.tsx`, `features-workflow.tsx`

### Pricing Page
- Pricing headline
- FAQ questions and answers
- Trust indicators (statistics)

**File locations**: `components/pricing/pricing-hero.tsx`, `pricing-faq.tsx`, `pricing-plans.tsx`

### Footer
- Company description
- Contact email
- Social media links

**File location**: `components/footer.tsx`

### To Change This Content
Contact your developer with:
1. Exact text to change
2. New text to replace it
3. Which page it appears on

---

## Integration Partner Logos

**Location**: `/public` folder

### Current Logos
The website displays 24 integration partner logos:
- Row 1 (12 logos): Teams, Slack, Workday, SAP, BambooHR, Rippling, Darwinbox, Zoho, greytHR, Keka, Greenhouse, Lever
- Row 2 (12 logos): Google Drive, SharePoint, Confluence, Notion, Zendesk, Freshdesk, ServiceNow, Coursera, Azure AD, Okta, Google Calendar, Outlook

### Adding a New Logo

1. **Prepare logo**:
   - Format: SVG (preferred) or PNG
   - Background: Transparent
   - Size: Approximately 140x60 pixels
   - File naming: lowercase, no spaces (e.g., `newcompany.svg`)

2. **Add to website**:
   - Place file in `/public` folder
   - Contact developer to add logo to integration list

**Note**: Adding logos requires code changes in `features-connection.tsx`. Developer assistance required.

---

## Video Content

**File**: `/public/acenavi_vid.mp4`

### Current Video
60-second overview video shown in homepage hero modal.

### Replacing Video

**Safe to replace** if following these rules:

1. **Video specifications**:
   - Format: MP4 (H.264 codec)
   - Dimensions: 1920x1080 (16:9 aspect ratio)
   - File size: Under 50MB recommended
   - Duration: 30-90 seconds recommended

2. **Replacement process**:
   - Name new video file: `acenavi_vid.mp4`
   - Delete old `acenavi_vid.mp4` from `/public` folder
   - Add new `acenavi_vid.mp4` to `/public` folder
   - Deploy changes

3. **Testing**:
   - Click "Watch 60-Second Overview" on homepage
   - Verify video plays correctly
   - Test on mobile devices

**Caution**: Large video files slow down page loading. Keep under 50MB.

---

## Images

### Logo Files

**Location**: `/public`

| File | Purpose | Can Replace? |
|------|---------|--------------|
| `navi_logo.png` | Full logo in navigation (desktop) | ✅ Yes |
| `navi_symbol.png` | Logo symbol (mobile nav, favicon) | ✅ Yes |
| `acenavi_banner.png` | Social media sharing image | ✅ Yes |

#### Replacing Logo Files

**Requirements**:
- `navi_logo.png`: Transparent background, approximately 120x40px
- `navi_symbol.png`: Square, transparent background, approximately 32x32px
- `acenavi_banner.png`: 1200x630px (Facebook/LinkedIn recommended size)

**Process**:
1. Prepare new image with exact specifications
2. Use **same filename** as existing file
3. Replace file in `/public` folder
4. Clear browser cache to see changes

**Warning**: If dimensions are significantly different, navigation layout may break. Test thoroughly.

---

## Email Templates

**Location**: `app/api/booking/route.ts`

Email templates are **embedded in code** and require developer changes.

### What Can Be Changed
- Email copy/wording
- Company branding text
- Email styling (colors, fonts)
- Footer information

### To Request Changes
Contact developer with:
1. Which email (team notification or customer confirmation)
2. Exact text changes needed
3. Any styling changes (colors, layout)

**Warning**: Do not edit `route.ts` directly. Incorrect changes break booking system.

---

## FAQ Section

**Location**: `components/pricing/pricing-faq.tsx`

### Current Questions
1. How does ACENAVI actually create value?
2. How does it integrate with existing systems?
3. Is it secure?
4. How long does implementation take?
5. Who is it designed for?
6. Does it replace HR platforms?
7. Can managers use it?

### Adding/Editing FAQ

**Requires developer assistance** - Questions and answers are in code.

**To Request Changes**:
1. Provide new question text
2. Provide new answer text (2-4 sentences recommended)
3. Specify position in list (or append to end)

---

## Contact Information

**Current Contact Email**: `contact@acenavi.in`

**Appears in**:
- Footer
- Email "From" address
- Email signatures

**To Change**: Contact developer (appears in multiple files).

---

## Deployment After Content Changes

After editing safe files (testimonials, images, video):

1. Test locally if possible (see README.md)
2. Commit changes to Git repository
3. Push to main branch
4. Vercel auto-deploys (5-10 minutes)
5. Verify changes on live site

See DEPLOYMENT.md for detailed deployment process.

---

## Getting Help

### When to Contact Developer

- Content requires code changes (most text content)
- Site is broken after your changes
- Need to add new pages or sections
- Email notifications not working
- Integration logos need updating

### When You Can Proceed Alone

- Adding/editing testimonials in `testimonials.json`
- Replacing logo images (same dimensions)
- Replacing demo video (MP4, under 50MB)
- Enabling testimonials section (uncommenting one line)

---

## Quick Reference Checklist

Before making changes:

- [ ] Have I backed up the original file?
- [ ] Am I editing a "safe" file? (See list above)
- [ ] Have I tested changes locally? (If possible)
- [ ] Do JSON commas and brackets match?
- [ ] Are image dimensions correct?
- [ ] Is file naming correct? (lowercase, no spaces)

After making changes:

- [ ] File saved without errors?
- [ ] Changes committed to Git?
- [ ] Deployment successful?
- [ ] Tested on live website?
- [ ] Tested on mobile device?

---

**Last Updated**: January 2026