/**
 * LanguageSwitcher Component
 * --------------------------
 * Small language switcher for English and Swahili.
 *
 * Purpose:
 * - Allows users to switch ?lang=en and ?lang=sw.
 * - Works on desktop and mobile header.
 * - Preserves the current page path.
 */

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { LoadingLink } from "@/components/ui/LoadingLink";
import type { Language } from "@/lib/i18n/config";

function buildLanguageHref(pathname: string, lang: Language) {
  /**
   * Keeps the user on the same page while changing language.
   */
  return `${pathname}?lang=${lang}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLang = searchParams.get("lang") === "sw" ? "sw" : "en";

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
      <LoadingLink
        href={buildLanguageHref(pathname, "en")}
        showSpinner={false}
        className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
          currentLang === "en"
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:text-slate-950"
        }`}
      >
        EN
      </LoadingLink>

      <LoadingLink
        href={buildLanguageHref(pathname, "sw")}
        showSpinner={false}
        className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
          currentLang === "sw"
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:text-slate-950"
        }`}
      >
        SW
      </LoadingLink>
    </div>
  );
}
