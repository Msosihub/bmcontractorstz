import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReferenceCatalogue } from "@/components/catalogue/ReferenceCatalogue";
import {
  telephonyProducts,
  telephonyCategories,
  telephonyCataloguePath,
  telephonyLinks,
} from "@/lib/catalogue/telephony";
import { getServiceRecord } from "@/lib/services";
import { isLanguage } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/components/premium/access-control/access.css";
import "@/app/services/networking/networking.css";
type Props = { searchParams: Promise<{ lang?: string; category?: string }> };
export async function generateMetadata({ searchParams }: Props) {
  const q = await searchParams,
    lang = isLanguage(q.lang) ? q.lang : "en";
  return pageMetadata(
    telephonyCataloguePath,
    lang,
    lang === "sw"
      ? [
          "Vifaa vya Simu, Yeastar PBX na Gateway Tanzania | BM Contractors",
          "Rejea za Yeastar PBX, gateway za FXS/FXO, simu za Yealink na Grandstream. Omba bei ya sasa au mfumo kamili wa ofisi na hoteli.",
        ]
      : [
          "Business Telephone Equipment, Yeastar PBX & Gateways Tanzania | BM Contractors",
          "Compare Yeastar P550, TA400 FXS, TA410 FXO, Yealink and Grandstream phone references. Request current prices or complete office and hotel installations.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const [q, record] = await Promise.all([
    searchParams,
    getServiceRecord("telephone-systems"),
  ]);
  if (record && !record.isPublished) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    links = telephonyLinks(
      lang,
      sw ? "Vifaa vya simu na PBX" : "Telephone equipment and PBX",
    );
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="nf-main nf-catalogue-main ac-main">
        <header className="nf-wrap nf-catalogue-top">
          <Breadcrumbs id="catalogue-telephony" lang={lang} />
          <p className="nf-kicker">
            {sw
              ? "VIFAA VILINGANE NA MPANGO WA SIMU"
              : "MATCH THE EQUIPMENT TO THE CALL PLAN"}
          </p>
          <h1>
            {sw
              ? "Vifaa vya mawasiliano."
              : "Equipment for better conversations."}
          </h1>
          <p>
            {sw
              ? "PBX, gateway na simu zina kazi tofauti. Yeastar na Yealink ni watengenezaji tofauti. Chagua rejea, kisha omba vifaa pekee au mfumo wenye ufungaji."
              : "PBXs, gateways and handsets do different jobs. Yeastar and Yealink are separate manufacturers. Explore these references, then request equipment alone or a complete installation."}
          </p>
          <div className="nf-actions">
            <a
              className="nf-link"
              href={`/services/telephone-systems?lang=${lang}`}
            >
              {sw ? "Panga mfumo mzima" : "Plan the whole system"} ↗
            </a>
            <a className="nf-link" href={links.quote}>
              {sw ? "Tuma orodha ya mahitaji" : "Send an equipment requirement"}{" "}
              ↗
            </a>
          </div>
        </header>
        <section
          className="nf-wrap nf-section"
          aria-label={
            sw ? "Katalogi ya vifaa vya simu" : "Telephone equipment catalogue"
          }
        >
          <ReferenceCatalogue
            products={telephonyProducts}
            categories={telephonyCategories}
            namespace={telephonyCataloguePath}
            initialCategory={q.category}
            lang={lang}
            searchExample={{
              en: "Try TA400, FXS, hotel…",
              sw: "Mfano: TA400, FXS, hoteli…",
            }}
          />
          <div className="nf-empty-note">
            <strong>
              {sw
                ? "Simu za analogue, DECT au vifaa vya nyaya?"
                : "Analogue phones, DECT or distribution materials?"}
            </strong>
            <p>
              {sw
                ? "Tuma idadi ya vyumba/extension na mfumo uliopo. PBX za analogue/hybrid, simu za mapokezi, cordless/DECT, gateway, nyaya, distribution block, PoE na adapta huainishwa kwenye makadirio. Vifaa halisi na vilivyojumuishwa huthibitishwa kabla ya ugavi."
                : "Send the room/extension count and existing system details. Analogue/hybrid PBXs, reception phones, cordless/DECT equipment, gateways, cables, distribution blocks, PoE and adapters are specified in your quotation. Exact equipment and included items are confirmed before supply."}
            </p>
            <a className="nf-link" href={links.quote}>
              {sw ? "Omba bei ya sasa" : "Request Current Price"} ↗
            </a>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
