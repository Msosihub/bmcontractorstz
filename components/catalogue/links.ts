import type { Language } from "@/lib/i18n/config";
/** Established server-validated form fields; no catalogue backend or provider request. */
export function solutionLinks(lang: Language, detail: string) {
  const context = detail.slice(0, 100);
  return {
    quote: `/contact?lang=${lang}&subject=${encodeURIComponent(context)}`,
    survey: `/request-site-survey?lang=${lang}&service=${encodeURIComponent(context)}`,
    whatsapp: `/whatsapp?text=${encodeURIComponent((lang === "sw" ? "Habari BM, naomba ushauri na bei: " : "Hello BM, please advise and quote for ") + context + (lang === "sw" ? ". Eneo langu ni: " : ". My location is: "))}`,
    call: "tel:+255760111880",
  };
}
