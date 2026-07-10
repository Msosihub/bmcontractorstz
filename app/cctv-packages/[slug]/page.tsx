/**
 * CCTV Package Detail Page
 * ------------------------
 * Public detail page for each CCTV package.
 *
 * Current features:
 * - Reads package by slug from Neon.
 * - Shows cameras, included items, description and price.
 * - Generates package-specific SEO metadata.
 * - Gives customer clear CTA to request site survey.
 * - Includes WhatsApp package inquiry.
 *
 * Future:
 * - Package image.
 * - Package add-ons.
 * - Recommended products.
 * - Dynamic package builder.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { siteConfig } from "@/data/site";
import { prisma } from "@/lib/prisma";
import { isLanguage, type Language } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
};

function parseIncludedItems(value: unknown) {
  /**
   * Converts Prisma Json includedItems into safe string array.
   */
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is string => typeof item === "string");
}

function formatPrice(value: number | null, lang: Language) {
  /**
   * Formats CCTV package price.
   */
  if (!value) {
    return lang === "sw"
      ? "Bei baada ya site survey"
      : "Price after site survey";
  }

  return `TZS ${value.toLocaleString("en-US")}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  const pkg = await prisma.cctvPackage.findFirst({
    where: {
      slug: resolvedParams.slug,
      isPublished: true,
    },
  });

  if (!pkg) {
    return {
      title: "CCTV Package",
      description: "CCTV package from BM Contractors Tanzania.",
    };
  }

  const title = `${pkg.titleEn} in Tanzania`;

  const description =
    pkg.descriptionEn ||
    `${pkg.cameras} camera CCTV package for homes, shops, offices and businesses. Request BM Contractors site survey for accurate quotation.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | BM Contractors Tanzania`,
      description,
      images: ["/og/bm-contractors-og.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BM Contractors Tanzania`,
      description,
      images: ["/og/bm-contractors-og.jpg"],
    },
  };
}

export default async function CctvPackageDetailPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang: Language = isLanguage(resolvedSearchParams.lang)
    ? resolvedSearchParams.lang
    : "en";

  const pkg = await prisma.cctvPackage.findFirst({
    where: {
      slug: resolvedParams.slug,
      isPublished: true,
    },
  });

  if (!pkg) {
    notFound();
  }

  const relatedPackages = await prisma.cctvPackage.findMany({
    where: {
      isPublished: true,
      NOT: {
        id: pkg.id,
      },
    },
    orderBy: {
      cameras: "asc",
    },
    take: 4,
  });

  const includedItems = parseIncludedItems(pkg.includedItems);

  const title = lang === "sw" ? pkg.titleSw || pkg.titleEn : pkg.titleEn;

  const description =
    lang === "sw"
      ? pkg.descriptionSw || pkg.descriptionEn
      : pkg.descriptionEn || pkg.descriptionSw;

  const labels = {
    en: {
      back: "Back to CCTV Packages",
      label: "CCTV Package",
      cameras: "Cameras",
      price: "Price",
      included: "What may be included",
      request: "Request site survey for this package",
      whatsapp: "Ask on WhatsApp",
      overview: "Package overview",
      noteTitle: "Important note",
      noteText:
        "Final price depends on camera type, cable distance, DVR/NVR, hard disk size, power supply, installation materials and site condition.",
      related: "Other CCTV packages",
      viewPackage: "View package",
    },
    sw: {
      back: "Rudi kwenye CCTV Packages",
      label: "CCTV Package",
      cameras: "Camera",
      price: "Bei",
      included: "Vinavyoweza kuhusika",
      request: "Omba site survey kwa package hii",
      whatsapp: "Uliza WhatsApp",
      overview: "Maelezo ya package",
      noteTitle: "Muhimu kufahamu",
      noteText:
        "Bei ya mwisho hutegemea aina ya camera, umbali wa cable, DVR/NVR, ukubwa wa hard disk, power supply, materials na hali ya site.",
      related: "Package nyingine za CCTV",
      viewPackage: "Angalia package",
    },
  };

  const t = labels[lang];

  const whatsappText = encodeURIComponent(
    lang === "sw"
      ? `Habari BM Contractors, naomba maelezo na bei ya ${title}.`
      : `Hello BM Contractors, I would like details and pricing for ${title}.`,
  );

  const whatsappUrl = `${siteConfig.whatsapp.url}?text=${whatsappText}`;

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />
          <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <LoadingLink
              href={`/cctv-packages?lang=${lang}`}
              className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white ring-1 ring-white/10 transition hover:bg-white/15"
            >
              ← {t.back}
            </LoadingLink>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                  {t.label}
                </p>

                <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
                  {title}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {description ||
                    (lang === "sw"
                      ? "Package ya CCTV kwa nyumba, biashara, ofisi au taasisi. Site survey husaidia kutoa quotation sahihi."
                      : "CCTV package for homes, businesses, offices or institutions. A site survey helps produce an accurate quotation.")}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LoadingLink
                    href={`/request-site-survey?lang=${lang}&package=${pkg.slug}`}
                    className="w-full rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-red-700 sm:w-auto"
                  >
                    {t.request}
                  </LoadingLink>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full rounded-full bg-green-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-green-700 sm:w-auto"
                  >
                    {t.whatsapp}
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
                <div className="rounded-[1.5rem] bg-white p-6 text-slate-950">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-slate-950 text-3xl font-black text-white">
                    {pkg.cameras}
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                        {t.cameras}
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-950">
                        {pkg.cameras}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                        {t.price}
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-950">
                        {formatPrice(pkg.priceFrom, lang)}
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                      <p className="text-sm font-black text-red-300">
                        {t.noteTitle}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {t.noteText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black text-red-600">{t.overview}</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                {title}
              </h2>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
              <p className="text-base leading-8 text-slate-700">
                {description ||
                  (lang === "sw"
                    ? "Package hii inaweza kubadilishwa kulingana na mahitaji ya site yako."
                    : "This package can be adjusted depending on your site requirements.")}
              </p>

              {includedItems.length > 0 ? (
                <div className="mt-8">
                  <h3 className="text-xl font-black text-slate-950">
                    {t.included}
                  </h3>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {includedItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-red-600" />
                        <p className="text-sm font-semibold leading-6 text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {relatedPackages.length > 0 ? (
          <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-black text-red-600">{t.related}</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                    {lang === "sw"
                      ? "Chagua package nyingine"
                      : "Compare other packages"}
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
                {relatedPackages.map((related) => {
                  const relatedTitle =
                    lang === "sw"
                      ? related.titleSw || related.titleEn
                      : related.titleEn;

                  return (
                    <LoadingLink
                      key={related.slug}
                      href={`/cctv-packages/${related.slug}?lang=${lang}`}
                      className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-white">
                        {related.cameras}
                      </div>

                      <h3 className="mt-5 text-lg font-black text-slate-950">
                        {relatedTitle}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {formatPrice(related.priceFrom, lang)}
                      </p>

                      <p className="mt-5 text-sm font-black text-red-600">
                        {t.viewPackage} →
                      </p>
                    </LoadingLink>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-red-600 p-8 text-white shadow-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-black">{t.noteTitle}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-red-50">
                  {t.noteText}
                </p>
              </div>

              <LoadingLink
                href={`/request-site-survey?lang=${lang}&package=${pkg.slug}`}
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-red-700 transition hover:bg-red-50"
              >
                {t.request}
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
