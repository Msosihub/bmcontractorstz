import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReferenceCard } from "@/components/catalogue/ReferenceCard";
import { ReferenceEnquiry } from "@/components/catalogue/ReferenceCatalogue";
import {
  hikvisionProducts,
  hikvisionCategories,
} from "@/lib/catalogue/hikvision";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata, languageUrl } from "@/lib/seo";
import "@/components/premium/access-control/access.css";
import "@/app/services/hikvision/hikvision.css";

const path = "/catalogue/hikvision";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
const find = (slug: string) =>
  hikvisionProducts.find((product) => product.slug === slug);

export async function generateMetadata({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const lang = isLanguage(query.lang) ? query.lang : "en";
  const product = find(slug);
  if (!product) return { robots: { index: false, follow: false } };
  const name = product.name.startsWith("HikCentral")
    ? product.name
    : `Hikvision ${product.name}`;
  return pageMetadata(`${path}/${slug}`, lang, [
    `${name} | ${lang === "sw" ? "Vifaa na Ufungaji Tanzania" : "Equipment & Installation Tanzania"}`,
    product.summary[lang],
  ]);
}

export default async function Page({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const lang = isLanguage(query.lang) ? query.lang : "en";
  const sw = lang === "sw";
  const product = find(slug);
  if (!product) notFound();
  const photo = product.images[0];
  const related = product.related
    .map(find)
    .filter((item) => item !== undefined);
  const productSchema =
    product.category !== "software"
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          brand: { "@type": "Brand", name: product.brand },
          description: product.summary[lang],
          image: product.images.map(
            (item) => new URL(item.src, languageUrl(path, lang)).href,
          ),
          url: languageUrl(`${path}/${slug}`, lang),
        }
      : null;
  const category =
    hikvisionCategories[product.category as keyof typeof hikvisionCategories];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ac-main hv-main">
        {productSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
            }}
          />
        )}
        <nav
          className="ac-section rc-breadcrumb"
          aria-label={sw ? "Njia ya ukurasa" : "Breadcrumb"}
        >
          <a href={`/services/hikvision?lang=${lang}`}>
            {sw ? "Ulinzi wa majengo" : "Building security"}
          </a>
          <span aria-hidden="true">/</span>
          <a href={`${path}?lang=${lang}&category=${product.category}`}>
            {category[lang]}
          </a>
        </nav>
        <section
          className={`ac-section ${photo ? "rc-detail-hero" : "hv-detail-text"}`}
        >
          {photo && (
            <div className="rc-detail-art">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={640}
                height={640}
                sizes="(max-width:800px) 90vw, 45vw"
                preload
              />
            </div>
          )}
          <div className="rc-detail-copy">
            <p className="hv-kicker">HIKVISION / {category[lang]}</p>
            <h1>{product.name}</h1>
            <p className="lead">{product.summary[lang]}</p>
            <ReferenceEnquiry p={product} lang={lang} />
          </div>
        </section>
        <details className="ac-section hv-details hv-disclosure">
          <summary>
            {sw ? "Vipimo na ulinganifu" : "Specifications & compatibility"}
          </summary>
          <dl>
            {product.specs.map((spec) => (
              <div key={spec.label.en}>
                <dt>{spec.label[lang]}</dt>
                <dd>{spec.value[lang]}</dd>
              </div>
            ))}
          </dl>
          <p>{product.compatibility[lang]}</p>
          <div className="rc-documents">
            {product.documents.map((document) => (
              <a
                key={document.url}
                href={document.url}
                rel="noreferrer"
                target="_blank"
              >
                {document.label[lang]} ↗
              </a>
            ))}
          </div>
        </details>
        {related.length > 0 && (
          <section className="ac-section">
            <h2>{sw ? "Rejea nyingine" : "Related references"}</h2>
            <div className="rc-grid">
              {related.map((item) => (
                <ReferenceCard
                  key={item.slug}
                  p={item}
                  lang={lang}
                  namespace={path}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
