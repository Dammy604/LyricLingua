/**
 * Time Synchronization Utilities
 * Helpers for audio-lyrics synchronization
 */

/**
 * Calculate offset between two timestamps
 * @param {number} audioTime - Current audio playback time
 * @param {number} lyricsTime - Lyrics timestamp
 * @returns {number} Offset in seconds
 */
export const calculateOffset = (audioTime, lyricsTime) => {
  return audioTime - lyricsTime;
};

/**
 * Apply offset to lyrics timestamps
 * @param {Array} lyrics - Array of lyric lines
 * @param {number} offset - Offset in seconds
 * @returns {Array} Adjusted lyrics
 */
export const applyOffset = (lyrics, offset) => {
  return lyrics.map((line) => ({
    ...line,
    time: Math.max(0, line.time + offset),
  }));
};

/**
 * Interpolate between two timestamps for smooth scrolling
 * @param {number} startTime - Start timestamp
 * @param {number} endTime - End timestamp
 * @param {number} currentTime - Current time
 * @returns {number} Interpolation progress (0-1)
 */
export const interpolate = (startTime, endTime, currentTime) => {
  if (currentTime <= startTime) return 0;
  if (currentTime >= endTime) return 1;
  return (currentTime - startTime) / (endTime - startTime);
};

/**
 * Calculate estimated line duration
 * @param {Array} lyrics - Array of lyric lines
 * @param {number} index - Current line index
 * @param {number} defaultDuration - Default duration if next line unavailable
 * @returns {number} Estimated duration in seconds
 */
export const getLineDuration = (lyrics, index, defaultDuration = 3) => {
  if (index >= lyrics.length - 1) {
    return defaultDuration;
  }
  return lyrics[index + 1].time - lyrics[index].time;
};

/**
 * Find nearest lyric line to given time
 * @param {Array} lyrics - Array of lyric lines
 * @param {number} time - Target time in seconds
 * @returns {Object} Nearest line and index
 */
export const findNearestLine = (lyrics, time) => {
  if (!lyrics || lyrics.length === 0) {
    return { line: null, index: -1 };
  }

  let nearestIndex = 0;
  let nearestDiff = Math.abs(time - lyrics[0].time);

  for (let i = 1; i < lyrics.length; i++) {
    const diff = Math.abs(time - lyrics[i].time);
    if (diff < nearestDiff) {
      nearestDiff = diff;
      nearestIndex = i;
    }
  }

  return {
    line: lyrics[nearestIndex],
    index: nearestIndex,
    difference: nearestDiff,
  };
};

/**
 * Calculate words per minute for a lyric line
 * @param {string} text - Lyric text
 * @param {number} duration - Line duration in seconds
 * @returns {number} Words per minute
 */
export const calculateWPM = (text, duration) => {
  if (!text || duration <= 0) return 0;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return (wordCount / duration) * 60;
};

/**
 * Estimate word timings within a line
 * @param {Object} line - Lyric line with text and time
 * @param {number} lineDuration - Duration of the line
 * @returns {Array} Array of words with estimated times
 */
export const estimateWordTimings = (line, lineDuration) => {
  const words = line.text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const wordDuration = lineDuration / words.length;

  return words.map((word, index) => ({
    text: word,
    startTime: line.time + index * wordDuration,
    endTime: line.time + (index + 1) * wordDuration,
  }));
};

/**
 * Format time for display
 * @param {number} seconds - Time in seconds
 * @param {boolean} showMilliseconds - Include milliseconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds, showMilliseconds = false) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  if (showMilliseconds) {
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  }
  
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

/**
 * Parse time string to seconds
 * @param {string} timeString - Time in format "mm:ss" or "mm:ss.ms"
 * @returns {number} Time in seconds
 */
export const parseTime = (timeString) => {
  const match = timeString.match(/(\d+):(\d{2})(?:\.(\d{2,3}))?/);
  if (!match) return 0;

  const [, minutes, seconds, milliseconds] = match;
  return (
    parseInt(minutes) * 60 +
    parseInt(seconds) +
    (milliseconds ? parseInt(milliseconds.padEnd(3, '0')) / 1000 : 0)
  );
};

export default {
  calculateOffset,
  applyOffset,
  interpolate,
  getLineDuration,
  findNearestLine,
  calculateWPM,
  estimateWordTimings,
  formatTime,
  parseTime,
};




