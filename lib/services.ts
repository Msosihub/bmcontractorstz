import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getServiceBySlug } from "@/data/services";
/** An explicitly unpublished database record must not reappear through static fallback. */
export const getPublicService = cache(async (slug: string) => {
 const record = await prisma.service.findUnique({ where: { slug } });
 if (record) return record.isPublished ? record : null;
 return getServiceBySlug(slug) || null;
});
