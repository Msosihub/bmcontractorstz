/**
 * ProjectCard Component
 * ---------------------
 * Reusable card for displaying BM Contractors project/gallery items.
 *
 * Purpose:
 * - Shows project title, category, location and description.
 * - Supports English and Swahili.
 * - Uses imageUrl if available, but also works with a clean placeholder.
 *
 * Future:
 * - Replace placeholders with real uploaded project photos.
 * - Add project detail pages.
 * - Add before/after image support.
 */

import type { Language } from "@/lib/i18n/config";

type ProjectCardProps = {
  lang: Language;
  titleEn: string;
  titleSw: string;
  category: string;
  location: string;
  imageUrl?: string;
  descriptionEn: string;
  descriptionSw: string;
};

export function ProjectCard({
  lang,
  titleEn,
  titleSw,
  category,
  location,
  imageUrl,
  descriptionEn,
  descriptionSw,
}: ProjectCardProps) {
  const title = lang === "sw" ? titleSw : titleEn;
  const description = lang === "sw" ? descriptionSw : descriptionEn;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden bg-slate-950">
        {imageUrl ? (
          /**
           * We use normal img for now.
           * Later we can switch to next/image when real optimized images are ready.
           */
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.45),transparent_35%),linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,1))]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black text-white ring-1 ring-white/20 backdrop-blur">
            {category}
          </span>

          <h3 className="mt-3 text-xl font-black text-white">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">
          {location}
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </article>
  );
}
