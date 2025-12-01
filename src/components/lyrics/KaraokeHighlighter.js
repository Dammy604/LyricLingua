/**
 * KaraokeHighlighter Component
 * Word-by-word karaoke highlighting effect
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const KaraokeHighlighter = ({
  text = '',
  words = [],
  currentTime = 0,
  activeColor = COLORS.primary,
  inactiveColor = COLORS.textSecondary,
  fontSize = LAYOUT.fontSize.lg,
}) => {
  // Parse words with timing or split by space
  const parsedWords = words.length > 0
    ? words
    : text.split(' ').map((word, i, arr) => ({
        text: word,
        startTime: 0,
        endTime: 0,
      }));

  return (
    <View style={styles.container}>
      {parsedWords.map((word, index) => {
        const isActive = currentTime >= word.startTime && currentTime < word.endTime;
        const isPast = currentTime >= word.endTime;
        
        return (
          <Text
            key={index}
            style={[
              styles.word,
              { fontSize },
              {
                color: isActive || isPast ? activeColor : inactiveColor,
                fontWeight: isActive ? LAYOUT.fontWeight.bold : LAYOUT.fontWeight.medium,
              },
            ]}
          >
            {word.text}{' '}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    lineHeight: 32,
  },
});

export default KaraokeHighlighter;




