/**
 * BM Assistant Popup
 * ------------------
 * Soft customer help popup for the public website.
 *
 * Purpose:
 * - Gives visitors quick action options.
 * - Opens after a short delay.
 * - Can be closed for the current browser session.
 */

"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";
import { LoadingLink } from "@/components/ui/LoadingLink";

type BmAssistantPopupProps = {
  lang: Language;
};

export function BmAssistantPopup({ lang }: BmAssistantPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("bm_assistant_dismissed");

    if (dismissed) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 5500);

    return () => window.clearTimeout(timer);
  }, []);

  function closePopup() {
    sessionStorage.setItem("bm_assistant_dismissed", "1");
    setIsOpen(false);
  }

  if (!isOpen) return null;

  const t = {
    en: {
      title: "BM Support",
      status: "Online · Site Survey Help",
      intro:
        "Karibu. Need help with CCTV, electric fence, gate motor or product price?",
      survey: "Request Site Survey",
      packages: "CCTV Packages",
      products: "Products",
      whatsapp: "WhatsApp BM",
    },
    sw: {
      title: "BM Support",
      status: "Online · Site Survey Help",
      intro:
        "Karibu. Unahitaji msaada wa CCTV, electric fence, gate motor au bei ya bidhaa?",
      survey: "Omba Site Survey",
      packages: "CCTV Packages",
      products: "Bidhaa",
      whatsapp: "WhatsApp BM",
    },
  }[lang];

  return (
    <div className="fixed bottom-20 right-4 z-[60] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 text-white shadow-2xl shadow-black/40 sm:bottom-24 sm:right-6">
      <div className="relative p-5">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/30 blur-2xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-lg font-black">
              BM
            </div>

            <div>
              <p className="font-black">{t.title}</p>
              <p className="mt-1 text-xs font-bold text-green-300">
                ● {t.status}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closePopup}
            className="rounded-full bg-white/10 px-3 py-1 text-sm font-black text-white hover:bg-white/20"
            aria-label="Close popup"
          >
            ×
          </button>
        </div>

        <p className="relative mt-5 text-sm leading-7 text-slate-300">
          {t.intro}
        </p>

        <div className="relative mt-5 grid gap-2">
          <LoadingLink
            href={`/request-site-survey?lang=${lang}`}
            className="rounded-full bg-red-600 px-4 py-3 text-center text-sm font-black text-white hover:bg-red-700"
          >
            {t.survey}
          </LoadingLink>

          <div className="grid grid-cols-2 gap-2">
            <LoadingLink
              href={`/cctv-packages?lang=${lang}`}
              className="rounded-full bg-white/10 px-4 py-3 text-center text-xs font-black text-white hover:bg-white/15"
            >
              {t.packages}
            </LoadingLink>

            <LoadingLink
              href={`/products?lang=${lang}`}
              className="rounded-full bg-white/10 px-4 py-3 text-center text-xs font-black text-white hover:bg-white/15"
            >
              {t.products}
            </LoadingLink>
          </div>

          <a
            href={siteConfig.whatsapp.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-green-600 px-4 py-3 text-center text-sm font-black text-white hover:bg-green-700"
          >
            {t.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
