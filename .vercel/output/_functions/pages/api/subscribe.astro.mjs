import { Redis } from '@upstash/redis';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const redis = new Redis({
  url: undefined                               ,
  token: undefined                                 
});
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, source = "website" } = data;
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const exists = await redis.sismember("subscribers", normalizedEmail);
    if (exists) {
      return new Response(JSON.stringify({
        success: true,
        message: "Already subscribed!"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    await redis.sadd("subscribers", normalizedEmail);
    await redis.hset(`subscriber:${normalizedEmail}`, {
      email: normalizedEmail,
      source,
      subscribedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown"
    });
    await redis.incr("subscriber_count");
    return new Response(JSON.stringify({
      success: true,
      message: "Successfully subscribed!"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
