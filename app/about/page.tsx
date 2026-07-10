/**
 * About Page
 * ----------
 * Public company introduction page for BM Contractors Tanzania.
 *
 * Purpose:
 * - Builds trust with customers.
 * - Explains what BM Contractors does.
 * - Supports SEO for security/safety services in Tanzania.
 */

import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { siteConfig } from "@/data/site";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "About BM Contractors Tanzania",
  description:
    "Learn about BM Engineering Contractors LTD, a Tanzania-based security and safety systems company offering CCTV, electric fence, gate motors, access control, networking and power backup solutions.",
  openGraph: {
    title: "About BM Contractors Tanzania",
    description:
      "Security and safety systems company in Tanzania providing CCTV, electric fence, gate motors, access control, networking and power backup solutions.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function AboutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const t = {
    en: {
      label: "About BM Contractors",
      title: "Practical security and safety solutions for Tanzanian sites",
      description:
        "BM Engineering Contractors LTD, also known as BM Contractors Tanzania, helps homes, shops, offices, businesses and institutions plan and install reliable security and safety systems.",
      missionTitle: "Our mission",
      missionText:
        "To help customers choose the right systems through practical site guidance, clear quotations, professional installation and reliable after-sales support.",
      servicesTitle: "What we focus on",
      services: [
        "CCTV camera systems",
        "Electric fence installation",
        "Gate motor automation",
        "Access control systems",
        "Networking and internet setup",
        "UPS and power backup solutions",
      ],
      approachTitle: "Our approach",
      approachItems: [
        "Understand the site before final recommendation",
        "Guide customers before buying equipment",
        "Prepare clear and practical quotations",
        "Install systems neatly and professionally",
        "Support customers after installation",
      ],
      ctaTitle: "Need help choosing the right system?",
      ctaText:
        "Request a site survey and BM Contractors will guide you based on your location, property type and security needs.",
      cta: "Request Site Survey",
    },
    sw: {
      label: "Kuhusu BM Contractors",
      title: "Security na safety solutions kwa sites za Tanzania",
      description:
        "BM Engineering Contractors LTD, inayojulikana pia kama BM Contractors Tanzania, inasaidia nyumba, maduka, ofisi, biashara na taasisi kupanga na kufunga mifumo ya usalama.",
      missionTitle: "Dhamira yetu",
      missionText:
        "Kuwasaidia wateja kuchagua mifumo sahihi kupitia ushauri wa site, quotation inayoeleweka, installation ya kitaalamu na support baada ya kazi.",
      servicesTitle: "Tunachofocus",
      services: [
        "Mifumo ya CCTV camera",
        "Electric fence installation",
        "Gate motor automation",
        "Access control systems",
        "Networking na internet setup",
        "UPS na power backup solutions",
      ],
      approachTitle: "Namna tunavyofanya kazi",
      approachItems: [
        "Kuelewa site kabla ya ushauri wa mwisho",
        "Kumwongoza mteja kabla ya kununua vifaa",
        "Kuandaa quotation safi na ya vitendo",
        "Kufanya installation kwa mpangilio mzuri",
        "Kumsupport mteja baada ya installation",
      ],
      ctaTitle: "Unahitaji msaada kuchagua mfumo sahihi?",
      ctaText:
        "Omba site survey na BM Contractors watakuongoza kulingana na location, aina ya eneo na mahitaji yako ya usalama.",
      cta: "Omba Ukaguzi wa Site",
    },
  }[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/25 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-200 ring-1 ring-white/10">
              {t.label}
            </p>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {t.description}
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black text-red-600">
                {t.missionTitle}
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                {siteConfig.shortName}
              </h2>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
              <p className="text-base leading-8 text-slate-700">
                {t.missionText}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              {t.servicesTitle}
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.services.map((service) => (
                <div
                  key={service}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="block h-2 w-8 rounded-full bg-red-600" />
                  <p className="mt-4 text-lg font-black text-slate-950">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-black text-red-600">
                {t.approachTitle}
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                {lang === "sw"
                  ? "Site kwanza, quotation baadae"
                  : "Site first, quotation after"}
              </h2>
            </div>

            <div className="grid gap-4">
              {t.approachItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-red-600" />
                  <p className="font-semibold leading-7 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-red-600 p-8 text-white shadow-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-black">{t.ctaTitle}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-red-50">
                  {t.ctaText}
                </p>
              </div>

              <LoadingLink
                href={`/request-site-survey?lang=${lang}`}
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-red-700 transition hover:bg-red-50"
              >
                {t.cta}
              </LoadingLink>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
