import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/AuthPanel";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Your Vault — Gamevault" },
      { name: "description", content: "Create a free Gamevault account and start tracking games across PC, PlayStation, Xbox and Switch." },
      { property: "og:title", content: "Create Your Vault — Gamevault" },
      { property: "og:description", content: "One vault for every console you play on." },
    ],
  }),
  component: () => <AuthPanel mode="signup" />,
});