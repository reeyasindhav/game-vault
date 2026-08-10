import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Gamepad2,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { GAMES } from "@/lib/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gamevault — Your Cross-Platform Game Backlog" },
      {
        name: "description",
        content:
          "Track unplayed games across PC, PlayStation, Xbox and Switch, rate what you finish, and get recommendations tuned to your taste.",
      },
      { property: "og:title", content: "Gamevault — Your Cross-Platform Game Backlog" },
      {
        property: "og:description",
        content: "Track, review and discover games across every system you own.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Bookmark,
    title: "Backlog that behaves",
    body: "Every unplayed title from every console in one queue, sorted by how likely you are to actually finish it.",
  },
  {
    icon: Sparkles,
    title: "Taste-mapped picks",
    body: "Your verdicts build a live taste map. The more you rate, the sharper the recommendations get.",
  },
  {
    icon: Star,
    title: "Verdicts worth reading",
    body: "Short, honest community reviews from players who finished the game — not launch-day noise.",
  },
  {
    icon: Trophy,
    title: "Progress you can see",
    body: "Completion rate, hours per week, and backlog cleared — tracked without you lifting a finger.",
  },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-52 left-1/2 h-[34rem] w-[64rem] -translate-x-1/2 rounded-full bg-neon/12 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-magenta/10 blur-[130px]" />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-neon/15 neon-ring">
            <Gamepad2 className="text-neon" size={20} />
          </span>
          <span className="label-mono !text-neon">Gamevault</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-neon px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-95"
          >
            Start free
          </Link>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-20">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/8 px-4 py-1.5">
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-neon" />
          <span className="label-mono !text-neon">GV_OS v2.4.1 / now syncing 4 systems</span>
        </div>

        <h1 className="animate-fade-up mt-8 max-w-4xl text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl">
          Your library. <span className="neon-text">Your next</span> obsession.
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-xl text-lg text-muted-foreground"
          style={{ animationDelay: "120ms" }}
        >
          Gamers play everywhere and remember nothing. Gamevault pulls every platform into one
          shelf — so you can track the backlog, log honest verdicts, and find what to play tonight.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "200ms" }}
        >
          <Link
            to="/signup"
            className="group flex items-center gap-2 rounded-full bg-neon px-7 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-95"
          >
            Build your vault
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/discover"
            className="rounded-full border border-border px-7 py-4 font-display text-sm font-bold uppercase tracking-widest transition-colors hover:border-neon/50 hover:text-neon"
          >
            Browse discovery
          </Link>
        </div>

        <div
          className="animate-fade-up mt-14 grid gap-6 sm:grid-cols-3"
          style={{ animationDelay: "280ms" }}
        >
          {[
            { v: "2,400+", l: "Titles catalogued" },
            { v: "1,842", l: "Explorers online" },
            { v: "68%", l: "Avg. backlog cleared" },
          ].map((s) => (
            <div key={s.l} className="panel px-6 py-5">
              <div className="font-display text-3xl font-bold neon-text">{s.v}</div>
              <div className="label-mono mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border py-10">
        <div className="flex w-max animate-marquee gap-5">
          {[...GAMES, ...GAMES].map((g, i) => (
            <Link
              key={`${g.id}-${i}`}
              to="/game/$id"
              params={{ id: g.id }}
              className="group relative h-56 w-40 shrink-0 overflow-hidden rounded-xl border border-border"
            >
              <img
                src={g.cover}
                alt={`${g.title} cover art`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute inset-x-3 bottom-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-neon">
                  {g.genre}
                </div>
                <div className="truncate text-sm font-semibold">{g.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="label-mono">The problem / the fix</div>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">
          Four consoles, zero memory of what you own.
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              style={{ animationDelay: `${i * 90}ms` }}
              className="panel animate-fade-up hover-lift p-7"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-neon/12 neon-ring">
                <f.icon className="text-neon" size={20} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="panel relative overflow-hidden px-8 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon/10 via-transparent to-magenta/10" />
          <div className="relative">
            <div className="label-mono">Ready player one</div>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
              Stop scrolling stores. Start finishing games.
            </h2>
            <Link
              to="/signup"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-neon px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-95"
            >
              Create your vault
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-8 sm:px-8">
        <span className="label-mono">© 2026 Gamevault / All systems nominal</span>
        <span className="label-mono">Built for players who finish things</span>
      </footer>
    </div>
  );
}
