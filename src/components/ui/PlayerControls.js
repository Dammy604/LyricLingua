/**
 * PlayerControls Component
 * Audio player control buttons
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useTheme from '../../hooks/useTheme';

const SIZE_MAP = {
  small: { play: 48, control: 24 },
  medium: { play: 64, control: 28 },
  large: { play: 80, control: 32 },
};

const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
  shuffleEnabled,
  repeatMode = 'off',
  size = 'large',
}) => {
  const { colors, spacing } = useTheme();
  const sizes = SIZE_MAP[size] || SIZE_MAP.large;
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: isPlaying ? 1 : 0.95,
      useNativeDriver: true,
      speed: 12,
      bounciness: 12,
    }).start();
  }, [isPlaying, scale]);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing(1),
        },
        iconButton: {
          padding: spacing(1.5),
        },
        playButton: {
          width: sizes.play,
          height: sizes.play,
          borderRadius: sizes.play / 2,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        },
        accentIcon: (active) => ({
          color: active ? colors.primary : colors.muted,
        }),
      }),
    [colors, sizes.play, spacing],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={onShuffle}>
        <Ionicons name="shuffle" size={sizes.control} style={styles.accentIcon(shuffleEnabled)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onPrevious}>
        <Ionicons name="play-skip-back" size={sizes.control} color={colors.text} />
      </TouchableOpacity>
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity style={styles.playButton} onPress={onPlayPause}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={sizes.play * 0.45}
            color={colors.background}
            style={!isPlaying && { marginLeft: 4 }}
          />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity style={styles.iconButton} onPress={onNext}>
        <Ionicons name="play-skip-forward" size={sizes.control} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onRepeat}>
        <Ionicons
          name={repeatMode === 'one' ? 'repeat' : 'repeat'}
          size={sizes.control}
          style={styles.accentIcon(repeatMode !== 'off')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerControls;




