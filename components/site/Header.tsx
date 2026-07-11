/**
 * Header Component
 * ----------------
 * Shared public website header/navigation for BM Contractors.
 *
 * Current features:
 * - Desktop navigation with active link state.
 * - Mobile menu with open/close button.
 * - Language switcher available on both desktop and mobile.
 * - Loading feedback on navigation links.
 * - Request Site Survey CTA.
 *
 * Future:
 * - Replace BM placeholder with real logo image.
 * - Add admin-managed header contact settings.
 */

"use client";

import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Language } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { siteConfig } from "@/data/site";
import { LoadingLink } from "@/components/ui/LoadingLink";

type HeaderProps = {
  lang: Language;
};

export function Header({ lang }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-3">
          <LoadingLink
            href={`/?lang=${lang}`}
            showSpinner={false}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-sm">
              BM
            </div>

            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-black text-slate-950">
                {siteConfig.shortName}
              </p>
              <p className="truncate text-xs text-slate-500">
                Security & Safety
              </p>
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

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />

            <LoadingLink
              href={`/request-site-survey?lang=${lang}`}
              className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
            >
              {t.nav.requestSurvey}
            </LoadingLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:bg-slate-50"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className="text-xl font-black">{isOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="border-t border-slate-200 py-4 lg:hidden">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <LoadingLink
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-black transition"
                  activeClassName="bg-red-50 text-red-700"
                  inactiveClassName="bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-red-600"
                >
                  {item.label}
                </LoadingLink>
              ))}
            </nav>

            <div className="mt-4 grid gap-3">
              <LoadingLink
                href={`/request-site-survey?lang=${lang}`}
                className="rounded-full bg-red-600 px-5 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-red-700"
              >
                {t.nav.requestSurvey}
              </LoadingLink>

              <a
                href={siteConfig.whatsapp.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-green-600 px-5 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-green-700"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
