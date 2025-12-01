/**
 * CourseCard Component
 * Displays learning course/lesson information
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const CourseCard = ({
  course,
  onPress,
  variant = 'default', // 'default', 'compact', 'featured'
}) => {
  const {
    title,
    description,
    image,
    language,
    level,
    duration,
    lessonsCount,
    progress = 0,
    isLocked = false,
  } = course || {};

  const getLevelColor = () => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return COLORS.accentMint;
      case 'intermediate':
        return COLORS.accentGold;
      case 'advanced':
        return COLORS.accent;
      default:
        return COLORS.primary;
    }
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={[styles.compactContainer, isLocked && styles.locked]}
        onPress={onPress}
        disabled={isLocked}
      >
        <View style={styles.compactLeft}>
          <View style={[styles.compactIcon, { backgroundColor: getLevelColor() + '20' }]}>
            <Ionicons name="school" size={20} color={getLevelColor()} />
          </View>
          <View style={styles.compactInfo}>
            <Text style={styles.compactTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.compactMeta}>
              {lessonsCount} lessons • {duration}
            </Text>
          </View>
        </View>
        {isLocked ? (
          <Ionicons name="lock-closed" size={20} color={COLORS.textTertiary} />
        ) : progress > 0 ? (
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, isLocked && styles.locked]}
      onPress={onPress}
      disabled={isLocked}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: getLevelColor() + '20' }]}>
            <Ionicons name="school" size={40} color={getLevelColor()} />
          </View>
        )}
        {isLocked && (
          <View style={styles.lockedOverlay}>
            <Ionicons name="lock-closed" size={32} color={COLORS.white} />
          </View>
        )}
        {level && (
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor() }]}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
        <View style={styles.meta}>
          {language && (
            <View style={styles.metaItem}>
              <Ionicons name="globe" size={14} color={COLORS.textTertiary} />
              <Text style={styles.metaText}>{language}</Text>
            </View>
          )}
          {lessonsCount && (
            <View style={styles.metaItem}>
              <Ionicons name="book" size={14} color={COLORS.textTertiary} />
              <Text style={styles.metaText}>{lessonsCount} lessons</Text>
            </View>
          )}
          {duration && (
            <View style={styles.metaItem}>
              <Ionicons name="time" size={14} color={COLORS.textTertiary} />
              <Text style={styles.metaText}>{duration}</Text>
            </View>
          )}
        </View>

        {/* Progress */}
        {progress > 0 && !isLocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressLabel}>{progress}% complete</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: LAYOUT.spacing.md,
  },
  locked: {
    opacity: 0.7,
  },
  imageContainer: {
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadge: {
    position: 'absolute',
    top: LAYOUT.spacing.sm,
    right: LAYOUT.spacing.sm,
    paddingHorizontal: LAYOUT.spacing.sm,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.sm,
  },
  levelText: {
    fontSize: LAYOUT.fontSize.xs,
    fontWeight: LAYOUT.fontWeight.semibold,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  content: {
    padding: LAYOUT.spacing.base,
  },
  title: {
    fontSize: LAYOUT.fontSize.lg,
    fontWeight: LAYOUT.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: LAYOUT.spacing.xs,
  },
  description: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: LAYOUT.spacing.md,
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: LAYOUT.spacing.md,
    marginBottom: LAYOUT.spacing.xs,
  },
  metaText: {
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.textTertiary,
    marginLeft: LAYOUT.spacing.xs,
  },
  progressContainer: {
    marginTop: LAYOUT.spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: LAYOUT.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressLabel: {
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.primary,
    marginTop: LAYOUT.spacing.xs,
  },
  // Compact variant
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.base,
    marginBottom: LAYOUT.spacing.sm,
  },
  compactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactIcon: {
    width: 44,
    height: 44,
    borderRadius: LAYOUT.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LAYOUT.spacing.md,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    fontSize: LAYOUT.fontSize.base,
    fontWeight: LAYOUT.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  compactMeta: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  progressCircle: {
    width: 36,
    height: 36,
    borderRadius: LAYOUT.borderRadius.full,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: LAYOUT.fontSize.xs,
    fontWeight: LAYOUT.fontWeight.semibold,
    color: COLORS.primary,
  },
});

export default CourseCard;




