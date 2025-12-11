import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

export const prerender = false;

// Initialize Redis - uses env vars with any prefix (screened_KV_REST_API_URL, etc.)
const redis = new Redis({
  url: import.meta.env.screened_KV_REST_API_URL || import.meta.env.KV_REST_API_URL,
  token: import.meta.env.screened_KV_REST_API_TOKEN || import.meta.env.KV_REST_API_TOKEN,
});

// Simple admin key - change this to something secure!
const ADMIN_KEY = import.meta.env.ADMIN_API_KEY || 'your-secret-key-change-me';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Check admin key
    const url = new URL(request.url);
    const key = url.searchParams.get('key');
    
    if (key !== ADMIN_KEY) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get format (json or csv)
    const format = url.searchParams.get('format') || 'json';

    // Get all subscriber emails
    const emails = await redis.smembers('subscribers') as string[];
    
    // Get metadata for each subscriber
    const subscribers = await Promise.all(
      emails.map(async (email) => {
        const meta = await redis.hgetall(`subscriber:${email}`) as Record<string, string> | null;
        return meta || { email, subscribedAt: 'unknown', source: 'unknown' };
      })
    );

    // Get total count
    const count = await redis.get('subscriber_count') || emails.length;

    if (format === 'csv') {
      // Return CSV for easy import to email tools
      const csv = [
        'email,source,subscribed_at',
        ...subscribers.map(s => `${s.email},${s.source},${s.subscribedAt}`)
      ].join('\n');

      return new Response(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    return new Response(JSON.stringify({ 
      total: count,
      subscribers 
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};







