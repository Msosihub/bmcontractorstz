import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReferenceCatalogue } from "@/components/catalogue/ReferenceCatalogue";
import {
  fireProducts,
  fireCategories,
  fireCataloguePath,
} from "@/lib/catalogue/fire-safety";
import { fireLinks } from "@/data/fire-safety";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/components/premium/access-control/access.css";
import "@/app/services/fire-alarm-systems/fire-safety.css";
type Props = { searchParams: Promise<{ lang?: string; category?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  const q = await searchParams,
    lang = isLanguage(q.lang) ? q.lang : "en";
  return pageMetadata(
    fireCataloguePath,
    lang,
    lang === "sw"
      ? [
          "Katalogi ya Vifaa vya Usalama wa Moto | BM Contractors",
          "Linganisha paneli za Hikvision na ASENWARE, vitambuzi na ving’ora. Omba bei ya sasa ya vizima moto, taa za dharura na vifaa vya mradi.",
        ]
      : [
          "Fire Safety Equipment Tanzania | Hikvision & ASENWARE | BM",
          "Compare fire panels, smoke/heat detectors and alarm devices. Request current prices for extinguishers, emergency lighting and project equipment.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const [q, r] = await Promise.all([
    searchParams,
    getServiceRecord("fire-alarm-systems"),
  ]);
  if (r && !r.isPublished) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en);
  const families = [
    [t("ABC DCP · 6 kg / 9 kg", "Poda ya ABC · kilo 6 / 9")],
    [t("CO₂ · 5 kg", "CO₂ · kilo 5")],
    [
      t(
        "Water / foam / wet chemical / blankets",
        "Maji / foam / wet chemical / blanketi",
      ),
    ],
    [
      t(
        "Brackets, stands, cabinets & safety signs",
        "Mabano, stendi, kabati na alama",
      ),
    ],
    [t("Emergency lighting & exit signs", "Taa za dharura na alama za kutoka")],
    [t("Hose reels & accessories", "Hose reel na vifaa vyake")],
    [
      t(
        "Alarm batteries, supplies & cable",
        "Betri, power supply na nyaya za alarm",
      ),
    ],
    [t("Compatible modules & interfaces", "Moduli na miunganisho inayooana")],
  ];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="fs-main fs-catalogue-main ac-main">
        <header className="fs-wrap fs-catalogue-header">
          <Breadcrumbs id="catalogue-fire-safety" lang={lang} />
          <p className="fs-eyebrow">
            {t(
              "A SYSTEM, NOT A RANDOM PARTS LIST",
              "MFUMO, SI ORODHA YA VIFAA VISIVYOENDANA",
            )}
          </p>
          <h1>{t("Fire safety equipment.", "Vifaa vya usalama wa moto.")}</h1>
          <p>
            {t(
              "Six identifiable manufacturer references, with clear roles and compatibility checks. These are equipment references—not confirmed BM stock. Request a current, scope-specific quotation.",
              "Rejea sita za watengenezaji, zenye kazi na masharti ya uoanifu yaliyo wazi. Si stock iliyothibitishwa ya BM. Omba makadirio ya sasa kulingana na hitaji.",
            )}
          </p>
          <a
            className="fs-link"
            href={`/services/fire-alarm-systems?lang=${lang}`}
          >
            {t(
              "Plan the complete fire-safety solution",
              "Panga usalama kamili wa moto",
            )}{" "}
            ↗
          </a>
        </header>
        <section
          className="fs-wrap"
          aria-label={t(
            "Compare fire alarm equipment",
            "Linganisha vifaa vya tahadhari ya moto",
          )}
        >
          <ReferenceCatalogue
            products={fireProducts}
            categories={fireCategories}
            namespace={fireCataloguePath}
            initialCategory={q.category}
            lang={lang}
            searchExample={{
              en: "Try AW-FP300, smoke, Hikvision…",
              sw: "Mfano: AW-FP300, moshi, Hikvision…",
            }}
          />
        </section>
        <section className="fs-wrap fs-section">
          <p className="fs-eyebrow">
            {t(
              "QUOTATION-LED EQUIPMENT FAMILIES",
              "FAMILIA ZA VIFAA KWA MAKADIRIO",
            )}
          </p>
          <h2>{t("Complete the provision.", "Kamilisha mpango.")}</h2>
          <p>
            {t(
              "These are requirement categories, not invented stocked SKUs. Exact model, capacity, marked rating, approvals and availability are checked for the project. A 6 kg option is not an assumed replacement for a required 9 kg unit.",
              "Haya ni makundi ya mahitaji, si SKU za stock zilizobuniwa. Modeli, uzito, uwezo ulioandikwa, vibali na upatikanaji vihakikiwe kwa mradi. Kilo 6 si mbadala unaodhaniwa wa kilo 9 inapohitajika.",
            )}
          </p>
          <div className="fs-family-list">
            {families.map(([title]) => (
              <a key={title} href={fireLinks(lang, title).quote}>
                {title}
                <br />
                {t("Request Current Price", "Omba bei ya sasa")} ↗
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
