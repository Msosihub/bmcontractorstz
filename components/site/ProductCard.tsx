/**
 * ProductCard Component
 * ---------------------
 * Reusable product card for BM Contractors product catalog.
 *
 * Purpose:
 * - Shows product name, brand, category and summary.
 * - Supports English and Swahili.
 * - Sends customers to request quote/site survey instead of direct checkout for now.
 *
 * Future:
 * - Add real product images.
 * - Add price display from database.
 * - Add product detail page.
 * - Add cart/small ecommerce flow.
 */

import Link from "next/link";
import type { Language } from "@/lib/i18n/config";

type ProductCardProps = {
  lang: Language;
  slug: string;
  name: string;
  brand?: string;
  categoryName: string;
  summaryEn: string;
  summarySw: string;
  priceLabelEn: string;
  priceLabelSw: string;
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
  const summary = lang === "sw" ? summarySw : summaryEn;
  const priceLabel = lang === "sw" ? priceLabelSw : priceLabelEn;

  const cta = lang === "sw" ? "Omba quotation" : "Request quote";

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {/* Product visual placeholder. Later this will be replaced by real product image. */}
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-slate-100 to-white">
        <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-black text-red-600 shadow-sm ring-1 ring-slate-200">
          {priceLabel}
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-slate-950 text-2xl font-black text-white transition group-hover:bg-red-600">
          BM
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
          {categoryName}
        </p>

        <h3 className="mt-3 text-xl font-black text-slate-950">{name}</h3>

        {brand ? (
          <p className="mt-1 text-sm font-semibold text-slate-500">{brand}</p>
        ) : null}

        <p className="mt-4 min-h-14 text-sm leading-7 text-slate-600">
          {summary}
        </p>

        <Link
          href={`/request-site-survey?lang=${lang}&product=${slug}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}
