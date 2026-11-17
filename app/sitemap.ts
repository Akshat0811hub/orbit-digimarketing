import type { MetadataRoute } from "next";
import { services, projects, posts } from "@/data/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    "",
    "/about",
    "/services",
    "/work",
    "/blog",
    "/careers",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
