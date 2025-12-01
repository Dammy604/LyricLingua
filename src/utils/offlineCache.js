/**
 * Offline Cache Utility
 * Handle offline storage for songs and lyrics
 */

import * as FileSystem from 'expo-file-system';

const CACHE_DIR = FileSystem.documentDirectory + 'cache/';
const SONGS_DIR = CACHE_DIR + 'songs/';
const LYRICS_DIR = CACHE_DIR + 'lyrics/';

/**
 * Initialize cache directories
 */
export const initCache = async () => {
  try {
    const dirs = [CACHE_DIR, SONGS_DIR, LYRICS_DIR];
    
    for (const dir of dirs) {
      const info = await FileSystem.getInfoAsync(dir);
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      }
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize cache:', error);
    return false;
  }
};

/**
 * Cache a song file
 * @param {string} songId - Unique song identifier
 * @param {string} audioUrl - URL of the audio file
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<string>} Local file path
 */
export const cacheSong = async (songId, audioUrl, onProgress) => {
  try {
    await initCache();
    
    const localPath = SONGS_DIR + songId + '.mp3';
    const info = await FileSystem.getInfoAsync(localPath);
    
    if (info.exists) {
      return localPath;
    }

    const downloadResumable = FileSystem.createDownloadResumable(
      audioUrl,
      localPath,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        onProgress?.(progress);
      }
    );

    const result = await downloadResumable.downloadAsync();
    return result?.uri || localPath;
  } catch (error) {
    console.error('Failed to cache song:', error);
    throw error;
  }
};

/**
 * Cache lyrics data
 * @param {string} songId - Song identifier
 * @param {Object} lyricsData - Lyrics data to cache
 */
export const cacheLyrics = async (songId, lyricsData) => {
  try {
    await initCache();
    
    const localPath = LYRICS_DIR + songId + '.json';
    await FileSystem.writeAsStringAsync(
      localPath,
      JSON.stringify(lyricsData),
      { encoding: FileSystem.EncodingType.UTF8 }
    );
    
    return localPath;
  } catch (error) {
    console.error('Failed to cache lyrics:', error);
    throw error;
  }
};

/**
 * Get cached song path
 * @param {string} songId - Song identifier
 * @returns {Promise<string|null>} Local path or null
 */
export const getCachedSong = async (songId) => {
  try {
    const localPath = SONGS_DIR + songId + '.mp3';
    const info = await FileSystem.getInfoAsync(localPath);
    return info.exists ? localPath : null;
  } catch (error) {
    return null;
  }
};

/**
 * Get cached lyrics
 * @param {string} songId - Song identifier
 * @returns {Promise<Object|null>} Lyrics data or null
 */
export const getCachedLyrics = async (songId) => {
  try {
    const localPath = LYRICS_DIR + songId + '.json';
    const info = await FileSystem.getInfoAsync(localPath);
    
    if (!info.exists) return null;
    
    const content = await FileSystem.readAsStringAsync(localPath);
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

/**
 * Check if song is cached
 * @param {string} songId - Song identifier
 * @returns {Promise<boolean>}
 */
export const isSongCached = async (songId) => {
  const path = await getCachedSong(songId);
  return path !== null;
};

/**
 * Remove cached song
 * @param {string} songId - Song identifier
 */
export const removeCachedSong = async (songId) => {
  try {
    const songPath = SONGS_DIR + songId + '.mp3';
    const lyricsPath = LYRICS_DIR + songId + '.json';
    
    const songInfo = await FileSystem.getInfoAsync(songPath);
    const lyricsInfo = await FileSystem.getInfoAsync(lyricsPath);
    
    if (songInfo.exists) {
      await FileSystem.deleteAsync(songPath);
    }
    
    if (lyricsInfo.exists) {
      await FileSystem.deleteAsync(lyricsPath);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to remove cached song:', error);
    return false;
  }
};

/**
 * Get cache size
 * @returns {Promise<Object>} Cache size info
 */
export const getCacheSize = async () => {
  try {
    await initCache();
    
    let totalSize = 0;
    let songCount = 0;
    
    const songFiles = await FileSystem.readDirectoryAsync(SONGS_DIR);
    
    for (const file of songFiles) {
      const info = await FileSystem.getInfoAsync(SONGS_DIR + file);
      if (info.exists && info.size) {
        totalSize += info.size;
        songCount++;
      }
    }
    
    return {
      totalSize,
      songCount,
      formattedSize: formatBytes(totalSize),
    };
  } catch (error) {
    return {
      totalSize: 0,
      songCount: 0,
      formattedSize: '0 B',
    };
  }
};

/**
 * Clear all cache
 */
export const clearCache = async () => {
  try {
    await FileSystem.deleteAsync(CACHE_DIR, { idempotent: true });
    await initCache();
    return true;
  } catch (error) {
    console.error('Failed to clear cache:', error);
    return false;
  }
};

/**
 * Format bytes to human readable
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default {
  initCache,
  cacheSong,
  cacheLyrics,
  getCachedSong,
  getCachedLyrics,
  isSongCached,
  removeCachedSong,
  getCacheSize,
  clearCache,
};




