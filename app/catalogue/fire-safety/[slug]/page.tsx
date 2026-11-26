import { notFound } from "next/navigation";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import {
  fireProducts,
  fireCategories,
  fireCataloguePath,
} from "@/lib/catalogue/fire-safety";
import { fireLinks } from "@/data/fire-safety";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import "@/app/services/fire-alarm-systems/fire-safety.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const [p, q] = await Promise.all([params, searchParams]),
    item = fireProducts.find((x) => x.slug === p.slug),
    lang = isLanguage(q.lang) ? q.lang : "en";
  if (!item) return { robots: { index: false, follow: false } };
  return pageMetadata(fireCataloguePath + "/" + item.slug, lang, [
    `${item.brand} ${item.name} | BM Contractors Tanzania`,
    item.summary[lang],
  ]);
}
export default async function Page({ params, searchParams }: Props) {
  const [p, q, r] = await Promise.all([
    params,
    searchParams,
    getServiceRecord("fire-alarm-systems"),
  ]);
  if (r && !r.isPublished) notFound();
  const item = fireProducts.find((x) => x.slug === p.slug);
  if (!item) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en),
    path = fireCataloguePath + "/" + item.slug,
    links = fireLinks(
      lang,
      t("Equipment only / current price", "Vifaa pekee / bei ya sasa"),
      item.brand + " " + item.name,
    ),
    installed = fireLinks(
      lang,
      t(
        "Complete installed fire alarm system",
        "Mfumo kamili wa tahadhari ya moto wenye ufungaji",
      ),
      item.brand + " " + item.name,
    );
  const schema = {
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
      <main id="main" className="fs-main fs-model">
        <div className="fs-wrap">
          <Breadcrumbs
            id="catalogue-fire-safety"
            lang={lang}
            leaf={{ title: item.name, href: path }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
          <div className="fs-model-layout">
            <div className="fs-model-photo">
              <Image
                src={item.images[0].src}
                alt={item.images[0].alt}
                width={900}
                height={750}
                sizes="(max-width:760px) 89vw, 43vw"
                preload
              />
            </div>
            <article>
              <p className="fs-eyebrow">
                {item.brand} / {fireCategories[item.category][lang]}
              </p>
              <h1>{item.name}</h1>
              <p>{item.summary[lang]}</p>
              <dl>
                {item.specs.map((s) => (
                  <div key={s.label.en}>
                    <dt>{s.label[lang]}</dt>
                    <dd>{s.value[lang]}</dd>
                  </div>
                ))}
              </dl>
              <details open>
                <summary>
                  {t(
                    "Check compatibility before ordering",
                    "Hakiki uoanifu kabla ya kuagiza",
                  )}
                </summary>
                <p>{item.compatibility[lang]}</p>
                <a href={item.source} target="_blank" rel="noreferrer">
                  {t("Manufacturer information", "Taarifa za mtengenezaji")} ↗
                </a>
              </details>
              <div className="fs-compact-cta">
                <p>
                  {t(
                    "Manufacturer reference. Current price, revision, accessories, sourcing and lead time are confirmed in your quotation. No stock, warranty or statutory approval is implied.",
                    "Rejea ya mtengenezaji. Bei ya sasa, toleo, vifaa vya ziada, upatikanaji na muda wa kupata bidhaa huthibitishwa kwenye makadirio. Hakuna stock, dhamana au idhini ya kisheria inayodhaniwa.",
                  )}
                </p>
                <div className="fs-actions">
                  <a className="fs-button" href={links.quote}>
                    {t("Request Current Price", "Omba bei ya sasa")} ↗
                  </a>
                  <a className="fs-link" href={installed.quote}>
                    {t("Include installation", "Jumuisha ufungaji")} ↗
                  </a>
                </div>
              </div>
              <div className="fs-actions">
                <a className="fs-link" href={installed.survey}>
                  {t("Request site assessment", "Omba tathmini ya eneo")} ↗
                </a>
                <a className="fs-link" href={links.whatsapp}>
                  WhatsApp ↗
                </a>
              </div>
            </article>
          </div>
          <section className="fs-section">
            <h2>
              {t(
                "Plan compatible equipment together.",
                "Panga vifaa vinavyoendana.",
              )}
            </h2>
            <div className="fs-model-related">
              {item.related.map((slug) => {
                const r = fireProducts.find((x) => x.slug === slug);
                return r ? (
                  <a
                    key={slug}
                    href={`${fireCataloguePath}/${slug}?lang=${lang}`}
                  >
                    {r.brand} {r.name} ↗
                  </a>
                ) : null;
              })}
              <a href={`${fireCataloguePath}?lang=${lang}`}>
                {t("All equipment", "Vifaa vyote")} ↗
              </a>
              <a href={`/services/fire-alarm-systems?lang=${lang}`}>
                {t(
                  "Complete fire-safety service",
                  "Huduma kamili ya usalama wa moto",
                )}{" "}
                ↗
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
