import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { destinations } from "./registry";
import { resolveNavigation } from "./resolve";
const transientCodes=new Set(['P1001','P1002','P1008','P1017','ECONNRESET','ETIMEDOUT']);
/** Publication errors never resurrect service links. Identity guards remain outside this boundary. */
export const navigationSnapshot = cache(async () => {
  try {
    const rows=await prisma.service.findMany({where:{isPublished:false},select:{slug:true}});
    const unpublished=new Set(rows.map(r=>r.slug));
    return {unpublished,groups:resolveNavigation(unpublished),degraded:false};
  } catch(error) {
    const code=error&&typeof error==='object'&&'code' in error?String(error.code):'';
    if(!transientCodes.has(code))throw error;
    console.warn('[navigation] Publication read unavailable; all service-dependent destinations omitted.',{code});
    const unpublished=new Set(destinations.flatMap(d=>d.serviceSlugs));
    return {unpublished,groups:resolveNavigation(unpublished),degraded:true};
  }
});
