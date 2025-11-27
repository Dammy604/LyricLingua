/**
 * Lyrics Model
 */

const lyricsSchema = {
  tableName: 'lyrics',
  columns: {
    id: { type: 'uuid', primaryKey: true, default: 'uuid_generate_v4()' },
    song_id: { type: 'uuid', notNull: true, references: 'songs(id)' },
    plain_text: { type: 'text', notNull: true },
    synced_lrc: { type: 'text' }, // LRC format
    synced_json: { type: 'jsonb' }, // Parsed synced lyrics
    language: { type: 'varchar(5)', notNull: true },
    source: { type: 'varchar(50)' }, // 'manual', 'api', 'community'
    is_verified: { type: 'boolean', default: 'false' },
    submitted_by: { type: 'uuid', references: 'users(id)' },
    created_at: { type: 'timestamp', default: 'now()' },
    updated_at: { type: 'timestamp', default: 'now()' },
  },
  indexes: [
    { columns: ['song_id'] },
    { columns: ['language'] },
    { columns: ['is_verified'] },
  ],
};

module.exports = lyricsSchema;







