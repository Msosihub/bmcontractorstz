/**
 * Site Survey Success Page
 * ------------------------
 * Confirmation page shown after customer submits a site survey request.
 *
 * Current features:
 * - Confirms request was received.
 * - Shows request ID if available.
 * - Provides WhatsApp follow-up button.
 * - Links customer back to key pages.
 * - Supports English and Swahili.
 */

import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { siteConfig } from "@/data/site";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Site Survey Request Received",
  description:
    "Your BM Contractors Tanzania site survey request has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
    id?: string;
  }>;
};

export default async function SiteSurveySuccessPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";
  const requestId = params.id || "";

  const t = {
    en: {
      label: "Request received",
      title: "Thank you. BM Contractors has received your site survey request.",
      description:
        "Our team will review your details and contact you for guidance, quotation or site survey arrangement.",
      requestId: "Request ID",
      nextTitle: "What happens next?",
      nextSteps: [
        "BM team reviews your request details.",
        "We contact you by your preferred method or available phone number.",
        "We may ask for more site details, photos or location.",
        "A site survey or quotation guidance will be arranged.",
      ],
      whatsappTitle: "Need faster follow-up?",
      whatsappText:
        "You can also send us a WhatsApp message and mention your request.",
      whatsappButton: "Follow up on WhatsApp",
      services: "View Services",
      products: "View Products",
      packages: "View CCTV Packages",
      home: "Back Home",
    },
    sw: {
      label: "Maombi yamepokelewa",
      title: "Asante. BM Contractors tumepokea maombi yako ya site survey.",
      description:
        "Timu yetu itapitia taarifa zako na kuwasiliana nawe kwa ushauri, quotation au kupanga site survey.",
      requestId: "Request ID",
      nextTitle: "Nini kinafuata?",
      nextSteps: [
        "Timu ya BM inapitia taarifa ulizotuma.",
        "Tutawasiliana nawe kupitia njia uliyopendelea au namba uliyoweka.",
        "Tunaweza kukuomba taarifa zaidi za site, picha au location.",
        "Tutapanga site survey au kutoa mwongozo wa quotation.",
      ],
      whatsappTitle: "Unahitaji follow-up ya haraka?",
      whatsappText:
        "Unaweza pia kututumia ujumbe WhatsApp na kutaja request yako.",
      whatsappButton: "Fuatilia kwa WhatsApp",
      services: "Angalia Huduma",
      products: "Angalia Bidhaa",
      packages: "Angalia CCTV Packages",
      home: "Rudi Mwanzo",
    },
  }[lang];

  const whatsappMessage = encodeURIComponent(
    lang === "sw"
      ? `Habari BM Contractors, nimejaza site survey request${
          requestId ? ` yenye ID: ${requestId}` : ""
        }. Naomba follow-up.`
      : `Hello BM Contractors, I submitted a site survey request${
          requestId ? ` with ID: ${requestId}` : ""
        }. Please follow up.`,
  );

  const whatsappUrl = `${siteConfig.whatsapp.url}?text=${whatsappMessage}`;

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />
          <div className="absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-4xl font-black shadow-2xl shadow-green-950/30">
              ✓
            </div>

            <p className="mt-8 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-green-200 ring-1 ring-white/10">
              {t.label}
            </p>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              {t.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {t.description}
            </p>

            {requestId ? (
              <div className="mx-auto mt-8 inline-flex rounded-2xl bg-white/10 px-5 py-3 text-sm font-black text-white ring-1 ring-white/10">
                {t.requestId}: {requestId}
              </div>
            ) : null}
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-sm font-black text-red-600">{t.nextTitle}</p>

              <div className="mt-6 grid gap-4">
                {t.nextSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                      {index + 1}
                    </div>

                    <p className="pt-2 text-sm font-semibold leading-6 text-slate-700">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="grid gap-5">
              <div className="rounded-[2rem] bg-green-600 p-6 text-white shadow-sm">
                <p className="text-2xl font-black">{t.whatsappTitle}</p>

                <p className="mt-3 text-sm leading-7 text-green-50">
                  {t.whatsappText}
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-green-700 transition hover:bg-green-50"
                >
                  {t.whatsappButton}
                </a>
              </div>

              <div className="grid gap-3 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <LoadingLink
                  href={`/services?lang=${lang}`}
                  className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-red-600"
                >
                  {t.services}
                </LoadingLink>

                <LoadingLink
                  href={`/products?lang=${lang}`}
                  className="rounded-full bg-slate-100 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:bg-slate-200"
                >
                  {t.products}
                </LoadingLink>

                <LoadingLink
                  href={`/cctv-packages?lang=${lang}`}
                  className="rounded-full bg-slate-100 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:bg-slate-200"
                >
                  {t.packages}
                </LoadingLink>

                <LoadingLink
                  href={`/?lang=${lang}`}
                  className="rounded-full bg-red-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-red-700"
                >
                  {t.home}
                </LoadingLink>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
