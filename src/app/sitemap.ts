import type { MetadataRoute } from "next";
import { coursePath, labLessons } from "@/data/geek-lab";
import { getStaticPaperSlugs } from "@/services/reproductions";
import { communityProjects, showcases } from "@/data/community";

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
  "/learn/foundations",
  "/tasks",
  "/showcase",
  ...showcases.map((item) => "/showcase/" + item.slug),
  "/contributors",
  "/failures",
  "/events/archive",
  coursePath,
  ...labLessons.map((lesson) => coursePath + "/" + lesson.slug),
  "/members",
  "/papers",
  ...getStaticPaperSlugs().map((slug) => "/papers/" + slug),
  "/projects",
  ...communityProjects.flatMap((project) => [
    "/projects/" + project.slug,
    "/projects/" + project.slug + "/assets",
  ]),
  "/questions",
  "/research",
  "/viewer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl.replace(/\/$/, "")}${route}`,
    lastModified: new Date("2026-10-05"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
