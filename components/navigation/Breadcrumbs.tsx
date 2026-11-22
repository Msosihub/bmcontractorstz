import type { Language } from "@/lib/i18n/config";
import { languageUrl } from "@/lib/seo";
import { navigationSnapshot } from "@/lib/navigation/server";
import { destinationTrail, destinationById, isVisible } from "@/lib/navigation/resolve";
import { navigationHref } from "@/lib/navigation/href";
import "./breadcrumbs.css";
export async function Breadcrumbs({id,lang,leaf}:{id:string;lang:Language;leaf?:{title:string;href:string}}) {
  const {unpublished}=await navigationSnapshot();
  const items=destinationTrail(id,unpublished).map(d=>({title:d.title[lang],href:d.href!}));
  if(leaf)items.push(leaf);if(items.length<2)return null;
  const json={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((d,i)=>({'@type':'ListItem',position:i+1,name:d.title,item:languageUrl(new URL(d.href,'https://www.bmcontractorstz.com').pathname,lang)}))};
  return <><nav className="bm-breadcrumbs" aria-label={lang==='sw'?'Njia ya ukurasa':'Breadcrumb'}><ol>{items.map((d,i)=><li key={d.href}>{i>0&&<span className="bm-crumb-separator" aria-hidden="true">/</span>}{i===items.length-1?<span aria-current="page">{d.title}</span>:<a href={navigationHref(d.href,lang)}>{d.title}</a>}</li>)}</ol></nav><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(json).replace(/</g,'\\u003c')}}/></>;
}
export async function ContextualNavigation({ids,lang}:{ids:string[];lang:Language}) {
  const {unpublished}=await navigationSnapshot();
  const items=ids.map(id=>destinationById.get(id)).filter(d=>d&&isVisible(d,unpublished));
  if(!items.length)return null;
  return <nav className="bm-context-links" aria-label={lang==='sw'?'Orodha za vifaa zinazohusiana':'Related equipment catalogues'}>{items.map(d=><a key={d!.id} href={navigationHref(d!.href!,lang)}>{d!.title[lang]} <span aria-hidden="true">↗</span></a>)}</nav>;
}
