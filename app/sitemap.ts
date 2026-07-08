/**
 * Sitemap
 * -------
 * Helps Google and other search engines discover BM Contractors pages.
 */

import type { MetadataRoute } from "next";

const baseUrl = "https://bmcontractorstz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    "/services/cctv",
    "/services/electric-fence",
    "/services/gate-motors",
    "/services/access-control",
    "/services/networking",
    "/services/power-backup",
    "/cctv-packages",
    "/products",
    "/projects",
    "/support",
    "/contact",
    "/request-site-survey",
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.8,
  }));
}
