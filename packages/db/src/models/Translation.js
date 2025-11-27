/**
 * Translation Model
 */

const translationSchema = {
  tableName: 'translations',
  columns: {
    id: { type: 'uuid', primaryKey: true, default: 'uuid_generate_v4()' },
    lyrics_id: { type: 'uuid', notNull: true, references: 'lyrics(id)' },
    target_language: { type: 'varchar(5)', notNull: true },
    translated_text: { type: 'text', notNull: true },
    synced_json: { type: 'jsonb' }, // Line-by-line translation
    source: { type: 'varchar(50)', notNull: true }, // 'google', 'deepl', 'community'
    is_verified: { type: 'boolean', default: 'false' },
    upvotes: { type: 'integer', default: '0' },
    downvotes: { type: 'integer', default: '0' },
    submitted_by: { type: 'uuid', references: 'users(id)' },
    parent_id: { type: 'uuid', references: 'translations(id)' }, // For version history
    notes: { type: 'text' }, // Cultural notes
    created_at: { type: 'timestamp', default: 'now()' },
    updated_at: { type: 'timestamp', default: 'now()' },
  },
  indexes: [
    { columns: ['lyrics_id', 'target_language'] },
    { columns: ['is_verified'] },
    { columns: ['upvotes'] },
    { columns: ['submitted_by'] },
  ],
};

module.exports = translationSchema;







