import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useTheme from '../../hooks/useTheme';

const ScreenShell = ({ title, subtitle, children }) => {
  const { colors, spacing } = useTheme();
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: colors.background,
        },
        scrollView: {
          flex: 1,
        },
        content: {
          paddingHorizontal: spacing(2),
          paddingVertical: spacing(3),
        },
        header: {
          marginBottom: spacing(3),
        },
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: colors.text,
        },
        subtitle: {
          fontSize: 16,
          color: colors.muted,
        },
      }),
    [colors, spacing],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export const SectionCard = ({ title, description, children }) => {
  const { colors, spacing, radius } = useTheme();
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.surface,
          padding: spacing(2),
          borderRadius: radius,
          marginBottom: spacing(2),
          borderWidth: 1,
          borderColor: colors.muted + '40',
        },
        title: {
          fontSize: 18,
          fontWeight: '600',
          color: colors.text,
          marginBottom: spacing(1),
        },
        description: {
          color: colors.muted,
          marginBottom: spacing(1),
        },
        descriptionFlush: {
          marginBottom: 0,
        },
      }),
    [colors, spacing, radius],
  );

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? (
        <Text style={[styles.description, !children && styles.descriptionFlush]}>{description}</Text>
      ) : null}
      {children}
    </View>
  );
};

export default ScreenShell;

