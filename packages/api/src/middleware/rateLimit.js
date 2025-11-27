/**
 * Rate Limiting Middleware
 */

const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter
 */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: 15 * 60, // seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Stricter limiter for authentication routes
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per windowMs
  message: {
    error: 'Too many login attempts',
    code: 'AUTH_RATE_LIMIT',
    retryAfter: 15 * 60,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Limiter for translation API (external service calls)
 */
const translationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 translation requests per minute
  message: {
    error: 'Translation rate limit exceeded',
    code: 'TRANSLATION_RATE_LIMIT',
    retryAfter: 60,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  rateLimiter,
  authLimiter,
  translationLimiter,
};







