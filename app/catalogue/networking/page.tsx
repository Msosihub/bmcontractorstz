import { FamilyDiscovery, ApplicationDiscovery } from "./Discovery";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReferenceCatalogue } from "@/components/catalogue/ReferenceCatalogue";
import {
  networkingProducts,
  networkingCategories,
  networkingCataloguePath,
  networkingLinks,
} from "@/lib/catalogue/networking";
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
    networkingCataloguePath,
    lang,
    lang === "sw"
      ? [
          "Vifaa vya Mitandao na Fibre Tanzania | BM Contractors",
          "Linganisha router za MikroTik, AP za Omada na swichi. Omba bei ya sasa, vifaa vya BOQ au mfumo kamili wa kufungwa.",
        ]
      : [
          "Networking Equipment Tanzania | MikroTik & Omada | BM Contractors",
          "Compare MikroTik routers, Omada access points and managed/unmanaged switches. Request current equipment prices, BOQ materials or a complete installed network.",
        ],
  );
}
export default async function Page({ searchParams }: Props) {
  const [q, record] = await Promise.all([
    searchParams,
    getServiceRecord("networking"),
  ]);
  if (record && !record.isPublished) notFound();
  const lang = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    links = networkingLinks(
      lang,
      sw ? "Vifaa vya mitandao na BOQ" : "Networking equipment and BOQ",
    );
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="nf-main nf-catalogue-main ac-main">
        <header className="nf-wrap nf-catalogue-top">
          <Breadcrumbs id="catalogue-networking" lang={lang} />
          <p className="nf-kicker">
            {sw ? "VIFAA VILINGANE NA KAZI" : "MATCH THE EQUIPMENT TO THE DUTY"}
          </p>
          <h1>{sw ? "Vifaa vya mitandao." : "Networking equipment."}</h1>
          <p>
            {sw
              ? "Router za nyaya, Wi-Fi na swichi zina kazi tofauti. Linganisha rejea hizi za watengenezaji, kisha omba bei ya sasa ya vifaa pekee au mfumo wenye ufungaji. Toleo na upatikanaji huthibitishwa kwenye makadirio."
              : "Wired routing, wireless coverage and switching have different jobs. Compare these manufacturer references, then ask for equipment-only prices or a complete installed quotation. Revision and availability are confirmed in your quotation."}
          </p>
          <div className="nf-actions">
            <a className="nf-link" href={`/services/networking?lang=${lang}`}>
              {sw ? "Panga mfumo mzima" : "Plan the complete network"} ↗
            </a>
            <a className="nf-link" href={links.quote}>
              {sw
                ? "Tuma BOQ / orodha ya vifaa"
                : "Send your BOQ / materials list"}{" "}
              ↗
            </a>
          </div>
        </header>
        <FamilyDiscovery lang={lang} />
        <section
          id="models"
          className="nf-wrap nf-section"
          aria-label={
            sw
              ? "Katalogi ya vifaa vya mitandao"
              : "Networking equipment catalogue"
          }
        >
          <ReferenceCatalogue
            products={networkingProducts}
            categories={networkingCategories}
            namespace={networkingCataloguePath}
            initialCategory={q.category}
            lang={lang}
            searchExample={{
              en: "Try MikroTik, EAP650, PoE…",
              sw: "Mfano: MikroTik, EAP650, PoE…",
            }}
          />
          <div className="nf-empty-note">
            <strong>
              {sw
                ? "Nyaya, cabinet na vifaa vya ziada?"
                : "Cables, cabinets and accessories?"}
            </strong>
            <p>
              {sw
                ? "Wall-mount/floor-standing rack, patch panel, CAT6 za ndani/nje, fibre, patch cord, SFP na vifaa vya termination huainishwa kwa eneo lako."
                : "Wall-mount/floor-standing racks, patch panels, indoor/outdoor CAT6, fibre, patch cords, SFPs and termination materials are specified for your site."}
            </p>
            <a href={links.quote}>
              {sw
                ? "Omba makadirio ya vifaa vya mradi"
                : "Request a project materials quotation"}{" "}
              ↗
            </a>
          </div>
        </section>
        <ApplicationDiscovery lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
