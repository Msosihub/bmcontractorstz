/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

export default function BrandTrustSection({
  lang,
  t,
}: {
  lang: string;
  t: any;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-24">
      {/* Precision Ambient Red Backdrop Beam */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Text Block */}
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-400">
              <span className="h-1.5 w-6 rounded-full bg-red-500" />
              {t.brandSupportLabel ||
                (lang === "sw" ? "Washirika Wetu" : "Enterprise Ecosystem")}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:leading-[1.15]">
              {t.brandSupportTitle}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-400">
              {t.brandSupportText}
            </p>
          </div>

          {/* Right Cards Cluster - Upgraded into premium frosted bento items */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {t.brandSupportItems &&
              t.brandSupportItems.map((item: any, index: any) => (
                <article
                  key={item}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400 group-hover:text-red-400 transition-colors">
                      <Cpu className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500">
                      PARTNER_0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                    {item}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {lang === "sw"
                      ? "Mifumo iliyoidhinishwa kwa quotation na ushauri wa kitaalamu."
                      : "Verified components backed by manufacturer warranty channels."}
                  </p>

                  {/* Micro accent marker */}
                  <span className="absolute bottom-0 left-6 right-6 h-[2px] scale-x-0 bg-red-500 transition-transform duration-300 group-hover:scale-x-100" />
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
