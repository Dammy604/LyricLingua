/**
 * JWT token utilities
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set');
}

// Short-lived access token (10–15 minutes)
const ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TTL || '15m';
// Longer-lived refresh token (7–30 days)
const REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_TTL || '7d';

/**
 * Create a signed JWT access token.
 * @param {{ id: string, email: string, role?: string }} payload
 */
const generateAccessToken = (payload) =>
  jwt.sign(
    {
      sub: payload.id,
      email: payload.email,
      role: payload.role || 'user',
      type: 'access',
    },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL },
  );

/**
 * Create a signed JWT refresh token.
 * @param {{ id: string, email: string }} payload
 */
const generateRefreshToken = (payload) =>
  jwt.sign(
    {
      sub: payload.id,
      email: payload.email,
      type: 'refresh',
    },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_TTL },
  );

/**
 * Verify a JWT and return its payload.
 * @param {string} token
 */
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
};




