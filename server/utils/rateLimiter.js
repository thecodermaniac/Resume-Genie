import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Upstash Redis client (communicates over HTTP — perfect for Lambda)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Sliding Window: 10 requests per 15 minutes per IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "15 m"),
  analytics: true, // enables Upstash dashboard usage graphs
  prefix: "resume_genie_rl", // namespace key in Redis
});

/**
 * Express middleware — rate limits by IP using Upstash Redis.
 * Works correctly across Lambda cold starts & multiple instances.
 */
export const demoLimiter = async (req, res, next) => {
  // API Gateway sets x-forwarded-for; fallback to req.ip for local dev
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.ip ||
    "unknown";

  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  // Expose standard rate-limit headers
  res.setHeader("X-RateLimit-Limit", limit);
  res.setHeader("X-RateLimit-Remaining", remaining);
  res.setHeader("X-RateLimit-Reset", reset);

  if (!success) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  next();
};
