/**
 * Services Page
 * -------------
 * Public services overview page for BM Contractors.
 *
 * Current features:
 * - Reads service records from Neon Postgres.
 * - Falls back to static services if database is empty.
 * - Supports English and Swahili.
 * - Mobile-friendly cards.
 * - Strong request site survey CTA.
 *
 * Future:
 * - Add service images and icons.
 * - Add filtering.
 * - Add richer service sections.
 */

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { ServiceCard } from "@/components/site/ServiceCard";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { services as staticServices } from "@/data/services";
import { prisma } from "@/lib/prisma";
import { isLanguage, type Language } from "@/lib/i18n/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Safety Services",
  description:
    "Explore BM Contractors Tanzania services including CCTV, electric fence, gate motors, access control, networking and power backup.",
  openGraph: {
    title: "BM Contractors Tanzania Services",
    description:
      "CCTV, electric fence, gate motors, access control, networking and power backup services in Tanzania.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const dbServices = await prisma.service.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const services =
    dbServices.length > 0
      ? dbServices
      : staticServices.map((service) => ({
          ...service,
          id: service.slug,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

  const content = {
    en: {
      label: "BM Services",
      title: "Security, safety and smart system services",
      description:
        "BM Contractors provides practical solutions for homes, businesses, institutions and industrial sites. Choose a service below and request a site survey for proper guidance.",
      survey: "Request Site Survey",
      contact: "Contact BM Team",
      sectionTitle: "Our main services",
      ctaTitle: "Not sure what your site needs?",
      ctaText:
        "Tell us your location and the challenge you want to solve. Our team will guide you on the right system and quotation.",
      ctaButton: "Request Site Survey",
    },
    sw: {
      label: "Huduma za BM",
      title: "Huduma za ulinzi, usalama na mifumo smart",
      description:
        "BM Contractors tunatoa solutions kwa nyumba, biashara, taasisi na sites za viwanda. Chagua huduma hapa chini kisha omba ukaguzi wa site kwa ushauri sahihi.",
      survey: "Omba Ukaguzi wa Site",
      contact: "Wasiliana na Timu ya BM",
      sectionTitle: "Huduma zetu kuu",
      ctaTitle: "Hujui site yako inahitaji nini?",
      ctaText:
        "Tuambie location yako na changamoto unayotaka kutatua. Timu yetu itakuongoza kwenye mfumo sahihi na quotation.",
      ctaButton: "Omba Ukaguzi wa Site",
    },
  };

  const t = content[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-200 ring-1 ring-white/10">
                {t.label}
              </p>

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
                {t.title}
              </h1>

              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                {t.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LoadingLink
                  href={`/request-site-survey?lang=${lang}`}
                  className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-red-700"
                >
                  {t.survey}
                </LoadingLink>

                <LoadingLink
                  href={`/contact?lang=${lang}`}
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  {t.contact}
                </LoadingLink>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.sectionTitle}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  BM Contractors solutions
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  lang={lang}
                  slug={service.slug}
                  titleEn={service.titleEn}
                  titleSw={service.titleSw}
                  descriptionEn={service.descriptionEn}
                  descriptionSw={service.descriptionSw}
                />
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
                {t.ctaButton}
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
