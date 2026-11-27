import entries from "./products.json";
import type { ReferenceProduct } from "../reference-types";
import type { Localized } from "../types";
export const climateProducts = entries as ReferenceProduct[];
export const climateCataloguePath = "/catalogue/air-conditioning";
export const climateCategories: Record<string, Localized> = {
  "wall-mounted": { en: "Wall-mounted split", sw: "AC za ukutani" },
  inverter: { en: "Inverter systems", sw: "Mifumo ya inverter" },
  "fixed-speed": { en: "Non-inverter enquiries", sw: "Maombi ya non-inverter" },
  "multi-split": {
    en: "Multi-room / multi-split",
    sw: "Multi-split / vyumba vingi",
  },
  cassette: { en: "Ceiling cassette", sw: "Cassette za darini" },
  ducted: { en: "Ducted & concealed", sw: "AC zilizofichwa / duct" },
  "floor-standing": {
    en: "Floor-standing enquiries",
    sw: "Maombi ya AC za kusimama",
  },
  vrf: { en: "Commercial VRF", sw: "VRF za majengo" },
  accessories: { en: "Installation materials", sw: "Vifaa vya ufungaji" },
};
export { climateLinks } from "./links";
