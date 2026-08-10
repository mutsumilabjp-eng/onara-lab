import type { MetadataRoute } from "next";
import { categories, publishedArticles } from "./content";
import { siteConfig } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.isPublicRelease) return [];
  const staticPaths = ["/", "/about/", "/editorial-policy/", "/sources/", "/medical-policy/", "/privacy/", "/contact/", "/disclaimer/"];
  const categoriesWithArticles = categories.filter((category) => publishedArticles.some((article) => article.category === category.slug)).map((category) => `/${category.slug}/`);
  const articlePaths = publishedArticles.map((article) => `/${article.category}/${article.slug}/`);
  return [...staticPaths, ...categoriesWithArticles, ...articlePaths].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: siteConfig.updatedAt, changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7 }));
}
