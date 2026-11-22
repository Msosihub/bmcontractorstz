import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { destinations } from "./registry";
import { resolveNavigation } from "./resolve";
import { isPublicationTransportFailure } from "./publication-failure";
/** Publication errors never resurrect service links. Identity guards remain outside this boundary. */
export const navigationSnapshot = cache(async () => {
  try {
    const rows=await prisma.service.findMany({where:{isPublished:false},select:{slug:true}});
    const unpublished=new Set(rows.map(r=>r.slug));
    return {unpublished,groups:resolveNavigation(unpublished),degraded:false};
  } catch(error) {
    if(!isPublicationTransportFailure(error))throw error;
    console.warn('[navigation] Publication read unavailable; all service-dependent destinations omitted.',{category:'transport'});
    const unpublished=new Set(destinations.flatMap(d=>d.serviceSlugs));
    return {unpublished,groups:resolveNavigation(unpublished),degraded:true};
  }
});
