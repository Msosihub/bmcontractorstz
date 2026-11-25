import { notFound } from "next/navigation";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import {
  networkingFamilies,
  networkingFamilyPath,
  networkingProducts,
  networkingCataloguePath,
  networkingLinks,
} from "@/lib/catalogue/networking";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata, languageUrl } from "@/lib/seo";
import "@/app/services/networking/networking.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const [p, q] = await Promise.all([params, searchParams]),
    f = networkingFamilies.find((f) => f.slug === p.slug),
    lang = isLanguage(q.lang) ? q.lang : "en";
  if (!f) return { robots: { index: false, follow: false } };
  return pageMetadata(networkingFamilyPath(f.slug), lang, [
    `${f.title[lang]} Tanzania | BM Contractors`,
    f.intro[lang],
  ]);
}
export default async function Page({ params, searchParams }: Props) {
  const [p, q, record] = await Promise.all([
    params,
    searchParams,
    getServiceRecord("networking"),
  ]);
  if (record && !record.isPublished) notFound();
  const f = networkingFamilies.find((f) => f.slug === p.slug);
  if (!f) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    path = networkingFamilyPath(f.slug),
    equipment = networkingLinks(
      lang,
      (sw ? "Vifaa pekee: " : "Equipment only: ") + f.title[lang],
    ),
    installed = networkingLinks(
      lang,
      (sw ? "Vifaa na ufungaji: " : "Supply and installation: ") +
        f.title[lang],
    );
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: f.title[lang],
    description: f.intro[lang],
    url: languageUrl(path, lang),
    inLanguage: lang,
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="nf-main">
        <div className="nf-wrap">
          <Breadcrumbs
            id="catalogue-networking"
            lang={lang}
            leaf={{ title: f.title[lang], href: path }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
          <section className="nf-family-hero">
            <div>
              <p className="nf-kicker">
                {sw
                  ? "VIFAA / MWONGOZO WA KUCHAGUA"
                  : "EQUIPMENT / BUYER GUIDE"}
              </p>
              <h1>{f.title[lang]}.</h1>
              <p>{f.intro[lang]}</p>
              <div className="nf-actions">
                <a className="nf-button" href={equipment.quote}>
                  {sw ? "Omba bei ya vifaa" : "Request equipment price"} ↗
                </a>
                <a className="nf-link" href={installed.survey}>
                  {sw ? "Panga ufungaji" : "Plan installation"} ↗
                </a>
              </div>
            </div>
            <figure>
              <Image
                src={`/images/networking/${f.image}.webp`}
                alt={f.alt[lang]}
                width={1536}
                height={1024}
                sizes="(max-width:760px) 89vw, 44vw"
                preload
              />
              <figcaption>
                {sw
                  ? "Picha ya kundi la vifaa; vipimo na vifaa vinavyojumuishwa huthibitishwa kwenye makadirio."
                  : "Family illustration; exact specifications and included items are confirmed in your quotation."}
              </figcaption>
            </figure>
          </section>
          <section className="nf-family-options">
            <p className="nf-kicker">
              {sw ? "AINISHA KABLA YA KUAGIZA" : "SPECIFY BEFORE ORDERING"}
            </p>
            <h2>
              {sw ? "Chagua kinachofaa eneo lako." : "Choose for your site."}
            </h2>
            <p>{f.options[lang]}</p>
            <p className="nf-family-caution">
              {sw
                ? "Chaguo huchaguliwa kulingana na eneo lako. Hakiki chapa, vipimo, bei ya sasa na upatikanaji kwenye makadirio."
                : "Options are selected for your site. Confirm the brand, dimensions, current price and availability in your quotation."}
            </p>
          </section>
          <section className="nf-family-advice">
            <div>
              <h2>
                {sw
                  ? "Mambo ya kuhakiki."
                  : "What matters in the specification."}
              </h2>
              <p>{f.check[lang]}</p>
              <a className="nf-link" href={equipment.quote}>
                {sw ? "Tuma orodha / BOQ" : "Send your list / BOQ"} ↗
              </a>
            </div>
            <div>
              {f.points.map((point, i) => (
                <details className="nf-detail" key={point.en} open={i === 0}>
                  <summary>{f.pointTitles[i][lang]}</summary>
                  <p>{point[lang]}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="nf-family-faq">
            <h2>
              {sw ? "Kabla hujaomba bei." : "Before you request a price."}
            </h2>
            {f.faq.map(([q, a]) => (
              <details className="nf-detail" key={q.en}>
                <summary>{q[lang]}</summary>
                <p>{a[lang]}</p>
              </details>
            ))}
          </section>
          <section className="nf-family-related">
            <h2>{sw ? "Kamilisha mfumo." : "Complete the system."}</h2>
            <nav aria-label={sw ? "Vifaa vinavyohusiana" : "Related equipment"}>
              {f.related.map((slug) => {
                const x = networkingFamilies.find((f) => f.slug === slug)!;
                return (
                  <a
                    href={`${networkingFamilyPath(slug)}?lang=${lang}`}
                    key={slug}
                  >
                    {x.title[lang]} ↗
                  </a>
                );
              })}
              {f.models.map((slug) => {
                const x = networkingProducts.find((p) => p.slug === slug)!;
                return (
                  <a
                    href={`${networkingCataloguePath}/${slug}?lang=${lang}`}
                    key={slug}
                  >
                    {x.brand} {x.name} ↗
                  </a>
                );
              })}
              <a href={`/services/networking?lang=${lang}`}>
                {sw
                  ? "Huduma ya mitandao na fibre"
                  : "Networking & fibre installation"}{" "}
                ↗
              </a>
            </nav>
            <div className="nf-actions">
              <a className="nf-button" href={installed.quote}>
                {sw ? "Omba vifaa na ufungaji" : "Quote supply & installation"}{" "}
                ↗
              </a>
              <a
                className="nf-link"
                href={networkingCataloguePath + `?lang=${lang}`}
              >
                {sw ? "Rudi kwenye katalogi" : "Back to equipment"} ↗
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
