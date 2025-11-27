/**
 * TranslationToggle Component
 * Toggle between different lyric display modes
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const TranslationToggle = ({
  mode = 'dual', // 'original', 'translation', 'dual'
  onModeChange,
  sourceLanguage = 'Original',
  targetLanguage = 'Translation',
}) => {
  const modes = [
    { key: 'original', label: sourceLanguage },
    { key: 'dual', label: 'Both' },
    { key: 'translation', label: targetLanguage },
  ];

  return (
    <View style={styles.container}>
      {modes.map((m) => (
        <TouchableOpacity
          key={m.key}
          style={[styles.option, mode === m.key && styles.optionActive]}
          onPress={() => onModeChange?.(m.key)}
        >
          <Text style={[styles.label, mode === m.key && styles.labelActive]}>
            {m.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.xs,
  },
  option: {
    flex: 1,
    paddingVertical: LAYOUT.spacing.sm,
    paddingHorizontal: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.md,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: LAYOUT.fontSize.sm,
    fontWeight: LAYOUT.fontWeight.medium,
    color: COLORS.textSecondary,
  },
  labelActive: {
    color: COLORS.white,
  },
});

export default TranslationToggle;




