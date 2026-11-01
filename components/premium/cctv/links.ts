import type { Language } from "@/lib/i18n/config";
/** Keep the established routes and server-validated form fields. No provider calls here. */
export function cctvLinks(lang: Language, detail = "CCTV installation") {
  const context = detail.slice(0, 100);
  const message =
    lang === "sw"
      ? `Habari BM, naomba ushauri na makadirio: ${context}. Eneo langu ni: `
      : `Hello BM, please advise and quote for ${context}. My location is: `;
  return {
    quote: `/contact?lang=${lang}&subject=${encodeURIComponent(context)}`,
    survey: `/request-site-survey?lang=${lang}&service=${encodeURIComponent(context)}`,
    whatsapp: `/whatsapp?text=${encodeURIComponent(message)}`,
    call: "tel:+255760111880",
  };
}
