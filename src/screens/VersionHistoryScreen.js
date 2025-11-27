import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const history = [
  { timestamp: 'Nov 1', detail: 'Created first draft translation' },
  { timestamp: 'Nov 5', detail: 'Added vocabulary annotations' },
  { timestamp: 'Nov 12', detail: 'Peer review by Community' },
];

const createStyles = (colors, spacing) =>
  StyleSheet.create({
    entry: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: spacing(2),
    },
    marker: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.accent,
      marginTop: spacing(0.5),
      marginRight: spacing(2),
    },
    textBlock: {
      flex: 1,
    },
    timestamp: {
      color: colors.muted,
      marginBottom: 4,
    },
    detail: {
      color: colors.text,
    },
    line: {
      position: 'absolute',
      left: 6,
      top: 0,
      bottom: 0,
      width: 2,
      backgroundColor: colors.muted + '33',
    },
  });

const VersionHistoryScreen = () => {
  const { colors, spacing } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing), [colors, spacing]);

  return (
    <ScreenShell title="Version History" subtitle="Timeline of translation updates">
      <SectionCard title="Timeline" description="Track every edit and review.">
        <View style={{ position: 'relative', paddingLeft: 0 }}>
          <View style={styles.line} />
          {history.map((item) => (
            <View key={item.timestamp} style={styles.entry}>
              <View style={styles.marker} />
              <View style={styles.textBlock}>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
                <Text style={styles.detail}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScreenShell>
  );
};

export default VersionHistoryScreen;
