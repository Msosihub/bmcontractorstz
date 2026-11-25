import products from "./products.json";
import type { ReferenceProduct } from "../reference-types";
import type { Localized } from "../types";
/** Single read-only reference authority. No inventory, credentials or unfinished CMS dependency. */
export const networkingProducts = products as ReferenceProduct[];
export const networkingCategories: Record<string, Localized> = {
  routers: { en: "Routers", sw: "Router" },
  "access-points": { en: "Access points", sw: "Access point" },
  switches: { en: "Switches", sw: "Swichi" },
};
export const networkingCataloguePath = "/catalogue/networking";
export function networkingLinks(
  lang: "en" | "sw",
  scope: string,
  product = "",
) {
  const sw = lang === "sw";
  const brief = sw
    ? `Hitaji: ${scope}\nEneo na aina ya jengo:\nWatumiaji / vifaa / kamera:\nIdadi ya majengo na umbali:\nIntaneti na vifaa vilivyopo:\nVifaa pekee / ufungaji / matengenezo:`
    : `Requirement: ${scope}\nSite and building type:\nUsers / devices / cameras:\nBuildings and distances:\nExisting internet and equipment:\nEquipment only / installation / maintenance:`;
  const q = {
    lang,
    subject: (sw ? "Mitandao — " : "Networking — ") + scope,
    product,
    brief,
  };
  return {
    quote:
      "/contact?" +
      new URLSearchParams({ ...q, subject: q.subject.slice(0, 120) }),
    survey:
      "/request-site-survey?" +
      new URLSearchParams({
        lang,
        service: sw
          ? "Tathmini ya mtandao na fibre"
          : "Networking and fibre assessment",
        product,
        brief,
      }),
    whatsapp:
      "/whatsapp?" +
      new URLSearchParams({
        text:
          (sw
            ? "Habari BM. Naomba msaada kuhusu "
            : "Hello BM. I would like help with ") +
          scope +
          (sw ? ". Eneo: " : ". Site: "),
      }),
    call: "tel:+255760111880",
  };
}
