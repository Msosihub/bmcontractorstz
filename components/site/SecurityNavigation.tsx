import type { Language } from "@/lib/i18n/config";
import { destinationById } from "@/lib/navigation/resolve";
import { navigationHref } from "@/lib/navigation/href";
/** Compatibility exports only; the main header uses the publication-resolved registry. */
export function SecurityLinks({lang}:{lang:Language}) {
  return <>{['cctv','electric-fence','gate-motors'].map(id=>{const d=destinationById.get(id)!;return <a key={id} href={navigationHref(d.href!,lang)}>{d.title[lang]} ↗</a>})}</>;
}
export function SecurityNavigation({lang}:{lang:Language}) {
  return <details className="specialty-nav"><summary>{lang==='sw'?'Ulinzi na Usalama':'Security & Safety'}</summary><div className="specialty-links"><SecurityLinks lang={lang}/><a href={navigationHref('/services#security',lang)}>{lang==='sw'?'Huduma zote za ulinzi':'All security services'} ↗</a></div></details>;
}
