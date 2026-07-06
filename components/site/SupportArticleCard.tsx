/**
 * SupportArticleCard Component
 * ----------------------------
 * Reusable card for BM Contractors support/help center articles.
 *
 * Purpose:
 * - Shows article category, title and short summary.
 * - Supports English and Swahili.
 * - Links to full support article page.
 *
 * Future:
 * - Add article icons.
 * - Add search result highlighting.
 * - Add admin-managed article publishing status.
 */

import Link from "next/link";
import type { Language } from "@/lib/i18n/config";

type SupportArticleCardProps = {
  lang: Language;
  slug: string;
  categoryEn: string;
  categorySw: string;
  titleEn: string;
  titleSw: string;
  summaryEn: string;
  summarySw: string;
};

export function SupportArticleCard({
  lang,
  slug,
  categoryEn,
  categorySw,
  titleEn,
  titleSw,
  summaryEn,
  summarySw,
}: SupportArticleCardProps) {
  const category = lang === "sw" ? categorySw : categoryEn;
  const title = lang === "sw" ? titleSw : titleEn;
  const summary = lang === "sw" ? summarySw : summaryEn;

  const cta = lang === "sw" ? "Soma zaidi" : "Read article";

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
        {category}
      </p>

      <h2 className="mt-3 text-xl font-black tracking-tight text-slate-950">
        {title}
      </h2>

      <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600">
        {summary}
      </p>

      <Link
        href={`/support/${slug}?lang=${lang}`}
        className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
      >
        {cta}
      </Link>
    </article>
  );
}
