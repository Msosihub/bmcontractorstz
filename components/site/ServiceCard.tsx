/**
 * ServiceCard Component
 * ---------------------
 * Reusable public service card for BM Contractors service listings.
 *
 * Purpose:
 * - Shows service title, summary and call-to-action.
 * - Supports English and Swahili.
 * - Keeps a clean professional card style.
 *
 * Future:
 * - Add real service image thumbnails.
 * - Add icons per service.
 */

import Link from "next/link";
import type { Language } from "@/lib/i18n/config";

type ServiceCardProps = {
  lang: Language;
  slug: string;
  titleEn: string;
  titleSw: string;
  descriptionEn: string;
  descriptionSw: string;
};

export function ServiceCard({
  lang,
  slug,
  titleEn,
  titleSw,
  descriptionEn,
  descriptionSw,
}: ServiceCardProps) {
  const title = lang === "sw" ? titleSw : titleEn;
  const description = lang === "sw" ? descriptionSw : descriptionEn;

  const cta = lang === "sw" ? "Angalia huduma" : "View service";

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {/* Visual placeholder. Later we can replace this with real project/service images. */}
      <div className="relative h-40 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.45),transparent_35%),linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,1))]" />
        <div className="relative flex h-full items-end p-5">
          <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-black text-white ring-1 ring-white/10">
            {title}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black text-slate-950">{title}</h3>

        <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600">
          {description}
        </p>

        <Link
          href={`/services/${slug}?lang=${lang}`}
          className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}
