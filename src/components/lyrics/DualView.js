/**
 * DualView Component
 * Side-by-side or stacked original/translation view
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const DualView = ({
  originalText = '',
  translatedText = '',
  romanization = '',
  layout = 'stacked', // 'stacked', 'side-by-side'
  fontSize = 'medium',
  isActive = false,
}) => {
  const fontSizeMap = {
    small: LAYOUT.fontSize.base,
    medium: LAYOUT.fontSize.lg,
    large: LAYOUT.fontSize.xl,
  };

  const baseFontSize = fontSizeMap[fontSize] || fontSizeMap.medium;

  if (layout === 'side-by-side') {
    return (
      <View style={[styles.sideBySideContainer, isActive && styles.activeContainer]}>
        <View style={styles.column}>
          <Text style={[styles.originalText, { fontSize: baseFontSize }]}>
            {originalText}
          </Text>
          {romanization && (
            <Text style={styles.romanization}>{romanization}</Text>
          )}
        </View>
        <View style={styles.divider} />
        <View style={styles.column}>
          <Text style={[styles.translatedText, { fontSize: baseFontSize - 2 }]}>
            {translatedText}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.stackedContainer, isActive && styles.activeContainer]}>
      <Text style={[styles.originalText, { fontSize: baseFontSize }, isActive && styles.activeText]}>
        {originalText}
      </Text>
      {romanization && (
        <Text style={styles.romanization}>{romanization}</Text>
      )}
      {translatedText && (
        <Text style={[styles.translatedText, { fontSize: baseFontSize - 2 }]}>
          {translatedText}
        </Text>
      )}
      {isActive && <View style={styles.activeIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  stackedContainer: {
    paddingVertical: LAYOUT.spacing.md,
    paddingHorizontal: LAYOUT.spacing.base,
    marginVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.md,
    position: 'relative',
  },
  sideBySideContainer: {
    flexDirection: 'row',
    paddingVertical: LAYOUT.spacing.md,
    paddingHorizontal: LAYOUT.spacing.base,
    marginVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.md,
  },
  activeContainer: {
    backgroundColor: COLORS.primary + '15',
  },
  column: {
    flex: 1,
    paddingHorizontal: LAYOUT.spacing.sm,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: LAYOUT.spacing.sm,
  },
  originalText: {
    color: COLORS.textSecondary,
    fontWeight: LAYOUT.fontWeight.medium,
    textAlign: 'center',
    lineHeight: 28,
  },
  activeText: {
    color: COLORS.textPrimary,
    fontWeight: LAYOUT.fontWeight.semibold,
  },
  romanization: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
    marginTop: LAYOUT.spacing.xs,
    textAlign: 'center',
  },
  translatedText: {
    color: COLORS.primary,
    marginTop: LAYOUT.spacing.sm,
    textAlign: 'center',
    lineHeight: 24,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: '50%',
    marginTop: -8,
    width: 4,
    height: 16,
    backgroundColor: COLORS.primary,
    borderRadius: LAYOUT.borderRadius.full,
  },
});

export default DualView;




