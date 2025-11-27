import { Audio } from 'expo-av';

let sound;
let statusCallback;
const DEFAULT_PITCH_QUALITY = Audio.PitchCorrectionQuality?.Low ?? 1;

const configureAudioSession = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
};

const getSourceFromTrack = (track) => {
  if (!track) {
    return null;
  }

  if (track.audioLocal) {
    return track.audioLocal;
  }

  if (track.audioUrl) {
    return { uri: track.audioUrl };
  }

  return null;
};

const attachStatusHandler = (instance, callback) => {
  instance.setOnPlaybackStatusUpdate((status) => {
    if (!status.isLoaded && status.error) {
      console.warn('Audio playback error', status.error);
      return;
    }

    callback?.(status);
  });
};

export const loadAudio = async (track, options = {}) => {
  if (!track) {
    throw new Error('No track provided to loadAudio');
  }

  await configureAudioSession();

  if (sound) {
    await sound.unloadAsync();
    sound.setOnPlaybackStatusUpdate(null);
  }

  statusCallback = options.onPlaybackStatusUpdate;

  const source = getSourceFromTrack(track);

  if (!source) {
    throw new Error('Track is missing an audio source');
  }

  sound = new Audio.Sound();

  try {
    await sound.loadAsync(source, {
      shouldPlay: false,
      volume: track.volume ?? 1,
      rate: 1,
      progressUpdateIntervalMillis: 500,
    });

    attachStatusHandler(sound, statusCallback);
  } catch (error) {
    console.error('Failed to load audio', error);
    throw error;
  }

  return sound;
};

export const play = async () => {
  if (!sound) return;
  await sound.playAsync();
};

export const pause = async () => {
  if (!sound) return;
  await sound.pauseAsync();
};

export const stop = async () => {
  if (!sound) return;
  await sound.stopAsync();
};

export const seekTo = async (positionMillis) => {
  if (!sound) return;
  await sound.setPositionAsync(positionMillis);
};

export const skipForward = async (seconds = 15) => {
  if (!sound) return;
  const status = await sound.getStatusAsync();
  if (!status.isLoaded) {
    return;
  }
  const newPosition = Math.min(
    status.positionMillis + seconds * 1000,
    status.durationMillis ?? status.positionMillis,
  );
  await sound.setPositionAsync(newPosition);
};

export const skipBackward = async (seconds = 10) => {
  if (!sound) return;
  const status = await sound.getStatusAsync();
  if (!status.isLoaded) {
    return;
  }
  const newPosition = Math.max(status.positionMillis - seconds * 1000, 0);
  await sound.setPositionAsync(newPosition);
};

export const setVolume = async (level) => {
  if (!sound) return;
  await sound.setVolumeAsync(level);
};

export const setRate = async (rate) => {
  if (!sound) return;
  await sound.setRateAsync(rate, shouldCorrectPitch(rate), DEFAULT_PITCH_QUALITY);
};

const shouldCorrectPitch = (rate) => rate !== 1;

export const unload = async () => {
  if (!sound) return;
  await sound.unloadAsync();
  sound.setOnPlaybackStatusUpdate(null);
  sound = null;
  statusCallback = null;
};

export const getStatus = async () => {
  if (!sound) return null;
  return sound.getStatusAsync();
};

export default {
  loadAudio,
  play,
  pause,
  stop,
  seekTo,
  skipForward,
  skipBackward,
  setVolume,
  setRate,
  unload,
  getStatus,
};

