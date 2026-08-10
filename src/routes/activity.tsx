import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Star, Users } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { ACTIVITY, getGame } from "@/lib/games";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Community Activity — Gamevault" },
      { name: "description", content: "Fresh verdicts, ratings and backlog adds from players exploring the same worlds as you." },
      { property: "og:title", content: "Community Activity — Gamevault" },
      { property: "og:description", content: "What players are saying, right now." },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <AppShell>
      <PageHeader
        kicker="Community pulse"
        title="What players are saying."
        subtitle="Fresh verdicts from people exploring the same worlds as you."
        aside={
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2">
            <Users size={14} className="text-neon" />
            <span className="label-mono">1,842 online</span>
          </div>
        }
      />

      <div className="mt-6 space-y-4">
        {ACTIVITY.map((item, i) => {
          const game = getGame(item.gameId);
          return (
            <article
              key={item.id}
              style={{ animationDelay: `${i * 80}ms` }}
              className="panel animate-fade-up grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 p-5 transition-colors hover:border-neon/30 sm:p-6"
            >
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-neon/12 font-mono text-xs text-neon neon-ring">
                    {item.initials}
                  </span>
                  <p className="min-w-0 text-sm">
                    <span className="font-semibold">{item.user}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>{" "}
                    {game && (
                      <Link
                        to="/game/$id"
                        params={{ id: game.id }}
                        className="text-neon hover:underline"
                      >
                        {game.title}
                      </Link>
                    )}
                  </p>
                </div>
                <p className="mt-4 text-base text-muted-foreground">{item.text}</p>
                {item.score !== undefined && (
                  <div className="mt-4 flex items-center gap-2">
                    <Star size={14} className="fill-amber text-amber" />
                    <span className="font-mono text-sm font-semibold text-amber">
                      {item.score.toFixed(1)}
                    </span>
                    <span className="label-mono">Verdict</span>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3">
                <span className="flex items-center gap-1.5 label-mono">
                  <Clock size={12} /> {item.time}
                </span>
                {game && (
                  <Link to="/game/$id" params={{ id: game.id }}>
                    <img
                      src={game.cover}
                      alt={`${game.title} cover art`}
                      loading="lazy"
                      width={640}
                      height={800}
                      className="h-20 w-16 rounded-lg border border-border object-cover transition-transform hover:scale-105 sm:h-24 sm:w-20"
                    />
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}