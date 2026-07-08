/**
 * Support Article Detail Page
 * ---------------------------
 * Shows one full support/help article.
 *
 * Current features:
 * - Reads article by slug from Neon Postgres.
 * - Falls back to static support data if article is not in database.
 * - Supports English and Swahili.
 * - Mobile-friendly article reading layout.
 *
 * Future:
 * - Add related articles.
 * - Add article images.
 * - Add admin-managed publishing.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSupportArticleBySlug } from "@/data/support";
import { prisma } from "@/lib/prisma";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
};

/**
 * Dynamic metadata for support articles.
 * This gives every support article its own SEO title and description.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  const article = await prisma.supportArticle.findFirst({
    where: {
      slug: resolvedParams.slug,
      isPublished: true,
    },
  });

  const staticArticle = getSupportArticleBySlug(resolvedParams.slug);

  const title = article?.titleEn || staticArticle?.titleEn || "Support Article";

  const description =
    article?.summaryEn ||
    staticArticle?.summaryEn ||
    "Helpful security and safety support article from BM Contractors Tanzania.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | BM Contractors Tanzania`,
      description,
      images: ["/og/bm-contractors-og.jpg"],
    },
  };
}

export default async function SupportArticlePage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang: Language = isLanguage(resolvedSearchParams.lang)
    ? resolvedSearchParams.lang
    : "en";

  const dbArticle = await prisma.supportArticle.findFirst({
    where: {
      slug: resolvedParams.slug,
      isPublished: true,
    },
  });

  const staticArticle = getSupportArticleBySlug(resolvedParams.slug);

  const article =
    dbArticle ||
    (staticArticle
      ? {
          ...staticArticle,
          id: staticArticle.slug,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : null);

  if (!article) {
    notFound();
  }

  const category =
    lang === "sw"
      ? article.categorySw || article.categoryEn
      : article.categoryEn;
  const title =
    lang === "sw" ? article.titleSw || article.titleEn : article.titleEn;
  const summary =
    lang === "sw"
      ? article.summarySw || article.summaryEn || ""
      : article.summaryEn || "";
  const content =
    lang === "sw"
      ? article.contentSw || article.contentEn || ""
      : article.contentEn || "";

  const labels = {
    en: {
      back: "Back to Support",
      needHelp: "Need more help?",
      contact: "Contact BM Team",
      survey: "Request Site Survey",
    },
    sw: {
      back: "Rudi Support",
      needHelp: "Unahitaji msaada zaidi?",
      contact: "Wasiliana na Timu ya BM",
      survey: "Omba Ukaguzi wa Site",
    },
  };

  const t = labels[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-950 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <Link
            href={`/support?lang=${lang}`}
            className="text-sm font-black text-red-600 hover:text-red-700"
          >
            ← {t.back}
          </Link>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-red-600">
            {category}
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">{summary}</p>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <p className="whitespace-pre-line text-base leading-8 text-slate-700">
              {content}
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">{t.needHelp}</h2>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/contact?lang=${lang}`}
                className="rounded-full bg-red-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-red-700"
              >
                {t.contact}
              </Link>

              <Link
                href={`/request-site-survey?lang=${lang}`}
                className="rounded-full bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                {t.survey}
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
