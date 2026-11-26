import { createFileRoute } from "@tanstack/react-router";
import { ResourcesPage } from "@/components/bridgework/resources-page";
export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Learning and support — Bridgework" },
      {
        name: "description",
        content:
          "Prepare for interviews, showcase your expertise, and build confidence with guided career activities.",
      },
      { property: "og:title", content: "Learning and support — Bridgework" },
      {
        property: "og:description",
        content:
          "Prepare for interviews, showcase your expertise, and build confidence with guided career activities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});
