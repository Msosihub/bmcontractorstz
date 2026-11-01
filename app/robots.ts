/**
 * Robots
 * ------
 * Allows search engines to crawl public BM Contractors pages.
 */

import {isPreview} from "@/lib/preview-safety.mjs";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if(isPreview())return {rules:{userAgent:"*",disallow:"/"}};
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: "https://www.bmcontractorstz.com/sitemap.xml",
  };
}
