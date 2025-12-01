/**
 * SongCard Component
 * Displays song information in a card format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const SongCard = ({
  song,
  onPress,
  onPlayPress,
  showProgress = false,
  variant = 'default', // 'default', 'compact', 'large'
}) => {
  const { title, artist, albumArt, language, duration, progress } = song || {};

  if (variant === 'compact') {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={onPress}>
        <View style={styles.compactAlbumArt}>
          {albumArt ? (
            <Image source={{ uri: albumArt }} style={styles.compactImage} />
          ) : (
            <Ionicons name="musical-notes" size={20} color={COLORS.primary} />
          )}
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {title || 'Unknown Song'}
          </Text>
          <Text style={styles.compactArtist} numberOfLines={1}>
            {artist || 'Unknown Artist'}
          </Text>
        </View>
        <TouchableOpacity style={styles.compactPlayButton} onPress={onPlayPress}>
          <Ionicons name="play" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.albumArt}>
        {albumArt ? (
          <Image source={{ uri: albumArt }} style={styles.image} />
        ) : (
          <Ionicons name="musical-notes" size={32} color={COLORS.primary} />
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {title || 'Unknown Song'}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {artist || 'Unknown Artist'}
          </Text>
          <View style={styles.meta}>
            {language && (
              <View style={styles.languageBadge}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
            )}
            {duration && (
              <Text style={styles.duration}>{duration}</Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity style={styles.playButton} onPress={onPlayPress}>
          <Ionicons name="play-circle" size={44} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {showProgress && progress !== undefined && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}% learned</Text>
        </View>
      )}
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
  albumArt: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flexDirection: 'row',
    padding: LAYOUT.spacing.base,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: LAYOUT.fontSize.lg,
    fontWeight: LAYOUT.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  artist: {
    fontSize: LAYOUT.fontSize.md,
    color: COLORS.textSecondary,
    marginTop: LAYOUT.spacing.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: LAYOUT.spacing.sm,
  },
  languageBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: LAYOUT.spacing.sm,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.sm,
    marginRight: LAYOUT.spacing.sm,
  },
  languageText: {
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.primary,
    fontWeight: LAYOUT.fontWeight.medium,
  },
  duration: {
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.textTertiary,
  },
  playButton: {
    justifyContent: 'center',
    paddingLeft: LAYOUT.spacing.md,
  },
  progressContainer: {
    paddingHorizontal: LAYOUT.spacing.base,
    paddingBottom: LAYOUT.spacing.base,
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
  progressText: {
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.textTertiary,
    marginTop: LAYOUT.spacing.xs,
  },
  // Compact variant
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.md,
    padding: LAYOUT.spacing.sm,
    marginBottom: LAYOUT.spacing.sm,
  },
  compactAlbumArt: {
    width: 48,
    height: 48,
    borderRadius: LAYOUT.borderRadius.sm,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LAYOUT.spacing.md,
  },
  compactImage: {
    width: '100%',
    height: '100%',
    borderRadius: LAYOUT.borderRadius.sm,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    fontSize: LAYOUT.fontSize.base,
    fontWeight: LAYOUT.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  compactArtist: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  compactPlayButton: {
    padding: LAYOUT.spacing.sm,
  },
});

export default SongCard;




