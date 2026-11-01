import core from "@/data/premium-services.json";
import type { Language } from "@/lib/i18n/config";
/** Metadata follows the same current editorial owner as visible service headings. */
export function servicePresentation(
  slug: string,
  lang: Language,
  record: {
    titleEn: string;
    titleSw?: string | null;
    descriptionEn?: string | null;
    descriptionSw?: string | null;
    contentEn?: string | null;
    contentSw?: string | null;
  },
) {
  const reviewed = core.find((s) => s.slug === slug);
  if (reviewed)
    return {
      title: reviewed[lang].name,
      description: reviewed[lang].intro,
      translated: !record.contentEn || Boolean(record.contentSw),
    };
  return {
    title: (lang === "sw" ? record.titleSw : record.titleEn) || record.titleEn,
    description:
      (lang === "sw"
        ? record.descriptionSw || record.descriptionEn
        : record.descriptionEn) ||
      (lang === "sw"
        ? "Omba ushauri na ukaguzi wa eneo kutoka BM Contractors."
        : "Request guidance and a site survey from BM Contractors."),
    translated: Boolean(
      record.titleSw && record.descriptionSw && record.contentSw,
    ),
  };
}
