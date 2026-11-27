import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReferenceCatalogue } from "@/components/catalogue/ReferenceCatalogue";
import {
  climateProducts,
  climateCategories,
  climateCataloguePath,
  climateLinks,
} from "@/lib/catalogue/air-conditioning";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/components/premium/access-control/access.css";
import "@/app/services/air-conditioners/climate.css";
type Props = { searchParams: Promise<{ lang?: string; category?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  const [q, r] = await Promise.all([
    searchParams,
    getServiceRecord("air-conditioners"),
  ]);
  if (r && !r.isPublished) return { robots: { index: false, follow: false } };
  const lang = isLanguage(q.lang) ? q.lang : "en";
  return pageMetadata(
    climateCataloguePath,
    lang,
    lang === "sw"
      ? [
          "Vifaa vya AC, Gree, Hisense na LG Tanzania | BM Contractors",
          "Linganisha familia za viyoyozi vya ukutani, multi-split, cassette, duct na VRF. Omba modeli na bei ya sasa au mfumo wenye ufungaji.",
        ]
      : [
          "AC Equipment, Gree, Hisense & LG Tanzania | BM Contractors",
          "Explore verified wall-mounted, multi-split, cassette, ducted and VRF manufacturer references. Request a current model, equipment price or complete installation.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const [q, r] = await Promise.all([
    searchParams,
    getServiceRecord("air-conditioners"),
  ]);
  if (r && !r.isPublished) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en),
    categories = Object.fromEntries(
      Object.entries(climateCategories).filter(([key]) =>
        climateProducts.some(
          (p) => p.category === key || p.categories?.includes(key),
        ),
      ),
    );
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="hv-main hv-catalogue ac-main">
        <div className="hv-wrap">
          <Breadcrumbs id="catalogue-air-conditioning" lang={lang} />
          <header className="hv-catalogue-header">
            <p className="hv-kicker">
              {t(
                "GREE · HISENSE · LG / EQUIPMENT GUIDE",
                "GREE · HISENSE · LG / MWONGOZO WA VIFAA",
              )}
            </p>
            <h1>
              {t("Comfort starts with", "Hali nzuri huanza na")}
              <em>{t("the right match.", "vifaa vinavyoendana.")}</em>
            </h1>
            <p>
              {t(
                "Eight identifiable manufacturer families—not eight ready-made installation packages. Compare their roles, then confirm the regional model, capacity, matched indoor/outdoor units and installation requirements with BM.",
                "Familia nane zinazotambulika za watengenezaji—si vifurushi nane tayari vya ufungaji. Linganisha matumizi, kisha hakiki modeli, uwezo, vifaa vya ndani/nje na mahitaji ya ufungaji na BM.",
              )}
            </p>
            <div className="hv-actions">
              <a
                className="hv-link"
                href={`/services/air-conditioners?lang=${lang}`}
              >
                {t(
                  "Plan the complete AC solution",
                  "Panga suluhisho kamili la AC",
                )}{" "}
                ↗
              </a>
              <a
                className="hv-link"
                href={
                  climateLinks(
                    lang,
                    t(
                      "AC equipment list / current prices",
                      "Orodha ya vifaa vya AC / bei za sasa",
                    ),
                  ).quote
                }
              >
                {t("Send an equipment list", "Tuma orodha ya vifaa")} ↗
              </a>
            </div>
          </header>
          <ReferenceCatalogue
            products={climateProducts}
            categories={categories}
            namespace={climateCataloguePath}
            lang={lang}
            initialCategory={q.category}
            quoteLinks={Object.fromEntries(
              climateProducts.map((p) => [
                p.slug,
                climateLinks(
                  lang,
                  t(
                    "Equipment only / current price",
                    "Vifaa pekee / bei ya sasa",
                  ),
                  p.brand + " " + p.name,
                ).quote,
              ]),
            )}
            searchExample={{
              en: "Try Gree, Hisense, LG, multi-split, VRF…",
              sw: "Mfano: Gree, Hisense, LG, multi-split, VRF…",
            }}
          />
          <aside className="hv-family-note">
            <h2>{t("Need a different format?", "Unahitaji aina tofauti?")}</h2>
            <p>
              {t(
                "Fixed-speed/non-inverter, floor-standing units and installation materials are quotation families pending exact model verification. Pipework, insulation, drain materials, supports, electrical isolators/protection and approved controls are selected for the actual installation. Nothing here implies stock, an included accessory or a warranty term.",
                "Non-inverter/fixed-speed, AC za kusimama na vifaa vya ufungaji huuliziwa baada ya kuhakiki modeli. Mabomba, insulation, mifereji ya maji, viunzi, isolator/ulinzi wa umeme na vidhibiti huchaguliwa kwa ufungaji halisi. Hakuna stock, kifaa kilichojumuishwa au dhamana inayodhaniwa.",
              )}
            </p>
            <a
              className="hv-link"
              href={
                climateLinks(
                  lang,
                  t(
                    "AC accessories / alternative equipment",
                    "Vifaa vya ufungaji / aina nyingine za AC",
                  ),
                ).quote
              }
            >
              {t("Request Current Price", "Omba bei ya sasa")} ↗
            </a>
          </aside>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
