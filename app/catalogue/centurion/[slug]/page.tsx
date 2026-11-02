import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Gallery,
  ProductEnquiry,
  ProductCard,
} from "@/components/premium/gate-automation/Catalogue";
import { centurionProducts } from "@/lib/catalogue/provider";
import { categoryNames } from "@/lib/catalogue/types";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata, languageUrl } from "@/lib/seo";
import "@/components/premium/gate-automation/gate.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({ params, searchParams }: Props) {
  const [{ slug }, q] = await Promise.all([params, searchParams]),
    lang = isLanguage(q.lang) ? q.lang : "en",
    p = (await centurionProducts()).find((x) => x.slug === slug);
  if (!p) return { robots: { index: false, follow: false } };
  return pageMetadata("/catalogue/centurion/" + slug, lang, [
    p.name +
      " — " +
      (lang === "sw" ? "Bei na Ufungaji" : "Equipment & Installation"),
    p.summary[lang],
  ]);
}
export default async function Page({ params, searchParams }: Props) {
  const [{ slug }, q] = await Promise.all([params, searchParams]),
    lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    products = await centurionProducts(),
    p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: p.brand },
    model: p.name,
    description: p.summary[lang],
    image: p.images.map((x) => "https://www.bmcontractorstz.com" + x.src),
    url: languageUrl("/catalogue/centurion/" + slug, lang),
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ga-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(json).replace(/</g, "\\u003c"),
          }}
        />
        <nav
          className="ga-section ga-breadcrumb"
          aria-label={sw ? "Njia ya ukurasa" : "Breadcrumb"}
        >
          <a href={`/services/gate-motors?lang=${lang}`}>
            {sw ? "Milango ya kiotomatiki" : "Gate automation"}
          </a>
          <span>/</span>
          <a href={`/catalogue/centurion?lang=${lang}`}>CENTURION</a>
          <span>/</span>
          {p.name}
        </nav>
        <section className="ga-section ga-detail">
          <Gallery p={p} lang={lang} />
          <div>
            <p className="eyebrow">
              CENTURION / {categoryNames[p.category]?.[lang]}
            </p>
            <h1>{p.name}</h1>
            <p className="lead">{p.summary[lang]}</p>
            <ProductEnquiry p={p} lang={lang} />
          </div>
        </section>
        <section className="ga-section ga-specifications">
          <div>
            <p className="eyebrow">
              {sw ? "MAELEZO YA KIUFUNDI" : "TECHNICAL SELECTION"}
            </p>
            <h2>{sw ? "Vipimo vina maana." : "The details matter."}</h2>
            <p>
              {sw
                ? "Taarifa hizi zinaelezea familia ya kifaa. Mchoro wa mtengenezaji, toleo halisi na tathmini ya eneo ndivyo vitakavyoongoza ufungaji. Picha inaweza kuonyesha vifaa vya ziada ambavyo si sehemu ya kifurushi kinachouzwa."
                : "These details describe the equipment family. The current manufacturer manual, exact revision and site assessment govern installation. Manufacturer photos may show optional accessories not included in the quoted kit."}
            </p>
            <a
              className="ga-textlink"
              href={p.source}
              target="_blank"
              rel="noreferrer"
            >
              {sw ? "Chanzo: CENTURION" : "Source: CENTURION"} ↗
            </a>
          </div>
          <dl>
            {p.specs.map((s) => (
              <div key={s.label.en}>
                <dt>{s.label[lang]}</dt>
                <dd>{s.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="ga-section ga-documents">
          <h2>{sw ? "Nyaraka na ulinganifu" : "Documents & compatibility"}</h2>
          {p.documents.map((d) => (
            <a key={d.url} href={d.url} target="_blank" rel="noreferrer">
              {d.label[lang]} ↗
            </a>
          ))}
          <p>
            {sw
              ? "Kwa SMΔRT+, Bluetooth hutumika kwa mawasiliano ya karibu. Udhibiti wa mbali kupitia intaneti unahitaji Wi-Fi inayofika getini, intaneti inayofanya kazi na programu inayooana. Huduma na toleo la kifaa vithibitishwe Tanzania."
              : "For SMΔRT+, Bluetooth is local connectivity. Internet remote control requires Wi-Fi at the gate, working Internet and a compatible app. Confirm device revision and service availability in Tanzania."}
          </p>
        </section>
        <section className="ga-section">
          <p className="eyebrow">
            {sw ? "KAMILISHA MFUMO" : "COMPLETE THE SYSTEM"}
          </p>
          <h2>{sw ? "Vifaa vinavyohusiana" : "Related equipment"}</h2>
          <div className="ga-grid">
            {products
              .filter((x) => p.related.includes(x.slug))
              .slice(0, 3)
              .map((x) => (
                <ProductCard key={x.slug} p={x} lang={lang} />
              ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
