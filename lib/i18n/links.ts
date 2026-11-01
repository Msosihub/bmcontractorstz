import type { Language } from "./config";
export function switchLanguageHref(pathname: string, query: string, lang: Language) {
  const params = new URLSearchParams(query);
  params.set("lang", lang);
  return pathname + "?" + params.toString();
}
