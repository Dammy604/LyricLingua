/**
 * PostCard Component
 * Displays community posts
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const PostCard = ({
  post,
  onPress,
  onLikePress,
  onCommentPress,
  onSharePress,
  onAuthorPress,
}) => {
  const {
    author,
    content,
    timestamp,
    likes = 0,
    comments = 0,
    isLiked = false,
    type = 'post', // 'post', 'translation', 'note'
  } = post || {};

  const getTypeIcon = () => {
    switch (type) {
      case 'translation':
        return 'language';
      case 'note':
        return 'bulb';
      default:
        return 'chatbubble';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'translation':
        return COLORS.primary;
      case 'note':
        return COLORS.accentGold;
      default:
        return COLORS.secondary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.authorContainer}
          onPress={() => onAuthorPress?.(author)}
        >
          <View style={styles.avatar}>
            {author?.avatar ? (
              <Image source={{ uri: author.avatar }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={18} color={COLORS.textTertiary} />
            )}
          </View>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{author?.name || 'Anonymous'}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor() + '20' }]}>
          <Ionicons name={getTypeIcon()} size={14} color={getTypeColor()} />
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content} numberOfLines={4}>
        {content}
      </Text>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onLikePress}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={isLiked ? COLORS.accent : COLORS.textSecondary}
          />
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
          <Ionicons name="chatbubble-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
          <Ionicons name="share-outline" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.base,
    marginBottom: LAYOUT.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: LAYOUT.spacing.md,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: LAYOUT.borderRadius.full,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LAYOUT.spacing.md,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: LAYOUT.borderRadius.full,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: LAYOUT.fontSize.base,
    fontWeight: LAYOUT.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  typeBadge: {
    width: 28,
    height: 28,
    borderRadius: LAYOUT.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: LAYOUT.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: LAYOUT.spacing.md,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: LAYOUT.spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: LAYOUT.spacing.xl,
  },
  actionText: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.textSecondary,
    marginLeft: LAYOUT.spacing.xs,
  },
  likedText: {
    color: COLORS.accent,
  },
});

export default PostCard;




