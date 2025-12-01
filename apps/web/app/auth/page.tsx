"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { gradients, palette, shadows } from "../theme";
import { auth } from "../../lib/firebase";

type Mode = "login" | "register";

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const validate = (): string | null => {
    if (!form.email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (!form.password) return "Password is required.";
    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (mode === "register") {
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

    const localError = validate();
    if (localError) {
      setError(localError);
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        const credential = await signInWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );
        setSuccess("Logged in successfully.");
        if (credential.user) {
          window.localStorage.setItem("ll:uid", credential.user.uid);
        }
      } else {
        const credential = await createUserWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );
        setSuccess("Account created successfully.");
        if (credential.user) {
          window.localStorage.setItem("ll:uid", credential.user.uid);
        }
      }

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (firebaseError: any) {
      const code = firebaseError?.code;
      const message =
        firebaseError?.message || "Authentication failed. Please try again.";
      setError(code ? `${message} [${code}]` : message);
    } finally {
      setSubmitting(false);
    }
  };

  const isRegister = mode === "register";

  return (
    <main
      className="min-h-screen px-4 py-16 text-white"
      style={{ background: gradients.page }}
    >
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <section
          className="rounded-3xl p-8 text-left backdrop-blur"
          style={{
            background: gradients.panel,
            border: `1px solid ${palette.border}`,
            boxShadow: shadows.card,
          }}
        >
          <h1 className="text-2xl font-semibold text-white md:text-3xl">
            {isRegister ? "Create your account" : "Sign in to LyricLingua"}
          </h1>
          <p className="mt-2 text-sm" style={{ color: palette.muted }}>
            Use your email and password to{" "}
            {isRegister ? "create a new account." : "access your account."}
          </p>

          {error && (
            <div
              className="mt-4 rounded-2xl px-4 py-3 text-sm"
              style={{
                border: "1px solid rgba(248,113,113,0.4)",
                background: "rgba(248,113,113,0.1)",
                color: "#fecaca",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="mt-4 rounded-2xl px-4 py-3 text-sm"
              style={{
                border: "1px solid rgba(16,185,129,0.45)",
                background: "rgba(16,185,129,0.15)",
                color: "#d1fae5",
              }}
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              <input
                id="password"
                type="password"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-emerald-400"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange("password")}
                disabled={submitting}
                autoComplete={isRegister ? "new-password" : "current-password"}
              />
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
                  type="password"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-emerald-400"
                  placeholder="Re-enter password"
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
              className="mt-2 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-black transition-all disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: palette.accent,
                boxShadow: "0 20px 40px rgba(16,185,129,0.35)",
              }}
            >
              {submitting
                ? isRegister
                  ? "Creating account…"
                  : "Signing in…"
                : isRegister
                ? "Create account"
                : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-xs" style={{ color: palette.muted }}>
            {isRegister ? "Already have an account? " : "New here? "}
            <button
              type="button"
              onClick={() => {
                setMode(isRegister ? "login" : "register");
                setError(null);
                setSuccess(null);
              }}
              className="font-semibold text-emerald-300 hover:text-emerald-200"
            >
              {isRegister ? "Sign in" : "Create an account"}
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}
