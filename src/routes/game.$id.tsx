import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart, Plus, Star, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GameCard } from "@/components/GameCard";
import { GAMES, REVIEWS, getGame } from "@/lib/games";
import { useVault } from "@/lib/vault-store";

export const Route = createFileRoute("/game/$id")({
  loader: ({ params }) => {
    const game = getGame(params.id);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Game not found — Gamevault" }, { name: "robots", content: "noindex" }] };
    }
    const { game } = loaderData;
    const title = `${game.title} — Reviews & Ratings | Gamevault`;
    return {
      meta: [
        { title },
        { name: "description", content: `${game.blurb} ${game.title} by ${game.studio} — rated ${game.rating}/5 by ${game.reviews} players.` },
        { property: "og:title", content: title },
        { property: "og:description", content: game.blurb },
      ],
    };
  },
  component: GameDetail,
});

function GameDetail() {
  const { game } = Route.useLoaderData();
  const { backlog, favorites, ratings, toggleBacklog, toggleFavorite, rate } = useVault();
  const saved = backlog.includes(game.id);
  const faved = favorites.includes(game.id);
  const myScore = ratings[game.id] ?? 0;
  const reviews = REVIEWS[game.id] ?? [];
  const similar = GAMES.filter((g) => g.id !== game.id).slice(0, 3);

  return (
    <AppShell>
      <Link
        to="/discover"
        className="label-mono inline-flex items-center gap-2 transition-colors hover:text-neon"
      >
        <ArrowLeft size={14} /> Back to discovery
      </Link>

      <section className="panel animate-scale-in relative mt-5 overflow-hidden">
        <div className="relative h-[340px] sm:h-[460px]">
          <img
            src={game.cover}
            alt={`${game.title} key art`}
            width={640}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10">
            <span className="rounded-md border border-neon/40 bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-neon">
              {game.genre}
            </span>
            <h1 className="mt-4 text-5xl font-bold sm:text-7xl">{game.title}</h1>
            <p className="mt-3 text-muted-foreground">
              {game.studio} · {game.released} · {game.platforms.join(" / ")} · avg {game.hours}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <div className="label-mono">The short version</div>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{game.long}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {game.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => toggleBacklog(game.id)}
              className={`flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${
                saved
                  ? "bg-neon text-primary-foreground"
                  : "border border-border hover:border-neon/50 hover:text-neon"
              }`}
            >
              {saved ? <Check size={16} /> : <Plus size={16} />}
              {saved ? "In your backlog" : "Add to backlog"}
            </button>
            <button
              onClick={() => toggleFavorite(game.id)}
              className="flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest transition-colors hover:border-magenta/60 hover:text-magenta"
            >
              <Heart size={16} className={faved ? "fill-magenta text-magenta" : ""} />
              {faved ? "Favorited" : "Favorite"}
            </button>
            <button className="flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest transition-colors hover:border-neon/50 hover:text-neon">
              <Zap size={16} /> Recommend
            </button>
          </div>

          <div className="label-mono mt-12">Player verdicts</div>
          <div className="mt-4 space-y-3">
            {reviews.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No verdicts yet. Be the first to rate this one.
              </p>
            )}
            {reviews.map((r, i) => (
              <div
                key={r.user}
                style={{ animationDelay: `${i * 80}ms` }}
                className="panel animate-fade-up p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-neon/12 font-mono text-xs text-neon">
                    {r.initials}
                  </span>
                  <span className="text-sm font-semibold">{r.user}</span>
                  <span className="flex items-center gap-1 font-mono text-xs text-amber">
                    <Star size={12} className="fill-amber text-amber" />
                    {r.score.toFixed(1)}
                  </span>
                  <span className="label-mono ml-auto">{r.time}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel h-fit p-6 lg:sticky lg:top-28">
          <div className="label-mono">Your rating</div>
          <div className="mt-3 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                aria-label={`Rate ${n} stars`}
                onClick={() => rate(game.id, n)}
                className="transition-transform hover:scale-125"
              >
                <Star
                  size={26}
                  className={n <= myScore ? "fill-amber text-amber" : "text-muted-foreground"}
                />
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {myScore ? `You rated this ${myScore}/5.` : "Tap a star to leave your verdict."}
          </p>

          <div className="mt-6 border-t border-border pt-6">
            <div className="flex items-end justify-between">
              <span className="font-display text-5xl font-bold neon-text">{game.rating}</span>
              <span className="text-sm text-muted-foreground">community / 5.0</span>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-neon transition-all duration-1000"
                style={{ width: `${(game.rating / 5) * 100}%` }}
              />
            </div>
            <div className="label-mono mt-3">{game.reviews} reviews</div>
          </div>
        </aside>
      </div>

      <div className="label-mono mt-14">If you liked this</div>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {similar.map((g, i) => (
          <GameCard key={g.id} game={g} delay={i * 70} />
        ))}
      </div>
    </AppShell>
  );
}