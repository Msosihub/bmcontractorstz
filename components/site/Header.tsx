/**
 * Header Component
 * ----------------
 * Shared public website header/navigation for BM Contractors.
 *
 * Purpose:
 * - Provides main site navigation.
 * - Shows active page color.
 * - Adds click loading feedback using LoadingLink.
 * - Supports English/Swahili links.
 * - Uses siteConfig for brand details.
 *
 * Future:
 * - Add full mobile drawer menu.
 * - Replace BM placeholder with real logo image.
 */

import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Language } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { siteConfig } from "@/data/site";
import { LoadingLink } from "@/components/ui/LoadingLink";

type HeaderProps = {
  lang: Language;
};

export function Header({ lang }: HeaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = getDictionary(lang) as any;

  const navItems = [
    {
      label: t.nav.home,
      href: `/?lang=${lang}`,
    },
    {
      label: t.nav.services,
      href: `/services?lang=${lang}`,
    },
    {
      label: t.nav.cctvPackages,
      href: `/cctv-packages?lang=${lang}`,
    },
    {
      label: t.nav.products,
      href: `/products?lang=${lang}`,
    },
    {
      label: t.nav.projects,
      href: `/projects?lang=${lang}`,
    },
    {
      label: t.nav.support,
      href: `/support?lang=${lang}`,
    },
    {
      label: t.nav.contact,
      href: `/contact?lang=${lang}`,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <LoadingLink
          href={`/?lang=${lang}`}
          showSpinner={false}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-sm">
            BM
          </div>

          <div className="leading-tight">
            <p className="text-sm font-black text-slate-950">
              {siteConfig.shortName}
            </p>
            <p className="text-xs text-slate-500">Security & Safety</p>
          </div>
        </LoadingLink>

        <nav className="hidden items-center gap-1 text-sm font-bold text-slate-700 lg:flex">
          {navItems.map((item) => (
            <LoadingLink
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition"
              activeClassName="bg-red-50 text-red-700"
              inactiveClassName="hover:bg-slate-100 hover:text-red-600"
            >
              {item.label}
            </LoadingLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <LoadingLink
            href={`/request-site-survey?lang=${lang}`}
            className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-red-700 sm:px-5 sm:text-sm"
          >
            {t.nav.requestSurvey}
          </LoadingLink>
        </div>
      </div>
    </header>
  );
}
