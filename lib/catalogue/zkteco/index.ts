import records from "./products.json";
import type { Localized } from "../types";
import type { ReferenceProduct } from "../reference-types";
export { referenceStatus } from "../reference-types";
export const zktecoProducts = records as ReferenceProduct[];
export const zktecoCategories: Record<string, Localized> = {
  "fingerprint-attendance": {
    en: "Fingerprint Attendance",
    sw: "Mahudhurio ya Fingerprint",
  },
  "face-attendance": {
    en: "Facial Recognition Attendance",
    sw: "Mahudhurio kwa Utambuzi wa Uso",
  },
  terminal: {
    en: "Door Access Terminals",
    sw: "Vifaa vya Udhibiti wa Milango",
  },
  reader: { en: "Keypads & Readers", sw: "Keypads na Readers" },
  controller: { en: "Controllers", sw: "Controllers" },
  "smart-lock": {
    en: "Smart & Hotel Locks",
    sw: "Smart Locks na Makufuli ya Hoteli",
  },
  entrance: { en: "Turnstiles", sw: "Turnstiles" },
  accessory: { en: "Door Accessories", sw: "Vifaa vya Kukamilisha Milango" },
  software: { en: "Software & Licences", sw: "Programu na Leseni" },
};
