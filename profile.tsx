import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/bridgework/workspace-pages";
export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My skills passport — Bridgework" },
      {
        name: "description",
        content:
          "Build a skills-first profile with your experience, languages, strengths, and career preferences.",
      },
      { property: "og:title", content: "My skills passport — Bridgework" },
      {
        property: "og:description",
        content:
          "Build a skills-first profile with your experience, languages, strengths, and career preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});
