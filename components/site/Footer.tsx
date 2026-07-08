/**
 * Footer Component
 * ----------------
 * Shared public website footer for BM Contractors.
 *
 * Purpose:
 * - Shows quick links and contact details.
 * - Uses centralized siteConfig for phone/email details.
 * - Uses LoadingLink for navigation feedback.
 * - Supports language-aware links.
 */

import type { Language } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { siteConfig } from "@/data/site";
import { LoadingLink } from "@/components/ui/LoadingLink";

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
            <LoadingLink
              href={`/services?lang=${lang}`}
              className="hover:text-white"
            >
              {t.nav.services}
            </LoadingLink>

            <LoadingLink
              href={`/cctv-packages?lang=${lang}`}
              className="hover:text-white"
            >
              {t.nav.cctvPackages}
            </LoadingLink>

            <LoadingLink
              href={`/products?lang=${lang}`}
              className="hover:text-white"
            >
              {t.nav.products}
            </LoadingLink>

            <LoadingLink
              href={`/support?lang=${lang}`}
              className="hover:text-white"
            >
              {t.nav.support}
            </LoadingLink>

            <LoadingLink
              href={`/request-site-survey?lang=${lang}`}
              className="hover:text-white"
            >
              {t.nav.requestSurvey}
            </LoadingLink>

            <LoadingLink
              href={`/contact?lang=${lang}`}
              className="hover:text-white"
            >
              {t.nav.contact}
            </LoadingLink>
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

          <a
            href={siteConfig.whatsapp.url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-green-600 px-4 py-2 text-xs font-black text-white transition hover:bg-green-700"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {siteConfig.shortName}. All rights
        reserved.
      </div>
    </footer>
  );
}
