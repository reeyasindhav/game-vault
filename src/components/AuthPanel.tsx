import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Gamepad2, Loader2, Lock, Mail, UserRound } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { GAMES } from "@/lib/games";

export function AuthPanel({ mode }: { mode: "login" | "signup" }) {
  const { signIn } = useVault();
  const navigate = useNavigate();
  const [name, setName] = useState(mode === "login" ? "Alex Morgan" : "");
  const [email, setEmail] = useState(mode === "login" ? "alex@gamevault.gg" : "");
  const [password, setPassword] = useState(mode === "login" ? "vaultkey" : "");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signIn(name.trim() || "Player One", email.trim() || "player@gamevault.gg");
      navigate({ to: "/discover" });
    }, 700);
  };

  return (
    <div className="relative min-h-screen overflow-hidden lg:grid lg:grid-cols-2">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      <section className="relative hidden overflow-hidden border-r border-border lg:block">
        <div className="absolute inset-0 grid grid-cols-3 gap-3 p-6 opacity-30">
          {GAMES.map((g, i) => (
            <img
              key={g.id}
              src={g.cover}
              alt=""
              loading="lazy"
              className="animate-float h-full w-full rounded-xl object-cover"
              style={{ animationDelay: `${i * 400}ms` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/50" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/15 neon-ring">
              <Gamepad2 className="text-neon" size={20} />
            </span>
            <span className="label-mono !text-neon">Gamevault</span>
          </Link>
          <div className="animate-fade-up">
            <h2 className="max-w-md text-5xl font-bold leading-[1.05]">
              One vault for every console you play on.
            </h2>
            <p className="mt-5 max-w-sm text-muted-foreground">
              2,400+ tracked titles, community verdicts you can trust, and a backlog that finally
              makes sense.
            </p>
            <div className="mt-8 flex gap-8">
              {[
                { v: "2.4K", l: "Titles" },
                { v: "1,842", l: "Online now" },
                { v: "4 systems", l: "Synced" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold neon-text">{s.v}</div>
                  <div className="label-mono">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex items-center justify-center px-5 py-16">
        <form
          onSubmit={submit}
          className="panel animate-scale-in w-full max-w-md p-8 backdrop-blur-xl sm:p-10"
        >
          <div className="label-mono">{mode === "login" ? "Access terminal" : "New player"}</div>
          <h1 className="mt-3 text-3xl font-bold">
            {mode === "login" ? "Resume your vault." : "Build your vault."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Your backlog, ratings and recommendations are exactly where you left them."
              : "Takes a minute. Then start saving games you actually want to finish."}
          </p>

          <div className="mt-8 space-y-4">
            {mode === "signup" && (
              <Field icon={<UserRound size={16} />} label="Display name">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Player One"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </Field>
            )}
            <Field icon={<Mail size={16} />} label="Email">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gamevault.gg"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </Field>
            <Field icon={<Lock size={16} />} label="Password">
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-neon px-6 py-3.5 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                {mode === "login" ? "Enter vault" : "Create vault"}
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                No vault yet?{" "}
                <Link to="/signup" className="text-neon hover:underline">
                  Create one
                </Link>
              </>
            ) : (
              <>
                Already tracking?{" "}
                <Link to="/login" className="text-neon hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="label-mono hover:text-neon">
              ← Back to home
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-xl border border-border bg-surface/60 px-4 py-3 transition-colors focus-within:border-neon/60">
      <span className="label-mono !text-[10px]">{label}</span>
      <span className="mt-1 flex items-center gap-3 text-muted-foreground">
        {icon}
        {children}
      </span>
    </label>
  );
}