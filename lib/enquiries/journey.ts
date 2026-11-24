/** Stable values are independent of the language used to label a form. */
export const purposeOptions = [
  {
    value: "equipment",
    en: "Equipment & current price",
    sw: "Vifaa na bei ya sasa",
  },
  {
    value: "installation",
    en: "Installation / new project",
    sw: "Ufungaji / mradi mpya",
  },
  { value: "assessment", en: "Site assessment", sw: "Tathmini ya eneo" },
  {
    value: "maintenance",
    en: "Repair & maintenance",
    sw: "Ukarabati na matengenezo",
  },
  {
    value: "trade",
    en: "Trade / reseller / bulk supply",
    sw: "Ugavi wa jumla / wauzaji",
  },
  { value: "general", en: "General enquiry", sw: "Swali la jumla" },
] as const;

export const DRAFT_TTL_MS = 30 * 60 * 1000;
export function decodeEnquiryDraft(
  raw: string | null,
  now = Date.now(),
): { at: number; stage: number; data: Record<string, string> } | null {
  if (!raw || raw.length > 12000) return null;
  try {
    const d = JSON.parse(raw);
    if (
      typeof d.at !== "number" ||
      d.at > now ||
      now - d.at > DRAFT_TTL_MS ||
      !Number.isInteger(d.stage) ||
      d.stage < 1 ||
      d.stage > 3 ||
      !d.data ||
      typeof d.data !== "object" ||
      Array.isArray(d.data) ||
      Object.values(d.data).some(
        (v) => typeof v !== "string" || v.length > 3000,
      )
    )
      return null;
    return d;
  } catch {
    return null;
  }
}
