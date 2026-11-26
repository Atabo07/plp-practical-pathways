import { createFileRoute } from "@tanstack/react-router";
import { MatchingPage } from "@/components/bridgework/workspace-pages";
export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "My matches — Bridgework" },
      {
        name: "description",
        content:
          "Discover ranked skills-first matches with clear reasons, skill gaps, and work preferences.",
      },
      { property: "og:title", content: "My matches — Bridgework" },
      {
        property: "og:description",
        content:
          "Discover ranked skills-first matches with clear reasons, skill gaps, and work preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MatchingPage,
});
