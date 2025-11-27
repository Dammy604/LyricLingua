/**
 * Authentication Middleware
 */

const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/tokens');

/**
 * Verify JWT access token from Authorization header and attach user to request.
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No token provided',
        code: 'UNAUTHORIZED',
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyToken(token);
      if (decoded.type !== 'access') {
        return res.status(401).json({
          error: 'Invalid token type',
          code: 'INVALID_TOKEN_TYPE',
        });
      }
      req.user = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      };
      next();
    } catch (jwtError) {
      return res.status(401).json({
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Authentication error',
      code: 'AUTH_ERROR',
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = verifyToken(token);
        if (decoded.type === 'access') {
          req.user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
          };
        } else {
          req.user = null;
        }
      } catch (jwtError) {
        // Token invalid, but continue anyway
        req.user = null;
      }
    }

    next();
  } catch (error) {
    next();
  }
};

/**
 * Backwards-compatible helper to generate an access token.
 */
const generateToken = (user) =>
  generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

module.exports = {
  authenticate,
  optionalAuth,
  generateToken,
  generateAccessToken,
  generateRefreshToken,
};







