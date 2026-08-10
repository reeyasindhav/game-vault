import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/AuthPanel";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Gamevault" },
      { name: "description", content: "Sign in to your Gamevault to resume your backlog, ratings and recommendations." },
      { property: "og:title", content: "Sign In — Gamevault" },
      { property: "og:description", content: "Resume your vault. Your backlog is waiting." },
    ],
  }),
  component: () => <AuthPanel mode="login" />,
});