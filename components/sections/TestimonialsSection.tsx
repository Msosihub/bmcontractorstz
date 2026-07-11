/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, Quote, ShieldAlert } from "lucide-react";

export default function TestimonialsSection({
  lang,
  t,
}: {
  lang: string;
  t: any;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-24">
      {/* Precision Structural Ambient Aura */}
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-red-900/10 blur-[130px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-900/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Section Info Header Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-500">
              <span className="h-1.5 w-6 rounded-full bg-red-500" />
              {t.testimonialsLabel ||
                (lang === "sw" ? "Uthibitisho Wetu" : "Social Validation")}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:leading-[1.15]">
              {t.testimonialsTitle ||
                (lang === "sw"
                  ? "Wateja wetu wanasema nini"
                  : "Trusted across high-stakes environments")}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {lang === "sw"
                ? "Hizi ni aina za maoni na mahitaji ambayo wateja wengi huwa nayo wanapotafuta contractor wa mifumo ya usalama."
                : "These represent the expectations commercial and residential clients rely on when deploying critical protective architecture."}
            </p>
          </div>

          {/* Cards Stack Loops Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {t.testimonials &&
              t.testimonials.map((item: any) => (
                <article
                  key={item.name}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      {/* Star Component Checklist Grid */}
                      <div className="flex gap-0.5 text-red-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-current stroke-none"
                          />
                        ))}
                      </div>
                      <Quote className="h-6 w-6 text-slate-700 transition-colors group-hover:text-red-500/20" />
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-slate-300">
                      “{item.text}”
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-xs font-black tracking-wide text-white border border-white/10">
                      {item.name
                        ? item.name.substring(0, 2).toUpperCase()
                        : "BM"}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
