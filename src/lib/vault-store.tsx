import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type User = { name: string; email: string; handle: string };

type VaultState = {
  user: User | null;
  ready: boolean;
  backlog: string[];
  favorites: string[];
  ratings: Record<string, number>;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  toggleBacklog: (id: string) => void;
  toggleFavorite: (id: string) => void;
  rate: (id: string, score: number) => void;
};

const KEY = "gamevault_state_v1";
const VaultContext = createContext<VaultState | null>(null);

type Persisted = {
  user: User | null;
  backlog: string[];
  favorites: string[];
  ratings: Record<string, number>;
};

const DEFAULTS: Persisted = {
  user: null,
  backlog: ["elden-ring", "cocoon", "balatro"],
  favorites: ["hades-ii"],
  ratings: { "hades-ii": 5, cocoon: 4.5 },
};

export function VaultProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...DEFAULTS, ...(JSON.parse(raw) as Persisted) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const toggle = useCallback((key: "backlog" | "favorites", id: string) => {
    setState((s) => ({
      ...s,
      [key]: s[key].includes(id) ? s[key].filter((x) => x !== id) : [...s[key], id],
    }));
  }, []);

  const value = useMemo<VaultState>(
    () => ({
      user: state.user,
      ready,
      backlog: state.backlog,
      favorites: state.favorites,
      ratings: state.ratings,
      signIn: (name, email) =>
        setState((s) => ({
          ...s,
          user: { name, email, handle: name.toLowerCase().replace(/\s+/g, "_") },
        })),
      signOut: () => setState((s) => ({ ...s, user: null })),
      toggleBacklog: (id) => toggle("backlog", id),
      toggleFavorite: (id) => toggle("favorites", id),
      rate: (id, score) => setState((s) => ({ ...s, ratings: { ...s.ratings, [id]: score } })),
    }),
    [state, ready, toggle],
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("useVault must be used inside VaultProvider");
  return ctx;
}