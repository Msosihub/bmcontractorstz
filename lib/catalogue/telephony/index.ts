import products from "./products.json";
import type { ReferenceProduct } from "../reference-types";
import type { Localized } from "../types";
export const telephonyProducts = products as ReferenceProduct[];
export const telephonyCategories: Record<string, Localized> = {
  pbx: { en: "IP-PBX systems", sw: "Mifumo ya IP-PBX" },
  gateways: { en: "FXS / FXO gateways", sw: "Gateway za FXS / FXO" },
  office: { en: "Office & reception phones", sw: "Simu za ofisi na mapokezi" },
  hotel: { en: "Hotel room phones", sw: "Simu za vyumba vya hoteli" },
};
export const telephonyCataloguePath = "/catalogue/telephony";
export { telephonyLinks } from "./links";
