import rateLimit from "express-rate-limit";

export const demoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20
});
