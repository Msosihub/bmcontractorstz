import { EnquiryLink } from "@/components/premium/Frame";
import { pageMetadata } from "@/lib/seo";

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

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const product = await prisma.product.findFirst({
    where: { slug, isPublished: true },
  });
  const title = product?.name || (lang === "sw" ? "Bidhaa" : "Product");
  const description =
    lang === "sw"
      ? "Ulizia bei, upatikanaji na maelezo ya " +
        title +
        " kutoka BM Contractors."
      : product?.description ||
        "Ask BM Contractors for product prices and availability.";
  // Product model has no translated description field yet. Keep SW accessible and self-canonical,
  // but do not advertise an incomplete translation in hreflang or index it.
  return pageMetadata("/products/" + slug, lang, [title, description], false);
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
  const sw = lang === "sw";
  const specs = product.specifications;
  const entries =
    specs && typeof specs === "object" && !Array.isArray(specs)
      ? Object.entries(specs)
      : [];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main">
        <section className="product-detail section">
          <div>
            <p className="eyebrow">
              <a href={"/products?lang=" + lang}>
                {sw ? "VIFAA" : "EQUIPMENT"}
              </a>{" "}
              /{" "}
              {sw
                ? product.category?.nameSw || product.category?.nameEn
                : product.category?.nameEn}
            </p>
            <h1>{product.name}</h1>
            <p className="lead">{product.brand}</p>
            {sw && product.description && (
              <p className="scope-note">
                Maelezo ya bidhaa hii bado yako kwa Kiingereza; modeli
                haijatafsiriwa.
              </p>
            )}
            <p>{product.description}</p>
            <div className="product-price">
              {product.price !== null
                ? "TZS " + product.price.toLocaleString("en-US")
                : sw
                  ? "Omba bei na upatikanaji"
                  : "Request price & availability"}
            </div>
            <EnquiryLink
              lang={lang}
              subject={product.name}
              product={product.slug}
            />
          </div>
          <aside className="spec-sheet">
            <p className="eyebrow">
              {sw ? "TAARIFA ZA BIDHAA" : "PRODUCT RECORD"}
            </p>
            <h2>
              {sw
                ? "Vipimo vinavyoongoza uchaguzi."
                : "Details that guide the choice."}
            </h2>
            <dl>
              <div>
                <dt>{sw ? "Jina / modeli" : "Name / model"}</dt>
                <dd>{product.name}</dd>
              </div>
              <div>
                <dt>{sw ? "Chapa" : "Brand"}</dt>
                <dd>
                  {product.brand || (sw ? "Ithibitishwe" : "To be confirmed")}
                </dd>
              </div>
              {entries.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </dd>
                </div>
              ))}
            </dl>
            {!entries.length && (
              <p className="scope-note">
                {sw
                  ? "Vipimo vya modeli hii bado havijaongezwa. Omba datasheet iliyo sahihi kabla ya kuagiza."
                  : "Model specifications have not yet been added. Request the correct datasheet before ordering."}
              </p>
            )}
            <p className="scope-note">
              {sw
                ? "Upatikanaji, dhamana, vifaa vinavyoambatana na bidhaa na gharama za ufungaji vithibitishwe kwenye nukuu."
                : "Confirm availability, warranty, included accessories and installation costs in the quotation."}
            </p>
          </aside>
        </section>
        <section className="brief-band">
          <div>
            <h2>
              {sw
                ? "Unanunua kwa jumla\nau kwa taasisi?"
                : "Buying for trade\nor an institution?"}
            </h2>
          </div>
          <div>
            <p>
              {sw
                ? "Ongeza idadi, BOQ na mahitaji ya uwasilishaji."
                : "Include quantities, BOQ and delivery requirements."}
            </p>
            <EnquiryLink
              lang={lang}
              subject={product.name}
              product={product.slug}
              trade
            />
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
