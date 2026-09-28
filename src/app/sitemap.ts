import type { MetadataRoute } from "next";
import { coursePath, labLessons } from "@/data/geek-lab";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamic = "force-static";

const routes = [
  "",
  "/about",
  "/articles",
  "/challenges",
  "/community",
  "/competitions",
  "/contribute",
  "/events",
  "/learn",
  coursePath,
  ...labLessons.map((lesson) => coursePath + "/" + lesson.slug),
  "/members",
  "/papers",
  "/papers/segment-anything",
  "/projects",
  "/projects/nkugeek-hub",
  "/projects/nkugeek-hub/assets",
  "/questions",
  "/research",
  "/viewer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-09-28"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
