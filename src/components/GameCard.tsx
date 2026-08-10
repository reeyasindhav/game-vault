import { Link } from "@tanstack/react-router";
import { Check, Heart, Plus, Star } from "lucide-react";
import type { Game } from "@/lib/games";
import { useVault } from "@/lib/vault-store";

export function GameCard({ game, delay = 0 }: { game: Game; delay?: number }) {
  const { backlog, favorites, toggleBacklog, toggleFavorite } = useVault();
  const saved = backlog.includes(game.id);
  const faved = favorites.includes(game.id);

  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="group animate-fade-up hover-lift panel relative overflow-hidden"
    >
      <Link to="/game/$id" params={{ id: game.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={game.cover}
            alt={`${game.title} cover art`}
            loading="lazy"
            width={640}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-x-4 bottom-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-neon/40 bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-neon">
                {game.genre}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {game.platforms.join(" / ")}
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-bold">{game.title}</h3>
            <p className="text-sm text-muted-foreground">{game.studio}</p>
          </div>
        </div>
      </Link>

      <div className="absolute right-3 top-3 flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur">
          <Star size={12} className="fill-amber text-amber" />
          {game.rating}
        </span>
        <button
          aria-label="Toggle favorite"
          onClick={() => toggleFavorite(game.id)}
          className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background/80 backdrop-blur transition-colors hover:border-magenta/60"
        >
          <Heart
            size={14}
            className={faved ? "fill-magenta text-magenta" : "text-muted-foreground"}
          />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <span className="label-mono truncate">
          {game.released} · {game.reviews} reviews
        </span>
        <button
          onClick={() => toggleBacklog(game.id)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
            saved
              ? "text-neon"
              : "text-muted-foreground hover:bg-neon/10 hover:text-neon"
          }`}
        >
          {saved ? <Check size={14} /> : <Plus size={14} />}
          {saved ? "Saved" : "Backlog"}
        </button>
      </div>
    </article>
  );
}