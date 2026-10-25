import { cache } from "react";
import { prisma } from "@/lib/prisma";
import secondaryServices from "@/data/secondary-services.json";
import { getServiceBySlug } from "@/data/services";
/** Share the same authoritative publication read between metadata and page rendering. */
export const getServiceRecord = cache(async (slug: string) =>
  prisma.service.findUnique({ where: { slug } }),
);
/** An explicitly unpublished database record must not reappear through static fallback. */
export const getPublicService = cache(async (slug: string) => {
  const record = await getServiceRecord(slug);
  if (record) return record.isPublished ? record : null;
  return (
    secondaryServices.find((x) => x.slug === slug) ||
    getServiceBySlug(slug) ||
    null
  );
});
