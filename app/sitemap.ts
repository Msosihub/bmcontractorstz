import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getServiceBySlug } from "@/data/services";
import { publicPages, languageUrl } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const [products, packages, articles, services] = await Promise.all([
  prisma.product.findMany({ where:{isPublished:true}, select:{slug:true,updatedAt:true} }),
  prisma.cctvPackage.findMany({ where:{isPublished:true}, select:{slug:true,updatedAt:true} }),
  prisma.supportArticle.findMany({ where:{isPublished:true}, select:{slug:true,updatedAt:true,titleSw:true,summarySw:true,contentSw:true} }),
  prisma.service.findMany(),
 ]);
 const entries: MetadataRoute.Sitemap = [];
 const add = (path: string, translated: boolean, updatedAt?: Date) => {
  const languages = { en:languageUrl(path,"en"), sw:languageUrl(path,"sw"), "x-default":languageUrl(path,"en") };
  entries.push({url:languageUrl(path,"en"), ...(updatedAt ? {lastModified:updatedAt}:{}), ...(translated ? {alternates:{languages}}:{})});
  if(translated) entries.push({url:languageUrl(path,"sw"), ...(updatedAt ? {lastModified:updatedAt}:{}), alternates:{languages}});
 };
 for (const path of Object.keys(publicPages)) {
  if (path.startsWith("/services/")) {
   const slug=path.split("/").pop()!;
   const record=services.find(service=>service.slug===slug);
   if(record && !record.isPublished) continue;
   const service=record || getServiceBySlug(slug);
   add(path, Boolean(service?.titleSw && service?.descriptionSw && service?.contentSw), record?.updatedAt);
  } else add(path,true);
 }
 products.forEach(p=>add("/products/"+p.slug,false,p.updatedAt));
 packages.forEach(p=>add("/cctv-packages/"+p.slug,false,p.updatedAt));
 articles.forEach(a=>add("/support/"+a.slug,Boolean(a.titleSw && a.summarySw && a.contentSw),a.updatedAt));
 return entries;
}
