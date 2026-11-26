import { createFileRoute } from "@tanstack/react-router";
import { ExplorePage } from "@/components/bridgework/workspace-pages";
export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved jobs — Bridgework" },
      {
        name: "description",
        content:
          "Keep your favorite opportunities together and take the next step when you are ready.",
      },
      { property: "og:title", content: "Saved jobs — Bridgework" },
      {
        property: "og:description",
        content:
          "Keep your favorite opportunities together and take the next step when you are ready.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ExplorePage savedOnly />,
});
