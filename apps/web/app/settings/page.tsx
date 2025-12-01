"use client";

import React, { useEffect, useState } from "react";
import { gradients, palette, shadows } from "../theme";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

type SpotifyStatus = {
  connected: boolean;
} | null;

export default function SettingsPage() {
  const [spotifyStatus, setSpotifyStatus] = useState<SpotifyStatus>(null);
  const [loadingSpotify, setLoadingSpotify] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = (() => {
      try {
        return window.localStorage.getItem("ll:accessToken");
      } catch {
        return null;
      }
    })();
    if (!token) {
      setSpotifyStatus(null);
      return;
    }
    const fetchStatus = async () => {
      setLoadingSpotify(true);
      try {
        const res = await fetch(`${API_BASE}/spotify/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          setSpotifyStatus(null);
          return;
        }
        const data = await res.json();
        setSpotifyStatus({ connected: !!data.connected });
      } catch {
        setSpotifyStatus(null);
      } finally {
        setLoadingSpotify(false);
      }
    };
    fetchStatus();
  }, []);

  const handleConnectSpotify = () => {
    let token: string | null = null;
    try {
      token = window.localStorage.getItem("ll:accessToken");
    } catch {
      token = null;
    }
    if (!token) {
      setError("Log in first before connecting Spotify.");
      return;
    }
    setError(null);
    const url = `${API_BASE}/spotify/login?appToken=${encodeURIComponent(
      token
    )}`;
    window.location.href = url;
  };

  const spotifyConnected = spotifyStatus?.connected;

  return (
    <main
      className="min-h-screen px-6 py-14 text-white"
      style={{ background: gradients.page }}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header
          className="rounded-[34px] p-8 backdrop-blur"
          style={{
            background: gradients.panel,
            border: `1px solid ${palette.border}`,
            boxShadow: shadows.card,
          }}
        >
          <h1 className="text-3xl font-semibold md:text-4xl">Settings</h1>
          <p className="mt-2 text-sm" style={{ color: palette.muted }}>
            Manage appearance, integrations, and community behavior for the
            LyricLingua Studio.
          </p>
        </header>

        <section
          className="rounded-[28px] p-6 backdrop-blur"
          style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: shadows.soft,
          }}
        >
          <h2 className="text-lg font-semibold text-white">Spotify</h2>
          <p className="mt-1 text-sm" style={{ color: palette.muted }}>
            Connect your Spotify account to surface track metadata and improve
            search results. Your credentials stay on Spotify; we only store
            access tokens securely on the server.
          </p>
          {error && (
            <p className="mt-3 text-sm" style={{ color: "#fecaca" }}>
              {error}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="text-sm">
              <p className="font-medium text-white">
                Status:{" "}
                <span
                  className={
                    spotifyConnected ? "text-emerald-300" : "text-yellow-300"
                  }
                >
                  {spotifyConnected ? "Connected" : "Not connected"}
                </span>
              </p>
              <p className="mt-1 text-xs" style={{ color: palette.muted }}>
                You must be logged in with a LyricLingua account to attach
                Spotify.
              </p>
            </div>
            <button
              type="button"
              onClick={handleConnectSpotify}
              disabled={loadingSpotify}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: "#1db954",
                boxShadow: "0 20px 40px rgba(29,185,84,0.5)",
              }}
              aria-label={
                spotifyConnected ? "Reconnect Spotify account" : "Connect Spotify account"
              }
            >
              <span className="mr-2 h-3 w-3 rounded-full bg-black" />
              {loadingSpotify
                ? "Checking…"
                : spotifyConnected
                ? "Reconnect Spotify"
                : "Connect with Spotify"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}




