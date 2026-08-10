import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { GameCard } from "@/components/GameCard";
import { GAMES } from "@/lib/games";
import { useVault } from "@/lib/vault-store";

export const Route = createFileRoute("/backlog")({
  head: () => ({
    meta: [
      { title: "My Backlog — Gamevault" },
      { name: "description", content: "The games waiting for their moment. Track saved titles, favorites and finished runs in one queue." },
      { property: "og:title", content: "My Backlog — Gamevault" },
      { property: "og:description", content: "No pressure, just possibility." },
    ],
  }),
  component: Backlog,
});

const TABS = ["Saved", "Favorites", "Rated"] as const;

function Backlog() {
  const { backlog, favorites, ratings } = useVault();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Saved");

  const ids = tab === "Saved" ? backlog : tab === "Favorites" ? favorites : Object.keys(ratings);
  const games = GAMES.filter((g) => ids.includes(g.id));

  return (
    <AppShell>
      <PageHeader
        kicker="Your collection"
        title="Your backlog."
        subtitle="The games waiting for their moment. No pressure, just possibility."
        aside={
          <div className="flex gap-3">
            {[
              { v: backlog.length, l: "Saved" },
              { v: favorites.length, l: "Loved" },
              { v: Object.keys(ratings).length, l: "Rated" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border px-5 py-3 text-center">
                <div className="font-display text-2xl font-bold neon-text">{s.v}</div>
                <div className="label-mono">{s.l}</div>
              </div>
            ))}
          </div>
        }
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2.5 text-sm transition-all ${
              tab === t ? "bg-neon/12 text-neon neon-ring" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {games.length === 0 ? (
        <div className="panel animate-fade-up mt-6 px-6 py-20 text-center">
          <h2 className="text-2xl font-bold">Nothing here yet.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Head to discovery and save the first title to your vault.
          </p>
          <Link
            to="/discover"
            className="mt-6 inline-flex rounded-full bg-neon px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            Open discovery
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {games.map((g, i) => (
            <GameCard key={g.id} game={g} delay={i * 70} />
          ))}
        </div>
      )}
    </AppShell>
  );
}