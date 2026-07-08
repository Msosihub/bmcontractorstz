/**
 * Support Page
 * ------------
 * Public help center page for BM Contractors customers.
 *
 * Current features:
 * - Reads support articles from Neon Postgres.
 * - Falls back to static support articles if database is empty.
 * - Supports English and Swahili.
 * - Mobile-friendly article grid.
 *
 * Future:
 * - Add article search.
 * - Add category filtering.
 * - Admin-managed article create/edit/delete.
 */

import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SupportArticleCard } from "@/components/site/SupportArticleCard";
import { supportArticles as staticSupportArticles } from "@/data/support";
import { prisma } from "@/lib/prisma";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function SupportPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const dbArticles = await prisma.supportArticle.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const articles =
    dbArticles.length > 0
      ? dbArticles
      : staticSupportArticles.map((article) => ({
          ...article,
          id: article.slug,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

  const content = {
    en: {
      label: "BM Help Center",
      title: "Helpful guides for security and safety customers",
      description:
        "Find simple answers about CCTV packages, site surveys, electric fence, gate motors, access control and how to contact BM Contractors.",
      requestSurvey: "Request Site Survey",
      contact: "Contact Support",
      articlesTitle: "Support articles",
      ctaTitle: "Still need help?",
      ctaText:
        "Send us your question or request a site survey. Our team will guide you on the right solution.",
      ctaButton: "Contact BM Team",
    },
    sw: {
      label: "BM Help Center",
      title: "Miongozo rahisi kwa wateja wa ulinzi na usalama",
      description:
        "Pata majibu kuhusu package za CCTV, ukaguzi wa site, electric fence, gate motors, access control na jinsi ya kuwasiliana na BM Contractors.",
      requestSurvey: "Omba Ukaguzi wa Site",
      contact: "Wasiliana na Support",
      articlesTitle: "Support articles",
      ctaTitle: "Bado unahitaji msaada?",
      ctaText:
        "Tuma swali lako au omba ukaguzi wa site. Timu yetu itakuongoza kwenye solution sahihi.",
      ctaButton: "Wasiliana na Timu ya BM",
    },
  };

  const t = content[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

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
                <Link
                  href={`/request-site-survey?lang=${lang}`}
                  className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-red-700"
                >
                  {t.requestSurvey}
                </Link>

                <Link
                  href={`/contact?lang=${lang}`}
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  {t.contact}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.articlesTitle}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Customer guidance
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <SupportArticleCard
                  key={article.slug}
                  lang={lang}
                  slug={article.slug}
                  categoryEn={article.categoryEn}
                  categorySw={article.categorySw}
                  titleEn={article.titleEn}
                  titleSw={article.titleSw}
                  summaryEn={article.summaryEn}
                  summarySw={article.summarySw}
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

              <Link
                href={`/contact?lang=${lang}`}
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-red-700 transition hover:bg-red-50"
              >
                {t.ctaButton}
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
