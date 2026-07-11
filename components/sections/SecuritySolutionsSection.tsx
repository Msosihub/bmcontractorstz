/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowRight,
  Shield,
  Video,
  Flame,
  Key,
  Radio,
  Activity,
} from "lucide-react";

export default function SecuritySolutionsSection({
  lang,
  t,
  services,
  ServiceCard,
  LoadingLink,
}: {
  lang: string;
  t: any;
  services: any;
  ServiceCard: any;
  LoadingLink: any;
}) {
  // Icon dictionary to automatically inject modern visuals based on typical security services slugs
  const getServiceIcon = (slug: any) => {
    const s = slug.toLowerCase();
    if (s.includes("cctv") || s.includes("camera"))
      return <Video className="h-6 w-6 stroke-[1.5]" />;
    if (s.includes("fire") || s.includes("moto"))
      return <Flame className="h-6 w-6 stroke-[1.5]" />;
    if (s.includes("access") || s.includes("gati"))
      return <Key className="h-6 w-6 stroke-[1.5]" />;
    if (s.includes("alarm") || s.includes("kingora"))
      return <Radio className="h-6 w-6 stroke-[1.5]" />;
    if (s.includes("fence") || s.includes("waya"))
      return <Shield className="h-6 w-6 stroke-[1.5]" />;
    return <Activity className="h-6 w-6 stroke-[1.5]" />;
  };

  return (
    <>
      {/* 1. SELF-CONTAINED MARQUEE INJECTION CODE (Replaces the broken static animation) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes inlineMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-inline-marquee {
          animation: inlineMarquee 28s linear infinite;
        }
      `,
        }}
      />

      {/* RE-UPGRADED BRAND MARQUEE (Now fully functional out-of-the-box) */}
      <section className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-slate-950 py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-32" />
        <div className="flex overflow-hidden">
          <div className="flex w-max shrink-0 animate-inline-marquee items-center gap-4 pr-4 hover:[animation-play-state:paused]">
            {[...t.brandNames, ...t.brandNames, ...t.brandNames].map(
              (item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-3.5 transition duration-200"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-200 sm:text-sm">
                    {item}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 2. SECURITY SOLUTIONS MAIN SECTION (Modern Light Theme Workspace) */}
      <section className="bg-slate-50 px-4 py-16 text-slate-950 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Header Block Layout */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-600">
                <span className="h-1.5 w-6 rounded-full bg-red-600" />
                {t.servicesLabel}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:leading-[1.15]">
                {t.servicesTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                {t.servicesText}
              </p>
            </div>

            <div className="flex lg:col-span-4 lg:justify-end">
              <LoadingLink
                href={`/services?lang=${lang}`}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-black text-white transition-all duration-300 hover:bg-red-600 shadow-md shadow-slate-950/10"
              >
                {t.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </LoadingLink>
            </div>
          </div>

          {/* Upgraded Native Structural Grid Wrapper */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
            {services.map((service: any) => (
              <div
                key={service.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
              >
                <div>
                  {/* Service Icon Display Badge */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 transition-all duration-300 group-hover:bg-red-50 group-hover:text-red-600">
                    {getServiceIcon(service.slug)}
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-red-600">
                    {lang === "sw" ? service.titleSw : service.titleEn}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {lang === "sw"
                      ? service.descriptionSw
                      : service.descriptionEn}
                  </p>
                </div>

                {/* Bottom link block to specific service profile detail safely forwarding current language context */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <LoadingLink
                    href={`/services/${service.slug}?lang=${lang}`}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-slate-900 group-hover:text-red-600 transition-colors duration-200"
                  >
                    {lang === "sw" ? "Soma Zaidi" : "Explore Solution"}
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </LoadingLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
