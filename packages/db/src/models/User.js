/**
 * User Model
 */

const userSchema = {
  tableName: 'users',
  columns: {
    id: { type: 'uuid', primaryKey: true, default: 'uuid_generate_v4()' },
    email: { type: 'varchar(255)', unique: true, notNull: true },
    password_hash: { type: 'varchar(255)', notNull: true },
    name: { type: 'varchar(255)', notNull: true },
    avatar: { type: 'text' },
    native_language: { type: 'varchar(5)', default: "'en'" },
    learning_languages: { type: 'jsonb', default: "'[]'" },
    preferences: { type: 'jsonb', default: "'{}'" },
    is_verified: { type: 'boolean', default: 'false' },
    role: { type: 'varchar(20)', default: "'user'" },
    created_at: { type: 'timestamp', default: 'now()' },
    updated_at: { type: 'timestamp', default: 'now()' },
  },
  indexes: [
    { columns: ['email'], unique: true },
    { columns: ['created_at'] },
  ],
};

module.exports = userSchema;







