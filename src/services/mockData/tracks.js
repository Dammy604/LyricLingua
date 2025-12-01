const AUDIO_FIA = require('../../../assets/audio/fia-davido.mp3');
const AUDIO_ALL_THE_STARS = require('../../../assets/audio/all-the-stars-kendrick-lamar-sza.mp3');
const AUDIO_TITI = require('../../../assets/audio/titi-me-pregunto-bad-bunny.mp3');

const COVER_FIA = require('../../../assets/images/covers/fia-davido.png');
const COVER_TITI = require('../../../assets/images/covers/titi-me-pregunto-bad-bunny.png');
const COVER_ALL_THE_STARS = require('../../../assets/images/covers/all-the-stars-kendrick-lamar-sza.png');
const COVER_ORGANISE = require('../../../assets/images/covers/organise-asake.png');
const COVER_CARICATURE = require('../../../assets/images/covers/caricature-fola.png');
const COVER_SMO = require('../../../assets/images/covers/smo-amaarae.png');
const COVER_AWODI = require('../../../assets/images/covers/awodi-asake.png');
const COVER_LOST = require('../../../assets/images/covers/lost-fola-kizz-daniel.png');
const COVER_JANGOLOVA = require('../../../assets/images/covers/jangolova-terry-apala.png');
const COVER_ITS_PLENTY = require('../../../assets/images/covers/its-plenty-burna-boy.png');
const COVER_PUSONG_BATO = require('../../../assets/images/covers/pusong-bato-alon.png');
const COVER_AFRO_VIBES = require('../../../assets/images/covers/afro-vibes-dj-smokes.png');
const COVER_EBASINI = require('../../../assets/images/covers/ebasini-tyler-icu.png');
const COVER_ACL = require('../../../assets/images/covers/acl-blaqbonez.png');
const COVER_MONO_NO_AWARE = require('../../../assets/images/covers/mono-no-aware-martin-roth.png');

export const MOCK_SONGS = [
  {
    id: 'davido-fia',
    title: 'FIA',
    artist: 'Davido',
    album: 'A Good Time',
    duration: 205000,
    audioLocal: AUDIO_FIA,
    coverLocal: COVER_FIA,
    lyricsId: 'davido-fia',
  },
  {
    id: 'badbunny-titi',
    title: 'Tití Me Preguntó',
    artist: 'Bad Bunny',
    album: 'Un Verano Sin Ti',
    duration: 240000,
    audioLocal: AUDIO_TITI,
    coverLocal: COVER_TITI,
    lyricsId: 'badbunny-titi',
  },
  {
    id: 'kendrick-all-the-stars',
    title: 'All The Stars',
    artist: 'Kendrick Lamar & SZA',
    album: 'Black Panther',
    duration: 230000,
    audioLocal: AUDIO_ALL_THE_STARS,
    coverLocal: COVER_ALL_THE_STARS,
    lyricsId: 'kendrick-all-the-stars',
  },
  {
    id: 'asake-organise',
    title: 'Organise',
    artist: 'Asake',
    album: 'Mr. Money With The Vibe',
    duration: 152000,
    coverLocal: COVER_ORGANISE,
  },
  {
    id: 'fola-caricature',
    title: 'Caricature',
    artist: 'FOLA',
    album: 'Catharsis',
    duration: 198000,
    coverLocal: COVER_CARICATURE,
  },
  {
    id: 'amaarae-smo',
    title: 'SMO',
    artist: 'Amaarae',
    album: 'Fountain Baby',
    duration: 180000,
    coverLocal: COVER_SMO,
  },
  {
    id: 'asake-awodi',
    title: 'Awodi',
    artist: 'Asake',
    album: 'Work of Art',
    duration: 176000,
    coverLocal: COVER_AWODI,
  },
  {
    id: 'fola-kizz-lost',
    title: 'Lost',
    artist: 'FOLA ft. Kizz Daniel',
    album: 'Lost (Single)',
    duration: 189000,
    coverLocal: COVER_LOST,
  },
  {
    id: 'afro-nation-jangolova',
    title: 'Jangolova (Bonus)',
    artist: 'Afro Nation ft. Terry Apala',
    album: 'Afro Nation Vol. 1',
    duration: 210000,
    coverLocal: COVER_JANGOLOVA,
  },
  {
    id: 'burna-boy-its-plenty',
    title: "It's Plenty",
    artist: 'Burna Boy',
    album: 'Love, Damini',
    duration: 226000,
    coverLocal: COVER_ITS_PLENTY,
  },
  {
    id: 'alon-pusong-bato',
    title: 'Pusong Bato',
    artist: 'Alon',
    album: 'Pusong Bato',
    duration: 215000,
    coverLocal: COVER_PUSONG_BATO,
  },
  {
    id: 'dj-smokes-afro-vibes',
    title: 'Afro-vibes',
    artist: 'DJ Smokes',
    album: 'Afro-vibes (Single)',
    duration: 183000,
    coverLocal: COVER_AFRO_VIBES,
  },
  {
    id: 'tyler-icu-ebasini',
    title: 'Ebasini',
    artist: 'Tyler ICU, LeeMcKrazy, Ceeka RSA…',
    album: 'Ebasini (Single)',
    duration: 207000,
    coverLocal: COVER_EBASINI,
  },
  {
    id: 'blaqbonez-acl',
    title: 'ACL',
    artist: 'Blaqbonez',
    album: 'Baby Boy AV',
    duration: 190000,
    coverLocal: COVER_ACL,
  },
  {
    id: 'martin-roth-mono-no-aware',
    title: 'Mono no Aware',
    artist: 'Martin Roth',
    album: 'Mono no Aware',
    duration: 248000,
    coverLocal: COVER_MONO_NO_AWARE,
  },
];

export default MOCK_SONGS;

