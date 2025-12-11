import { Redis } from '@upstash/redis';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const redis = new Redis({
  url: undefined                               ,
  token: undefined                                 
});
const ADMIN_KEY = "your-secret-key-change-me";
const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    if (key !== ADMIN_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const format = url.searchParams.get("format") || "json";
    const emails = await redis.smembers("subscribers");
    const subscribers = await Promise.all(
      emails.map(async (email) => {
        const meta = await redis.hgetall(`subscriber:${email}`);
        return meta || { email, subscribedAt: "unknown", source: "unknown" };
      })
    );
    const count = await redis.get("subscriber_count") || emails.length;
    if (format === "csv") {
      const csv = [
        "email,source,subscribed_at",
        ...subscribers.map((s) => `${s.email},${s.source},${s.subscribedAt}`)
      ].join("\n");
      return new Response(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="subscribers-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`
        }
      });
    }
    return new Response(JSON.stringify({
      total: count,
      subscribers
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
