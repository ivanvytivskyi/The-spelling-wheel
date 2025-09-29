// netlify/functions/vote.mjs
import { Redis } from "@upstash/redis";

// Create a Redis client using Netlify env variables (server-only)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, decodeURIComponent(v.join("=") || "")];
    }),
  );
}

function newCookie(voterId) {
  // 2 years
  const maxAge = 60 * 60 * 24 * 730;
  return `voter_id=${encodeURIComponent(voterId)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

function uuid() {
  // Node 18+ has crypto.randomUUID
  return (globalThis.crypto?.randomUUID?.() ||
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  );
}

async function getCounts() {
  const [likes, dislikes] = await redis.mget("count:like", "count:dislike");
  return {
    likes: Number(likes || 0),
    dislikes: Number(dislikes || 0),
  };
}

async function safeDecr(key) {
  const val = await redis.decr(key);
  if (val < 0) {
    await redis.set(key, 0);
    return 0;
  }
  return val;
}

export async function handler(event) {
  try {
    const cookies = parseCookies(event.headers?.cookie || "");
    let voterId = cookies["voter_id"];

    let setCookieHeader;
    if (!voterId) {
      voterId = uuid();
      setCookieHeader = newCookie(voterId);
    }

    if (event.httpMethod === "GET") {
      // Return current counts and the user's existing choice (if any)
      const prev = await redis.get(`vote:${voterId}`);
      const counts = await getCounts();
      return {
        statusCode: 200,
        headers: setCookieHeader ? { "Set-Cookie": setCookieHeader } : {},
        body: JSON.stringify({ ...counts, userChoice: prev || null }),
      };
    }

    if (event.httpMethod === "POST") {
      const { choice } = JSON.parse(event.body || "{}");
      if (!["like", "dislike"].includes(choice)) {
        return { statusCode: 400, body: "Invalid choice" };
      }

      const prev = await redis.get(`vote:${voterId}`);

      // No change? Return current state
      if (prev === choice) {
        const counts = await getCounts();
        return {
          statusCode: 200,
          headers: setCookieHeader ? { "Set-Cookie": setCookieHeader } : {},
          body: JSON.stringify({ ...counts, userChoice: choice }),
        };
      }

      // Switching: decrement previous, if existed
      if (prev === "like") await safeDecr("count:like");
      if (prev === "dislike") await safeDecr("count:dislike");

      // Save new vote + increment its counter
      await redis.set(`vote:${voterId}`, choice);
      await redis.incr(`count:${choice}`);

      const counts = await getCounts();
      return {
        statusCode: 200,
        headers: setCookieHeader ? { "Set-Cookie": setCookieHeader } : {},
        body: JSON.stringify({ ...counts, userChoice: choice }),
      };
    }

    // Method not allowed
    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return { statusCode: 500, body: "Server error: " + err.message };
  }
}
