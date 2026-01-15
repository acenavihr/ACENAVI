# Maintenance Guide

This document covers ongoing maintenance, troubleshooting, monitoring, and common failure points for the ACENAVI website.

---

## System Health Monitoring

### What to Monitor

#### 1. Website Availability
**Check**: https://acenavi.in loads correctly

**Frequency**: Daily (automated uptime monitor recommended)

**Tools**:
- Vercel Analytics (built-in)
- UptimeRobot (external service)
- Pingdom (external service)

#### 2. Email Delivery
**Check**: Demo booking emails are received

**Frequency**: Weekly test submission

**Monitor**:
- Resend dashboard (https://resend.com/emails)
- Check delivery rates
- Monitor bounce/complaint rates

#### 3. Form Submissions
**Check**: Booking form submits successfully

**Frequency**: Weekly manual test

**Steps**:
1. Fill out demo booking form
2. Submit request
3. Verify success message appears
4. Confirm emails received (team + customer)

#### 4. Build Status
**Check**: Latest deployments succeed

**Frequency**: After every deployment

**Location**: Vercel dashboard → Deployments

---

## Log Access

### Vercel Deployment Logs

**Access**: Vercel Dashboard → Project → Deployments → Click deployment

**Contains**:
- Build process output
- Dependency installation logs
- Compilation errors/warnings
- Deployment completion status

**Retention**: 90 days

### Vercel Function Logs (API Routes)

**Access**: Vercel Dashboard → Project → Logs tab

**Contains**:
- `/api/booking` endpoint logs
- `console.log()` output
- Error messages
- Request/response data

**Retention**: 7 days (free tier), 30 days (pro tier)

**Example log entries**:
```
POST /api/booking/route 200 1.2s
Error sending email: <error details>
```

### Real-Time Logs

**Enable**:
```bash
vercel logs <project-name> --follow
```

Shows live logs as requests come in.

### Resend Email Logs

**Access**: https://resend.com/emails

**Contains**:
- Email delivery status
- Bounce notifications
- Spam complaints
- Open/click tracking (if enabled)

**Retention**: 30 days

---

## Common Failure Points

### 1. Demo Booking Form Not Submitting

#### Symptoms
- Form shows loading spinner indefinitely
- Error message appears after submission
- No email notifications received

#### Possible Causes
- Resend API key missing/invalid
- Resend API rate limit exceeded
- Network connectivity issue
- Email service outage

#### Debugging Steps

1. **Check browser console**:
   - Open DevTools (F12)
   - Look for red errors
   - Note any 4xx or 5xx status codes

2. **Check Vercel function logs**:
   - Go to Vercel Dashboard → Logs
   - Filter for `/api/booking`
   - Look for error messages

3. **Verify environment variable**:
   - Vercel Dashboard → Settings → Environment Variables
   - Confirm `RESEND_API_KEY` is set

4. **Test Resend API directly**:
   - Log in to Resend dashboard
   - Check API key is active
   - Verify domain is verified
   - Check API usage/limits

5. **Check email delivery**:
   - Resend dashboard → Emails
   - Look for failed deliveries
   - Check bounce/complaint rates

#### Resolution

**If API key issue**:
1. Generate new API key in Resend
2. Update environment variable in Vercel
3. Redeploy from Vercel dashboard

**If rate limit exceeded**:
1. Upgrade Resend plan
2. Implement client-side rate limiting (requires code change)

**If email bouncing**:
1. Verify DNS records (SPF, DKIM, DMARC)
2. Check recipient email addresses
3. Remove invalid addresses

### 2. Website Not Loading (502/504 Errors)

#### Symptoms
- "502 Bad Gateway" or "504 Gateway Timeout"
- Page fails to load
- Intermittent availability

#### Possible Causes
- Vercel platform issue
- Build failure deployed
- DNS configuration problem
- SSL certificate issue

#### Debugging Steps

1. **Check Vercel status**:
   - Visit https://vercel-status.com
   - Look for ongoing incidents

2. **Check deployment status**:
   - Vercel Dashboard → Deployments
   - Verify latest deployment is "Ready"
   - Check for "Failed" deployments

3. **Check DNS configuration**:
   - Use DNS lookup tool (https://dnschecker.org)
   - Verify acenavi.in points to Vercel
   - Check propagation globally

4. **Check SSL certificate**:
   - Visit https://acenavi.in
   - Click padlock icon in browser
   - Verify certificate is valid

#### Resolution

**If build failed**:
1. Review build logs for errors
2. Rollback to previous working deployment
3. Fix issues in code
4. Redeploy

**If Vercel outage**:
1. Wait for Vercel to resolve
2. Monitor status page
3. No action required (automatic recovery)

**If DNS issue**:
1. Re-verify domain in Vercel dashboard
2. Update DNS records at registrar
3. Wait for propagation (up to 48 hours)

### 3. Images Not Loading

#### Symptoms
- Broken image icons
- Missing logos or graphics
- Slow image loading

#### Possible Causes
- Files deleted from `/public` folder
- Incorrect file paths in code
- Image optimization failure
- CDN cache issue

#### Debugging Steps

1. **Check browser console**:
   - Look for 404 errors on image URLs
   - Note exact file paths failing

2. **Verify files exist**:
   - Check `/public` folder in repository
   - Confirm file names match code references
   - Check file capitalization

3. **Check deployment**:
   - Verify images deployed to production
   - Review build logs for asset errors

4. **Test direct URL**:
   - Visit `https://acenavi.in/filename.png`
   - Should load image directly

#### Resolution

**If files missing**:
1. Add missing files to `/public` folder
2. Commit and push changes
3. Verify in next deployment

**If path incorrect**:
1. Update file paths in code
2. Images in `/public` are served from root
3. Use `/filename.png` not `/public/filename.png`

**If CDN cache**:
1. Wait 5-10 minutes for cache refresh
2. Force refresh browser (Ctrl+Shift+R)
3. Purge cache in Vercel dashboard (if option available)

### 4. Slow Page Load Times

#### Symptoms
- Pages take >3 seconds to load
- Laggy animations
- Slow form interactions

#### Possible Causes
- Large unoptimized images
- Heavy JavaScript bundles
- Network congestion
- Server-side processing delays

#### Debugging Steps

1. **Run Lighthouse audit**:
   - Open DevTools → Lighthouse tab
   - Run performance audit
   - Review recommendations

2. **Check image sizes**:
   - Especially `/acenavi_vid.mp4`
   - Logo files should be small (<100KB)
   - OG image should be <500KB

3. **Check bundle size**:
   - Review build logs for large bundle warnings
   - Use Next.js bundle analyzer (requires setup)

4. **Test from different locations**:
   - Use tools like WebPageTest
   - Check various geographic locations

#### Resolution

**If images too large**:
1. Optimize images before upload
2. Use tools like TinyPNG or ImageOptim
3. Convert to WebP format
4. Replace in `/public` folder

**If video too large**:
1. Re-encode video with lower bitrate
2. Keep under 50MB
3. Consider hosting on CDN (Cloudflare, AWS)

**If JavaScript too large**:
1. Review dependencies in `package.json`
2. Remove unused packages
3. Use dynamic imports for heavy components

### 5. Mobile Display Issues

#### Symptoms
- Layout broken on mobile
- Text too small or too large
- Elements overlapping
- Horizontal scroll appears

#### Possible Causes
- CSS media query issues
- Viewport meta tag missing
- Image sizing problems
- Fixed width elements

#### Debugging Steps

1. **Test on real devices**:
   - iPhone, Android phones
   - Various screen sizes

2. **Use browser DevTools**:
   - Toggle device toolbar
   - Test multiple device presets
   - Check network throttling

3. **Inspect element styles**:
   - Look for fixed widths
   - Check media query breakpoints
   - Verify responsive utilities

#### Resolution

**If layout broken**:
1. Review Tailwind responsive classes (sm:, md:, lg:)
2. Test viewport meta tag in `layout.tsx`
3. Check for fixed pixel widths

**Requires developer intervention** for CSS fixes.

### 6. Navigation Not Sticky/Animating

#### Symptoms
- Navigation doesn't shrink on scroll
- Mobile menu not opening
- Logo not swapping

#### Possible Causes
- JavaScript error breaking scroll listener
- State management issue
- CSS transition not applied

#### Debugging Steps

1. **Check browser console**:
   - Look for JavaScript errors
   - Note component errors

2. **Test scroll behavior**:
   - Scroll page up and down
   - Check if state changes in React DevTools

3. **Verify CSS classes**:
   - Inspect navigation element
   - Check for transition classes

#### Resolution

**If JavaScript error**:
1. Review error message
2. Check `navigation.tsx` for issues
3. Redeploy if recent change broke it

**If state not updating**:
1. Check `useEffect` hook in navigation
2. Verify scroll event listener attached
3. May require code fix

---

## Debugging Guide

### Step-by-Step Debugging Process

#### 1. Identify the Problem
- What is not working?
- When did it start?
- What changed recently?

#### 2. Reproduce the Issue
- Can you reproduce it consistently?
- Does it happen on all devices/browsers?
- Does it happen in incognito mode?

#### 3. Check Logs
- Browser console errors
- Vercel function logs
- Resend delivery logs

#### 4. Isolate the Cause
- Recent deployments
- Environment variable changes
- Third-party service status

#### 5. Test Fix
- Make changes in feature branch
- Test in preview deployment
- Verify fix works

#### 6. Deploy Fix
- Merge to main branch
- Monitor production deployment
- Verify issue resolved

### Browser Console Errors

#### How to Access
- **Chrome/Edge**: F12 or Ctrl+Shift+I
- **Firefox**: F12 or Ctrl+Shift+K
- **Safari**: Cmd+Option+I (enable Developer menu first)

#### What to Look For
- Red error messages
- Failed network requests (red in Network tab)
- 404 errors (missing resources)
- 500 errors (server issues)

#### Common Errors

**"Failed to fetch"**
- Network connectivity issue
- API endpoint not responding
- CORS issue (unlikely in Next.js)

**"Cannot read property of undefined"**
- JavaScript error in code
- Data not loaded yet
- Type error

**"404 Not Found"**
- File missing
- Incorrect path
- File not deployed

### Testing Tools

#### Local Testing
```bash
# Run development server
pnpm dev

# Build production version
pnpm build

# Run production build locally
pnpm start
```

#### Curl Testing (API Routes)
```bash
# Test booking endpoint
curl -X POST https://acenavi.in/api/booking/route \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "timezone": "Asia/Kolkata",
    "preferredTimes": "Monday 10am"
  }'
```

Expected response:
```json
{"success": true}
```

#### Browser Network Tab
1. Open DevTools → Network tab
2. Reload page
3. Check for failed requests (red)
4. Click request to see details
5. Review response status and body

---

## High-Risk Areas

### Files That Should Rarely Be Modified

**Requires extreme caution** - breaking these can take down entire site:

#### 1. `app/layout.tsx`
**Contains**: Metadata, fonts, external scripts

**Risk**: Syntax errors break all pages

**Safe changes**: Metadata text only

#### 2. `app/api/booking/route.ts`
**Contains**: Booking logic and email sending

**Risk**: Breaks demo bookings completely

**Safe changes**: Email template text only (carefully)

#### 3. `tailwind.config.js`
**Contains**: Tailwind CSS configuration

**Risk**: Breaks all styling

**Safe changes**: None without testing

#### 4. `globals.css`
**Contains**: CSS custom properties and base styles

**Risk**: Breaks site-wide styling

**Safe changes**: Color values only (with caution)

#### 5. `components/navigation.tsx`
**Contains**: Global navigation and scroll logic

**Risk**: Breaks navigation on all pages

**Safe changes**: Link text only

### When Modifying High-Risk Files

1. **Always create feature branch**
2. **Test thoroughly locally**
3. **Review preview deployment**
4. **Have rollback plan ready**
5. **Monitor production after deploy**

---

## Regular Maintenance Tasks

### Weekly

- [ ] Test demo booking form manually
- [ ] Check Vercel deployment status
- [ ] Review Resend email delivery logs
- [ ] Test website on mobile device

### Monthly

- [ ] Review Vercel analytics
- [ ] Check for dependency updates
- [ ] Review and rotate API keys (if needed)
- [ ] Audit website performance (Lighthouse)
- [ ] Review and update testimonials (if new ones)

### Quarterly

- [ ] Full security audit
- [ ] Review all integrations (still needed?)
- [ ] Update documentation
- [ ] Backup environment variables
- [ ] Review and update FAQ section

### Annually

- [ ] Review and renew domain registration
- [ ] Review hosting plan (Vercel tier)
- [ ] Update dependencies to latest stable
- [ ] Full code review and refactoring

---

## Dependency Updates

### When to Update

**Security patches**: Immediately

**Minor versions**: Monthly

**Major versions**: Quarterly (with testing)

### How to Update
```bash
# Check for outdated packages
pnpm outdated

# Update all to latest within semver range
pnpm update

# Update specific package
pnpm update <package-name>

# Update to latest (including major versions)
pnpm update <package-name> --latest
```

### After Updating

1. Test locally: `pnpm dev` and `pnpm build`
2. Check for breaking changes in package changelogs
3. Test all functionality
4. Deploy to preview first
5. Monitor production after deploy

### High-Risk Updates

**Next.js major versions**: Test extensively

**React versions**: May break components

**Tailwind CSS**: May affect styling

**Framer Motion**: May affect animations

---

## Performance Optimization

### Monitoring Performance

**Tools**:
- Google PageSpeed Insights
- Vercel Analytics (built-in)
- Lighthouse (Chrome DevTools)

**Target Metrics**:
- First Contentful Paint: <1.8s
- Time to Interactive: <3.8s
- Speed Index: <3.4s
- Total Blocking Time: <200ms

### Optimization Checklist

- [ ] Images under 500KB each
- [ ] Video under 50MB
- [ ] No unused dependencies
- [ ] Lazy loading for below-fold content
- [ ] Minified CSS and JavaScript (automatic)
- [ ] Gzip compression enabled (automatic)

### If Performance Degrades

1. Run Lighthouse audit
2. Identify heaviest assets
3. Optimize images/video
4. Review recent code changes
5. Consider code splitting

---

## Security Maintenance

### Regular Security Checks

#### 1. Dependency Vulnerabilities
```bash
# Check for vulnerabilities
pnpm audit

# Fix automatically if possible
pnpm audit fix
```

#### 2. API Key Rotation

**When to rotate**:
- Every 6-12 months
- After team member departure
- If key exposed in logs/code
- After security incident

**How to rotate**:
1. Generate new key in service dashboard
2. Update in Vercel environment variables
3. Test in preview deployment
4. Redeploy production
5. Delete old key

#### 3. Environment Variable Audit

**Quarterly check**:
- Remove unused variables
- Verify all needed variables present
- Confirm no hardcoded secrets in code

### Security Incidents

**If API key compromised**:
1. Immediately rotate key
2. Review service logs for unauthorized usage
3. Update environment variables
4. Redeploy
5. Monitor for abuse

**If site defaced/hacked**:
1. Rollback to last known good deployment
2. Review Git history for unauthorized changes
3. Rotate all API keys
4. Review access controls (Vercel, GitHub)
5. Enable 2FA on all accounts

---

## Contact for Technical Issues

### Internal Escalation
1. Developer on-call
2. Technical lead
3. Project manager

### External Support

**Vercel Issues**:
- Dashboard: https://vercel.com/help
- Email: support@vercel.com

**Resend Issues**:
- Dashboard: https://resend.com/docs
- Email: support@resend.com

**Emergency Contact**:
- Maintain list of team members with admin access
- Document phone numbers for after-hours emergencies

---

## Documentation Maintenance

This documentation should be updated when:

- New integrations added
- Deployment process changes
- New high-risk areas identified
- Common issues discovered
- Team structure changes

**Assigned to**: Technical lead or senior developer

**Review frequency**: Quarterly

---

**Last Updated**: January 2026