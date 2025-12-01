/**
 * Password utilities
 * Uses bcryptjs for hashing and verification.
 */

const bcrypt = require('bcryptjs');

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12', 10);

/**
 * Hash a plaintext password.
 * @param {string} password
 * @returns {Promise<string>}
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
  return bcrypt.hash(password, salt);
};

/**
 * Compare a plaintext password to a hash.
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
const verifyPassword = async (password, hash) => {
  if (!hash) return false;
  return bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  verifyPassword,
};




