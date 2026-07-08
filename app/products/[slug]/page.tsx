/**
 * Product Detail Page
 * -------------------
 * Public product detail page for BM Contractors product catalog.
 *
 * Current features:
 * - Reads product by slug from Neon.
 * - Shows product name, brand, category, price and description.
 * - Shows request price/site survey CTA.
 * - Shows WhatsApp CTA.
 * - Shows related products from the same category.
 * - Generates product-specific SEO metadata.
 *
 * Future:
 * - Product images.
 * - Product specifications.
 * - Related CCTV packages.
 * - WhatsApp direct product inquiry message.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { ProductCard } from "@/components/site/ProductCard";
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

function formatPrice(value: number | null, lang: Language) {
  /**
   * Formats product price for customer-facing display.
   */
  if (!value) {
    return lang === "sw" ? "Uliza bei" : "Request price";
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

  const product = await prisma.product.findFirst({
    where: {
      slug: resolvedParams.slug,
      isPublished: true,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    return {
      title: "Product",
      description: "Security and safety product from BM Contractors Tanzania.",
    };
  }

  const title = `${product.name}${product.brand ? ` | ${product.brand}` : ""}`;

  const previewImage = product.imageUrl || "/og/bm-contractors-og.jpg";

  const description =
    product.description ||
    `${product.name} available through BM Contractors Tanzania. Request price, product guidance or site survey.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | BM Contractors Tanzania`,
      description,
      images: [previewImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BM Contractors Tanzania`,
      description,
      images: [previewImage],
    },
  };
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lang: Language = isLanguage(resolvedSearchParams.lang)
    ? resolvedSearchParams.lang
    : "en";

  const product = await prisma.product.findFirst({
    where: {
      slug: resolvedParams.slug,
      isPublished: true,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      isPublished: true,
      categoryId: product.categoryId,
      NOT: {
        id: product.id,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const categoryName =
    lang === "sw"
      ? product?.category?.nameSw || product?.category?.nameEn
      : product.category?.nameEn;

  const labels = {
    en: {
      back: "Back to Products",
      category: "Category",
      brand: "Brand",
      price: "Price",
      request: "Request price / site survey",
      whatsapp: "Ask on WhatsApp",
      overview: "Product overview",
      related: "Related products",
      noteTitle: "Need guidance?",
      noteText:
        "For CCTV, networking and security products, the right item may depend on your site, distance, storage need, power and installation plan.",
      survey: "Request Site Survey",
    },
    sw: {
      back: "Rudi kwenye Bidhaa",
      category: "Category",
      brand: "Brand",
      price: "Bei",
      request: "Omba bei / site survey",
      whatsapp: "Uliza WhatsApp",
      overview: "Maelezo ya bidhaa",
      related: "Bidhaa zinazofanana",
      noteTitle: "Unahitaji ushauri?",
      noteText:
        "Kwa bidhaa za CCTV, networking na security, bidhaa sahihi inaweza kutegemea site yako, umbali, storage, power na mpango wa installation.",
      survey: "Omba Ukaguzi wa Site",
    },
  };

  const t = labels[lang];

  const whatsappText = encodeURIComponent(
    lang === "sw"
      ? `Habari BM Contractors, naomba bei na maelezo ya ${product.name}.`
      : `Hello BM Contractors, I would like price and details for ${product.name}.`,
  );

  const whatsappUrl = `${siteConfig.whatsapp.url}?text=${whatsappText}`;

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <LoadingLink
              href={`/products?lang=${lang}`}
              className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white ring-1 ring-white/10 transition hover:bg-white/15"
            >
              ← {t.back}
            </LoadingLink>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                  {categoryName}
                </p>

                <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
                  {product.name}
                </h1>

                {product.brand ? (
                  <p className="mt-4 text-lg font-bold text-red-200">
                    {product.brand}
                  </p>
                ) : null}

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {product.description ||
                    (lang === "sw"
                      ? "Bidhaa ya security/safety inayopatikana kupitia BM Contractors. Omba bei au ushauri wa matumizi sahihi."
                      : "Security/safety product available through BM Contractors. Request price or guidance on the right usage.")}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LoadingLink
                    href={`/request-site-survey?lang=${lang}&product=${product.slug}`}
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
                  {product.imageUrl ? (
                    <div className="overflow-hidden rounded-[1.5rem] bg-slate-950">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-slate-950 text-2xl font-black text-white">
                      BM
                    </div>
                  )}

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                        {t.price}
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-950">
                        {formatPrice(product.price, lang)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                        {t.category}
                      </p>
                      <p className="mt-1 font-black text-slate-950">
                        {categoryName}
                      </p>
                    </div>

                    {product.brand ? (
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                          {t.brand}
                        </p>
                        <p className="mt-1 font-black text-slate-950">
                          {product.brand}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black text-red-600">{t.overview}</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                {product.name}
              </h2>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
              <p className="text-base leading-8 text-slate-700">
                {product.description ||
                  (lang === "sw"
                    ? "Kwa maelezo zaidi ya bidhaa hii, bei na matumizi sahihi kwenye site yako, wasiliana na BM Contractors."
                    : "For more details about this product, price and correct usage for your site, contact BM Contractors.")}
              </p>

              <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <p className="text-sm font-black text-red-300">{t.noteTitle}</p>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t.noteText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 ? (
          <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-black text-red-600">
                    {categoryName}
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                    {t.related}
                  </h2>
                </div>

                <LoadingLink
                  href={`/products?lang=${lang}`}
                  className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
                >
                  {t.back}
                </LoadingLink>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.slug}
                    lang={lang}
                    slug={relatedProduct.slug}
                    name={relatedProduct.name}
                    brand={relatedProduct.brand}
                    imageUrl={relatedProduct.imageUrl}
                    categoryName={
                      lang === "sw"
                        ? relatedProduct?.category?.nameSw ||
                          relatedProduct?.category?.nameEn ||
                          ""
                        : relatedProduct?.category?.nameEn || ""
                    }
                    summaryEn={relatedProduct.description || ""}
                    summarySw={relatedProduct.description || ""}
                    priceLabelEn={formatPrice(relatedProduct.price, "en")}
                    priceLabelSw={formatPrice(relatedProduct.price, "sw")}
                  />
                ))}
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
                href={`/request-site-survey?lang=${lang}&product=${product.slug}`}
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
