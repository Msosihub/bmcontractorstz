/**
 * Header Component
 * ----------------
 * Shared public website header/navigation for BM Contractors.
 *
 * Purpose:
 * - Provides main site navigation.
 * - Supports English/Swahili links.
 * - Uses siteConfig for brand names.
 * - Mobile-first foundation, with desktop navigation visible on large screens.
 *
 * Future:
 * - Add mobile menu drawer.
 * - Replace BM placeholder with real logo image.
 */

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Language } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { siteConfig } from "@/data/site";

type HeaderProps = {
  lang: Language;
};

export function Header({ lang }: HeaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = getDictionary(lang) as any;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
            BM
          </div>

          <div className="leading-tight">
            <p className="text-sm font-black text-slate-950">
              {siteConfig.shortName}
            </p>
            <p className="text-xs text-slate-500">Security & Safety</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          <Link href={`/?lang=${lang}`} className="hover:text-red-600">
            {t.nav.home}
          </Link>
          <Link href={`/services?lang=${lang}`} className="hover:text-red-600">
            {t.nav.services}
          </Link>
          <Link
            href={`/cctv-packages?lang=${lang}`}
            className="hover:text-red-600"
          >
            {t.nav.cctvPackages}
          </Link>
          <Link href={`/products?lang=${lang}`} className="hover:text-red-600">
            {t.nav.products}
          </Link>
          <Link href={`/projects?lang=${lang}`} className="hover:text-red-600">
            {t.nav.projects}
          </Link>
          <Link href={`/support?lang=${lang}`} className="hover:text-red-600">
            {t.nav.support}
          </Link>
          <Link href={`/contact?lang=${lang}`} className="hover:text-red-600">
            {t.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Link
            href={`/request-site-survey?lang=${lang}`}
            className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 sm:px-5 sm:text-sm"
          >
            {t.nav.requestSurvey}
          </Link>
        </div>
      </div>
    </header>
  );
}
