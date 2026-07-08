/**
 * CCTV Packages Page
 * ------------------
 * Public page showing popular CCTV packages for BM Contractors.
 *
 * Current features:
 * - Reads CCTV packages from Neon Postgres.
 * - Falls back to static package data if database is empty.
 * - English and Swahili language support.
 * - Mobile-friendly package cards.
 * - Strong call-to-action for site survey.
 *
 * Future:
 * - Add package detail pages.
 * - Add package image uploads.
 * - Add package comparison.
 */

import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CctvPackageCard } from "@/components/site/CctvPackageCard";
import { cctvPackages as staticPackages } from "@/data/packages";
import { prisma } from "@/lib/prisma";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

function asStringArray(value: unknown) {
  /**
   * Safely converts Prisma Json includedItems into string[].
   */
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is string => typeof item === "string");
}

export default async function CctvPackagesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const dbPackages = await prisma.cctvPackage.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      cameras: "asc",
    },
  });

  const packages =
    dbPackages.length > 0
      ? dbPackages.map((pkg) => ({
          slug: pkg.slug,
          titleEn: pkg.titleEn,
          titleSw: pkg.titleSw,
          cameras: pkg.cameras,
          descriptionEn: pkg.descriptionEn,
          descriptionSw: pkg.descriptionSw,
          priceFrom: pkg.priceFrom,
          includedItems: asStringArray(pkg.includedItems),
        }))
      : staticPackages.map((pkg) => ({
          slug: pkg.slug,
          titleEn: pkg.titleEn,
          titleSw: pkg.titleSw,
          cameras: pkg.cameras,
          descriptionEn: pkg.descriptionEn,
          descriptionSw: pkg.descriptionSw,
          priceFrom: null,
          includedItems: [],
        }));

  const content = {
    en: {
      label: "Popular CCTV Packages",
      title: "Choose the right CCTV package for your site",
      description:
        "Start with a common package size, then request a site survey so BM Contractors can prepare a clean quotation based on your building, coverage areas, cable distance and recording needs.",
      survey: "Request Site Survey",
      contact: "Talk to BM Team",
      whyTitle: "Why request a site survey?",
      whyText:
        "A site survey helps us recommend correct camera positions, cable routes, DVR/NVR size, HDD storage, power needs and installation materials.",
      packageNote:
        "Packages are starting guides. Final items and price depend on actual site requirements.",
      bestForTitle: "Best for homes, shops, offices and institutions",
      bestForText:
        "Whether you need basic coverage or a larger security setup, BM Contractors can guide you from planning to installation and support.",
    },
    sw: {
      label: "Package Maarufu za CCTV",
      title: "Chagua package sahihi ya CCTV kwa site yako",
      description:
        "Anza na package ya kawaida, kisha omba ukaguzi wa site ili BM Contractors tuandae quotation safi kulingana na jengo, maeneo ya coverage, umbali wa cable na mahitaji ya recording.",
      survey: "Omba Ukaguzi wa Site",
      contact: "Ongea na Timu ya BM",
      whyTitle: "Kwa nini kuomba ukaguzi wa site?",
      whyText:
        "Ukaguzi wa site hutusaidia kupendekeza sehemu sahihi za camera, njia za cable, ukubwa wa DVR/NVR, HDD, power na materials za installation.",
      packageNote:
        "Package ni mwongozo wa kuanzia. Vifaa na bei ya mwisho hutegemea mahitaji halisi ya site.",
      bestForTitle: "Inafaa kwa nyumba, maduka, ofisi na taasisi",
      bestForText:
        "Iwe unahitaji coverage ndogo au mfumo mkubwa wa usalama, BM Contractors tutakuongoza kuanzia planning mpaka installation na support.",
    },
  };

  const t = content[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-200 ring-1 ring-white/10">
                {t.label}
              </p>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                {t.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {t.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/request-site-survey?lang=${lang}`}
                  className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-red-700"
                >
                  {t.survey}
                </Link>

                <Link
                  href={`/contact?lang=${lang}`}
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  {t.contact}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-6 text-slate-950">
                <p className="text-sm font-black text-red-600">{t.whyTitle}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {t.whyText}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-bold">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    Camera Points
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    Cable Routes
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">Storage/HDD</div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    Installation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">{t.label}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  CCTV package options
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-slate-600">
                {t.packageNote}
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {packages.map((pkg) => (
                <CctvPackageCard
                  key={pkg.slug}
                  lang={lang}
                  slug={pkg.slug}
                  titleEn={pkg.titleEn}
                  titleSw={pkg.titleSw}
                  cameras={pkg.cameras}
                  descriptionEn={pkg.descriptionEn}
                  descriptionSw={pkg.descriptionSw}
                  priceFrom={pkg.priceFrom}
                  includedItems={pkg.includedItems}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-red-600 p-8 text-white shadow-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-black">{t.bestForTitle}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-red-50">
                  {t.bestForText}
                </p>
              </div>

              <Link
                href={`/request-site-survey?lang=${lang}`}
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-red-700 transition hover:bg-red-50"
              >
                {t.survey}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
