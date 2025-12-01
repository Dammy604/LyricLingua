/**
 * Community Post Model
 */

const communityPostSchema = {
  tableName: 'community_posts',
  columns: {
    id: { type: 'uuid', primaryKey: true, default: 'uuid_generate_v4()' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)' },
    type: { type: 'varchar(20)', notNull: true }, // 'post', 'translation', 'note'
    content: { type: 'text', notNull: true },
    song_id: { type: 'uuid', references: 'songs(id)' },
    translation_id: { type: 'uuid', references: 'translations(id)' },
    likes: { type: 'integer', default: '0' },
    comments_count: { type: 'integer', default: '0' },
    is_pinned: { type: 'boolean', default: 'false' },
    is_hidden: { type: 'boolean', default: 'false' },
    created_at: { type: 'timestamp', default: 'now()' },
    updated_at: { type: 'timestamp', default: 'now()' },
  },
  indexes: [
    { columns: ['user_id'] },
    { columns: ['type'] },
    { columns: ['song_id'] },
    { columns: ['created_at'] },
    { columns: ['likes'] },
  ],
};

module.exports = communityPostSchema;










