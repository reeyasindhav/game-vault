import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Settings, UserRound } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GAMES, TASTE_MAP } from "@/lib/games";
import { useVault } from "@/lib/vault-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Player Profile — Gamevault" },
      { name: "description", content: "Your player profile: games played, backlog cleared, reviews written and a live taste map of your preferences." },
      { property: "og:title", content: "Player Profile — Gamevault" },
      { property: "og:description", content: "Your stats, your queue, your taste map." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { user, backlog, favorites, ratings } = useVault();
  const queued = GAMES.filter((g) => backlog.includes(g.id));

  return (
    <AppShell>
      <section className="panel animate-fade-up relative overflow-hidden p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon/8 via-transparent to-magenta/8" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex min-w-0 items-center gap-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-neon/12 neon-ring sm:h-24 sm:w-24">
              <UserRound className="text-neon" size={34} />
            </span>
            <div className="min-w-0">
              <div className="label-mono">Player profile</div>
              <h1 className="mt-2 truncate text-4xl font-bold sm:text-5xl">{user?.name}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Explorer of strange worlds, tactical systems, and games with excellent soundtracks.
              </p>
            </div>
          </div>
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border px-6 py-3 font-display text-xs font-bold uppercase tracking-widest transition-colors hover:border-neon/50 hover:text-neon"
          >
            <Settings size={14} /> Edit profile
          </Link>
        </div>
      </section>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {[
          { v: "24", l: "Games played", s: "Across 4 platforms", c: "text-neon" },
          { v: "68%", l: "Backlog cleared", s: "12 games this year", c: "text-amber" },
          { v: "37", l: "Reviews written", s: "Top 8% of explorers", c: "text-foreground" },
        ].map((k, i) => (
          <div
            key={k.l}
            style={{ animationDelay: `${i * 90}ms` }}
            className="panel animate-fade-up hover-lift p-6"
          >
            <div className="label-mono">{k.l}</div>
            <div className={`mt-3 font-display text-4xl font-bold ${k.c}`}>{k.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{k.s}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="label-mono">Currently queued</div>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Your next sessions</h2>
            </div>
            <span className="label-mono">{queued.length} saved</span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {queued.map((g, i) => (
              <Link
                key={g.id}
                to="/game/$id"
                params={{ id: g.id }}
                style={{ animationDelay: `${i * 80}ms` }}
                className="panel animate-fade-up group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4 transition-colors hover:border-neon/40"
              >
                <img
                  src={g.cover}
                  alt={`${g.title} cover art`}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="h-16 w-14 shrink-0 rounded-xl object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{g.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {g.genre} · {g.platforms.join(" / ")}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-neon transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>

        <aside className="panel h-fit p-6">
          <div className="label-mono">Your taste map</div>
          <div className="mt-5 space-y-5">
            {TASTE_MAP.map((t, i) => (
              <div key={t.label}>
                <div className="flex items-center justify-between text-sm">
                  <span>{t.label}</span>
                  <span className="font-mono text-xs text-neon">{t.value}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-neon transition-all duration-1000"
                    style={{ width: `${t.value}%`, transitionDelay: `${i * 120}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
            Favorites tracked: <strong className="text-foreground">{favorites.length}</strong>.
            Verdicts logged: <strong className="text-foreground">{Object.keys(ratings).length}</strong>.
            Your recommendations get sharper with every rating.
          </p>
        </aside>
      </div>
    </AppShell>
  );
}