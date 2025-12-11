# Newsletter System Setup

A simple, free newsletter signup system using Vercel KV (Redis).

## Features

- ✅ Free (Vercel KV free tier: 256MB, 30K requests/month)
- ✅ Stores email + metadata (source, signup date)
- ✅ Duplicate prevention
- ✅ Export to CSV for import to Mailchimp/ConvertKit
- ✅ Works with existing Astro site

## Setup Instructions

### 1. Create Vercel KV Store

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database** → **KV**
5. Name it `newsletter-subscribers`
6. Click **Create**

The environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) will be automatically added to your project.

### 2. Add Admin API Key

In Vercel Dashboard → Settings → Environment Variables, add:

```
ADMIN_API_KEY=your-secret-key-here
```

Generate a secure key: `openssl rand -hex 32`

### 3. Deploy

```bash
git add .
git commit -m "Add newsletter signup system"
git push
```

Vercel will automatically deploy with the KV store connected.

## API Endpoints

### Subscribe (POST)

```bash
curl -X POST https://yourdomain.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "source": "footer"}'
```

### Get Subscribers (GET) - Admin Only

**JSON format:**
```
https://yourdomain.com/api/subscribers?key=YOUR_ADMIN_KEY
```

**CSV format (for import to email tools):**
```
https://yourdomain.com/api/subscribers?key=YOUR_ADMIN_KEY&format=csv
```

## Export to Email Tools

### Mailchimp
1. Download CSV: `/api/subscribers?key=YOUR_KEY&format=csv`
2. In Mailchimp: Audience → Add contacts → Import contacts → Upload a file

### ConvertKit
1. Download CSV: `/api/subscribers?key=YOUR_KEY&format=csv`
2. In ConvertKit: Subscribers → Import subscribers → Upload CSV

### Beehiiv
1. Download CSV
2. Settings → Import subscribers

## Data Stored

For each subscriber:
- `email` - normalized (lowercase, trimmed)
- `source` - where they signed up (footer, guide-sidebar, etc.)
- `subscribedAt` - ISO timestamp
- `ip` - for spam prevention (optional)

## Free Tier Limits

Vercel KV Free:
- 256MB storage (~100K+ subscribers with metadata)
- 30K requests/month
- Perfect for getting started

## Upgrading Later

When ready to migrate to a full email service:

1. Export CSV from `/api/subscribers?key=YOUR_KEY&format=csv`
2. Import to your chosen service
3. Update form submissions to point to new service
4. Keep KV as backup or remove

## Local Development

For local testing, add to `.env`:

```
KV_URL=your-kv-url
KV_REST_API_URL=your-rest-api-url
KV_REST_API_TOKEN=your-token
KV_REST_API_READ_ONLY_TOKEN=your-read-only-token
ADMIN_API_KEY=dev-key
```

You can get these values from Vercel Dashboard → Storage → Your KV Store → Connect.
