import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const settingsOptions = [
  { label: 'Offline downloads', description: 'Save lessons for travel', toggle: true },
  { label: 'Daily reminders', description: 'Stay on track with nudges', toggle: true },
  { label: 'Experimental features', description: 'Try beta learning modes', toggle: false },
];

const createStyles = (colors, spacing) =>
  StyleSheet.create({
    optionRow: {
      paddingVertical: spacing(1.5),
      borderBottomWidth: 1,
      borderBottomColor: colors.muted + '20',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    optionText: {
      flex: 1,
      marginRight: spacing(2),
    },
    label: {
      color: colors.text,
      fontWeight: '600',
    },
    description: {
      color: colors.muted,
      marginTop: 4,
    },
  });

const SettingsScreen = () => {
  const { colors, spacing } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing), [colors, spacing]);

  return (
    <ScreenShell title="Settings" subtitle="Configure LyricLingua to your liking">
      <SectionCard title="Preferences">
        {settingsOptions.map((option) => (
          <View key={option.label} style={styles.optionRow}>
            <View style={styles.optionText}>
              <Text style={styles.label}>{option.label}</Text>
              <Text style={styles.description}>{option.description}</Text>
            </View>
            {option.toggle ? (
              <Switch
                value={false}
                trackColor={{ false: colors.muted + '40', true: colors.primary }}
                thumbColor={colors.text}
              />
            ) : null}
          </View>
        ))}
      </SectionCard>
    </ScreenShell>
  );
};

export default SettingsScreen;
