import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const modules = [
  { title: 'Pronunciation Lab', lessons: 6 },
  { title: 'Grammar Mini', lessons: 4 },
  { title: 'Culture Capsules', lessons: 5 },
  { title: 'Challenge Mode', lessons: 3 },
];

const createStyles = (colors, spacing, radius) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    moduleCard: {
      width: '48%',
      backgroundColor: colors.surface,
      padding: spacing(2),
      borderRadius: radius,
      marginBottom: spacing(2),
      borderWidth: 1,
      borderColor: colors.muted + '33',
    },
    moduleTitle: {
      color: colors.text,
      fontWeight: '700',
      marginBottom: spacing(0.5),
    },
    moduleMeta: {
      color: colors.muted,
    },
  });

const LearnScreen = () => {
  const { colors, spacing, radius } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing, radius), [colors, spacing, radius]);

  return (
    <ScreenShell title="Learn" subtitle="Build skills with structured sessions">
      <SectionCard title="Modules" description="Pick a focus area for today's practice.">
        <View style={styles.grid}>
          {modules.map((module) => (
            <View key={module.title} style={styles.moduleCard}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleMeta}>{module.lessons} lessons</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </ScreenShell>
  );
};

export default LearnScreen;
