# Deployment Guide

This document covers hosting, deployment procedures, and environment configuration for the ACENAVI website.

---

## Hosting Platform

**Provider**: Vercel

**Reason**: Optimized for Next.js applications with automatic deployments, serverless functions, and global CDN.

**Account**: Access via https://vercel.com/dashboard

---

## Repository Configuration

### Git Repository
**Assumed hosting**: GitHub, GitLab, or Bitbucket

**Connected to**: Vercel project for automatic deployments

### Branch Strategy

#### Production Branch: `main`
- Triggers automatic production deployment
- Deploys to https://acenavi.in
- Requires approval/review before merge (recommended)

#### Development/Feature Branches
- Any branch other than `main`
- Triggers preview deployment
- Gets unique preview URL from Vercel
- Used for testing before production

### Recommended Workflow
```
feature-branch → Pull Request → Review → Merge to main → Auto-deploy
```

---

## Environment Variables

### Required Variables

#### Production Environment (Vercel)
```
RESEND_API_KEY=your_resend_api_key_here
```

#### Development Environment (Local)

Create `.env.local` in project root:
```env
RESEND_API_KEY=your_resend_api_key_here
```

### Setting Environment Variables in Vercel

1. Go to Vercel dashboard
2. Select ACENAVI project
3. Navigate to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter variable name: `RESEND_API_KEY`
6. Enter variable value (API key from Resend dashboard)
7. Select environments: ✅ Production, ✅ Preview, ✅ Development
8. Click **Save**

### Security Notes

- **Never commit** `.env.local` to Git
- `.env.local` is in `.gitignore` by default
- Rotate API keys if compromised
- Use different API keys for production vs. development (recommended)

### Getting Resend API Key

1. Log in to https://resend.com
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Name it (e.g., "ACENAVI Production")
5. Copy key immediately (shown only once)
6. Store securely

---

## Deployment Process

### Automatic Deployment (Recommended)

#### Prerequisites
- Repository connected to Vercel
- Environment variables configured
- Changes committed to Git

#### Steps

1. **Make changes** to codebase
2. **Commit changes**:
```bash
   git add .
   git commit -m "Descriptive commit message"
```
3. **Push to repository**:
```bash
   # For production deployment
   git push origin main
   
   # For preview deployment
   git push origin feature-branch-name
```
4. **Vercel auto-detects push** and starts deployment
5. **Wait 3-10 minutes** for build to complete
6. **Receive notification** (email or Slack if configured)

#### Monitoring Deployment

**Vercel Dashboard** → **Deployments**

Status indicators:
- 🟡 **Building**: In progress
- ✅ **Ready**: Deployed successfully
- ❌ **Failed**: Build error (see logs)

### Manual Deployment (Alternative)

If automatic deployment is not working:

#### Via Vercel CLI

1. **Install Vercel CLI**:
```bash
   npm install -g vercel
```

2. **Login**:
```bash
   vercel login
```

3. **Deploy**:
```bash
   # Production
   vercel --prod
   
   # Preview
   vercel
```

4. **Follow prompts** to complete deployment

#### Via Vercel Dashboard

1. Go to **Deployments** page
2. Click **Redeploy** on latest successful deployment
3. Confirm redeployment

---

## Build Configuration

### Build Command
```bash
pnpm build
# or
npm run build
```

### Install Command
```bash
pnpm install
# or
npm install
```

### Output Directory
`.next` (default for Next.js)

### Node.js Version
**Minimum**: Node.js 18.x

**Recommendation**: Use latest LTS version

Specified in `package.json` (if configured):
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Framework Detection
Vercel automatically detects Next.js framework. No manual configuration needed.

---

## Domain Configuration

### Primary Domain
**Production**: https://acenavi.in

### DNS Configuration

**Required DNS Records** (configured at domain registrar):

#### For Vercel Hosting

**Option 1: A Record (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Option 2: CNAME Record**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

**For www subdomain**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### SSL Certificate
- Automatically provisioned by Vercel
- Renews automatically
- No manual configuration needed

### Domain Verification in Vercel

1. Go to **Project Settings** → **Domains**
2. Click **Add Domain**
3. Enter `acenavi.in`
4. Follow verification instructions
5. Wait for DNS propagation (up to 48 hours)

---

## Deployment Checklist

### Pre-Deployment

- [ ] All changes tested locally
- [ ] `pnpm build` runs successfully
- [ ] No TypeScript errors
- [ ] Environment variables set in Vercel
- [ ] Git commit messages are descriptive
- [ ] Breaking changes documented

### During Deployment

- [ ] Monitor build logs in Vercel dashboard
- [ ] Check for build warnings/errors
- [ ] Wait for "Ready" status

### Post-Deployment

- [ ] Visit https://acenavi.in to verify changes
- [ ] Test all CTAs and links
- [ ] Test demo booking form submission
- [ ] Verify email notifications work (Resend)
- [ ] Check mobile responsiveness
- [ ] Test in multiple browsers
- [ ] Verify social media preview images

---

## Redeployment (Updates)

### For Content Changes Only
(Testimonials, images, minor text)

1. Make changes to safe files
2. Commit and push to `main` branch
3. Auto-deploys in 3-5 minutes
4. Verify changes on live site

### For Code Changes
(New features, bug fixes, integrations)

1. Create feature branch
2. Make changes and test locally
3. Create pull request to `main`
4. Review changes in preview deployment
5. Merge to `main` after approval
6. Auto-deploys to production
7. Verify on live site

### For Dependency Updates

1. Update `package.json`:
```bash
   pnpm update
```
2. Test locally:
```bash
   pnpm dev
   pnpm build
```
3. Commit changes
4. Push to repository
5. Auto-deploys with new dependencies

---

## Rollback Procedure

### If Deployment Breaks Production

#### Method 1: Revert Git Commit
```bash
# Find commit hash of last working version
git log

# Revert to that commit
git revert <commit-hash>

# Push revert
git push origin main
```

Vercel auto-deploys reverted version.

#### Method 2: Redeploy Previous Version via Vercel

1. Go to **Vercel Dashboard** → **Deployments**
2. Find last successful deployment
3. Click **⋮** (three dots) → **Redeploy**
4. Select **Use existing Build Cache**
5. Click **Redeploy**

This restores previous working version in ~2 minutes.

#### Method 3: Instant Rollback (Vercel Dashboard)

1. Go to failing deployment
2. Click **Promote to Production** on previous deployment
3. Instant switch (no rebuild)

### After Rollback

1. Investigate build logs for errors
2. Fix issues in feature branch
3. Test thoroughly before redeploying
4. Document incident and fix

---

## Preview Deployments

### Purpose
Test changes before production without affecting live site.

### How to Create

1. Push to any branch except `main`:
```bash
   git checkout -b feature-new-section
   git push origin feature-new-section
```

2. Vercel creates preview deployment automatically

3. Get preview URL from:
   - Vercel dashboard
   - GitHub PR comment (if configured)
   - Email notification

### Preview URL Format
```
https://acenavi-website-<random-hash>.vercel.app
```

### Testing Preview

- Share preview URL with team
- Test all functionality
- Verify changes look correct
- Get approval before merging to `main`

---

## Continuous Integration

### Build Checks (Recommended Setup)

Configure in GitHub/GitLab:

1. **Lint check**: Ensure code quality
2. **Type check**: No TypeScript errors
3. **Build test**: `pnpm build` succeeds
4. **Preview deployment**: Automatic via Vercel

### Vercel Checks (Automatic)

On every push:
- ✅ Build succeeds/fails
- ✅ TypeScript compilation
- ✅ Dependency resolution

Failed checks block deployment.

---

## Monitoring Deployments

### Vercel Dashboard

**URL**: https://vercel.com/dashboard

**Monitor**:
- Deployment status (building, ready, failed)
- Build logs (click deployment for details)
- Build duration
- Deployment history

### Build Logs

Access via:
1. Click on deployment in dashboard
2. View **Build Logs** tab
3. Expand sections for details

**Common log sections**:
- Install dependencies
- Build application
- Generate static pages
- Export production build

### Error Notifications

**Email**: Sent to Vercel account email

**Slack** (if configured): Real-time notifications

---

## Common Deployment Issues

### Build Fails: "Module not found"

**Cause**: Missing dependency

**Fix**:
```bash
pnpm install <missing-package>
git add package.json pnpm-lock.yaml
git commit -m "Add missing dependency"
git push
```

### Build Fails: "TypeScript error"

**Cause**: Type errors in code

**Fix**:
1. Run `pnpm build` locally
2. Fix reported TypeScript errors
3. Commit and push fixes

### Environment Variable Not Found

**Cause**: Missing in Vercel settings

**Fix**:
1. Add variable in Vercel dashboard
2. Redeploy from dashboard (uses new variables)

### Deployment Stuck in "Building"

**Cause**: Vercel platform issue or timeout

**Fix**:
1. Wait 15 minutes
2. If still stuck, redeploy from dashboard
3. Contact Vercel support if persistent

### 404 Error After Deployment

**Cause**: Routing issue or incorrect page structure

**Fix**:
1. Check file is in `/app` directory with correct naming
2. Verify `page.tsx` naming convention
3. Clear browser cache
4. Check Vercel logs for routing errors

---

## Deployment Performance

### Typical Build Times
- **Production build**: 2-4 minutes
- **Preview build**: 2-4 minutes
- **Redeploy with cache**: 1-2 minutes

### Optimization Tips

1. **Enable build cache**: Automatic in Vercel
2. **Minimize dependencies**: Remove unused packages
3. **Optimize images**: Use Next.js Image component
4. **Static generation**: Use SSG where possible

---

## Multi-Environment Setup (Optional)

If using staging environment:

### Staging Environment

**Branch**: `staging` or `develop`

**Domain**: `staging.acenavi.in` (configure separately)

**Environment Variables**: Separate from production

### Configuration

1. Create staging branch
2. Configure domain in Vercel
3. Set staging-specific environment variables
4. Deploy to staging before production

---

## Disaster Recovery

### Backup Strategy

**Git Repository**: Source of truth (already backed up)

**Vercel Deployments**: Automatic retention (90 days)

**Database**: Not applicable (no database in project)

### Recovery Steps

1. **Code loss**: Clone from Git repository
2. **Deployment history**: Access in Vercel dashboard
3. **Environment variables**: Document separately (not in Git)

### Regular Backups (Recommended)

- Export environment variables periodically
- Document integrations and API keys securely
- Keep deployment documentation updated

---

## Contact for Deployment Issues

### Vercel Support
- **Dashboard**: https://vercel.com/help
- **Email**: support@vercel.com
- **Status Page**: https://vercel-status.com

### Internal Team
- Developer responsible for deployments
- Team lead for critical issues

---

**Last Updated**: January 2026