/**
 * Sitemap
 * -------
 * Helps Google and other search engines discover BM Contractors pages.
 *
 * Includes:
 * - Static public pages.
 * - Published products from Neon.
 */

import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = "https://bmcontractorstz.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
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

  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: (page === "" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: page === "" ? 1 : 0.8,
  }));

  const productEntries = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...productEntries];
}
