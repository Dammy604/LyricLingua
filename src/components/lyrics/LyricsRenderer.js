/**
 * LyricsRenderer Component
 * Renders synchronized lyrics with karaoke-style highlighting
 */

import React, { useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import LyricsBlock from '../ui/LyricsBlock';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const LyricsRenderer = ({
  lyrics = [],
  translations = [],
  currentTime = 0,
  showTranslation = true,
  showRomanization = true,
  fontSize = 'medium',
  onLinePress,
  autoScroll = true,
}) => {
  const scrollViewRef = useRef(null);
  const lineRefs = useRef({});

  // Find current line based on timestamp
  const currentLineIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    const startTime = line.time || 0;
    const endTime = nextLine?.time || Infinity;
    return currentTime >= startTime && currentTime < endTime;
  });

  // Auto-scroll to current line
  useEffect(() => {
    if (autoScroll && currentLineIndex >= 0 && scrollViewRef.current) {
      // Calculate approximate scroll position
      const lineHeight = 80; // Approximate height of each line
      const scrollY = currentLineIndex * lineHeight - LAYOUT.screen.height / 3;
      
      scrollViewRef.current.scrollTo({
        y: Math.max(0, scrollY),
        animated: true,
      });
    }
  }, [currentLineIndex, autoScroll]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {lyrics.map((line, index) => (
        <LyricsBlock
          key={index}
          original={line.text}
          translation={translations[index]?.text}
          romanization={line.romanization}
          isActive={index === currentLineIndex}
          showTranslation={showTranslation}
          showRomanization={showRomanization}
          fontSize={fontSize}
          onPress={() => onLinePress?.(line, index)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: LAYOUT.spacing['3xl'],
  },
});

export default LyricsRenderer;




