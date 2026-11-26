import { createFileRoute } from "@tanstack/react-router";
import { ApplicationsPage } from "@/components/bridgework/workspace-pages";
export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "My applications — Bridgework" },
      {
        name: "description",
        content:
          "Track your demo job applications and review your progress toward your next opportunity.",
      },
      { property: "og:title", content: "My applications — Bridgework" },
      {
        property: "og:description",
        content:
          "Track your demo job applications and review your progress toward your next opportunity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplicationsPage,
});
