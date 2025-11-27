/**
 * ProgressBar Component
 * Displays progress with optional time labels
 */

import React from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

import useTheme from '../../hooks/useTheme';

const formatTime = (millis = 0) => {
  const totalSeconds = Math.floor(millis / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const ProgressBar = ({ currentTime = 0, duration = 0, onSeek }) => {
  const { colors, spacing } = useTheme();
  const [barWidth, setBarWidth] = React.useState(0);
  const [isSeeking, setIsSeeking] = React.useState(false);
  const pendingSeek = React.useRef(currentTime);

  React.useEffect(() => {
    if (!isSeeking) {
      pendingSeek.current = currentTime;
    }
  }, [currentTime, isSeeking]);

  const progress = duration ? clamp(currentTime / duration, 0, 1) : 0;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
        },
        bar: {
          width: '100%',
          height: 6,
          borderRadius: 999,
          backgroundColor: colors.muted + '40',
          overflow: 'hidden',
        },
        fill: {
          height: '100%',
          backgroundColor: colors.primary,
        },
        thumb: {
          position: 'absolute',
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: colors.primary,
          top: -4,
        },
        timeRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: spacing(0.5),
        },
        timeText: {
          color: colors.muted,
          fontSize: 12,
        },
      }),
    [colors, spacing],
  );

  const seekFromOffset = React.useCallback(
    (offset) => {
      if (!duration || barWidth === 0) return;
      const ratio = clamp(offset / barWidth, 0, 1);
      pendingSeek.current = ratio * duration;
    },
    [barWidth, duration],
  );

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          setIsSeeking(true);
          seekFromOffset(evt.nativeEvent.locationX);
        },
        onPanResponderMove: (evt) => {
          seekFromOffset(evt.nativeEvent.locationX);
        },
        onPanResponderRelease: () => {
          setIsSeeking(false);
          onSeek?.(pendingSeek.current);
        },
        onPanResponderTerminate: () => {
          setIsSeeking(false);
        },
      }),
    [onSeek, seekFromOffset],
  );

  const effectiveProgress = isSeeking && duration ? pendingSeek.current / duration : progress;
  const thumbLeft = clamp(effectiveProgress, 0, 1) * barWidth - 7;

  return (
    <View style={styles.container}>
      <View
        style={styles.bar}
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
        {...panResponder.panHandlers}
      >
        <View style={[styles.fill, { width: `${effectiveProgress * 100}%` }]} />
        <View style={[styles.thumb, { left: thumbLeft }]} />
      </View>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(isSeeking ? pendingSeek.current : currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;




