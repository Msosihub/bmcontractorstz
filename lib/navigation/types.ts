import type { Language } from "@/lib/i18n/config";
export type NavText = Record<Language, string>;
export type Destination = {
  id: string; title: NavText; href?: string; parentId?: string;
  status: "published" | "planned"; serviceSlugs: string[];
  equipmentCategories: string[]; relatedServices: string[]; visibility: "public" | "roadmap";
};
export type NavItem = { destination: string; title?: NavText; description?: NavText };
export type NavSection = { id: string; title: NavText; items: NavItem[] };
export type NavGroup = {
  id: string; title: NavText; intro: NavText; directory: string;
  sections: NavSection[]; feature?: { destination: string; title: NavText; image: string; alt: NavText };
};
export type ResolvedItem = Destination & { description?: NavText };
export type ResolvedGroup = Omit<NavGroup,"sections"|"feature"|"directory"> & {
  directory: ResolvedItem; sections: {id:string;title:NavText;items:ResolvedItem[]}[];
  feature?: {destination:ResolvedItem; title:NavText;image:string;alt:NavText};
};
