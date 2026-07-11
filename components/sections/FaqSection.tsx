/* eslint-disable @typescript-eslint/no-explicit-any */
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FaqSection({ lang, t }: { lang: string; t: any }) {
  return (
    <section className="bg-slate-50 px-4 py-16 text-slate-950 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Centered Heading Element */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-600">
            <span className="h-1.5 w-6 rounded-full bg-red-600" />
            {t.faqLabel || "FAQ"}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {t.faqTitle}
          </h2>
        </div>

        {/* Custom Bento FAQ Arrangement Accordion Track */}
        <div className="mt-12 grid gap-4">
          {t.faqItems &&
            t.faqItems.map((item: any) => (
              <article
                key={item.question}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-red-200"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                    <HelpCircle className="h-4 w-4 stroke-[1.75]" />
                  </span>

                  <div className="w-full">
                    <h3 className="text-lg font-bold tracking-tight text-slate-950 transition-colors group-hover:text-red-600">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
