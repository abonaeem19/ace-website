import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://ace-website-mu.vercel.app";
  const locales = ["ar", "en"];
  const pages = ["", "/about", "/services", "/projects", "/contact", "/quote"];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${base}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "/services" ? 0.9 : 0.7,
      });
    }
  }
  return entries;
}