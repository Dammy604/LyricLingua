/**
 * Learning Progress Model
 */

const learningProgressSchema = {
  tableName: 'learning_progress',
  columns: {
    id: { type: 'uuid', primaryKey: true, default: 'uuid_generate_v4()' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)' },
    song_id: { type: 'uuid', notNull: true, references: 'songs(id)' },
    progress_percent: { type: 'integer', default: '0' },
    words_learned: { type: 'jsonb', default: "'[]'" },
    time_spent: { type: 'integer', default: '0' }, // in seconds
    last_position: { type: 'integer', default: '0' }, // last playback position
    play_count: { type: 'integer', default: '0' },
    completed: { type: 'boolean', default: 'false' },
    completed_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: 'now()' },
    updated_at: { type: 'timestamp', default: 'now()' },
  },
  indexes: [
    { columns: ['user_id', 'song_id'], unique: true },
    { columns: ['user_id'] },
    { columns: ['completed'] },
    { columns: ['updated_at'] },
  ],
};

module.exports = learningProgressSchema;










