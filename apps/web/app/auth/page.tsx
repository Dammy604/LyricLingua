"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { gradients, palette, shadows } from "../theme";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

type Mode = "login" | "register";

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const validateLocally = (): string | null => {
    if (!form.email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (!form.password) return "Password is required.";
    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (mode === "register") {
      if (!form.name.trim()) return "Name is required.";
      if (form.password !== form.confirmPassword) {
        return "Passwords must match.";
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const localError = validateLocally();
    if (localError) {
      setError(localError);
      return;
    }

    setSubmitting(true);
    try {
      const endpoint =
        mode === "login"
          ? `${API_BASE}/auth/login`
          : `${API_BASE}/auth/register`;
      const body: any = {
        email: form.email,
        password: form.password,
      };
      if (mode === "register") {
        body.confirmPassword = form.confirmPassword;
        body.name = form.name.trim();
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        const detailMessage =
          Array.isArray(data.details) && data.details.length > 0
            ? data.details[0].message
            : null;
        setError(detailMessage || data.error || "Authentication failed.");
        return;
      }

      setSuccess(
        mode === "login"
          ? "Logged in successfully. Redirecting…"
          : "Account created successfully. Redirecting…"
      );

      // Optional: persist access token in memory/localStorage if needed
      // localStorage.setItem("accessToken", data.accessToken);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setError("Unable to reach authentication service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isRegister = mode === "register";

  return (
    <main
      className="min-h-screen px-4 py-12 text-white"
      style={{ background: gradients.page }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center">
        <section
          className="flex-1 rounded-3xl p-8 backdrop-blur"
          style={{
            background: gradients.panel,
            border: `1px solid ${palette.border}`,
            boxShadow: shadows.card,
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: palette.muted }}
          >
            LyricLingua Studio
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Learn, curate, and translate music with a{" "}
            <span style={{ color: palette.accent }}>streamlined workspace</span>
            .
          </h1>
          <p className="mt-6 text-base" style={{ color: palette.muted }}>
            Access the full creator toolkit: real-time lyrics, translation
            memory, community curation, and analytics. Secure sign-in keeps your
            sessions synced across devices.
          </p>
          <div className="mt-8 grid gap-4 text-sm md:grid-cols-2">
            <div
              className="rounded-2xl p-4"
              style={{
                border: `1px solid ${palette.border}`,
                background: palette.card,
              }}
            >
              <p className="text-xs uppercase" style={{ color: palette.muted }}>
                Security
              </p>
              <p className="mt-1 font-semibold text-white">
                Password hashing · CSRF · JWT
              </p>
            </div>
            <div
              className="rounded-2xl p-4"
              style={{
                border: `1px solid ${palette.border}`,
                background: palette.card,
              }}
            >
              <p className="text-xs uppercase" style={{ color: palette.muted }}>
                Workflow
              </p>
              <p className="mt-1 font-semibold text-white">
                Dark UI · keyboard friendly · instant feedback
              </p>
            </div>
          </div>
        </section>

        <section className="flex-1">
          <div
            className="rounded-3xl p-8 backdrop-blur"
            style={{
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: shadows.card,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-xs font-medium text-white/70">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                    setSuccess(null);
                  }}
                  className={`rounded-full px-4 py-1 transition-colors ${
                    !isRegister
                      ? "bg-emerald-500 text-black"
                      : "hover:text-white"
                  }`}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError(null);
                    setSuccess(null);
                  }}
                  className={`rounded-full px-4 py-1 transition-colors ${
                    isRegister
                      ? "bg-emerald-500 text-black"
                      : "hover:text-white"
                  }`}
                >
                  Sign up
                </button>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                Secure Access
              </span>
            </div>

            <p className="mt-6 text-sm" style={{ color: palette.muted }}>
              {isRegister
                ? "Create your LyricLingua Studio profile to sync preferences, playlists, and translation history."
                : "Welcome back. Continue where you left off with curated lessons and community insights."}
            </p>

            {error && (
              <div
                className="mt-6 rounded-2xl px-4 py-3 text-sm"
                style={{
                  border: `1px solid rgba(248,113,113,0.4)`,
                  background: "rgba(248,113,113,0.1)",
                  color: "#fecaca",
                }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="mt-6 rounded-2xl px-4 py-3 text-sm"
                style={{
                  border: `1px solid rgba(16,185,129,0.45)`,
                  background: "rgba(16,185,129,0.15)",
                  color: "#d1fae5",
                }}
              >
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {isRegister && (
                <div>
                  <label
                    className="text-xs uppercase tracking-wide text-white/60"
                    htmlFor="name"
                  >
                    Display name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-emerald-400"
                    placeholder="e.g. Ariana Curator"
                    value={form.name}
                    onChange={handleChange("name")}
                    disabled={submitting}
                  />
                </div>
              )}

              <div>
                <label
                  className="text-xs uppercase tracking-wide text-white/60"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-emerald-400"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  disabled={submitting}
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  className="text-xs uppercase tracking-wide text-white/60"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus-within:border-emerald-400">
                  <div className="flex items-center">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
                      placeholder="Min. 8 characters, strong mix"
                      value={form.password}
                      onChange={handleChange("password")}
                      disabled={submitting}
                      autoComplete={
                        isRegister ? "new-password" : "current-password"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-xs font-medium text-white/60 hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-white/50">
                  Must include upper & lower case letters, a number, and a
                  special character.
                </p>
              </div>

              {isRegister && (
                <div>
                  <label
                    className="text-xs uppercase tracking-wide text-white/60"
                    htmlFor="confirmPassword"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-emerald-400"
                    placeholder="Passwords must match"
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    disabled={submitting}
                    autoComplete="new-password"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl px-4 py-3 text-base font-semibold text-black transition-all disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: palette.accent,
                  boxShadow: "0 25px 60px rgba(16,185,129,0.35)",
                }}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-transparent" />
                    {isRegister ? "Creating account…" : "Signing in…"}
                  </span>
                ) : isRegister ? (
                  "Create account"
                ) : (
                  "Log in"
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
