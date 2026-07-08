/**
 * ProductCard Component
 * ---------------------
 * Reusable product card for BM Contractors product listings.
 *
 * Purpose:
 * - Shows product name, brand, category, summary and price label.
 * - Supports English and Swahili.
 * - Links product to site survey request.
 *
 * Future:
 * - Add product image.
 * - Add product detail pages.
 * - Add WhatsApp direct inquiry per product.
 */

import { LoadingLink } from "@/components/ui/LoadingLink";
import type { Language } from "@/lib/i18n/config";

type ProductCardProps = {
  lang: Language;
  slug: string;
  name: string;
  brand?: string | null;
  categoryName: string;
  summaryEn?: string | null;
  summarySw?: string | null;
  priceLabelEn?: string;
  priceLabelSw?: string;
};

export function ProductCard({
  lang,
  slug,
  name,
  brand,
  categoryName,
  summaryEn,
  summarySw,
  priceLabelEn,
  priceLabelSw,
}: ProductCardProps) {
  const summary =
    lang === "sw" ? summarySw || summaryEn || "" : summaryEn || "";

  const priceLabel =
    lang === "sw"
      ? priceLabelSw || "Uliza bei"
      : priceLabelEn || "Request price";

  const cta = lang === "sw" ? "Omba bei / survey" : "Request price / survey";

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            {categoryName}
          </p>

          <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950">
            {name}
          </h3>

          {brand ? (
            <p className="mt-1 text-sm font-bold text-slate-500">{brand}</p>
          ) : null}
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-xs font-black text-white">
          BM
        </div>
      </div>

      <p className="mt-4 min-h-20 text-sm leading-7 text-slate-600">
        {summary}
      </p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
          Price
        </p>
        <p className="mt-1 text-lg font-black text-slate-950">{priceLabel}</p>
      </div>

      <LoadingLink
        href={`/request-site-survey?lang=${lang}&product=${slug}`}
        className="mt-6 inline-flex w-full justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
      >
        {cta}
      </LoadingLink>
    </article>
  );
}
