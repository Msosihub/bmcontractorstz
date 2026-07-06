export const languages = ["en", "sw"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";

export function isLanguage(value: string | undefined): value is Language {
  return value === "en" || value === "sw";
}
