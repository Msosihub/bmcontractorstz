import type { Language } from "@/lib/i18n/config";
/** Retain filters and anchors; only local published destinations are allowed. */
export function navigationHref(href: string, lang: Language) {
  if (!href.startsWith("/") || href.startsWith("//")) throw Error("Invalid local navigation destination");
  const url = new URL(href, "https://www.bmcontractorstz.com");
  url.searchParams.set("lang",lang);
  return url.pathname + url.search + url.hash;
}
