# LyricLingua

LyricLingua is a monorepo that delivers a language-learning experience built around music. The Expo/React Native client synchronizes lyrics, translations, and karaoke-style highlighting, while the Node/Express API provides Spotify integration, community features, and secure authentication.

## Key Capabilities

- Synchronized lyric display with line and word-level highlighting.
- Local MP3 playback with LRC-based lyric timing.
- Spotify search and preview requests routed through a secure backend proxy.
- Community feed with threaded comments, reactions, and activity logging.
- Learner modules (Pronunciation Lab, Grammar Mini, Culture Capsules, Challenge Mode) with lesson cards, notes, and progress tracking.
- Firebase email/password authentication (web and mobile) with profile modals and settings.

## Project Structure

```
LyricLingua/
├── apps/
│   ├── mobile/          # Expo/React Native application
│   └── web/             # Next.js web experience
├── packages/
│   ├── api/             # Express backend (Spotify proxy, community, auth)
│   └── db/              # Database helpers and migrations
├── shared/              # Reusable types and utilities
├── docs/                # Supplemental documentation
└── infrastructure/      # Deployment helpers (Docker, etc.)
```

## Prerequisites

- Node.js 18 or later
- npm (or yarn/pnpm)
- Expo CLI (`npm install -g expo-cli`) for mobile/web dev preview
- PostgreSQL for the backend data store
- Spotify Developer account (Client ID/Secret) for preview/search support

## Environment Variables

Create a `.env` at the repository root (Render also expects these keys). Minimum variables:

```
SPOTIFY_CLIENT_ID=xxxx
SPOTIFY_CLIENT_SECRET=xxxx
JWT_SECRET=change-me
EXPO_PUBLIC_API_BASE_URL=https://lyriclingua-api.onrender.com
```

The Express API also reads `CORS_ORIGIN` (comma-separated origins) and `PORT` (Render sets this automatically). The Expo app picks up `EXPO_PUBLIC_API_BASE_URL` through `app.config.js`.

## Installation

```bash
git clone https://github.com/Dammy604/LyricLingua.git
cd LyricLingua
npm install
```

## Running the Backend

```bash
cd packages/api
# Development with auto-reload
npm run dev
# Production-style start
npm start
```

Render deployment:

- Build command: `npm install`
- Start command (root directory = repo root): `npm run start --workspace=packages/api`
- Required env vars: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `JWT_SECRET`, `CORS_ORIGIN`, `PORT` (optional).

## Running the Mobile/Web Client

```bash
cd apps/mobile
npx expo start --web -c      # Web preview
# or npx expo start --tunnel / --android / --ios as needed
```

The Expo config injects `apiBaseUrl` so Spotify requests and translation APIs call `https://lyriclingua-api.onrender.com`. After changing `.env` or `app.config.js`, restart Expo with the `-c` flag to clear caches.

## Web Dashboard

```bash
cd apps/web
npm run dev
```

## Spotify Preview Troubleshooting

- Use `/api/spotify-token`, `/api/spotify/preview/{trackId}`, and `/api/spotify/public-search?q=test` to confirm the backend proxy is live.
- Many Spotify tracks do not expose a `preview_url`; you may need to test with known IDs (e.g., Blinding Lights `3AJwUDP919kvQ9QcozQPxg`).
- Rate limiting is configured in `packages/api/src/middleware/rateLimit.js`. Adjust `max`/`windowMs` to avoid throttling during demos (for example, 2000 requests per 15 minutes).

## Testing Checklist

1. Start the API locally or confirm the Render instance responds.
2. Run Expo (`npx expo start --web -c`) and verify local MP3 playback and lyric highlighting.
3. Use the community feed to open the Leo post and confirm comment translations toggle.
4. Navigate to Learn → module detail pages to ensure lesson cards, notes, and video placeholders render.
5. Trigger Spotify search/preview; if a track lacks a preview, the UI will show a friendly message and local MP3 playback remains available.

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.
