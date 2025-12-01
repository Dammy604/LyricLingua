/**
 * Spotify Token Model
 */

const spotifyTokenSchema = {
  tableName: 'spotify_tokens',
  columns: {
    id: { type: 'uuid', primaryKey: true, default: 'uuid_generate_v4()' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)' },
    access_token: { type: 'text', notNull: true },
    refresh_token: { type: 'text', notNull: true },
    scope: { type: 'text' },
    expires_at: { type: 'timestamp', notNull: true },
    created_at: { type: 'timestamp', default: 'now()' },
    updated_at: { type: 'timestamp', default: 'now()' },
  },
  indexes: [
    { columns: ['user_id'], unique: true },
    { columns: ['expires_at'] },
  ],
};

module.exports = spotifyTokenSchema;




