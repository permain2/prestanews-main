# Screened.com Domain Setup Guide

## Overview
This guide explains how to set up screened.com and media.screened.com to capture legacy backlinks from the previous movie/TV review site.

## Step 1: Purchase the Domain
Purchase screened.com from Atom.com (~$29,500)

## Step 2: Configure DNS in Your Registrar

Add these DNS records:

```
Type    Name      Value                    TTL
A       @         76.76.21.21              Auto
CNAME   www       cname.vercel-dns.com     Auto
CNAME   media     cname.vercel-dns.com     Auto
```

## Step 3: Add Domain to Vercel

### Main Domain (screened.com)
1. Go to your Vercel project dashboard
2. Settings → Domains
3. Add `screened.com`
4. Add `www.screened.com` (redirect to screened.com)

### Media Subdomain (media.screened.com)
**Option A: Same Project (Recommended)**
1. Add `media.screened.com` to the same Vercel project
2. The vercel.json redirects will handle all requests

**Option B: Separate Project**
1. Create new Vercel project from `/media-subdomain` folder
2. Deploy with: `cd media-subdomain && vercel --prod`
3. Add `media.screened.com` domain

## Step 4: Verify Redirects Work

Test these URLs after setup:

### Main Domain Tests
```bash
# Should redirect to homepage
curl -I https://screened.com/the-matrix/16-51853/
curl -I https://screened.com/news/under-the-influence-the-matrix/2218/
curl -I https://screened.com/profile/alex/

# Should redirect to /news
curl -I https://screened.com/news/community-benched/
```

### Media Subdomain Tests
```bash
# Should redirect to homepage
curl -I https://media.screened.com/uploads/0/5735/420706-vlcsnap_00002.jpg
curl -I https://media.screened.com/uploads/0/1572/425389-not_sure_if_troll.jpg
```

## Backlink Statistics

Based on the Ahrefs export, here's what we're capturing:

| Source Type | Count | Avg DR | Top Domains |
|-------------|-------|--------|-------------|
| Movie/TV pages | ~500+ | 40-50 | BuzzFeed, Guardian, TVTropes |
| News articles | ~200+ | 50-60 | SlashFilm, TheWeek, NFL |
| Image hotlinks | ~300+ | 30-40 | Various forums, blogs |
| Profile/User pages | ~100+ | 20-30 | Forums, comment sections |

### High-Value Backlinks Captured:
- **BuzzFeed** (DR 91) - 10+ links
- **The Guardian** (DR 93) - 1 link  
- **NFL.com** (DR 88) - 1 link
- **TV Tropes** (DR 82) - Multiple links
- **The Register** (DR 89) - 1 link
- **NRK.no** (DR 88) - 1 link
- **Grantland** (DR 77) - Multiple links

## SEO Notes

### What This Setup Does:
✅ 301 redirects all legacy URLs to homepage
✅ Preserves some link equity from backlinks
✅ Captures image hotlink traffic
✅ Prevents 404 errors

### Limitations:
⚠️ Topic mismatch reduces link value (movies → finance)
⚠️ Google may take 3-6 months to fully process redirects
⚠️ Some very old links may have already been deindexed

### Monitoring
After launch, monitor in Google Search Console:
1. Coverage report for 301 redirect status
2. Links report to see which backlinks Google recognizes
3. Performance report for traffic from redirected URLs

## Files Modified

- `vercel.json` - Main redirect rules
- `src/pages/[...slug].astro` - Catch-all redirect handler
- `public/legacy/placeholder.svg` - Placeholder for image requests
- `media-subdomain/` - Separate config for media subdomain


