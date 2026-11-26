import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/bridgework/dashboard";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — Bridgework Skills-First Matching" },
      {
        name: "description",
        content:
          "Discover job opportunities matched to your skills, and manage your career journey with Bridgework.",
      },
      { property: "og:title", content: "Overview — Bridgework Skills-First Matching" },
      {
        property: "og:description",
        content:
          "Discover job opportunities matched to your skills, and manage your career journey with Bridgework.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
