import type { MetadataRoute } from "next";
import publicRoutes from "@/content/public-routes.json";
import { site } from "@/content/site";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified: new Date("2026-08-28"),
    changeFrequency: changeFrequency as ChangeFrequency,
    priority,
  }));
}
