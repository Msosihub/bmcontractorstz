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
  imageUrl?: string | null;
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
  imageUrl,
}: ProductCardProps) {
  const summary =
    lang === "sw" ? summarySw || summaryEn || "" : summaryEn || "";

  const priceLabel =
    lang === "sw"
      ? priceLabelSw || "Uliza bei"
      : priceLabelEn || "Request price";

  const cta = lang === "sw" ? "Angalia bidhaa" : "View product";

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-slate-950">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.45),transparent_35%),linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,1))]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black text-white ring-1 ring-white/20 backdrop-blur">
            {categoryName}
          </p>

          <h3 className="mt-3 text-xl font-black tracking-tight text-white">
            {name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        {brand ? (
          <p className="text-sm font-bold text-red-600">{brand}</p>
        ) : null}

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
          href={`/products/${slug}?lang=${lang}`}
          className="mt-6 inline-flex w-full justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
        >
          {cta}
        </LoadingLink>
      </div>
    </article>
  );
}
