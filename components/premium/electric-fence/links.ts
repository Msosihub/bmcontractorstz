import type { Language } from "@/lib/i18n/config";
/** Use the established public routes and bounded, server-validated form context. */
export function fenceLinks(lang: Language, detail: string) {
    const context = detail.slice(0, 100);
    const text = lang === "sw"
        ? `Habari BM, naomba ushauri na makadirio: ${context}. Eneo langu ni: `
        : `Hello BM, please advise and quote for ${context}. My location is: `;
    return {
        quote: `/contact?lang=${lang}&subject=${encodeURIComponent(context)}`,
        survey: `/request-site-survey?lang=${lang}&service=${encodeURIComponent(context)}`,
        whatsapp: `/whatsapp?text=${encodeURIComponent(text)}`,
        call: "tel:+255760111880",
    };
}
