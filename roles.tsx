import { createFileRoute } from "@tanstack/react-router";
import { ExplorePage } from "@/components/bridgework/workspace-pages";
export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: "Explore opportunities — Bridgework" },
      {
        name: "description",
        content:
          "Search example roles from inclusive hiring partners by skills, location, and industry.",
      },
      { property: "og:title", content: "Explore opportunities — Bridgework" },
      {
        property: "og:description",
        content:
          "Search example roles from inclusive hiring partners by skills, location, and industry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});
