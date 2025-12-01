import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDoCnRo-oe-fEB8oK2hdkHdx3l1nBfBZlI',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'lyriclingua.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'lyriclingua',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'lyriclingua.firebasestorage.app',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER || '51553624398',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:51553624398:web:a79482a1f9bdaa82b3fe1f',
};

const hasRealCredentials = Object.values(firebaseConfig).every(
  (value) =>
    value &&
    !value.toLowerCase().includes('your_app') &&
    !value.toLowerCase().includes('your-app') &&
    !value.toUpperCase().includes('YOUR_'),
);

let firebaseApp;
let auth = null;
let db = null;
let storage = null;

if (hasRealCredentials) {
  firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
}

export const isFirebaseEnabled = Boolean(firebaseApp);
export { firebaseApp, auth, db, storage };
export const getFirebaseConfig = () => firebaseConfig;

export const ensureFirebase = () => {
  if (!firebaseApp) {
    throw new Error('Firebase is not configured. Update firebaseConfig with real project credentials.');
  }
  return firebaseApp;
};

export default firebaseApp;

