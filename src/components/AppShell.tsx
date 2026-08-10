import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Activity as ActivityIcon,
  Bookmark,
  Gamepad2,
  LayoutGrid,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { useVault } from "@/lib/vault-store";

const NAV = [
  { to: "/discover", label: "Discover", icon: LayoutGrid, index: "01" },
  { to: "/backlog", label: "My backlog", icon: Bookmark, index: "02" },
  { to: "/activity", label: "Activity", icon: ActivityIcon, index: "03" },
  { to: "/profile", label: "My profile", icon: UserRound, index: "04" },
  { to: "/settings", label: "Settings", icon: Settings, index: "05" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { user, ready, backlog, signOut } = useVault();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  useEffect(() => setOpen(false), [pathname]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="label-mono animate-glow-pulse">booting gv_os…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-neon/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px] px-4 pb-16 pt-4 sm:px-6">
        <header className="panel sticky top-4 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 backdrop-blur-xl sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-neon lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link to="/discover" className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-neon/15 neon-ring">
                <Gamepad2 className="text-neon" size={20} />
              </span>
              <span className="min-w-0">
                <span className="block label-mono !text-neon">Gamevault</span>
                <span className="block truncate text-xs text-muted-foreground">
                  Your library. Your next obsession.
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="hidden items-center gap-1 xl:flex">
              {NAV.slice(0, 4).map((item) => {
                const active = pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      active
                        ? "bg-neon/12 text-neon neon-ring"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <sup className="ml-1 font-mono text-[10px] opacity-60">{item.index}</sup>
                  </Link>
                );
              })}
            </nav>
            <div className="hidden text-right sm:block">
              <div className="truncate text-sm font-semibold">{user.name}</div>
              <div className="label-mono !text-[10px]">
                Lvl 12 <span className="text-neon">// Explorer</span>
              </div>
            </div>
            <Link
              to="/profile"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-neon/12 neon-ring text-neon transition-transform hover:scale-105"
            >
              <UserRound size={18} />
            </Link>
            <button
              onClick={() => {
                signOut();
                navigate({ to: "/login", replace: true });
              }}
              aria-label="Sign out"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="mt-6 flex gap-6">
          <aside
            className={`${
              open ? "block" : "hidden"
            } fixed inset-x-4 top-24 z-30 panel p-5 lg:static lg:block lg:w-64 lg:shrink-0 lg:border-0 lg:bg-transparent lg:p-0`}
          >
            <div className="label-mono">Main menu</div>
            <nav className="mt-4 space-y-1">
              {NAV.map((item, i) => {
                const active = pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{ animationDelay: `${i * 60}ms` }}
                    className={`animate-slide-right flex items-center gap-3 rounded-full px-4 py-3 text-sm transition-all ${
                      active
                        ? "bg-neon/10 text-neon neon-ring"
                        : "text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {item.to === "/backlog" && backlog.length > 0 && (
                      <span className="font-mono text-xs text-neon">{backlog.length}</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="label-mono mt-10">Your stats</div>
            <div className="mt-4 space-y-5 border-l border-border pl-4">
              {[
                { v: "24", l: "Games played", c: "text-neon" },
                { v: "87%", l: "Completion rate", c: "text-foreground" },
                { v: "12h", l: "This week", c: "text-amber" },
              ].map((s) => (
                <div key={s.l}>
                  <div className={`font-display text-2xl font-bold ${s.c}`}>{s.v}</div>
                  <div className="label-mono">{s.l}</div>
                </div>
              ))}
            </div>
          </aside>

          <main className="min-w-0 flex-1">{children}</main>
        </div>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6">
          <span className="label-mono">GV_OS v2.4.1 / All systems nominal</span>
          <span className="label-mono">Press / to search</span>
        </footer>
      </div>
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  subtitle,
  aside,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  aside?: ReactNode;
}) {
  return (
    <section className="panel animate-fade-up relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-neon/8 to-transparent" />
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <div className="label-mono">{kicker}</div>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
        </div>
        {aside}
      </div>
    </section>
  );
}