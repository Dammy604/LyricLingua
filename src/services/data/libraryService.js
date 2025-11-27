import { collection, doc, getDoc, getDocs, limit, query } from 'firebase/firestore';

import { db, isFirebaseEnabled } from '../../firebase/firebaseConfig';
import { MOCK_SONGS } from '../mockData/tracks';
import { MOCK_LYRICS } from '../mockData/lyrics';

const SONGS_COLLECTION = 'songs';
const LYRICS_COLLECTION = 'lyrics';

const fallbackSongs = () => MOCK_SONGS;
const fallbackLyrics = (songId) => MOCK_LYRICS[songId] || null;

const fetchSongsFromFirestore = async () => {
  const songsRef = collection(db, SONGS_COLLECTION);
  const snapshot = await getDocs(songsRef);
  if (snapshot.empty) return [];
  return snapshot.docs.map((songDoc) => ({ id: songDoc.id, ...songDoc.data() }));
};

const fetchSongFromFirestore = async (songId) => {
  const songRef = doc(db, SONGS_COLLECTION, songId);
  const songDoc = await getDoc(songRef);
  if (!songDoc.exists()) {
    return null;
  }
  return { id: songDoc.id, ...songDoc.data() };
};

const fetchLyricsFromFirestore = async (lyricsId) => {
  const lyricsRef = doc(db, LYRICS_COLLECTION, lyricsId);
  const lyricsDoc = await getDoc(lyricsRef);
  if (!lyricsDoc.exists()) {
    return null;
  }
  return { lyricsId: lyricsDoc.id, ...lyricsDoc.data() };
};

export const fetchSongs = async () => {
  if (isFirebaseEnabled && db) {
    try {
      const songs = await fetchSongsFromFirestore();
      if (songs.length) {
        return songs;
      }
    } catch (error) {
      console.warn('Falling back to mock songs:', error.message);
    }
  }
  return fallbackSongs();
};

export const fetchFeaturedSong = async () => {
  if (isFirebaseEnabled && db) {
    try {
      const songsRef = collection(db, SONGS_COLLECTION);
      const snapshot = await getDocs(query(songsRef, limit(1)));
      if (!snapshot.empty) {
        const songDoc = snapshot.docs[0];
        return { id: songDoc.id, ...songDoc.data() };
      }
    } catch (error) {
      console.warn('Unable to fetch featured song, using mock:', error.message);
    }
  }
  return fallbackSongs()[0];
};

export const fetchSongById = async (songId) => {
  if (!songId) return null;
  if (isFirebaseEnabled && db) {
    try {
      const song = await fetchSongFromFirestore(songId);
      if (song) {
        return song;
      }
    } catch (error) {
      console.warn(`Unable to fetch song ${songId}, using mock:`, error.message);
    }
  }
  return fallbackSongs().find((song) => song.id === songId) || null;
};

export const fetchLyricsForSong = async (lyricsId) => {
  if (!lyricsId) return null;
  if (isFirebaseEnabled && db) {
    try {
      const lyrics = await fetchLyricsFromFirestore(lyricsId);
      if (lyrics) {
        return lyrics;
      }
    } catch (error) {
      console.warn(`Unable to fetch lyrics ${lyricsId}, using mock:`, error.message);
    }
  }
  return fallbackLyrics(lyricsId);
};

export default {
  fetchSongs,
  fetchFeaturedSong,
  fetchSongById,
  fetchLyricsForSong,
};

