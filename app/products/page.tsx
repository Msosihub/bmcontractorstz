/**
 * Products Page
 * -------------
 * Public product catalog page for BM Contractors.
 *
 * Current features:
 * - Reads real products and categories from Neon Postgres.
 * - Falls back to static category guidance if database is still empty.
 * - Supports English and Swahili.
 * - Mobile-friendly responsive layout.
 * - Request quote/site survey CTA.
 *
 * Future:
 * - Add product detail pages.
 * - Add product image uploads.
 * - Add product filtering/search.
 * - Add small ecommerce/cart flow.
 */

import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { productCategories } from "@/data/products";
import { prisma } from "@/lib/prisma";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

function formatPriceLabel(price: number | null, lang: Language) {
  /**
   * Public price label.
   * If price is missing, show request price text.
   */
  if (!price) {
    return lang === "sw" ? "Omba bei" : "Request price";
  }

  return `TZS ${price.toLocaleString("en-US")}`;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const dbCategories = await prisma.productCategory.findMany({
    include: {
      products: {
        where: {
          isPublished: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const content = {
    en: {
      label: "Security & Safety Products",
      title: "Products for safer homes, offices and businesses",
      description:
        "Explore CCTV, electric fence, gate motors, access control, networking and power backup products. Request a quote and our team will guide you based on your site needs.",
      requestSurvey: "Request Site Survey",
      contact: "Contact Sales",
      categoriesTitle: "Product categories",
      featuredTitle: "Available products",
      featuredText:
        "These are products currently listed by BM Contractors. Final quotation may depend on brand, model, quantity, installation materials and availability.",
      quoteTitle: "Need product prices or installation quotation?",
      quoteText:
        "Send us your requirements and BM Contractors will prepare a clean quotation for products, installation materials and labour.",
      quoteButton: "Request Quotation",
      emptyTitle: "Products are being prepared",
      emptyText:
        "BM Contractors is preparing the product catalog. You can still request a quote or site survey.",
      staticCategoriesTitle: "Main product areas",
    },
    sw: {
      label: "Bidhaa za Ulinzi na Usalama",
      title: "Bidhaa kwa nyumba, ofisi na biashara salama zaidi",
      description:
        "Angalia bidhaa za CCTV, electric fence, gate motors, access control, networking na power backup. Omba quotation na timu yetu itakuongoza kulingana na mahitaji ya site.",
      requestSurvey: "Omba Ukaguzi wa Site",
      contact: "Wasiliana na Sales",
      categoriesTitle: "Makundi ya bidhaa",
      featuredTitle: "Bidhaa zilizopo",
      featuredText:
        "Hizi ni bidhaa zilizowekwa na BM Contractors. Quotation ya mwisho inaweza kutegemea brand, model, quantity, materials za installation na upatikanaji.",
      quoteTitle: "Unahitaji bei za bidhaa au quotation ya installation?",
      quoteText:
        "Tuma mahitaji yako, BM Contractors tutakuandalia quotation safi ya bidhaa, materials na labour.",
      quoteButton: "Omba Quotation",
      emptyTitle: "Bidhaa zinaandaliwa",
      emptyText:
        "BM Contractors tunaandaa product catalog. Bado unaweza kuomba quotation au ukaguzi wa site.",
      staticCategoriesTitle: "Makundi makuu ya bidhaa",
    },
  };

  const t = content[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20">
          {/* Minimal background accents for a clean premium feel. */}
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-red-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700">
                {t.label}
              </p>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                {t.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
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
                  className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-50"
                >
                  {t.contact}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl">
              <div className="grid grid-cols-2 gap-3">
                {(dbCategories.length > 0
                  ? dbCategories.slice(0, 6).map((category) => ({
                      slug: category.slug,
                      name:
                        lang === "sw"
                          ? category.nameSw || category.nameEn
                          : category.nameEn,
                      description:
                        category.description ||
                        (lang === "sw"
                          ? "Bidhaa za BM Contractors"
                          : "BM Contractors products"),
                    }))
                  : productCategories.slice(0, 6).map((category) => ({
                      slug: category.slug,
                      name: lang === "sw" ? category.nameSw : category.nameEn,
                      description:
                        lang === "sw"
                          ? category.descriptionSw
                          : category.descriptionEn,
                    }))
                ).map((category) => (
                  <div
                    key={category.slug}
                    className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10"
                  >
                    <p className="text-sm font-black">{category.name}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-300">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div>
              <p className="text-sm font-black text-red-600">
                {t.categoriesTitle}
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                {dbCategories.length > 0
                  ? t.categoriesTitle
                  : t.staticCategoriesTitle}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(dbCategories.length > 0
                ? dbCategories.map((category) => ({
                    slug: category.slug,
                    name:
                      lang === "sw"
                        ? category.nameSw || category.nameEn
                        : category.nameEn,
                    description:
                      category.description ||
                      (lang === "sw"
                        ? "Bidhaa na solutions kutoka BM Contractors."
                        : "Products and solutions from BM Contractors."),
                    count: category.products.length,
                  }))
                : productCategories.map((category) => ({
                    slug: category.slug,
                    name: lang === "sw" ? category.nameSw : category.nameEn,
                    description:
                      lang === "sw"
                        ? category.descriptionSw
                        : category.descriptionEn,
                    count: null,
                  }))
              ).map((category) => (
                <article
                  key={category.slug}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-xl font-black">{category.name}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {category.description}
                  </p>

                  {category.count !== null ? (
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-red-600">
                      {category.count} products
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.featuredTitle}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Products customers ask for
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-slate-600">
                {t.featuredText}
              </p>
            </div>

            {products.length === 0 ? (
              <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center">
                <h3 className="text-2xl font-black">{t.emptyTitle}</h3>
                <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
                  {t.emptyText}
                </p>
                <Link
                  href={`/request-site-survey?lang=${lang}`}
                  className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white hover:bg-red-700"
                >
                  {t.requestSurvey}
                </Link>
              </div>
            ) : (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    lang={lang}
                    slug={product.slug}
                    name={product.name}
                    brand={product.brand || undefined}
                    categoryName={
                      product.category
                        ? lang === "sw"
                          ? product.category.nameSw || product.category.nameEn
                          : product.category.nameEn
                        : "Product"
                    }
                    summaryEn={
                      product.description ||
                      "Product available from BM Contractors."
                    }
                    summarySw={
                      product.description ||
                      "Bidhaa inapatikana BM Contractors."
                    }
                    priceLabelEn={formatPriceLabel(product.price, "en")}
                    priceLabelSw={formatPriceLabel(product.price, "sw")}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-black">{t.quoteTitle}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  {t.quoteText}
                </p>
              </div>

              <Link
                href={`/request-site-survey?lang=${lang}`}
                className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-red-700"
              >
                {t.quoteButton}
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
