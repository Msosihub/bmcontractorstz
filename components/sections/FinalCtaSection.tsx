/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function FinalCtaSection({
  lang,
  t,
  LoadingLink,
}: {
  lang: string;
  t: any;
  LoadingLink: any;
}) {
  return (
    <section className="bg-slate-50 px-4 pb-16 text-white sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950 p-8 shadow-2xl sm:p-12 lg:p-16">
          {/* Ambient Corner Flare Mesh */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Core Message Area */}
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5" /> Security Commissioning
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:leading-[1.1]">
                {t.finalTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                {t.finalText}
              </p>
            </div>

            {/* High Impact Call-to-action block wrapper */}
            <div className="flex lg:col-span-4 lg:justify-end">
              <LoadingLink
                href={`/request-site-survey?lang=${lang}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-center text-sm font-black text-white shadow-lg shadow-red-950/50 transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 sm:w-auto"
              >
                {t.finalButton}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </LoadingLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
