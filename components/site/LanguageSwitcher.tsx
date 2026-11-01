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
import { switchLanguageHref } from "@/lib/i18n/links";


export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLang = searchParams.get("lang") === "sw" ? "sw" : "en";

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
      <a
        href={switchLanguageHref(pathname, searchParams.toString(), "en")}
        className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
          currentLang === "en"
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:text-slate-950"
        }`}
        hrefLang="en" lang="en" aria-label="English" aria-current={currentLang === "en" ? "page" : undefined}
      >
        <span className="sm:hidden">EN</span><span className="hidden sm:inline">English</span>
      </a>

      <a
        href={switchLanguageHref(pathname, searchParams.toString(), "sw")}
        className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
          currentLang === "sw"
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:text-slate-950"
        }`}
        hrefLang="sw" lang="sw" aria-label="Kiswahili" aria-current={currentLang === "sw" ? "page" : undefined}
      >
        <span className="sm:hidden">SW</span><span className="hidden sm:inline">Kiswahili</span>
      </a>
    </div>
  );
}
