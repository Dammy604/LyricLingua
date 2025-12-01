"use client";

import React, { useState } from "react";
import { palette, gradients, shadows } from "../theme";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

type TrackResult = {
  id: string;
  title: string;
  artist: string;
  source: string;
  album?: string | null;
  art?: string | null;
  preview_url?: string | null;
  file?: string | null;
  duration?: number | null;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TrackResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ q: query.trim(), limit: "20" });
      const res = await fetch(`${API_BASE}/search?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Search failed.");
        setResults([]);
      } else {
        setResults(Array.isArray(data.results) ? data.results : []);
      }
    } catch {
      setError("Unable to reach search service. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const hasResults = results.length > 0;

  return (
    <main
      className="min-h-screen px-6 py-14 text-white"
      style={{ background: gradients.page }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header
          className="rounded-[34px] p-8 backdrop-blur"
          style={{
            background: gradients.panel,
            border: `1px solid ${palette.border}`,
            boxShadow: shadows.card,
          }}
        >
          <h1 className="text-3xl font-semibold md:text-4xl">
            Search catalog
          </h1>
          <p className="mt-2 text-sm" style={{ color: palette.muted }}>
            Local tracks are always shown first, with a{" "}
            <span className="font-semibold text-emerald-300">Local</span> badge,
            before Spotify and other sources.
          </p>
          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col gap-3 md:flex-row"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search songs or artists…"
              className="w-full rounded-2xl border px-4 py-3 text-sm text-white outline-none md:flex-1"
              style={{
                background: palette.surface,
                borderColor: palette.border,
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl px-6 py-3 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: palette.accent,
                boxShadow: "0 20px 50px rgba(16,185,129,0.35)",
              }}
            >
              {loading ? "Searching…" : "Search"}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-sm" style={{ color: "#fecaca" }}>
              {error}
            </p>
          )}
        </header>

        <section
          className="rounded-[28px] p-6 backdrop-blur"
          style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: shadows.soft,
          }}
        >
          {!hasResults && !loading && (
            <p className="text-sm" style={{ color: palette.muted }}>
              Start typing to search tracks. Local catalog results will appear
              first.
            </p>
          )}
          {hasResults && (
            <ul className="divide-y divide-white/5">
              {results.map((track) => (
                <li
                  key={`${track.source}-${track.id}`}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {track.title}
                    </p>
                    <p className="truncate text-xs" style={{ color: palette.muted }}>
                      {track.artist}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {track.source === "local" && (
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                        Local
                      </span>
                    )}
                    {track.duration != null && (
                      <span className="text-xs" style={{ color: palette.muted }}>
                        {Math.round(track.duration)}s
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}




