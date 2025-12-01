import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const activities = [
  { user: 'Mira', action: 'shared a translation for', track: 'CafÃ© au Lait' },
  { user: 'Leo', action: 'commented on', track: 'Sakura Bloom' },
  { user: 'Ada', action: 'created a lesson for', track: 'Desierto Azul' },
];

const createStyles = (colors, spacing) =>
  StyleSheet.create({
    activityRow: {
      paddingVertical: spacing(1.5),
      borderBottomWidth: 1,
      borderBottomColor: colors.muted + '20',
    },
    user: {
      color: colors.text,
      fontWeight: '600',
    },
    action: {
      color: colors.muted,
      marginTop: 4,
    },
  });

const CommunityScreen = () => {
  const { colors, spacing } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing), [colors, spacing]);

  return (
    <ScreenShell title="Community" subtitle="Connect with other learners">
      <SectionCard title="Activity feed" description="Stay up to date with collaborative work.">
        {activities.map((item) => (
          <View key={item.track} style={styles.activityRow}>
            <Text style={styles.user}>{item.user}</Text>
            <Text style={styles.action}>
              {item.action} <Text style={{ color: colors.text }}>{item.track}</Text>
            </Text>
          </View>
        ))}
      </SectionCard>
    </ScreenShell>
  );
};

export default CommunityScreen;
