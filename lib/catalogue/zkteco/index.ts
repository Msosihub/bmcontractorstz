import records from "./products.json";
import type { Localized } from "../types";
import type { ReferenceProduct } from "../reference-types";
export { referenceStatus } from "../reference-types";
export const zktecoProducts = records as ReferenceProduct[];
export const zktecoCategories: Record<string, Localized> = {
  reader: { en: "Readers & credentials", sw: "Readers na kadi" },
  terminal: { en: "Biometric terminals", sw: "Vifaa vya utambuzi" },
  controller: { en: "Door controllers", sw: "Controllers za milango" },
  "smart-lock": { en: "Smart locks", sw: "Makufuli janja" },
  hotel: { en: "Hotel systems", sw: "Mifumo ya hoteli" },
  entrance: { en: "Turnstiles & entrances", sw: "Turnstiles na viingilio" },
};
