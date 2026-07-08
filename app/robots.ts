/**
 * Robots
 * ------
 * Allows search engines to crawl public BM Contractors pages.
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: "https://bmcontractorstz.com/sitemap.xml",
  };
}
