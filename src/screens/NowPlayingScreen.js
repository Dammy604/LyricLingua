import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import PlayerControls from '../components/ui/PlayerControls';
import ProgressBar from '../components/ui/ProgressBar';
import LyricsBlock from '../components/ui/LyricsBlock';
import useTheme from '../hooks/useTheme';
import playerService, {
  play as playAudio,
  pause as pauseAudio,
  skipForward,
  skipBackward,
  seekTo,
} from '../services/audio/playerService';
import lyricsManager from '../services/sync/lyricsManager';
import { fetchSongs } from '../services/data/libraryService';
import {
  selectCurrentTrack,
  selectPlaybackState,
  setCurrentTrack,
  setQueue,
  setRepeatMode,
  toggleShuffle,
  updatePlaybackStatus,
  setError as setAudioError,
} from '../store/slices/audioSlice';
import {
  selectLyricsLines,
  selectLyricsMetadata,
  selectLyricsState,
  setLyricsData,
  setLoading as setLyricsLoading,
  setError as setLyricsError,
  setViewMode,
  setCurrentLineIndex,
  setActiveTranslation,
} from '../store/slices/lyricsSlice';

const VIEW_MODES = [
  { key: 'original', label: 'Original' },
  { key: 'dual', label: 'Dual' },
  { key: 'translation', label: 'Translation' },
];

const LANGUAGE_LABELS = {
  english: 'English',
  yoruba: 'Yoruba',
  pidgin: 'Pidgin',
  spanish: 'Español',
  french: 'Français',
  korean: '한국어',
};

const NowPlayingScreen = () => {
  const dispatch = useDispatch();
  const { colors, spacing } = useTheme();
  const currentTrack = useSelector(selectCurrentTrack);
  const playback = useSelector(selectPlaybackState);
  const lyricsLines = useSelector(selectLyricsLines);
  const lyricsMetadata = useSelector(selectLyricsMetadata);
  const lyricsState = useSelector(selectLyricsState);

  const [isBootstrapping, setIsBootstrapping] = React.useState(true);

  const translationLanguage = lyricsState.activeTranslation;
  const translationLines = React.useMemo(
    () =>
      translationLanguage
        ? lyricsState.currentLyrics?.translations?.[translationLanguage] || []
        : [],
    [lyricsState.currentLyrics, translationLanguage],
  );

  const handleStatusUpdate = React.useCallback(
    (status) => {
      if (!status.isLoaded) {
        return;
      }
      const payload = {
        status: 'ready',
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        currentTime: status.positionMillis ?? 0,
      };
      if (typeof status.durationMillis === 'number') {
        payload.duration = status.durationMillis;
      }
      dispatch(updatePlaybackStatus(payload));
    },
    [dispatch],
  );

  const prepareTrack = React.useCallback(
    async (track) => {
      if (!track) return;
      dispatch(setCurrentTrack(track));
      dispatch(
        updatePlaybackStatus({
          status: 'loading',
          currentTime: 0,
          duration: track.duration || 0,
          isPlaying: false,
        }),
      );
      try {
        await playerService.loadAudio(track, {
          onPlaybackStatusUpdate: handleStatusUpdate,
        });
      } catch (error) {
        dispatch(setAudioError(error.message));
      }

      dispatch(setLyricsLoading(true));
      try {
        const lyricsData = await lyricsManager.getLyricsBySongId(track.lyricsId || track.id);
        if (lyricsData) {
          dispatch(setLyricsData(lyricsData));
        }
      } catch (error) {
        dispatch(setLyricsError(error.message));
      } finally {
        dispatch(setLyricsLoading(false));
      }
    },
    [dispatch, handleStatusUpdate],
  );

  React.useEffect(() => {
    let isMounted = true;
    const bootstrap = async () => {
      setIsBootstrapping(true);
      try {
        const songs = await fetchSongs();
        if (!isMounted || !songs?.length) return;
        dispatch(setQueue(songs));
        await prepareTrack(songs[0]);
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };
    bootstrap();

    return () => {
      isMounted = false;
      playerService.unload();
    };
  }, [dispatch, prepareTrack]);

  const isPlaying = playback.isPlaying;

  const togglePlayPause = async () => {
    if (isPlaying) {
      await pauseAudio();
    } else {
      await playAudio();
    }
  };

  const handleSeek = async (position) => {
    await seekTo(position);
  };

  const cycleRepeat = () => {
    const sequence = ['off', 'all', 'one'];
    const currentIndex = sequence.indexOf(playback.repeatMode);
    const next = sequence[(currentIndex + 1) % sequence.length];
    dispatch(setRepeatMode(next));
  };

  const activeLineIndex = React.useMemo(() => {
    if (!lyricsLines.length || typeof playback.currentTime !== 'number') {
      return -1;
    }
    const currentMs = playback.currentTime;
    for (let i = lyricsLines.length - 1; i >= 0; i -= 1) {
      if (currentMs >= lyricsLines[i].time) {
        return i;
      }
    }
    return -1;
  }, [lyricsLines, playback.currentTime]);

  React.useEffect(() => {
    if (activeLineIndex >= 0) {
      dispatch(setCurrentLineIndex(activeLineIndex));
    }
  }, [activeLineIndex, dispatch]);

  const resolveTranslation = React.useCallback(
    (time) => {
      if (!translationLines.length) return null;
      let candidate = null;
      translationLines.forEach((line) => {
        if (time >= line.time) {
          candidate = line;
        }
      });
      return candidate?.text || null;
    },
    [translationLines],
  );

  const showOriginal = lyricsState.viewMode !== 'translation';
  const showTranslation = lyricsState.viewMode !== 'original';

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: colors.background,
        },
        content: {
          paddingHorizontal: spacing(2),
          paddingBottom: spacing(4),
        },
        artworkWrapper: {
          alignItems: 'center',
          marginBottom: spacing(3),
        },
        artwork: {
          width: 300,
          height: 300,
          borderRadius: spacing(2),
          backgroundColor: colors.surface,
        },
        trackTitle: {
          fontSize: 28,
          fontWeight: '700',
          color: colors.text,
          textAlign: 'center',
          marginTop: spacing(2),
        },
        trackMeta: {
          color: colors.muted,
          textAlign: 'center',
          marginTop: spacing(0.5),
        },
        heartButton: {
          alignSelf: 'center',
          marginTop: spacing(1),
        },
        section: {
          marginTop: spacing(2),
        },
        lyricsContainer: {
          backgroundColor: colors.surface,
          borderRadius: spacing(2),
          padding: spacing(2),
          marginTop: spacing(2),
          maxHeight: 360,
        },
        lyricsScroll: {
          maxHeight: 320,
        },
        toggleRow: {
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: spacing(1),
        },
        toggleButton: (active) => ({
          paddingVertical: spacing(0.5),
          paddingHorizontal: spacing(1.5),
          borderRadius: spacing(1),
          backgroundColor: active ? colors.primary : colors.surface,
        }),
        toggleButtonSpacing: {
          marginHorizontal: spacing(0.5),
        },
        toggleText: (active) => ({
          color: active ? colors.background : colors.text,
          fontWeight: '600',
        }),
        translationRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: spacing(1),
        },
        translationChip: (active) => ({
          paddingVertical: spacing(0.3),
          paddingHorizontal: spacing(1),
          borderRadius: spacing(1),
          borderWidth: 1,
          borderColor: active ? colors.primary : colors.muted + '66',
          marginHorizontal: spacing(0.5),
          marginBottom: spacing(0.5),
          backgroundColor: active ? colors.primary + '20' : 'transparent',
        }),
        translationChipText: (active) => ({
          color: active ? colors.primary : colors.text,
          fontWeight: '600',
          fontSize: 12,
        }),
        loader: {
          marginTop: spacing(2),
        },
      }),
    [colors, spacing],
  );

  const artworkSource = React.useMemo(() => {
    if (currentTrack?.coverLocal) {
      return currentTrack.coverLocal;
    }
    if (currentTrack?.coverUrl) {
      return { uri: currentTrack.coverUrl };
    }
    if (currentTrack?.artwork) {
      return { uri: currentTrack.artwork };
    }
    return null;
  }, [currentTrack?.artwork, currentTrack?.coverLocal, currentTrack?.coverUrl]);
  const metadataArtist = currentTrack?.artist || lyricsMetadata?.artist || 'Artist';
  const metadataAlbum = currentTrack?.album || lyricsMetadata?.album || 'Album';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.artworkWrapper}>
          {artworkSource ? (
            <Image source={artworkSource} style={styles.artwork} />
          ) : (
            <View style={[styles.artwork, { justifyContent: 'center', alignItems: 'center' }]}>
              <Ionicons name="musical-notes" size={64} color={colors.muted} />
            </View>
          )}
          <Text style={styles.trackTitle}>{currentTrack?.title || 'Select a track'}</Text>
          <Text style={styles.trackMeta}>
            {metadataArtist} • {metadataAlbum}
          </Text>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={28} color={colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ProgressBar
            currentTime={playback.currentTime}
            duration={playback.duration}
            onSeek={handleSeek}
          />
        </View>

        <View style={styles.section}>
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onPrevious={() => skipBackward(10)}
            onNext={() => skipForward(15)}
            onShuffle={() => dispatch(toggleShuffle())}
            onRepeat={cycleRepeat}
            shuffleEnabled={playback.shuffle}
            repeatMode={playback.repeatMode}
          />
        </View>

        <View style={styles.toggleRow}>
          {VIEW_MODES.map((mode) => (
            <TouchableOpacity
              key={mode.key}
              style={[styles.toggleButton(lyricsState.viewMode === mode.key), styles.toggleButtonSpacing]}
              onPress={() => dispatch(setViewMode(mode.key))}
            >
              <Text style={styles.toggleText(lyricsState.viewMode === mode.key)}>{mode.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {lyricsState.availableTranslations.length > 0 && (
          <View style={styles.translationRow}>
            {lyricsState.availableTranslations.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.translationChip(lang === translationLanguage)}
                onPress={() => dispatch(setActiveTranslation(lang))}
              >
                <Text style={styles.translationChipText(lang === translationLanguage)}>
                  {LANGUAGE_LABELS[lang] || lang.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.lyricsContainer}>
          {isBootstrapping || lyricsState.isLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : (
            <ScrollView style={styles.lyricsScroll} showsVerticalScrollIndicator={false}>
              {lyricsLines.map((line, index) => {
                const translationText = showTranslation ? resolveTranslation(line.time) : null;
                const displayLine = showOriginal ? line : { ...line, text: translationText || line.text };
                return (
                  <LyricsBlock
                    key={`${line.time}-${index}`}
                    line={displayLine}
                    translation={showOriginal && showTranslation ? translationText : null}
                    isActive={index === activeLineIndex}
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NowPlayingScreen;
