import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Monitor } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useVault } from "@/lib/vault-store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Vault Settings — Gamevault" },
      { name: "description", content: "Manage your connected platforms, recommendation weighting and notification preferences." },
      { property: "og:title", content: "Vault Settings — Gamevault" },
      { property: "og:description", content: "Tune your vault: platforms, recommendations, notifications." },
    ],
  }),
  component: SettingsPage,
});

const SYSTEMS = ["PC / Steam", "PlayStation 5", "Xbox Series X", "Nintendo Switch"];

function SettingsPage() {
  const { user } = useVault();
  const [linked, setLinked] = useState<string[]>(SYSTEMS.slice(0, 3));
  const [weight, setWeight] = useState(72);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "New releases in your genres": true,
    "Friends finish a game you saved": true,
    "Weekly backlog digest": false,
  });
  const [saved, setSaved] = useState(false);

  return (
    <AppShell>
      <PageHeader
        kicker="Vault config"
        title="Tune your vault."
        subtitle="Connected systems, recommendation weighting, and what we ping you about."
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="panel animate-fade-up p-6">
          <div className="label-mono">Connected systems</div>
          <div className="mt-5 space-y-3">
            {SYSTEMS.map((s) => {
              const on = linked.includes(s);
              return (
                <button
                  key={s}
                  onClick={() =>
                    setLinked((l) => (on ? l.filter((x) => x !== s) : [...l, s]))
                  }
                  className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                    on ? "border-neon/50 bg-neon/8" : "border-border hover:border-neon/30"
                  }`}
                >
                  <Monitor size={16} className={on ? "text-neon" : "text-muted-foreground"} />
                  <span className="min-w-0 truncate text-sm">{s}</span>
                  <span className={`label-mono ${on ? "!text-neon" : ""}`}>
                    {on ? "Synced" : "Connect"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel animate-fade-up p-6" style={{ animationDelay: "90ms" }}>
          <div className="label-mono">Recommendation weighting</div>
          <p className="mt-4 text-sm text-muted-foreground">
            How strongly your own ratings outweigh community consensus.
          </p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold neon-text">{weight}%</span>
            <span className="label-mono">my taste</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            aria-label="Recommendation weighting"
            className="mt-6 w-full accent-neon"
          />
          <div className="mt-2 flex justify-between label-mono">
            <span>Community</span>
            <span>Personal</span>
          </div>
        </section>

        <section className="panel animate-fade-up p-6 lg:col-span-2" style={{ animationDelay: "160ms" }}>
          <div className="label-mono">Notifications</div>
          <div className="mt-5 space-y-3">
            {Object.entries(toggles).map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border px-4 py-3.5"
              >
                <span className="min-w-0 text-sm">{k}</span>
                <button
                  role="switch"
                  aria-checked={v}
                  aria-label={k}
                  onClick={() => setToggles((t) => ({ ...t, [k]: !t[k] }))}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    v ? "bg-neon" : "bg-surface-2"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-background transition-all ${
                      v ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
            <button
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
              className="flex items-center gap-2 rounded-full bg-neon px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-95"
            >
              {saved ? <Check size={16} /> : null}
              {saved ? "Preferences saved" : "Save preferences"}
            </button>
            <span className="label-mono">
              Signed in as {user?.email} · {linked.length} systems synced
            </span>
          </div>
        </section>
      </div>
    </AppShell>
  );
}