/**
 * Song Model
 */

const songSchema = {
  tableName: 'songs',
  columns: {
    id: { type: 'uuid', primaryKey: true, default: 'uuid_generate_v4()' },
    title: { type: 'varchar(500)', notNull: true },
    artist: { type: 'varchar(255)', notNull: true },
    album: { type: 'varchar(255)' },
    language: { type: 'varchar(5)', notNull: true },
    duration: { type: 'integer' }, // in seconds
    genre: { type: 'varchar(100)' },
    release_year: { type: 'integer' },
    cover_url: { type: 'text' },
    audio_url: { type: 'text' },
    external_id: { type: 'varchar(255)' }, // Spotify/YouTube ID
    external_source: { type: 'varchar(50)' },
    metadata: { type: 'jsonb', default: "'{}'" },
    play_count: { type: 'integer', default: '0' },
    created_at: { type: 'timestamp', default: 'now()' },
    updated_at: { type: 'timestamp', default: 'now()' },
  },
  indexes: [
    { columns: ['title', 'artist'] },
    { columns: ['language'] },
    { columns: ['genre'] },
    { columns: ['external_id'], unique: true },
    { columns: ['play_count'] },
  ],
};

module.exports = songSchema;










