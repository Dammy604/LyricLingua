/**
 * CSRF Protection Middleware
 *
 * Uses a double-submit token pattern:
 * - A random token is stored in an httpOnly + sameSite=strict cookie.
 * - The client must also send it in the `x-csrf-token` header.
 */

const crypto = require('crypto');

const CSRF_COOKIE_NAME = 'csrf_token';

/**
 * Issue a CSRF token cookie and return the token in the response body.
 */
const issueCsrfToken = (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');

  res.cookie(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  res.json({ csrfToken: token });
};

/**
 * Middleware to enforce CSRF on state-changing requests.
 */
const csrfProtection = (req, res, next) => {
  const method = req.method.toUpperCase();

  // Only protect mutating methods
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return next();
  }

  const cookieToken = req.cookies[CSRF_COOKIE_NAME];
  const headerToken = req.headers['x-csrf-token'];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({
      error: 'Invalid CSRF token',
      code: 'CSRF_ERROR',
    });
  }

  return next();
};

module.exports = {
  issueCsrfToken,
  csrfProtection,
};




