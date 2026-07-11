/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShieldCheck, Video, MapPin } from "lucide-react";

export default function HeroSection({
  lang,
  t,
  siteConfig,
  LoadingLink,
}: {
  lang: string;
  t: any;
  siteConfig: any;
  LoadingLink: any;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-28">
      {/* Background Image Layer via Public Folder with Tech Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/bm-security-hero.jpg"
          alt="BM Contractors security systems background"
          className="h-full w-full object-cover opacity-25 mix-blend-luminosity"
        />
        {/* Soft, professional gradient masking to ensure text is highly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/85 to-slate-950" />
      </div>

      {/* Decorative High-End Ambient Lighting */}
      <div className="absolute -right-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-red-600/15 blur-[140px]" />
      <div className="absolute -bottom-40 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Left Content Column */}
        <div className="flex flex-col items-start lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-red-400 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            {t.heroLabel}
          </p>

          <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            {lang === "sw" ? (
              <>
                Mifumo ya <span className="text-red-500">usalama</span> kwa
                nyumba na biashara
              </>
            ) : (
              <>
                Professional{" "}
                <span className="text-red-500">security systems</span> for home
                & business
              </>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {t.heroDescription}
          </p>

          {/* Action Buttons: Stacked on Mobile, Rows on Desktop */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
            <LoadingLink
              href={`/request-site-survey?lang=${lang}`}
              className="w-full rounded-2xl bg-red-600 px-7 py-4 text-center text-sm font-bold text-white shadow-lg shadow-red-950/50 transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 sm:w-auto"
            >
              {t.requestSurvey}
            </LoadingLink>

            <LoadingLink
              href={`/services?lang=${lang}`}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 text-center text-sm font-bold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.08] sm:w-auto"
            >
              {t.viewServices}
            </LoadingLink>

            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noreferrer"
              className="w-full rounded-2xl bg-emerald-600 px-7 py-4 text-center text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
            >
              WhatsApp
            </a>
          </div>

          {/* Glassmorphic Stats Widget */}
          <div className="mt-12 grid w-full max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {t.stats.map((stat: any) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400 tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Media Display Frame Column */}
        <div className="relative w-full lg:col-span-5">
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-3 shadow-2xl backdrop-blur-md">
            {/* The Main High-End Hardware Frame Box */}
            <div className="overflow-hidden rounded-[1.5rem] bg-slate-900 text-slate-900">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/hero/bm-security-hero-showcase.jpg"
                  alt="Premium CCTV Camera Installation Detail"
                  className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
                />

                {/* Visual interface framing to represent actual camera overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-md bg-slate-950/80 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  CAM_01 // LIVE
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
                    <ShieldCheck className="h-3 w-3" /> Professional Framework
                  </p>
                  <h3 className="mt-3 text-xl font-black leading-tight">
                    {lang === "sw"
                      ? "Ufungaji unaozingatia viwango vya kimataifa."
                      : "Installations executed to meticulous international safety standards."}
                  </h3>
                </div>
              </div>

              {/* Dynamic Bottom Features Info-Grid */}
              <div className="grid gap-2 bg-slate-950 p-4 grid-cols-3">
                {[
                  {
                    text: lang === "sw" ? "Uchunguzi wa Site" : "Site Survey",
                    icon: MapPin,
                  },
                  {
                    text: lang === "sw" ? "Makadirio Wazi" : "Clear Pricing",
                    icon: ShieldCheck,
                  },
                  {
                    text: lang === "sw" ? "Msaada wa Kazi" : "Full Support",
                    icon: Video,
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-start rounded-xl border border-white/5 bg-white/[0.02] p-3 text-white"
                    >
                      <Icon className="h-4 w-4 text-red-500 stroke-[2]" />
                      <p className="mt-2 text-xs font-bold leading-tight text-slate-300">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
