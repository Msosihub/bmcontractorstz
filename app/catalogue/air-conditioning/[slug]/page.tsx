import { notFound } from "next/navigation";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import {
  climateProducts,
  climateCategories,
  climateCataloguePath,
  climateLinks,
} from "@/lib/catalogue/air-conditioning";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import "@/app/services/air-conditioners/climate.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const [p, q, r] = await Promise.all([
    params,
    searchParams,
    getServiceRecord("air-conditioners"),
  ]);
  const item = climateProducts.find((x) => x.slug === p.slug);
  if (!item || (r && !r.isPublished))
    return { robots: { index: false, follow: false } };
  const lang = isLanguage(q.lang) ? q.lang : "en";
  return pageMetadata(climateCataloguePath + "/" + item.slug, lang, [
    item.brand + " " + item.name + " | BM Contractors Tanzania",
    item.summary[lang],
  ]);
}
export default async function Page({ params, searchParams }: Props) {
  const [p, q, r] = await Promise.all([
    params,
    searchParams,
    getServiceRecord("air-conditioners"),
  ]);
  if (r && !r.isPublished) notFound();
  const item = climateProducts.find((x) => x.slug === p.slug);
  if (!item) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en),
    path = climateCataloguePath + "/" + item.slug,
    links = climateLinks(
      lang,
      t("Equipment only / current price", "Vifaa pekee / bei ya sasa"),
      item.brand + " " + item.name,
    ),
    installed = climateLinks(
      lang,
      t("Complete installed AC system", "Mfumo kamili wa AC wenye ufungaji"),
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
      <main id="main" className="hv-main hv-model">
        <div className="hv-wrap">
          <Breadcrumbs
            id="catalogue-air-conditioning"
            lang={lang}
            leaf={{ title: item.name, href: path }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
          <div className="hv-model-layout">
            <div className="hv-model-photo">
              <Image
                src={item.images[0].src}
                alt={item.images[0].alt}
                width={1200}
                height={900}
                sizes="(max-width:760px) 89vw, 43vw"
                preload
              />
            </div>
            <article>
              <p className="hv-kicker">
                {item.brand} / {climateCategories[item.category][lang]}
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
                    "Compatibility before capacity claims",
                    "Uoanifu kabla ya madai ya uwezo",
                  )}
                </summary>
                <p>{item.compatibility[lang]}</p>
                <a
                  className="hv-model-source"
                  href={item.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(
                    "Manufacturer family information",
                    "Taarifa za familia kutoka kwa mtengenezaji",
                  )}{" "}
                  ↗
                </a>
              </details>
              <p className="hv-caption">
                {t(
                  "Manufacturer family reference. Exact regional model, capacity, power supply, controls, accessories, warranty and availability are confirmed before purchase. No price or stock is assumed.",
                  "Rejea ya familia ya mtengenezaji. Modeli, uwezo, umeme, vidhibiti, vifaa vya ziada, dhamana na upatikanaji vithibitishwe kabla ya kununua. Hakuna bei au stock inayodhaniwa.",
                )}
              </p>
              <div className="hv-actions">
                <a className="hv-button" href={links.quote}>
                  {t("Request Current Price", "Omba bei ya sasa")} ↗
                </a>
                <a className="hv-link" href={installed.quote}>
                  {t("Include installation", "Jumuisha ufungaji")} ↗
                </a>
              </div>
              <div className="hv-actions">
                <a className="hv-link" href={installed.survey}>
                  {t("Request a site survey", "Omba ukaguzi wa eneo")} ↗
                </a>
                <a className="hv-link" href={links.whatsapp}>
                  WhatsApp ↗
                </a>
              </div>
            </article>
          </div>
          <nav
            className="hv-model-related"
            aria-label={t("Related AC references", "Rejea zinazohusiana za AC")}
          >
            {item.related.map((slug) => {
              const related = climateProducts.find((x) => x.slug === slug);
              return related ? (
                <a
                  href={`${climateCataloguePath}/${slug}?lang=${lang}`}
                  key={slug}
                >
                  {related.brand} {related.name} ↗
                </a>
              ) : null;
            })}
            <a href={`${climateCataloguePath}?lang=${lang}`}>
              {t("All AC references", "Rejea zote za AC")} ↗
            </a>
            <a href={`/services/air-conditioners?lang=${lang}`}>
              {t("Complete AC service", "Huduma kamili ya AC")} ↗
            </a>
          </nav>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
