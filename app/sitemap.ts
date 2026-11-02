import {isPreview} from "@/lib/preview-safety.mjs";
import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getServiceBySlug } from "@/data/services";
import premiumServices from "@/data/premium-services.json";
import secondaryServices from "@/data/secondary-services.json";
import { supportArticles } from "@/data/support";
import { publicPages, languageUrl } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 if(isPreview())return [];
 const [products, packages, articles, services] = await Promise.all([
  prisma.product.findMany({ where:{isPublished:true}, select:{slug:true,updatedAt:true} }),
  prisma.cctvPackage.findMany({ where:{isPublished:true}, select:{slug:true,updatedAt:true} }),
  prisma.supportArticle.findMany({ select:{slug:true,isPublished:true,updatedAt:true,titleSw:true,summarySw:true,contentSw:true} }),
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
   const premium=premiumServices.find(service=>service.slug===slug);
   const service=record || secondaryServices.find(service=>service.slug===slug) || getServiceBySlug(slug);
   const translated=premium ? (!record?.contentEn || Boolean(record.contentSw)) : Boolean(service?.titleSw && service?.descriptionSw && service?.contentSw);
   add(path, translated, record?.updatedAt);
  } else add(path,true);
 }
 // Only the active catalogue authority contributes published entries. Preview exits above.
 const {centurionProducts}=await import('@/lib/catalogue/provider');
 add('/catalogue/centurion',true);
 for(const product of await centurionProducts())add('/catalogue/centurion/'+product.slug,true);
 const {zktecoProducts}=await import('@/lib/catalogue/zkteco');
 add('/catalogue/zkteco',true);
 for(const product of zktecoProducts)add('/catalogue/zkteco/'+product.slug,true);
 const access=services.find(service=>service.slug==='access-control');
 if(!access || access.isPublished){
  add('/services/access-control/time-attendance',true,access?.updatedAt);
  add('/services/access-control/smart-locks',true,access?.updatedAt);
 }
 products.forEach(p=>add("/products/"+p.slug,false,p.updatedAt));
 packages.forEach(p=>add("/cctv-packages/"+p.slug,false,p.updatedAt));
 const articleSlugs=new Set(articles.map(a=>a.slug));
 articles.filter(a=>a.isPublished).forEach(a=>add("/support/"+a.slug,Boolean(a.titleSw && a.summarySw && a.contentSw),a.updatedAt));
 supportArticles.filter(a=>!articleSlugs.has(a.slug)).forEach(a=>add("/support/"+a.slug,Boolean(a.titleSw && a.summarySw && a.contentSw)));
 return entries;
}
