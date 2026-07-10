/**
 * Sitemap
 * -------
 * Helps Google and other search engines discover BM Contractors pages.
 *
 * Includes:
 * - Static public pages.
 * - Published products from Neon.
 * - Published CCTV packages from Neon.
 * - Published support articles from Neon.
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
    "/about",
    "/privacy-policy",
    "/terms",
  ];

  const [products, packages, supportArticles] = await Promise.all([
    prisma.product.findMany({
      where: {
        isPublished: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    }),

    prisma.cctvPackage.findMany({
      where: {
        isPublished: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    }),

    prisma.supportArticle.findMany({
      where: {
        isPublished: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
  ]);

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
    priority: page === "" ? 1 : 0.8,
  }));

  const productEntries = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const packageEntries = packages.map((pkg) => ({
    url: `${baseUrl}/cctv-packages/${pkg.slug}`,
    lastModified: pkg.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const supportEntries = supportArticles.map((article) => ({
    url: `${baseUrl}/support/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...packageEntries,
    ...productEntries,
    ...supportEntries,
  ];
}
