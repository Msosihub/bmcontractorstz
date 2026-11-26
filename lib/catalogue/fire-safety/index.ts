import entries from "./products.json";
import type { ReferenceProduct } from "../reference-types";
import type { Localized } from "../types";
export const fireProducts = entries as ReferenceProduct[];
export const fireCataloguePath = "/catalogue/fire-safety";
export const fireCategories: Record<string, Localized> = {
  conventional: { en: "Conventional panels", sw: "Paneli za conventional" },
  addressable: { en: "Addressable panels", sw: "Paneli za addressable" },
  detection: {
    en: "Smoke & heat detection",
    sw: "Vitambuzi vya moshi na joto",
  },
  notification: { en: "Call points & notification", sw: "Vitufe na tahadhari" },
};
