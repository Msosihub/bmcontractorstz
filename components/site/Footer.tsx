/**
 * Footer Component
 * ----------------
 * Shared public website footer for BM Contractors.
 *
 * Purpose:
 * - Shows quick links and contact details.
 * - Uses centralized siteConfig for phone/email details.
 * - Supports language-aware links.
 */

import Link from "next/link";
import type { Language } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { siteConfig } from "@/data/site";

type FooterProps = {
  lang: Language;
};

export function Footer({ lang }: FooterProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = getDictionary(lang) as any;

  const footerText =
    lang === "sw"
      ? "Huduma za security, safety, networking na smart systems kwa nyumba, biashara na taasisi Tanzania."
      : "Security, safety, networking and smart system solutions for homes, businesses and institutions across Tanzania.";

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-xl font-black">{siteConfig.shortName}</h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            {footerText}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {siteConfig.services.slice(0, 4).map((service) => (
              <span
                key={service}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 ring-1 ring-white/10"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold">Quick Links</h3>

          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link href={`/services?lang=${lang}`}>{t.nav.services}</Link>
            <Link href={`/cctv-packages?lang=${lang}`}>
              {t.nav.cctvPackages}
            </Link>
            <Link href={`/products?lang=${lang}`}>{t.nav.products}</Link>
            <Link href={`/support?lang=${lang}`}>{t.nav.support}</Link>
            <Link href={`/request-site-survey?lang=${lang}`}>
              {t.nav.requestSurvey}
            </Link>
            <Link href={`/contact?lang=${lang}`}>{t.nav.contact}</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold">Contact</h3>

          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <p>WhatsApp: {siteConfig.whatsapp.label}</p>

            {siteConfig.phones.map((phone) => (
              <p key={phone.raw}>
                {phone.type}: {phone.label}
              </p>
            ))}

            <p>Email: {siteConfig.email}</p>
            <p>{siteConfig.location.country}</p>
          </div>

          <Link
            href={siteConfig.whatsapp.url}
            className="mt-5 inline-flex rounded-full bg-green-600 px-4 py-2 text-xs font-black text-white hover:bg-green-700"
          >
            Chat WhatsApp
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {siteConfig.shortName}. All rights
        reserved.
      </div>
    </footer>
  );
}
