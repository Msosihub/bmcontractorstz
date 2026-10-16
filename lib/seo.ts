import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/config";

export const SITE_URL = "https://www.bmcontractorstz.com";
export const publicPages: Record<string, { en: [string, string]; sw: [string, string] }> = {
  "/": { en: ["CCTV, Electric Fence & Security Systems", "BM Contractors provides CCTV, electric fences, gate automation, networking and backup power solutions in Tanzania."], sw: ["CCTV, Uzio wa Umeme na Mifumo ya Usalama", "BM Contractors hutoa huduma za CCTV, uzio wa umeme, milango ya kiotomatiki, mitandao na umeme wa akiba Tanzania."] },
  "/services": { en: ["Security & Technical Services", "Explore BM Contractors security, networking, solar and backup power services in Tanzania."], sw: ["Huduma za Usalama na Ufundi", "Fahamu huduma za BM Contractors za usalama, mitandao, nishati ya jua na umeme wa akiba Tanzania."] },
  "/products": { en: ["Products & Equipment", "Browse security and technical equipment. Ask BM Contractors for prices and availability."], sw: ["Bidhaa na Vifaa", "Angalia vifaa vya usalama na ufundi. Wasiliana na BM Contractors kuhusu bei na upatikanaji."] },
  "/projects": { en: ["Projects & Installation Examples", "Explore BM Contractors project information and installation examples."], sw: ["Miradi na Mifano ya Ufungaji", "Fahamu taarifa za miradi na mifano ya ufungaji wa mifumo ya BM Contractors."] },
  "/cctv-packages": { en: ["CCTV Packages", "Compare CCTV package options and request a site survey for a suitable quotation."], sw: ["Vifurushi vya CCTV", "Linganisha vifurushi vya CCTV na omba ukaguzi wa eneo kwa makadirio yanayofaa."] },
  "/support": { en: ["Customer Support & Guides", "Find practical guidance on security systems, equipment and maintenance."], sw: ["Msaada na Miongozo kwa Wateja", "Pata mwongozo kuhusu mifumo ya usalama, vifaa na matengenezo."] },
  "/about": { en: ["About BM Contractors", "Learn about BM Engineering Contractors Limited and its security and technical services in Tanzania."], sw: ["Kuhusu BM Contractors", "Fahamu BM Engineering Contractors Limited na huduma zake za usalama na ufundi Tanzania."] },
  "/contact": { en: ["Contact BM Contractors", "Contact BM Contractors for equipment enquiries, technical services and quotations."], sw: ["Wasiliana na BM Contractors", "Wasiliana na BM Contractors kuhusu vifaa, huduma za ufundi na makadirio ya gharama."] },
  "/request-site-survey": { en: ["Request a Site Survey", "Request a site survey for CCTV, electric fences, gate automation and technical systems."], sw: ["Omba Ukaguzi wa Eneo", "Omba ukaguzi wa eneo kwa CCTV, uzio wa umeme, milango ya kiotomatiki na mifumo ya ufundi."] },
  "/privacy-policy": { en: ["Privacy Policy", "How BM Contractors handles information submitted through this website."], sw: ["Sera ya Faragha", "Jinsi BM Contractors inavyoshughulikia taarifa zinazotumwa kupitia tovuti hii."] },
  "/terms": { en: ["Website Terms", "Terms for using the BM Contractors website and making enquiries."], sw: ["Masharti ya Tovuti", "Masharti ya kutumia tovuti ya BM Contractors na kutuma maombi."] },
};
const services: Record<string, [string, string]> = {
  cctv: ["CCTV Installation", "Ufungaji wa CCTV"],
  "electric-fence": ["Electric Fence Installation", "Ufungaji wa Uzio wa Umeme"],
  "gate-motors": ["Gate Automation", "Milango ya Kiotomatiki"],
  "access-control": ["Access Control & Attendance", "Udhibiti wa Kuingia na Mahudhurio"],
  "video-intercom": ["Video Intercom Systems", "Mifumo ya Video Intercom"],
  "fire-alarm-systems": ["Fire Alarm Systems", "Mifumo ya Tahadhari ya Moto"],
  networking: ["Networking Services", "Huduma za Mitandao"],
  "power-backup": ["Backup Power Solutions", "Mifumo ya Umeme wa Akiba"],
  "solar-street-lights": ["Solar Street Lights", "Taa za Barabarani za Sola"],
  "solar-panel-systems": ["Solar Panel Systems", "Mifumo ya Nishati ya Jua"],
  "air-conditioners": ["Air Conditioning", "Viyoyozi"],
  "maintenance-support": ["Maintenance & Support", "Matengenezo na Msaada"],
};
for (const [slug, [en, sw]] of Object.entries(services)) {
  publicPages["/services/" + slug] = {
    en: [en + " in Tanzania", "Explore " + en.toLowerCase() + " with BM Contractors. Request guidance and a site survey."],
    sw: [sw + " Tanzania", "Fahamu huduma za " + sw.toLowerCase() + " za BM Contractors. Omba ushauri na ukaguzi wa eneo."],
  };
}
export function languageUrl(path: string, lang: Language) {
  return SITE_URL + (path === "/" ? "/" : path) + (lang === "sw" ? "?lang=sw" : "");
}
export function pageMetadata(path: string, lang: Language, copy?: [string, string], translated = true): Metadata {
  const [title, description] = copy || publicPages[path]?.[lang] || (lang === "sw" ? ["BM Contractors", "Huduma na vifaa vya usalama na ufundi Tanzania."] : ["BM Contractors", "Security and technical services and equipment in Tanzania."]);
  const privatePage = path.startsWith("/admin") || path.endsWith("/success") || path === "/appointments";
  return {
    title: { absolute: title + " | BM Contractors Tanzania" },
    description,
    alternates: {
      canonical: languageUrl(path, lang),
      languages: translated && !privatePage ? { en: languageUrl(path, "en"), sw: languageUrl(path, "sw"), "x-default": languageUrl(path, "en") } : {},
    },
    robots: { index: !privatePage && (lang === "en" || translated), follow: !path.startsWith("/admin") },
    openGraph: { title, description, url: languageUrl(path, lang), locale: lang === "sw" ? "sw_TZ" : "en_TZ", alternateLocale: [lang === "sw" ? "en_TZ" : "sw_TZ"], images: ["/og/bm-contractors-og.jpg"] },
    twitter: { card: "summary_large_image", title, description, images: ["/og/bm-contractors-og.jpg"] },
  };
}
