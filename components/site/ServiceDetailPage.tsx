/**
 * ServiceDetailPage Component
 * ---------------------------
 * Shared detail page layout for individual BM Contractors services.
 *
 * Purpose:
 * - Avoid repeating the same code in every service route.
 * - Supports English and Swahili.
 * - Shows service overview, features and CTA.
 * - Works with database service records or static fallback records.
 *
 * Future:
 * - Add real service images.
 * - Add related products/packages.
 * - Add admin-managed richer content sections.
 */

import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { getServiceBySlug } from "@/data/services";
import { prisma } from "@/lib/prisma";
import type { Language } from "@/lib/i18n/config";

type ServiceDetailPageProps = {
  lang: Language;
  slug: string;
};

function asStringArray(value: unknown) {
  /**
   * Safely converts Prisma Json feature fields into string[].
   */
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is string => typeof item === "string");
}

export async function ServiceDetailPage({
  lang,
  slug,
}: ServiceDetailPageProps) {
  const dbService = await prisma.service.findFirst({
    where: {
      slug,
      isPublished: true,
    },
  });

  const staticService = getServiceBySlug(slug);

  const service =
    dbService ||
    (staticService
      ? {
          ...staticService,
          id: staticService.slug,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : null);

  if (!service) {
    notFound();
  }

  const title =
    lang === "sw" ? service.titleSw || service.titleEn : service.titleEn;

  const eyebrow =
    lang === "sw"
      ? service.eyebrowSw || service.eyebrowEn || ""
      : service.eyebrowEn || "";

  const description =
    lang === "sw"
      ? service.descriptionSw || service.descriptionEn || ""
      : service.descriptionEn || "";

  const content =
    lang === "sw"
      ? service.contentSw || service.contentEn || ""
      : service.contentEn || "";

  const features =
    lang === "sw"
      ? asStringArray(service.featuresSw).length > 0
        ? asStringArray(service.featuresSw)
        : asStringArray(service.featuresEn)
      : asStringArray(service.featuresEn);

  const labels = {
    en: {
      features: "What we can help with",
      survey: "Request Site Survey",
      contact: "Contact BM Team",
      ctaTitle: "Need this service?",
      ctaText:
        "Request a site survey and our team will guide you on equipment, installation materials, labour and quotation.",
    },
    sw: {
      features: "Tunachoweza kukusaidia",
      survey: "Omba Ukaguzi wa Site",
      contact: "Wasiliana na Timu ya BM",
      ctaTitle: "Unahitaji huduma hii?",
      ctaText:
        "Omba ukaguzi wa site na timu yetu itakuongoza kuhusu vifaa, materials za installation, labour na quotation.",
    },
  };

  const t = labels[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              {eyebrow ? (
                <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-200 ring-1 ring-white/10">
                  {eyebrow}
                </p>
              ) : null}

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
                {title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LoadingLink
                  href={`/request-site-survey?lang=${lang}&service=${slug}`}
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

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
              {service.imageUrl ? (
                <img
                  src={service.imageUrl}
                  alt={title}
                  className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-white/10 ring-1 ring-white/10">
                  <div className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white text-2xl font-black text-slate-950">
                      BM
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-300">
                      {title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              {eyebrow ? (
                <p className="text-sm font-black text-red-600">{eyebrow}</p>
              ) : null}

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                {title}
              </h2>

              <p className="mt-5 leading-8 text-slate-600">{content}</p>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
              <h3 className="text-2xl font-black">{t.features}</h3>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200"
                  >
                    <span className="mr-2 text-red-600">●</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-red-600 p-8 text-white shadow-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-black">{t.ctaTitle}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-red-50">
                  {t.ctaText}
                </p>
              </div>

              <LoadingLink
                href={`/request-site-survey?lang=${lang}&service=${slug}`}
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-red-700 transition hover:bg-red-50"
              >
                {t.survey}
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
