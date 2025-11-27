/**
 * Auth Routes
 *
 * POST /api/auth/register  - Create account
 * POST /api/auth/login     - Login
 * POST /api/auth/logout    - Log out (stateless acknowledgement)
 */

const express = require("express");
const { body } = require("express-validator");

const { validate } = require("../../middleware/validation");
const { authLimiter } = require("../../middleware/rateLimit");
const { generateAccessToken } = require("../../utils/tokens");
const { hashPassword, verifyPassword } = require("../../utils/password");
const { query } = require("../../db");

const router = express.Router();

const sanitizeUser = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    avatar: row.avatar,
    nativeLanguage: row.native_language,
    learningLanguages: row.learning_languages || [],
    preferences: row.preferences || {},
    isVerified: row.is_verified,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

// ===== Register =====

router.post(
  "/register",
  authLimiter,
  [
    body("email").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one digit.")
      .matches(/[^A-Za-z0-9]/)
      .withMessage("Password must contain at least one special character."),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords must match."),
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required."),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const normalizedEmail = email.toLowerCase();

      const existing = await query("SELECT id FROM users WHERE email = $1", [
        normalizedEmail,
      ]);
      if (existing.rows.length > 0) {
        return res.status(409).json({
          error: "Email already in use",
          code: "EMAIL_TAKEN",
        });
      }

      const passwordHash = await hashPassword(password);

      const insertResult = await query(
        `
          INSERT INTO users (email, password_hash, name)
          VALUES ($1, $2, $3)
          RETURNING *
        `,
        [normalizedEmail, passwordHash, name.trim()]
      );

      const user = sanitizeUser(insertResult.rows[0]);

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      return res.status(201).json({
        user,
        accessToken,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ===== Login =====

router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const normalizedEmail = email.toLowerCase();

      const result = await query("SELECT * FROM users WHERE email = $1", [
        normalizedEmail,
      ]);
      if (result.rows.length === 0) {
        return res.status(401).json({
          error: "Invalid email or password",
          code: "INVALID_CREDENTIALS",
        });
      }

      const row = result.rows[0];
      const passwordMatch = await verifyPassword(password, row.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({
          error: "Invalid email or password",
          code: "INVALID_CREDENTIALS",
        });
      }

      const user = sanitizeUser(row);

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return res.json({
        user,
        accessToken,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ===== Logout =====

router.post("/logout", authLimiter, (req, res) => {
  res.json({ success: true });
});

module.exports = router;
