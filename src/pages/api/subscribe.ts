import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

export const prerender = false;

// Initialize Redis - uses env vars with any prefix (screened_KV_REST_API_URL, etc.)
const redis = new Redis({
  url: import.meta.env.screened_KV_REST_API_URL || import.meta.env.KV_REST_API_URL,
  token: import.meta.env.screened_KV_REST_API_TOKEN || import.meta.env.KV_REST_API_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, source = 'website' } = data;

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if already subscribed
    const exists = await redis.sismember('subscribers', normalizedEmail);
    if (exists) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Already subscribed!' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Add to subscribers set
    await redis.sadd('subscribers', normalizedEmail);

    // Store metadata (signup date, source)
    await redis.hset(`subscriber:${normalizedEmail}`, {
      email: normalizedEmail,
      source,
      subscribedAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    // Increment counter
    await redis.incr('subscriber_count');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Successfully subscribed!' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};







