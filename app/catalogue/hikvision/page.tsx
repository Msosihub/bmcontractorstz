import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReferenceCatalogue } from "@/components/catalogue/ReferenceCatalogue";
import {
  hikvisionProducts,
  hikvisionCategories,
} from "@/lib/catalogue/hikvision";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/components/premium/access-control/access.css";
import "@/app/services/hikvision/hikvision.css";

const path = "/catalogue/hikvision";
type Props = { searchParams: Promise<{ lang?: string; category?: string }> };
const copy = {
  en: [
    "Hikvision Equipment Catalogue Tanzania | BM Contractors",
    "Compare Hikvision camera, recorder, MinMoe, intercom, AX PRO and HikCentral references. Request current equipment prices or an installed quotation.",
  ],
  sw: [
    "Katalogi ya Vifaa vya Hikvision Tanzania | BM Contractors",
    "Linganisha kamera, virekodi, MinMoe, intercom, AX PRO na HikCentral. Omba bei ya sasa ya vifaa au nukuu ya ufungaji.",
  ],
} satisfies Record<string, [string, string]>;
export async function generateMetadata({ searchParams }: Props) {
  const { lang } = await searchParams;
  const language = isLanguage(lang) ? lang : "en";
  return pageMetadata(path, language, copy[language]);
}
export default async function Page({ searchParams }: Props) {
  const query = await searchParams;
  const lang = isLanguage(query.lang) ? query.lang : "en";
  const sw = lang === "sw";
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ac-main hv-main">
        <header className="ac-section rc-catalogue-head hv-catalogue-head">
          <p className="hv-kicker">
            <a href={`/services/hikvision?lang=${lang}`}>
              {sw ? "ULINZI WA MAJENGO" : "BUILDING SECURITY"}
            </a>{" "}
            / HIKVISION
          </p>
          <h1>{sw ? "Katalogi ya Hikvision" : "Hikvision equipment"}</h1>
          <p className="lead">
            {sw
              ? "Linganisha modeli kabla ya kuomba vifaa pekee au mfumo kamili wenye ufungaji."
              : "Compare exact references before requesting equipment only or a complete installed system."}
          </p>
          <p className="ac-note">
            {sw
              ? "Hizi ni rejea za mtengenezaji. BM huthibitisha bei, toleo, leseni na upatikanaji kwenye nukuu."
              : "These are manufacturer references. BM confirms price, revision, licensing and availability in your quotation."}
          </p>
        </header>
        <section
          className="ac-section"
          aria-label={sw ? "Tafuta vifaa" : "Find equipment"}
        >
          <ReferenceCatalogue
            products={hikvisionProducts}
            lang={lang}
            namespace={path}
            categories={hikvisionCategories}
            initialCategory={query.category}
            comparisonShortcut
            searchExample={{
              en: "Try MinMoe, ColorVu…",
              sw: "Mfano: MinMoe, ColorVu…",
            }}
          />
        </section>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
