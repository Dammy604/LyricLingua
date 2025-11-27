/**
 * Database Client
 * PostgreSQL connection pool using DATABASE_URL
 */

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Fail fast in dev to avoid confusing auth errors
  // In Docker, DATABASE_URL is provided via docker-compose.
  // For local dev, create a .env with DATABASE_URL.
  // eslint-disable-next-line no-console
  console.warn('[db] DATABASE_URL is not set. Database access will fail.');
}

const pool = new Pool({
  connectionString,
  ssl:
    process.env.PGSSL === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
});

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[db] Unexpected error on idle client', err);
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  pool,
  query,
};


