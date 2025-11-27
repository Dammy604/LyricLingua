/**
 * SocialFeed Component
 * Community activity feed
 */

import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native';
import PostCard from '../ui/PostCard';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const SocialFeed = ({
  posts = [],
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  onLoadMore,
  onPostPress,
  onLikePress,
  onCommentPress,
  onSharePress,
  onAuthorPress,
  ListEmptyComponent,
  ListHeaderComponent,
}) => {
  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onPress={() => onPostPress?.(item)}
      onLikePress={() => onLikePress?.(item)}
      onCommentPress={() => onCommentPress?.(item)}
      onSharePress={() => onSharePress?.(item)}
      onAuthorPress={onAuthorPress}
    />
  );

  const defaultEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No posts yet</Text>
      <Text style={styles.emptySubtext}>Be the first to share something!</Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.primary}
          colors={[COLORS.primary]}
        />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={ListEmptyComponent || defaultEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: LAYOUT.spacing.base,
    paddingBottom: LAYOUT.spacing['4xl'],
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing['4xl'],
  },
  emptyText: {
    fontSize: LAYOUT.fontSize.lg,
    fontWeight: LAYOUT.fontWeight.semibold,
    color: COLORS.textSecondary,
  },
  emptySubtext: {
    fontSize: LAYOUT.fontSize.md,
    color: COLORS.textTertiary,
    marginTop: LAYOUT.spacing.sm,
  },
});

export default SocialFeed;




