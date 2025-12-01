import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const categories = ['Pop', 'Indie', 'Hip-Hop', 'Acoustic', 'Latin', 'K-Pop'];
const recommendations = [
  { title: 'Acoustic Sunrise', subtitle: 'Neutral Spanish â€¢ Slow Tempo' },
  { title: 'Paris Nights', subtitle: 'French Jazz â€¢ Intermediate' },
  { title: 'Tokyo Lights', subtitle: 'Japanese Pop â€¢ Beginner Friendly' },
];

const createStyles = (colors, spacing, radius) =>
  StyleSheet.create({
    input: {
      backgroundColor: colors.surface,
      borderRadius: radius,
      paddingHorizontal: spacing(2),
      paddingVertical: spacing(1.5),
      borderWidth: 1,
      borderColor: colors.muted + '40',
      color: colors.text,
      marginBottom: spacing(2),
    },
    filters: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: spacing(1),
    },
    filterPill: {
      paddingHorizontal: spacing(2),
      paddingVertical: spacing(1),
      borderRadius: radius,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.muted + '33',
      marginRight: spacing(1),
      marginBottom: spacing(1),
    },
    filterText: {
      color: colors.text,
      fontWeight: '600',
    },
    resultCard: {
      paddingVertical: spacing(1.5),
      borderBottomWidth: 1,
      borderBottomColor: colors.muted + '20',
    },
    resultTitle: {
      color: colors.text,
      fontWeight: '600',
    },
    resultSubtitle: {
      color: colors.muted,
      marginTop: 4,
    },
  });

const SearchScreen = () => {
  const { colors, spacing, radius } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing, radius), [colors, spacing, radius]);

  return (
    <ScreenShell title="Search" subtitle="Find songs, artists, and playlists">
      <SectionCard title="Search the catalog" description="Type to discover new lessons.">
        <TextInput
          placeholder="Search songs or artists"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <View style={styles.filters}>
          {categories.map((category) => (
            <TouchableOpacity key={category} style={styles.filterPill}>
              <Text style={styles.filterText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Featured results" description="Starter tracks tailored for new learners.">
        {recommendations.map((item) => (
          <View key={item.title} style={styles.resultCard}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </SectionCard>
    </ScreenShell>
  );
};

export default SearchScreen;
