import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const collections = [
  { title: 'Warmup Playlist', detail: '5 songs â€¢ Beginner' },
  { title: 'Verb Drills', detail: '8 songs â€¢ Intermediate' },
  { title: 'Story Mode', detail: '4 songs â€¢ Narrative' },
  { title: 'Community Picks', detail: '10 songs â€¢ Mixed' },
];

const createStyles = (colors, spacing, radius) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      backgroundColor: colors.surface,
      borderRadius: radius,
      padding: spacing(2),
      marginBottom: spacing(2),
      borderWidth: 1,
      borderColor: colors.muted + '33',
    },
    cardTitle: {
      color: colors.text,
      fontWeight: '600',
      marginBottom: spacing(0.5),
    },
    cardDetail: {
      color: colors.muted,
    },
  });

const LibraryScreen = () => {
  const { colors, spacing, radius } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing, radius), [colors, spacing, radius]);

  return (
    <ScreenShell title="Library" subtitle="Saved lessons and personal playlists">
      <SectionCard title="Collections" description="Organize lessons into repeatable sets.">
        <View style={styles.grid}>
          {collections.map((entry) => (
            <View key={entry.title} style={styles.card}>
              <Text style={styles.cardTitle}>{entry.title}</Text>
              <Text style={styles.cardDetail}>{entry.detail}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScreenShell>
  );
};

export default LibraryScreen;
