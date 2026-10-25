import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { supportArticles } from "@/data/support";
// An explicit CMS draft always overrides static editorial fallback.
export const getPublicSupportArticle = cache(async (slug: string) => {
  const record = await prisma.supportArticle.findFirst({ where: { slug } });
  return record
    ? record.isPublished
      ? record
      : null
    : supportArticles.find((x) => x.slug === slug) || null;
});
export async function getPublicSupportArticles() {
  const records = await prisma.supportArticle.findMany({
    orderBy: { createdAt: "asc" },
  });
  const slugs = new Set(records.map((x) => x.slug));
  return [
    ...records.filter((x) => x.isPublished),
    ...supportArticles.filter((x) => !slugs.has(x.slug)),
  ];
}
