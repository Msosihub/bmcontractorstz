import { notFound } from "next/navigation";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import {
  telephonyProducts,
  telephonyCategories,
  telephonyCataloguePath,
  telephonyLinks,
} from "@/lib/catalogue/telephony";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import "@/app/services/networking/networking.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const [p, q] = await Promise.all([params, searchParams]);
  const item = telephonyProducts.find((x) => x.slug === p.slug);
  if (!item) return { robots: { index: false, follow: false } };
  const lang = isLanguage(q.lang) ? q.lang : "en";
  return pageMetadata(telephonyCataloguePath + "/" + item.slug, lang, [
    `${item.brand} ${item.name} | BM Contractors Tanzania`,
    item.summary[lang],
  ]);
}
export default async function Page({ params, searchParams }: Props) {
  const [p, q, record] = await Promise.all([
    params,
    searchParams,
    getServiceRecord("telephone-systems"),
  ]);
  if (record && !record.isPublished) notFound();
  const item = telephonyProducts.find((x) => x.slug === p.slug);
  if (!item) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    path = telephonyCataloguePath + "/" + item.slug,
    links = telephonyLinks(
      lang,
      sw
        ? "Vifaa vya simu / bei ya sasa"
        : "Telephone equipment / current price",
      item.brand + " " + item.name,
    ),
    installed = telephonyLinks(
      lang,
      sw
        ? "Mfumo kamili wa simu wenye ufungaji"
        : "Complete installed telephone system",
      item.brand + " " + item.name,
    );
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.brand + " " + item.name,
    description: item.summary[lang],
    image: item.images.map((i) => SITE_URL + i.src),
    brand: { "@type": "Brand", name: item.brand },
    url: languageUrl(path, lang),
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="nf-main">
        <div className="nf-wrap">
          <Breadcrumbs
            id="catalogue-telephony"
            lang={lang}
            leaf={{ title: item.name, href: path }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
            }}
          />
          <div className="nf-product-layout">
            <div className="nf-product-photo">
              <Image
                src={item.images[0].src}
                alt={item.images[0].alt}
                width={960}
                height={640}
                sizes="(max-width:760px) 89vw, 43vw"
                preload
              />
            </div>
            <article className="nf-product-copy">
              <p className="nf-kicker">
                {item.brand.toUpperCase()} /{" "}
                {telephonyCategories[item.category][lang]}
              </p>
              <h1>{item.name}</h1>
              <p>{item.summary[lang]}</p>
              <dl className="nf-product-facts">
                {item.specs.map((s) => (
                  <div key={s.label.en}>
                    <dt>{s.label[lang]}</dt>
                    <dd>{s.value[lang]}</dd>
                  </div>
                ))}
              </dl>
              <details className="nf-detail">
                <summary>
                  {sw ? "Hakiki kabla ya kuagiza" : "Check before ordering"}
                </summary>
                <p>{item.compatibility[lang]}</p>
                <a
                  className="nf-link"
                  href={item.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sw ? "Taarifa za mtengenezaji" : "Manufacturer information"}{" "}
                  ↗
                </a>
              </details>
              <div className="nf-product-quote">
                <p>
                  {sw
                    ? "Bei ya sasa, toleo, vifaa vinavyohitajika na muda wa kupata bidhaa huthibitishwa kwenye makadirio. Hakuna kiasi cha stock au bei kinachodhaniwa."
                    : "Current price, revision, required accessories and supply lead time are confirmed in your quotation."}
                </p>
                <div className="nf-actions">
                  <a className="nf-button" href={links.quote}>
                    {sw ? "Omba bei ya sasa" : "Request Current Price"} ↗
                  </a>
                  <a className="nf-link" href={installed.quote}>
                    {sw ? "Jumuisha ufungaji" : "Include installation"} ↗
                  </a>
                </div>
              </div>
              <a className="nf-link" href={installed.survey}>
                {sw ? "Omba tathmini ya eneo" : "Request a site survey"} ↗
              </a>
            </article>
          </div>
          <section className="nf-product-related">
            <h2>
              {sw
                ? "Panga vifaa kama mfumo."
                : "Plan the equipment as a system."}
            </h2>
            {item.related.map((slug) => {
              const related = telephonyProducts.find((x) => x.slug === slug);
              return related ? (
                <a
                  key={slug}
                  href={`${telephonyCataloguePath}/${slug}?lang=${lang}`}
                >
                  {related.brand} {related.name} ↗
                </a>
              ) : null;
            })}
            <a href={`/services/telephone-systems?lang=${lang}`}>
              {sw ? "Mifumo ya simu na PBX" : "Telephone & PBX service"} ↗
            </a>
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
