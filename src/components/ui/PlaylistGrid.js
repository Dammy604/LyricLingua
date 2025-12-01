/**
 * PlaylistGrid Component
 * Displays playlists in a grid layout
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const PlaylistCard = ({ playlist, onPress }) => {
  const { name, songCount, coverImages, color } = playlist;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.cover, { backgroundColor: color || COLORS.surfaceLight }]}>
        {coverImages && coverImages.length > 0 ? (
          <View style={styles.coverGrid}>
            {coverImages.slice(0, 4).map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={[
                  styles.coverImage,
                  coverImages.length === 1 && styles.singleImage,
                ]}
              />
            ))}
          </View>
        ) : (
          <Ionicons name="musical-notes" size={32} color={COLORS.textTertiary} />
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.count}>
        {songCount} {songCount === 1 ? 'song' : 'songs'}
      </Text>
    </TouchableOpacity>
  );
};

const PlaylistGrid = ({
  playlists = [],
  onPlaylistPress,
  onCreatePress,
  showCreateButton = true,
  numColumns = 2,
}) => {
  const renderItem = ({ item }) => (
    <PlaylistCard
      playlist={item}
      onPress={() => onPlaylistPress?.(item)}
    />
  );

  const renderCreateButton = () => (
    <TouchableOpacity style={styles.createCard} onPress={onCreatePress}>
      <View style={styles.createIcon}>
        <Ionicons name="add" size={32} color={COLORS.primary} />
      </View>
      <Text style={styles.createText}>Create Playlist</Text>
    </TouchableOpacity>
  );

  const data = showCreateButton
    ? [{ id: 'create', isCreate: true }, ...playlists]
    : playlists;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        item.isCreate ? renderCreateButton() : renderItem({ item })
      }
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: LAYOUT.spacing.sm,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: LAYOUT.spacing.md,
  },
  card: {
    width: '48%',
  },
  cover: {
    aspectRatio: 1,
    borderRadius: LAYOUT.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: LAYOUT.spacing.sm,
  },
  coverGrid: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  coverImage: {
    width: '50%',
    height: '50%',
  },
  singleImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: LAYOUT.fontSize.base,
    fontWeight: LAYOUT.fontWeight.medium,
    color: COLORS.textPrimary,
  },
  count: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  createCard: {
    width: '48%',
  },
  createIcon: {
    aspectRatio: 1,
    borderRadius: LAYOUT.borderRadius.lg,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    marginBottom: LAYOUT.spacing.sm,
  },
  createText: {
    fontSize: LAYOUT.fontSize.base,
    fontWeight: LAYOUT.fontWeight.medium,
    color: COLORS.primary,
  },
});

export default PlaylistGrid;




