/**
 * CulturalNotes Component
 * Display and add cultural context notes
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const NoteCard = ({ note, onUpvote, onDownvote }) => {
  const { content, author, timestamp, upvotes = 0, isUpvoted } = note;

  return (
    <View style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <Ionicons name="bulb" size={18} color={COLORS.accentGold} />
        <Text style={styles.noteAuthor}>{author?.name || 'Anonymous'}</Text>
        <Text style={styles.noteTime}>{timestamp}</Text>
      </View>
      <Text style={styles.noteContent}>{content}</Text>
      <View style={styles.noteActions}>
        <TouchableOpacity
          style={styles.voteButton}
          onPress={onUpvote}
        >
          <Ionicons
            name={isUpvoted ? 'thumbs-up' : 'thumbs-up-outline'}
            size={16}
            color={isUpvoted ? COLORS.primary : COLORS.textSecondary}
          />
          <Text style={[styles.voteCount, isUpvoted && styles.votedText]}>
            {upvotes}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CulturalNotes = ({
  notes = [],
  onAddNote,
  onUpvote,
  onDownvote,
}) => {
  const renderNote = ({ item }) => (
    <NoteCard
      note={item}
      onUpvote={() => onUpvote?.(item)}
      onDownvote={() => onDownvote?.(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="bulb" size={20} color={COLORS.accentGold} />
          <Text style={styles.title}>Cultural Notes</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddNote}>
          <Ionicons name="add" size={20} color={COLORS.primary} />
          <Text style={styles.addText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      {notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="bulb-outline" size={32} color={COLORS.textTertiary} />
          <Text style={styles.emptyText}>
            No cultural notes yet. Be the first to share insights!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.base,
    marginVertical: LAYOUT.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: LAYOUT.fontSize.lg,
    fontWeight: LAYOUT.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginLeft: LAYOUT.spacing.sm,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.md,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.md,
    backgroundColor: COLORS.primary + '20',
  },
  addText: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.primary,
    fontWeight: LAYOUT.fontWeight.medium,
    marginLeft: LAYOUT.spacing.xs,
  },
  noteCard: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: LAYOUT.borderRadius.md,
    padding: LAYOUT.spacing.md,
    marginBottom: LAYOUT.spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accentGold,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.sm,
  },
  noteAuthor: {
    fontSize: LAYOUT.fontSize.sm,
    fontWeight: LAYOUT.fontWeight.medium,
    color: COLORS.textPrimary,
    marginLeft: LAYOUT.spacing.sm,
    flex: 1,
  },
  noteTime: {
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.textTertiary,
  },
  noteContent: {
    fontSize: LAYOUT.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  noteActions: {
    flexDirection: 'row',
    marginTop: LAYOUT.spacing.sm,
    paddingTop: LAYOUT.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteCount: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.textSecondary,
    marginLeft: LAYOUT.spacing.xs,
  },
  votedText: {
    color: COLORS.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing.xl,
  },
  emptyText: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginTop: LAYOUT.spacing.sm,
  },
});

export default CulturalNotes;




