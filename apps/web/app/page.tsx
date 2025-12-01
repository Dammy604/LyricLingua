import { gradients, palette, shadows } from "./theme";

export default function Home() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-10"
      style={{ background: gradients.page }}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <section
          className="rounded-[32px] p-10 text-left backdrop-blur"
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
            LyricLingua
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Welcome to LyricLingua
          </h1>
          <p
            className="mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: palette.muted }}
          >
            This app now focuses on a simple authentication flow. Use the login
            and sign‑up screens to access your LyricLingua experience, then
            return here as a neutral landing page.
          </p>
        </section>
      </div>
    </main>
  );
}
