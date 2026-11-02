import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Catalogue } from "@/components/premium/gate-automation/Catalogue";
import { centurionProducts } from "@/lib/catalogue/provider";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/components/premium/gate-automation/gate.css";
type Props = { searchParams: Promise<{ lang?: string; category?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  const p = await searchParams,
    l = isLanguage(p.lang) ? p.lang : "en";
  return pageMetadata(
    "/catalogue/centurion",
    l,
    l === "en"
      ? [
          "CENTURION Gate Motors & Access Equipment",
          "Compare CENTURION sliding, swing and garage operators, barriers and accessories. Request current equipment prices or installation advice in Tanzania.",
        ]
      : [
          "Mota za Geti na Vifaa vya CENTURION",
          "Linganisha mota za geti za CENTURION, gereji, vizuizi vya magari na vifaa vya ziada. Omba bei ya sasa au ushauri wa ufungaji Tanzania.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const p = await searchParams,
    lang = isLanguage(p.lang) ? p.lang : "en",
    sw = lang === "sw";
  let products;
  try {
    products = await centurionProducts();
  } catch {
    return (
      <>
        <Header lang={lang} />
        <main className="premium-main ga-main ga-section">
          <h1>
            {sw
              ? "Katalogi haipatikani kwa sasa"
              : "Catalogue temporarily unavailable"}
          </h1>
          <a href={`/contact?lang=${lang}`}>
            {sw
              ? "Wasiliana nasi kwa bei na ushauri"
              : "Contact us for prices and advice"}{" "}
            ↗
          </a>
        </main>
        <Footer lang={lang} />
      </>
    );
  }
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ga-main">
        <header className="ga-section ga-catalogue-head">
          <p className="eyebrow">
            <a href={`/services/gate-motors?lang=${lang}`}>
              {sw ? "MILANGO YA KIOTOMATIKI" : "GATE AUTOMATION"}
            </a>{" "}
            / CENTURION
          </p>
          <h1>
            {sw ? "Kifaa sahihi." : "The right equipment."}
            <br />
            <em>{sw ? "Kwa geti lako." : "For your entrance."}</em>
          </h1>
          <p className="lead">
            {sw
              ? "Chunguza modeli, linganisha chaguo na upate nukuu ya vifaa au mfumo uliofungwa."
              : "Explore models, compare your options and request equipment or a complete installed system."}
          </p>
          <p className="ga-note">
            {sw
              ? "Mwongozo wa vifaa vya mtengenezaji. Ulizia BM modeli, vifaa vilivyojumuishwa, upatikanaji na bei ya sasa ya vifaa au ufungaji."
              : "Manufacturer equipment guide. Ask BM to confirm the exact model, supplied kit, availability and current equipment or installation price."}
          </p>
        </header>
        <section className="ga-section ga-catalogue-body">
          <Catalogue
            products={products}
            lang={lang}
            initialCategory={p.category}
          />
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
