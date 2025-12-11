# Newsletter System Setup

A simple, free newsletter signup system using **Upstash Redis** (via Vercel integration).

## Features

- ✅ Free (Upstash free tier: 10K commands/day, 256MB)
- ✅ Stores email + metadata (source, signup date)
- ✅ Duplicate prevention
- ✅ Export to CSV for import to Mailchimp/ConvertKit
- ✅ Works with existing Astro site

## Setup Instructions

### 1. Install Upstash for Redis via Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. Click **Browse Storage** or **Connect Store**
5. Select **Upstash for Redis** → **Install**
6. Create a new database (name: `newsletter-subscribers`)
7. Connect it to your project

The environment variables will be automatically added:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### 2. Add Admin API Key

In Vercel Dashboard → **Settings** → **Environment Variables**, add:

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

Vercel will automatically deploy with Upstash connected.

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

Upstash Free:
- 10,000 commands/day
- 256MB storage (~100K+ subscribers)
- Perfect for getting started!

## View Data in Upstash Console

You can view/manage your subscribers directly:
1. Go to [console.upstash.com](https://console.upstash.com)
2. Select your database
3. Use the **Data Browser** to see all keys

## Upgrading Later

When ready to migrate to a full email service:

1. Export CSV from `/api/subscribers?key=YOUR_KEY&format=csv`
2. Import to your chosen service
3. Update form submissions to point to new service
4. Keep Upstash as backup or remove

## Local Development

For local testing, add to `.env`:

```
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
ADMIN_API_KEY=dev-key
```

Get these from: Vercel Dashboard → Storage → Your Upstash Store, or directly from [console.upstash.com](https://console.upstash.com)




