import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { GameCard } from "@/components/GameCard";
import { GAMES, GENRES, PLATFORMS } from "@/lib/games";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover Games — Gamevault" },
      { name: "description", content: "Browse 2,400+ catalogued games by genre, platform and community rating, curated to your taste." },
      { property: "og:title", content: "Discover Games — Gamevault" },
      { property: "og:description", content: "A living shelf of games worth your time." },
    ],
  }),
  component: Discover,
});

const SORTS = ["Recommended", "Top rated", "Newest", "A-Z"] as const;

function Discover() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Recommended");
  const [showFilters, setShowFilters] = useState(true);

  const results = useMemo(() => {
    let list = GAMES.filter((g) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.studio.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q);
      const matchG = genre === "All" || g.genre === genre;
      const matchP =
        platform === "All" || g.platforms.includes(platform) || g.platforms.includes("Everywhere");
      return matchQ && matchG && matchP;
    });
    if (sort === "Top rated") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "A-Z") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Newest") list = [...list].reverse();
    return list;
  }, [query, genre, platform, sort]);

  return (
    <AppShell>
      <PageHeader
        kicker="Curated for you"
        title="Find your next save."
        subtitle="A living shelf of games worth your time, filtered by what you love to play."
        aside={
          <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/8 px-4 py-2">
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-neon" />
            <span className="label-mono !text-neon">Library synced</span>
          </div>
        }
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="panel flex min-w-0 items-center gap-3 px-5 py-4 focus-within:border-neon/50">
          <Search size={18} className="shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games, studios, genres…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
        <button
          onClick={() => setShowFilters((f) => !f)}
          className={`panel flex items-center justify-center gap-2 px-6 py-4 font-display text-xs font-bold uppercase tracking-widest transition-colors ${
            showFilters ? "text-neon" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="panel animate-fade-up mt-3 space-y-4 p-5">
          <FilterRow label="Genre" options={GENRES} value={genre} onChange={setGenre} />
          <FilterRow label="Platform" options={PLATFORMS} value={platform} onChange={setPlatform} />
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <span className="label-mono">{results.length} games found</span>
        <div className="flex items-center gap-2">
          <span className="label-mono">Sort</span>
          {SORTS.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                sort === s ? "bg-neon/12 text-neon neon-ring" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="panel mt-6 px-6 py-20 text-center">
          <h2 className="text-2xl font-bold">No matches in the vault.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a wider genre or clear the platform filter.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((g, i) => (
            <GameCard key={g.id} game={g} delay={i * 70} />
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <span className="text-sm text-muted-foreground">
          Showing <strong className="text-foreground">{results.length}</strong> of 2,400+ titles
        </span>
        <button className="font-display text-sm font-bold uppercase tracking-widest text-neon transition-transform hover:translate-x-1">
          Load more ↗
        </button>
      </div>
    </AppShell>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center">
      <span className="label-mono">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-1.5 text-xs transition-all ${
              value === o
                ? "border-neon/50 bg-neon/12 text-neon"
                : "border-border text-muted-foreground hover:border-neon/30 hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}