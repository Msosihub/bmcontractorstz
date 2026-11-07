import type { CatalogueProduct, Localized } from "./types";
export type ReferenceProduct = CatalogueProduct & {
  classification: "current" | "existing" | "saleable";
  compatibility: Localized;
  /** Additional customer-intent facets; category remains the primary display group. */
  categories?: string[];
};
export const referenceStatus: Record<
  ReferenceProduct["classification"],
  Localized
> = {
  current: { en: "Manufacturer reference", sw: "Rejea ya mtengenezaji" },
  existing: { en: "Existing-system service", sw: "Huduma kwa mfumo uliopo" },
  saleable: {
    en: "BM-confirmed equipment",
    sw: "Kifaa kilichothibitishwa na BM",
  },
};
