import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const stats = [
  { label: 'Songs Completed', value: '0' },
  { label: 'Words Learned', value: '0' },
  { label: 'Day Streak', value: '0' },
];

const createStyles = (colors, spacing, radius) =>
  StyleSheet.create({
    avatar: {
      width: 72,
      height: 72,
      borderRadius: radius * 2,
      backgroundColor: colors.primary + '33',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing(1),
    },
    avatarInitial: {
      fontSize: 32,
      color: colors.primary,
      fontWeight: '700',
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing(1.5),
    },
    statLabel: {
      color: colors.muted,
    },
    statValue: {
      color: colors.text,
      fontWeight: '700',
    },
  });

const ProfileScreen = () => {
  const { colors, spacing, radius } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing, radius), [colors, spacing, radius]);

  return (
    <ScreenShell title="Profile" subtitle="Personal progress overview">
      <SectionCard title="Account">
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>LL</Text>
        </View>
        <Text style={{ color: colors.text, fontWeight: '700', fontSize: 18 }}>Lyric Learner</Text>
        <Text style={{ color: colors.muted, marginTop: 4 }}>lyric@example.com</Text>
      </SectionCard>

      <SectionCard title="Progress" description="Key stats update automatically as you learn.">
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statRow}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </SectionCard>
    </ScreenShell>
  );
};

export default ProfileScreen;
