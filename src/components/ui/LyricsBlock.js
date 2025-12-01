/**
 * LyricsBlock Component
 * Displays a single lyric line with optional translation
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import useTheme from '../../hooks/useTheme';

const LyricsBlock = ({ line, translation, isActive }) => {
  const { colors, spacing } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingVertical: spacing(1),
          paddingHorizontal: spacing(1.5),
          borderRadius: spacing(1),
          backgroundColor: isActive ? colors.surface : 'transparent',
        },
        text: {
          color: isActive ? colors.text : colors.muted,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: isActive ? '700' : '500',
        },
        translation: {
          color: colors.muted,
          textAlign: 'center',
          marginTop: spacing(0.3),
          fontSize: 14,
          fontStyle: 'italic',
        },
        indicator: {
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.primary,
          alignSelf: 'center',
          marginTop: spacing(0.5),
          opacity: isActive ? 1 : 0,
        },
      }),
    [colors, isActive, spacing],
  );

  if (!line) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{line.text}</Text>
      {translation && <Text style={styles.translation}>{translation}</Text>}
      <View style={styles.indicator} />
    </View>
  );
};

export default LyricsBlock;




