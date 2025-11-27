# LyricLingua 🎵📚

Learn languages through the power of music! LyricLingua helps you master new languages by learning from song lyrics with real-time translations and community contributions.

## ✨ Features

- 🎵 **Synchronized Lyrics** - Real-time karaoke-style lyrics display
- 🌍 **Multi-language Translation** - Powered by Google Translate, DeepL, and community
- 👥 **Community Contributions** - Crowdsourced translations and cultural notes
- 📚 **Learning Progress** - Track your vocabulary and language skills
- 🎧 **Podcast ASR** - Automatic speech recognition for podcasts
- 📱 **Offline Mode** - Download songs for learning on the go

## 🏗️ Project Structure

```
LyricLingua/
├── apps/
│   ├── mobile/          # React Native + Expo mobile app
│   └── web/             # Next.js admin dashboard
├── packages/
│   ├── api/             # Node.js backend API
│   ├── db/              # Database models & migrations
│   └── ui/              # Shared UI components
├── infrastructure/      # Docker, nginx, deployment
├── docs/                # Documentation
└── shared/              # Shared types & utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL (for backend)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Dammy604/LyricLingua.git
cd LyricLingua
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp apps/mobile/.env.example apps/mobile/.env
cp packages/api/.env.example packages/api/.env
```

4. Start the mobile app:

```bash
npm run mobile
```

5. Start the backend API:

```bash
npm run api
```

## 📱 Mobile App

The mobile app is built with React Native and Expo.

```bash
cd apps/mobile
npm start
```

## 🖥️ Web Dashboard

The admin dashboard is built with Next.js.

```bash
cd apps/web
npm run dev
```

## 🔧 Backend API

The API is built with Node.js and Express.

```bash
cd packages/api
npm run dev
```

## 📖 Documentation

See the [docs](./docs/) folder for detailed documentation:

- [API Documentation](./docs/api/)
- [Setup Guide](./docs/setup/)
- [Security Guidelines](./docs/security/)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ for language learners everywhere
