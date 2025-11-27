import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import ScreenShell, { SectionCard } from '../components/ui/ScreenShell';
import useTheme from '../hooks/useTheme';

const createStyles = (colors, spacing, radius) =>
  StyleSheet.create({
    editorLayout: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      width: '32%',
      borderRadius: radius,
      borderWidth: 1,
      borderColor: colors.muted + '33',
      padding: spacing(1.5),
      backgroundColor: colors.surface,
    },
    columnLabel: {
      fontSize: 12,
      color: colors.muted,
      textTransform: 'uppercase',
      marginBottom: spacing(1),
    },
    textarea: {
      minHeight: 140,
      color: colors.text,
      textAlignVertical: 'top',
    },
  });

const TranslationEditScreen = () => {
  const { colors, spacing, radius } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, spacing, radius), [colors, spacing, radius]);

  return (
    <ScreenShell title="Translation Editor" subtitle="Compare, edit, and annotate lines">
      <SectionCard title="Workspace" description="Use three panels to refine translations.">
        <View style={styles.editorLayout}>
          <View style={styles.column}>
            <Text style={styles.columnLabel}>Original</Text>
            <Text style={{ color: colors.text }}>Es la historia de un amor</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnLabel}>Your Translation</Text>
            <TextInput
              multiline
              placeholder="Type your version"
              placeholderTextColor={colors.muted}
              style={styles.textarea}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.columnLabel}>Notes</Text>
            <TextInput
              multiline
              placeholder="Grammar notes or reminders"
              placeholderTextColor={colors.muted}
              style={styles.textarea}
            />
          </View>
        </View>
      </SectionCard>
    </ScreenShell>
  );
};

export default TranslationEditScreen;
