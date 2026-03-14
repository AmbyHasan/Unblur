import { RateLimiterMemory } from "rate-limiter-flexible";

export const signupLimiter = new RateLimiterMemory({
  points: 3, // number of allowed attempts
  duration: 60, // per 60 seconds
});