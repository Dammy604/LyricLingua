import { gradients, palette, radius, shadows } from './theme';

type MetricCard = {
  title: string;
  subtitle: string;
  value: string;
  trend: string;
};

const metrics: MetricCard[] = [
  { title: 'Songs', subtitle: 'Published library', value: '312', trend: '+18 this week' },
  { title: 'Users', subtitle: 'Active curators', value: '4.2K', trend: '+3.4% growth' },
  { title: 'Translations', subtitle: 'Verified entries', value: '785', trend: '12 pending reviews' },
  { title: 'Community posts', subtitle: 'Cultural notes & updates', value: '146', trend: '24 awaiting mod' },
];

const actions = [
  { label: 'Add song', accent: palette.accent },
  { label: 'Review translations', accent: palette.warning },
  { label: 'Moderate community', accent: palette.accentStrong },
  { label: 'Sync releases', accent: palette.muted },
];

const activity = [
  { label: 'Spanish hip-hop playlist updated', timestamp: '2m' },
  { label: 'New Yoruba annotation submitted', timestamp: '12m' },
  { label: 'Translation review approved', timestamp: '36m' },
  { label: 'Learning pack deployed', timestamp: '1h' },
];

export default function Home() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-10"
      style={{
        background: gradients.page,
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header
          className="rounded-[40px] p-10 text-left"
          style={{
            background: gradients.panel,
            border: `1px solid ${palette.border}`,
            boxShadow: shadows.card,
          }}
        >
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: palette.muted }}>
            Studio overview
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
            LyricLingua Admin
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: palette.muted }}>
            Monitor catalog growth, track translation quality, and keep your language learning experiences in sync
            across every listener touchpoint.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.title}
              className="flex flex-col gap-2 rounded-3xl p-5"
              style={{
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: radius.xl,
                boxShadow: shadows.soft,
              }}
            >
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.muted }}>
                {metric.subtitle}
              </p>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <h2 className="text-3xl font-semibold text-white">{metric.value}</h2>
                  <p className="text-sm" style={{ color: palette.muted }}>
                    {metric.title}
                  </p>
                </div>
                <span className="text-xs font-medium text-emerald-300">{metric.trend}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            className="rounded-[28px] p-6"
            style={{
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: shadows.soft,
            }}
          >
            <h3 className="text-lg font-semibold text-white">Quick actions</h3>
            <p className="mt-1 text-sm" style={{ color: palette.muted }}>
              Core workflows for editors and moderators
            </p>
            <div className="mt-5 grid gap-3">
              {actions.map((action) => (
                <button
                  key={action.label}
                  className="rounded-2xl px-5 py-3 text-left text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  style={{
                    background: palette.card,
                    border: `1px solid ${palette.border}`,
                    color: action.accent,
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="rounded-[28px] p-6 lg:col-span-2"
            style={{
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: shadows.soft,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Live activity</h3>
                <p className="text-sm" style={{ color: palette.muted }}>
                  Realtime surface of editorial events
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.4em]" style={{ color: palette.muted }}>
                synced
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {activity.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: palette.border,
                    background: palette.card,
                  }}
                >
                  <span className="text-white">{item.label}</span>
                  <span className="text-xs font-medium" style={{ color: palette.muted }}>
                    {item.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}







