/**
 * CctvPackageCard Component
 * -------------------------
 * Reusable package card for CCTV package listings.
 *
 * Purpose:
 * - Shows package name, camera count, description, included items and price guide.
 * - Supports English and Swahili.
 * - Gives each package a direct CTA to request site survey/quotation.
 */

import Link from "next/link";
import type { Language } from "@/lib/i18n/config";

type CctvPackageCardProps = {
  lang: Language;
  slug: string;
  titleEn: string;
  titleSw?: string | null;
  cameras: number;
  descriptionEn?: string | null;
  descriptionSw?: string | null;
  priceFrom?: number | null;
  includedItems?: string[];
};

export function CctvPackageCard({
  lang,
  slug,
  titleEn,
  titleSw,
  cameras,
  descriptionEn,
  descriptionSw,
  priceFrom,
  includedItems,
}: CctvPackageCardProps) {
  const title = lang === "sw" ? titleSw || titleEn : titleEn;
  const description =
    lang === "sw" ? descriptionSw || descriptionEn || "" : descriptionEn || "";

  const labels = {
    en: {
      cameras: "Cameras",
      included: "Commonly includes",
      defaultItems: [
        "DVR/NVR",
        "HDD storage",
        "Cables & materials",
        "Installation option",
      ],
      cta: "Request this package",
      note: "Final quotation depends on site survey.",
      priceAfterSurvey: "Price after survey",
      from: "From",
    },
    sw: {
      cameras: "Camera",
      included: "Mara nyingi inajumuisha",
      defaultItems: [
        "DVR/NVR",
        "HDD ya kuhifadhi",
        "Cables na materials",
        "Installation option",
      ],
      cta: "Omba package hii",
      note: "Quotation kamili hutegemea ukaguzi wa site.",
      priceAfterSurvey: "Bei baada ya survey",
      from: "Kuanzia",
    },
  };

  const t = labels[lang];

  const items =
    includedItems && includedItems.length > 0 ? includedItems : t.defaultItems;

  const priceLabel = priceFrom
    ? `${t.from} TZS ${priceFrom.toLocaleString("en-US")}`
    : t.priceAfterSurvey;

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[3rem] bg-red-50 transition group-hover:bg-red-100" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">
              {cameras} {t.cameras}
            </p>

            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
              {title}
            </h3>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">
            {cameras}
          </div>
        </div>

        <p className="mt-4 text-sm font-black text-red-600">{priceLabel}</p>

        <p className="mt-4 min-h-14 text-sm leading-7 text-slate-600">
          {description}
        </p>

        <div className="mt-6 rounded-3xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            {t.included}
          </p>

          <div className="mt-4 grid gap-2">
            {items.slice(0, 7).map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-xs font-semibold text-slate-500">{t.note}</p>

        <Link
          href={`/request-site-survey?lang=${lang}&package=${slug}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
        >
          {t.cta}
        </Link>
      </div>
    </article>
  );
}
