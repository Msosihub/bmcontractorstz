import { notFound } from "next/navigation";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReferenceCard } from "@/components/catalogue/ReferenceCard";
import { RecordImage } from "@/components/premium/RecordImage";
import { approvedRecordMedia } from "@/lib/approved-record-media";
import { getServiceRecord } from "@/lib/services";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import { isLanguage, type Language } from "@/lib/i18n/config";
import {
  networkingProducts,
  networkingLinks,
  networkingCataloguePath,
} from "@/lib/catalogue/networking";
import { NetworkCurrent } from "./NetworkCurrent";
import "./networking.css";

type Props = { searchParams: Promise<{ lang?: string }> };
const path = "/services/networking";
const metadataCopy: Record<Language, [string, string]> = {
  en: [
    "Networking & Fibre Installation Tanzania | BM Contractors",
    "Structured CAT6 cabling, fibre optic links, data cabinets, MikroTik routing and Omada business Wi-Fi. Network installation and maintenance for Tanzanian workplaces.",
  ],
  sw: [
    "Ufungaji wa Mitandao na Fibre Tanzania | BM Contractors",
    "Nyaya za CAT6, fibre optic, data cabinet, router za MikroTik na Wi-Fi ya Omada. Ufungaji na matengenezo ya mitandao kwa ofisi, shule, hoteli na taasisi Tanzania.",
  ],
};
export async function generateMetadata({ searchParams }: Props) {
  const [{ lang: query }, record] = await Promise.all([
    searchParams,
    getServiceRecord("networking"),
  ]);
  if (record && !record.isPublished)
    return { robots: { index: false, follow: false } };
  const lang = isLanguage(query) ? query : "en";
  const m = pageMetadata(path, lang, metadataCopy[lang]);
  return {
    ...m,
    openGraph: {
      ...m.openGraph,
      images: ["/images/networking/workplace.webp"],
    },
  };
}
export default async function Page({ searchParams }: Props) {
  const [params, record] = await Promise.all([
    searchParams,
    getServiceRecord("networking"),
  ]);
  if (record && !record.isPublished) notFound();
  const lang: Language = isLanguage(params.lang) ? params.lang : "en",
    sw = lang === "sw";
  const t = (en: string, ki: string) => (sw ? ki : en);
  const links = networkingLinks(
    lang,
    t(
      "Complete networking and fibre installation",
      "Ufungaji kamili wa mtandao na fibre",
    ),
  );
  const catalogue = (category = "") =>
    `${networkingCataloguePath}?${new URLSearchParams({ lang, ...(category ? { category } : {}) })}`;
  const applications = [
    [
      t("Offices & commercial buildings", "Ofisi na majengo ya biashara"),
      t(
        "Desks, meeting rooms, printers and business systems. Plan reliable wired connections, sensible Wi-Fi and room for the next team member.",
        "Meza za kazi, vyumba vya mikutano, printa na mifumo ya biashara. Panga miunganisho imara ya nyaya, Wi-Fi inayofaa na nafasi ya kupanua mtandao.",
      ),
      t("Plan an office network", "Panga mtandao wa ofisi"),
    ],
    [
      t("Hotels, lodges & guest spaces", "Hoteli, lodges na maeneo ya wageni"),
      t(
        "Guest coverage, reception and back-office work have different needs. Assess walls, floors and busy periods; separate guest access from operational systems where specified.",
        "Mahitaji ya wageni, mapokezi na ofisi za ndani hutofautiana. Tathmini kuta, ghorofa na nyakati za msongamano; tenga mtandao wa wageni na wa kazi kulingana na mpango.",
      ),
      t("Discuss hospitality coverage", "Jadili Wi-Fi ya hoteli"),
    ],
    [
      t("Schools, campuses & institutions", "Shule, kampasi na taasisi"),
      t(
        "Connect administration, classrooms and separate buildings with an assessed copper/fibre backbone, planned wireless coverage and clear responsibility for access.",
        "Unganisha utawala, madarasa na majengo mbalimbali kwa nyaya au fibre zilizopangwa, Wi-Fi yenye coverage inayofaa na usimamizi unaoeleweka.",
      ),
      t("Assess a campus or institution", "Tathmini mtandao wa taasisi"),
    ],
    [
      t(
        "Warehouses, compounds & CCTV sites",
        "Maghala, maeneo yenye majengo na CCTV",
      ),
      t(
        "Connect distant cameras, gates and buildings. Check outdoor routes, fibre uplinks, PoE demand and power at each end—not just the number of network ports.",
        "Unganisha kamera za mbali, mageti na majengo. Hakiki njia za nje, fibre uplink, mahitaji ya PoE na umeme kila mwisho—si idadi ya port pekee.",
      ),
      t("Plan a multi-building backbone", "Panga mtandao wa majengo kadhaa"),
    ],
  ];
  const steps = [
    [
      t("Assess the site", "Tathmini eneo"),
      t(
        "Buildings, distances, users, devices and the internet connection you already have.",
        "Majengo, umbali, watumiaji, vifaa na huduma ya intaneti iliyopo.",
      ),
    ],
    [
      t("Plan the network", "Panga mtandao"),
      t(
        "Cable and fibre routes, rack layout, switching, routing and access-point positions.",
        "Njia za nyaya na fibre, mpangilio wa rack, swichi, router na mahali pa AP.",
      ),
    ],
    [
      t("Install & terminate", "Funga na unganisha"),
      t(
        "Containment, cabinets, cable runs, terminations and correctly mounted equipment.",
        "Njia za kupitishia nyaya, cabinet, kuunganisha ncha na kufunga vifaa ipasavyo.",
      ),
    ],
    [
      t("Test & organise", "Pima na panga"),
      t(
        "Agreed cable/link checks, port labels, neat patching and functional tests.",
        "Vipimo vya nyaya/viungo vilivyokubaliwa, lebo za port na majaribio ya mfumo.",
      ),
    ],
    [
      t("Handover & support", "Kabidhi na saidia"),
      t(
        "Settings, documented layout, owner-controlled access and a plan for maintenance.",
        "Mipangilio, mchoro wa mtandao, udhibiti wa akaunti na mpango wa matengenezo.",
      ),
    ],
  ];
  const faqs = [
    [
      t(
        "Do I need a new internet connection, or a better internal network?",
        "Nahitaji intaneti mpya au kuboresha mtandao wa ndani?",
      ),
      t(
        "We check both. A fast internet package cannot fix damaged cabling, poor AP placement or an overloaded uplink. Equally, a well-built LAN cannot exceed the service your internet provider supplies. We assess the bottleneck before proposing equipment.",
        "Tunakagua vyote. Kifurushi chenye kasi kubwa hakiwezi kurekebisha nyaya mbovu, AP zilizowekwa vibaya au uplink yenye msongamano. Pia LAN nzuri haiwezi kuongeza uwezo wa huduma inayotolewa na mtoa intaneti. Tunatafuta chanzo cha tatizo kabla ya kupendekeza vifaa.",
      ),
    ],
    [
      t("When is fibre better than CAT6?", "Ni lini fibre inafaa kuliko CAT6?"),
      t(
        "Fibre can suit longer or building-to-building links and environments where electrical isolation matters. The design checks route length, single/multimode fibre, connector type, optical budget and matching transceivers. Fibre carries data, not power: equipment at the far end still needs a suitable supply.",
        "Fibre inaweza kufaa kwa umbali mrefu, viungo vya majengo au mahali panapohitaji kutenganisha umeme kati ya ncha. Mpango huzingatia umbali, single-mode/multimode, connector, optical budget na transceiver zinazooana. Fibre hubeba data, si umeme: vifaa vya mwisho wa pili bado vinahitaji umeme unaofaa.",
      ),
    ],
    [
      t(
        "Can MikroTik routing and Omada Wi-Fi be used in the same network?",
        "Router ya MikroTik na Wi-Fi ya Omada vinaweza kutumika pamoja?",
      ),
      t(
        "Compatible Ethernet equipment can form a planned network, but management is not universal. RouterOS remains a MikroTik administration task; an Omada controller manages supported Omada devices. VLANs, uplinks, firmware and PoE compatibility must be specified and tested.",
        "Vifaa vya Ethernet vinavyooana vinaweza kuunda mtandao uliopangwa, lakini usimamizi wake si wa aina moja. RouterOS husimamiwa kama mfumo wa MikroTik; controller ya Omada husimamia vifaa vya Omada vinavyokubaliwa. VLAN, uplink, firmware na PoE lazima viainishwe na kupimwa.",
      ),
    ],
    [
      t(
        "Can you repair or expand our existing network?",
        "Mnaweza kutengeneza au kupanua mtandao uliopo?",
      ),
      t(
        "Yes. Start with symptoms, existing model labels, building plans and any known changes. We can assess unstable links, poor coverage, untidy cabinets and expansion needs. Agree the diagnostic scope, downtime window and handover checks first; no password or unrestricted access should be sent in an enquiry.",
        "Ndiyo. Taja dalili, modeli za vifaa, mpangilio wa majengo na mabadiliko yanayojulikana. Tunaweza kutathmini viungo visivyo imara, maeneo yasiyopata Wi-Fi vizuri, cabinet zisizopangwa na upanuzi. Kubalianeni kwanza uchunguzi, muda wa kusimamisha huduma na vipimo vya kukabidhi. Usitume password kwenye ombi.",
      ),
    ],
    [
      t(
        "What determines the installation quotation?",
        "Gharama ya ufungaji hutegemea nini?",
      ),
      t(
        "Outlet and AP counts, actual routes and distances, indoor/outdoor cable types, fibre work, rack size, switch/PoE capacity, routing, testing and access conditions. A site survey separates materials, equipment, installation and support. Current prices and supply lead times are confirmed in the quotation.",
        "Idadi ya data outlets na AP, njia na umbali halisi, nyaya za ndani/nje, kazi ya fibre, ukubwa wa rack, uwezo wa swichi/PoE, router, vipimo na namna ya kufikia eneo. Tathmini hutenganisha vifaa, nyaya, ufungaji na huduma ya baadaye. Bei na muda wa kupata vifaa huthibitishwa kwenye makadirio.",
      ),
    ],
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": languageUrl(path, lang) + "#service",
        name: t(
          "Networking & Fibre Infrastructure",
          "Miundombinu ya Mitandao na Fibre",
        ),
        serviceType: t(
          "Structured cabling, fibre, routing and business Wi-Fi installation",
          "Ufungaji wa nyaya za mtandao, fibre, router na Wi-Fi ya biashara",
        ),
        provider: { "@id": SITE_URL + "/#business" },
        areaServed: { "@type": "Country", name: "Tanzania" },
        url: languageUrl(path, lang),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          [t("Home", "Mwanzo"), "/"],
          [t("Services", "Huduma"), "/services"],
          [t("Networking & fibre", "Mitandao na fibre"), path],
        ].map(([name, item], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          item: languageUrl(item, lang),
        })),
      },
    ],
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="nf-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <section className="nf-hero" aria-labelledby="nf-title">
          <div className="nf-hero-media">
            {record && approvedRecordMedia("service", record) ? (
              <RecordImage kind="service" record={record} lang={lang} />
            ) : (
              <Image
                src="/images/networking/workplace.webp"
                alt={t(
                  "An organised data cabinet beside a contemporary office with people at work",
                  "Data cabinet iliyopangwa karibu na ofisi ya kisasa yenye watu kazini",
                )}
                fill
                sizes="100vw"
                preload
              />
            )}
          </div>
          <div className="nf-hero-shade" />
          <div className="nf-wrap nf-hero-layout">
            <div className="nf-hero-copy">
              <p className="nf-kicker">
                {t(
                  "NETWORKING & FIBRE INFRASTRUCTURE",
                  "MIUNDOMBINU YA MITANDAO NA FIBRE",
                )}
              </p>
              <h1 id="nf-title">
                {t("Networking.", "Mtandao imara.")}
                <em>{t("Built for work.", "Kazi ziendelee.")}</em>
              </h1>
              <p>
                {t(
                  "Structured cabling, fibre, routers and business Wi-Fi—planned, installed and maintained for offices, hotels, schools and security systems.",
                  "Tunapanga, tunafunga na kutunza mitandao ya nyaya, fibre, router na Wi-Fi kwa ofisi, hoteli, shule na mifumo ya ulinzi.",
                )}
              </p>
              <div className="nf-actions">
                <a className="nf-button nf-button-light" href={links.quote}>
                  {t("Request quotation", "Omba makadirio")} ↗
                </a>
                <a className="nf-button nf-button-ghost" href={links.survey}>
                  {t("Request site survey", "Omba tathmini ya eneo")} ↗
                </a>
              </div>
              <span className="nf-hero-detail">
                {t(
                  "CABLING / FIBRE / ROUTING / WI-FI / MAINTENANCE",
                  "NYAYA / FIBRE / ROUTER / WI-FI / MATENGENEZO",
                )}
              </span>
            </div>
            <NetworkCurrent lang={lang} />
          </div>
        </section>
        <nav
          className="nf-section-nav"
          aria-label={t(
            "Networking page sections",
            "Sehemu za ukurasa wa mitandao",
          )}
        >
          <div className="nf-wrap">
            {[
              ["applications", t("Your premises", "Eneo lako")],
              ["cabling", t("Cabling & cabinets", "Nyaya na cabinet")],
              ["fibre", t("Fibre links", "Viungo vya fibre")],
              ["wifi", t("Routing & Wi-Fi", "Router na Wi-Fi")],
              ["delivery", t("How we deliver", "Hatua za kazi")],
              ["equipment", t("Equipment guide", "Mwongozo wa vifaa")],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label} ↗
              </a>
            ))}
          </div>
        </nav>
        <section id="applications" className="nf-section nf-wrap">
          <div className="nf-heading">
            <div>
              <p className="nf-kicker">
                {t(
                  "START WITH THE WAY YOUR SITE WORKS",
                  "ANZA NA SHUGHULI ZA ENEO LAKO",
                )}
              </p>
              <h2>
                {t("Not just a signal.", "Zaidi ya kupata signal.")}
                <em>
                  {t("A network with a purpose.", "Mtandao unaofaa kazi zako.")}
                </em>
              </h2>
            </div>
            <p>
              {t(
                "People, buildings and devices need different connections. We plan the complete path—from the internet gateway to the last office outlet, access point or camera.",
                "Watu, majengo na vifaa vina mahitaji tofauti ya mawasiliano. Tunapanga njia nzima—kutoka kwenye gateway ya intaneti hadi data outlet, AP au kamera ya mwisho.",
              )}
            </p>
          </div>
          <div className="nf-application-grid">
            <div className="nf-place-image">
              <Image
                src="/images/networking/connected-campus.webp"
                alt={t(
                  "A multi-building workplace with a shaded connecting walkway",
                  "Eneo lenye majengo ya kazi na njia yenye kivuli inayoyaunganisha",
                )}
                fill
                sizes="(max-width:760px) 89vw, 46vw"
              />
              <div className="nf-place-note">
                <span>
                  {t(
                    "WORK. WELCOME. LEARN. PROTECT.",
                    "KAZI. WAGENI. ELIMU. ULINZI.",
                  )}
                </span>
                <span>LAN / WLAN</span>
              </div>
            </div>
            <div className="nf-application-list">
              {applications.map(([title, body, action], i) => (
                <details name="network-application" key={title} open={i === 0}>
                  <summary>
                    {title}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{body}</p>
                  <a href={networkingLinks(lang, title).survey}>{action} ↗</a>
                </details>
              ))}
            </div>
          </div>
          <p className="nf-setting-list">
            <strong>{t("Suitable for:", "Kwa maeneo kama:")}</strong>{" "}
            {t(
              "Offices · tour companies · schools · hotels & lodges · campuses · warehouses · shops · institutions · multi-building compounds · IP CCTV sites",
              "Ofisi · kampuni za utalii · shule · hoteli na lodges · kampasi · maghala · maduka · taasisi · maeneo yenye majengo kadhaa · mifumo ya CCTV za IP",
            )}
          </p>
        </section>
        <section id="cabling" className="nf-section nf-copper">
          <div className="nf-wrap nf-editorial">
            <div className="nf-editorial-photo">
              <Image
                src="/images/networking/rack-detail.webp"
                alt={t(
                  "Blue, grey and black patch leads organised through cable managers with a separate fibre shelf",
                  "Patch cord za bluu, kijivu na nyeusi zilizopangwa kwenye cable manager, pamoja na sehemu ya fibre",
                )}
                fill
                sizes="(max-width:760px) 89vw, 44vw"
              />
            </div>
            <div className="nf-editorial-copy">
              <p className="nf-kicker">
                {t(
                  "01 / STRUCTURED CABLING & DATA CABINETS",
                  "01 / NYAYA ZA MTANDAO NA DATA CABINET",
                )}
              </p>
              <h2>
                {t("Order behind", "Mpangilio mzuri.")}
                <em>{t("every connection.", "Kila muunganisho.")}</em>
              </h2>
              <p>
                {t(
                  "CAT6 routes that make sense. Proper terminations, labelled outlets and neatly managed patching. Blue, grey or black—the cable specification matters more than its colour.",
                  "Njia za CAT6 zilizopangwa vizuri. Ncha zilizounganishwa ipasavyo, data outlets zenye lebo na patch cord zenye unadhifu. Bluu, kijivu au nyeusi—ubora na aina ya waya vina umuhimu kuliko rangi.",
                )}
              </p>
              <div className="nf-spec-line">
                <span>CAT6 indoor</span>
                <span>CAT6 outdoor</span>
                <span>
                  {t("Outlets & faceplates", "Data outlets na faceplate")}
                </span>
              </div>
              <details className="nf-detail">
                <summary>
                  {t(
                    "Indoor runs, outdoor protection and testing",
                    "Nyaya za ndani, kinga za nje na vipimo",
                  )}
                </summary>
                <p>
                  {t(
                    "Select cable construction, shielding, containment and outdoor rating for the actual route. Assess moisture, UV, interference, separation from electrical circuits and link-length limits. Agree termination, labelling and test requirements; a functional connection is not the same as a formal cable-certification report.",
                    "Chagua muundo wa waya, shielding, njia ya kupitishia na uwezo wa kutumika nje kulingana na eneo. Zingatia unyevu, jua, interference, kutenganisha na nyaya za umeme na urefu wa kiungo. Kubalianeni namna ya kuunganisha ncha, lebo na vipimo; kupata connection si sawa na ripoti rasmi ya cable certification.",
                  )}
                </p>
              </details>
              <h3 id="cabinets">
                {t(
                  "A cabinet that stays manageable.",
                  "Cabinet inayobaki rahisi kuhudumia.",
                )}
              </h3>
              <p>
                {t(
                  "Wall-mount or floor-standing. Plan rack depth, patch panels, switch/router placement, cable managers, power, airflow and spare capacity together.",
                  "Ya ukutani au ya kusimama sakafuni. Panga kina cha rack, patch panel, swichi/router, cable manager, umeme, hewa na nafasi ya baadaye kwa pamoja.",
                )}
              </p>
              <details className="nf-detail">
                <summary>
                  {t(
                    "What belongs in a cabinet specification?",
                    "Nini kiwekwe kwenye maelezo ya cabinet?",
                  )}
                </summary>
                <p>
                  {t(
                    "Rack units alone are not enough. Check equipment depth and load, access and mounting surface, ventilation, PDU/UPS arrangement, earthing where required and room to patch without sharp cable bends. Materials and dimensions are confirmed in the BOQ; no standard cabinet size suits every site.",
                    "Idadi ya U pekee haitoshi. Hakiki kina na uzito wa vifaa, nafasi ya kufikia, ukuta au sakafu, hewa, PDU/UPS, earthing inapohitajika na nafasi ya kupanga nyaya bila kuzibana. Vipimo na vifaa huthibitishwa kwenye BOQ; hakuna ukubwa mmoja unaofaa kila eneo.",
                  )}
                </p>
              </details>
              <a
                className="nf-link"
                href={
                  networkingLinks(
                    lang,
                    t(
                      "CAT6, patch panels and cabinet installation",
                      "CAT6, patch panel na ufungaji wa cabinet",
                    ),
                  ).quote
                }
              >
                {t(
                  "Request cabling & cabinet quotation",
                  "Omba makadirio ya nyaya na cabinet",
                )}{" "}
                ↗
              </a>
            </div>
          </div>
        </section>
        <section id="fibre" className="nf-section nf-fibre">
          <div className="nf-wrap nf-editorial">
            <div className="nf-editorial-photo">
              <Image
                src="/images/networking/fibre-work.webp"
                alt={t(
                  "A technician preparing fibre at a splicing workbench beside organised termination materials",
                  "Fundi akiandaa fibre kwenye meza ya splicing yenye vifaa vya termination vilivyopangwa",
                )}
                fill
                sizes="(max-width:760px) 89vw, 48vw"
              />
            </div>
            <div className="nf-editorial-copy">
              <p className="nf-kicker">
                {t(
                  "02 / FIBRE OPTIC INFRASTRUCTURE",
                  "02 / MIUNDOMBINU YA FIBRE OPTIC",
                )}
              </p>
              <h2>
                {t("Across the compound.", "Kuvuka eneo.")}
                <em>{t("Between buildings.", "Kuunganisha majengo.")}</em>
              </h2>
              <p>
                {t(
                  "A considered backbone for longer links, campuses and separate buildings. From route assessment to splicing, termination and clean fibre patching.",
                  "Mtandao mkuu uliopangwa kwa viungo vya mbali, kampasi na majengo tofauti. Kuanzia tathmini ya njia hadi splicing, termination na fibre patching yenye unadhifu.",
                )}
              </p>
              <div className="nf-two-notes">
                <div>
                  <strong>{t("The physical route", "Njia halisi")}</strong>
                  <p>
                    {t(
                      "Ducts or suitable external routes, protection, bend radius and service access.",
                      "Duct au njia za nje zinazofaa, kinga, bend radius na nafasi ya matengenezo.",
                    )}
                  </p>
                </div>
                <div>
                  <strong>{t("The complete link", "Kiungo kizima")}</strong>
                  <p>
                    {t(
                      "Matched fibre, connectors, transceivers and powered equipment at both ends.",
                      "Fibre, connector, transceiver zinazooana na vifaa vyenye umeme kila mwisho.",
                    )}
                  </p>
                </div>
              </div>
              <details className="nf-detail">
                <summary>
                  {t(
                    "Single-mode, multimode and optical testing",
                    "Single-mode, multimode na vipimo vya fibre",
                  )}
                </summary>
                <p>
                  {t(
                    "Choose the fibre and SFP/SFP+ modules around distance, wavelength, connector type, optical budget and equipment support. Specify joint protection, patching and agreed loss/continuity tests; OTDR or other specialist reports are scoped separately. Fibre does not supply PoE or remove the need for local power and protection.",
                    "Chagua fibre na moduli za SFP/SFP+ kulingana na umbali, wavelength, connector, optical budget na vifaa vinavyokubaliwa. Ainisha kinga za viungio, patching na vipimo vya loss/continuity vilivyokubaliwa; OTDR au ripoti nyingine maalumu huainishwa kando. Fibre haitoi PoE wala kuondoa hitaji la umeme na kinga mwisho wa pili.",
                  )}
                </p>
              </details>
              <a
                className="nf-link"
                href={
                  networkingLinks(
                    lang,
                    t(
                      "Fibre link and termination assessment",
                      "Tathmini ya kiungo na termination ya fibre",
                    ),
                  ).survey
                }
              >
                {t(
                  "Assess your fibre route",
                  "Panga tathmini ya njia ya fibre",
                )}{" "}
                ↗
              </a>
            </div>
          </div>
        </section>
        <section id="wifi" className="nf-section nf-wireless">
          <div className="nf-wrap nf-editorial">
            <div className="nf-wifi-photo">
              <Image
                src="/images/networking/hotel-wifi.webp"
                alt={t(
                  "A discreet ceiling access point in a contemporary reception and guest corridor",
                  "Access point ya darini katika mapokezi na korido ya wageni ya kisasa",
                )}
                fill
                sizes="(max-width:760px) 89vw, 44vw"
              />
              <div className="nf-ap-reference">
                <Image
                  src="/images/networking/omada-eap650.webp"
                  alt="TP-Link Omada EAP650"
                  width={160}
                  height={120}
                />
                <span>{t("Equipment reference", "Rejea ya kifaa")}</span>
                <strong>Omada EAP650</strong>
              </div>
            </div>
            <div className="nf-editorial-copy">
              <p className="nf-kicker">
                {t(
                  "03 / ROUTING, SWITCHING & ENTERPRISE WI-FI",
                  "03 / ROUTER, SWICHI NA WI-FI YA BIASHARA",
                )}
              </p>
              <h2>
                {t("Good Wi-Fi starts", "Wi-Fi nzuri huanzia")}
                <em>{t("behind the ceiling.", "kwenye mpango mzuri.")}</em>
              </h2>
              <p>
                {t(
                  "Plan access points where people actually work and stay. Omada EAP-series options for offices, schools, hotels and assessed outdoor areas—with wired uplinks and power that fit the installation.",
                  "Panga access point mahali watu wanapofanya kazi na kukaa. Chaguo za Omada EAP series kwa ofisi, shule, hoteli na maeneo ya nje yaliyotathminiwa—pamoja na uplink za nyaya na umeme unaofaa.",
                )}
              </p>
              <details className="nf-detail">
                <summary>
                  {t(
                    "Coverage, capacity and guest access",
                    "Coverage, uwezo na matumizi ya wageni",
                  )}
                </summary>
                <p>
                  {t(
                    "Walls, floors, interference, user numbers and busy-hour demand shape AP positions and capacity. Guest/operational separation, roaming and controller features are enabled only on supported equipment with an agreed configuration. Mesh is an option, not a promise that wireless backhaul can replace every cable.",
                    "Kuta, ghorofa, interference, idadi ya watumiaji na msongamano huamua nafasi na uwezo wa AP. Kutenganisha wageni na matumizi ya kazi, roaming na vipengele vya controller huwekwa kwa vifaa vinavyokubaliwa na mpango uliokubaliwa. Mesh ni chaguo; si ahadi kwamba wireless inaweza kuchukua nafasi ya kila waya.",
                  )}
                </p>
              </details>
              <div className="nf-routing-note">
                <h3>
                  {t(
                    "A router routes. A switch connects.",
                    "Router na swichi zina kazi tofauti.",
                  )}
                </h3>
                <p>
                  {t(
                    "MikroTik routing for the assessed gateway and bandwidth policy. Managed switching where VLANs and control are needed; unmanaged options for simpler port expansion. Size PoE for the actual cameras and APs.",
                    "Router ya MikroTik kwa gateway na mpango wa matumizi ya bandwidth. Swichi managed pale VLAN na usimamizi vinapohitajika; unmanaged kwa kuongeza port bila usimamizi huo. Panga PoE kulingana na kamera na AP halisi.",
                  )}
                </p>
              </div>
              <a
                className="nf-link"
                href={
                  networkingLinks(
                    lang,
                    t(
                      "Business Wi-Fi, MikroTik routing and switching",
                      "Wi-Fi ya biashara, router ya MikroTik na swichi",
                    ),
                  ).quote
                }
              >
                {t("Plan routing & Wi-Fi", "Panga router na Wi-Fi")} ↗
              </a>
            </div>
          </div>
        </section>
        <section className="nf-backbone">
          <div className="nf-wrap nf-backbone-grid">
            <div>
              <p className="nf-kicker">
                {t(
                  "04 / THE CCTV & ICT BACKBONE",
                  "04 / MTANDAO WA CCTV NA ICT",
                )}
              </p>
              <h2>
                {t(
                  "Security needs a network, too.",
                  "Ulinzi pia unahitaji mtandao imara.",
                )}
              </h2>
              <p>
                {t(
                  "IP cameras, NVRs, access control, intercoms and office telephones depend on a working network. Plan bandwidth, segmentation and backup for the whole chain, with verified interfaces.",
                  "Kamera za IP, NVR, access control, intercom na simu za ofisi hutegemea mtandao unaofanya kazi. Panga bandwidth, utenganishaji na backup kwa mfumo mzima, kwa vifaa vinavyooana.",
                )}
              </p>
            </div>
            <nav
              className="nf-backbone-links"
              aria-label={t("Related connected systems", "Mifumo inayohusiana")}
            >
              {[
                ["cctv", "CCTV"],
                ["access-control", t("Access control", "Udhibiti wa kuingia")],
                ["video-intercom", "Intercom"],
                [
                  "telephone-systems",
                  t("Business telephones", "Simu za ofisi"),
                ],
                ["power-backup", t("UPS & continuity", "UPS na backup")],
              ].map(([slug, title]) => (
                <a href={`/services/${slug}?lang=${lang}`} key={slug}>
                  {title} ↗
                </a>
              ))}
            </nav>
          </div>
        </section>
        <section id="delivery" className="nf-section nf-delivery">
          <div className="nf-wrap">
            <div className="nf-heading">
              <div>
                <p className="nf-kicker">
                  {t(
                    "FROM ASSESSMENT TO HANDOVER",
                    "KUANZIA TATHMINI HADI MAKABIDHIANO",
                  )}
                </p>
                <h2>
                  {t("One plan.", "Mpango mmoja.")}
                  <em>
                    {t("Five considered steps.", "Hatua tano zilizo wazi.")}
                  </em>
                </h2>
              </div>
              <p>
                {t(
                  "New premises, a growing team or an existing network that needs attention. Agree the scope, access and testing before the work begins.",
                  "Jengo jipya, timu inayokua au mtandao uliopo unaohitaji huduma. Kubalianeni wigo, upatikanaji wa eneo na vipimo kabla ya kazi kuanza.",
                )}
              </p>
            </div>
            <ol className="nf-steps">
              {steps.map(([title, body], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <div className="nf-delivery-tail">
              <p>
                {t(
                  "Already connected? Ask for fault diagnosis, cabinet tidying, Wi-Fi improvements, link testing or a planned maintenance visit.",
                  "Tayari una mtandao? Omba uchunguzi wa hitilafu, kupanga cabinet, kuboresha Wi-Fi, kupima viungo au ziara ya matengenezo.",
                )}
              </p>
              <a
                className="nf-button"
                href={
                  networkingLinks(
                    lang,
                    t(
                      "Existing network maintenance and expansion",
                      "Matengenezo na upanuzi wa mtandao uliopo",
                    ),
                  ).quote
                }
              >
                {t("Maintain or expand", "Tengeneza au panua")} ↗
              </a>
            </div>
          </div>
        </section>
        <section id="equipment" className="nf-section nf-equipment">
          <div className="nf-wrap">
            <div className="nf-heading">
              <div>
                <p className="nf-kicker">
                  {t(
                    "THE EQUIPMENT, WITH A PURPOSE",
                    "KILA KIFAA KIWE NA KAZI YAKE",
                  )}
                </p>
                <h2>
                  {t("Right architecture.", "Mpango unaofaa.")}
                  <em>
                    {t("Then the right equipment.", "Kisha vifaa vinavyofaa.")}
                  </em>
                </h2>
              </div>
              <p>
                {t(
                  "Compare a focused selection of manufacturer references. Ask for equipment only, a complete installation or materials against your BOQ. Prices and exact revisions are confirmed in your quotation.",
                  "Linganisha chaguo chache za rejea za watengenezaji. Omba vifaa pekee, ufungaji kamili au vifaa kwa BOQ yako. Bei na matoleo halisi huthibitishwa kwenye makadirio.",
                )}
              </p>
            </div>
            <nav
              className="nf-categories"
              aria-label={t(
                "Equipment and material groups",
                "Makundi ya vifaa na nyaya",
              )}
            >
              {[
                [catalogue("routers"), t("Routers", "Router")],
                [
                  catalogue("access-points"),
                  t("Access points", "Access point"),
                ],
                [catalogue("switches"), t("Switches", "Swichi")],
                [`/catalogue/networking/families/data-cabinets?lang=${lang}`, t("Data cabinets", "Data cabinet")],
                [`/catalogue/networking/families/cat6-cabling?lang=${lang}`, t("Patch panels", "Patch panel")],
                [`/catalogue/networking/families/cat6-cabling?lang=${lang}`, t("CAT6 indoor / outdoor", "CAT6 za ndani / nje")],
                [`/catalogue/networking/families/fibre-accessories?lang=${lang}`, t("Fibre & accessories", "Fibre na vifaa vyake")],
                [
                  networkingLinks(
                    lang,
                    t(
                      "Networking accessories and BOQ materials",
                      "Vifaa vya ziada vya mtandao na BOQ",
                    ),
                  ).quote,
                  t("Networking accessories", "Vifaa vya ziada"),
                ],
              ].map(([href, label]) => (
                <a href={href} key={label}>
                  {label} ↗
                </a>
              ))}
            </nav>
            <div className="nf-catalogue-grid">
              {["mikrotik-rb5009ug-s-in", "omada-eap650", "omada-sg2210mp"].map(
                (slug) => {
                  const p = networkingProducts.find((x) => x.slug === slug)!;
                  return (
                    <div key={p.slug}>
                      <ReferenceCard
                        p={p}
                        lang={lang}
                        namespace={networkingCataloguePath}
                      />
                      <a
                        className="nf-installed-link"
                        href={
                          networkingLinks(
                            lang,
                            t("Installed network", "Mtandao wenye ufungaji"),
                            p.brand + " " + p.name,
                          ).quote
                        }
                      >
                        {t(
                          "Include in an installed quotation",
                          "Jumuisha kwenye makadirio ya ufungaji",
                        )}{" "}
                        ↗
                      </a>
                    </div>
                  );
                },
              )}
            </div>
            <div className="nf-equipment-tail">
              <p>
                {t(
                  "Cabinets, patch panels, CAT6, fibre cables, patch cords and termination accessories are specified to suit the route and equipment. Send a materials list or ask us to prepare the scope.",
                  "Cabinet, patch panel, CAT6, nyaya za fibre, patch cord na vifaa vya kuunganisha ncha huchaguliwa kulingana na njia na mfumo. Tuma orodha ya vifaa au tuombe tuandae wigo wa kazi.",
                )}
              </p>
              <a className="nf-button" href={catalogue()}>
                {t(
                  "Explore networking equipment",
                  "Angalia vifaa vya mitandao",
                )}{" "}
                ↗
              </a>
            </div>
          </div>
        </section>
        <section className="nf-section nf-wrap nf-faq">
          <div>
            <p className="nf-kicker">
              {t("MAKE AN INFORMED START", "ANZA UKIWA NA TAARIFA SAHIHI")}
            </p>
            <h2>
              {t("Clear answers.", "Majibu yaliyo wazi.")}
              <em>{t("A practical next step.", "Hatua inayofaa kufuata.")}</em>
            </h2>
            <p>
              {t(
                "A few decisions make a lasting difference to how your network works and how easily it can be maintained.",
                "Maamuzi machache sahihi yanaweza kuboresha namna mtandao wako unavyofanya kazi na urahisi wa kuutunza.",
              )}
            </p>
            <a
              className="nf-link"
              href={`/blog/planning-office-fibre-network-tanzania?lang=${lang}`}
            >
              {t(
                "Read the short planning guide",
                "Soma mwongozo mfupi wa maandalizi",
              )}{" "}
              ↗
            </a>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details className="nf-detail" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
            {record && (record.contentEn || record.contentSw) && (
              <details className="nf-detail">
                <summary>
                  {t(
                    "Additional service information",
                    "Taarifa za ziada za huduma",
                  )}
                </summary>
                <p>
                  {sw ? record.contentSw || record.contentEn : record.contentEn}
                  {sw && !record.contentSw && record.contentEn
                    ? " — Maelezo haya ya ziada bado yako kwa Kiingereza."
                    : ""}
                </p>
              </details>
            )}
          </div>
        </section>
        <section className="nf-closing">
          <div className="nf-wrap">
            <div>
              <p className="nf-kicker">
                {t(
                  "NEW NETWORK. BETTER NETWORK. ONE CONVERSATION.",
                  "MTANDAO MPYA AU KUBORESHA ULIOPO. TUANZE MAZUNGUMZO.",
                )}
              </p>
              <h2>
                {t("Tell us about your site.", "Tuambie kuhusu eneo lako.")}
                <em>
                  {t(
                    "We’ll plan the connections.",
                    "Tupange miunganisho yake.",
                  )}
                </em>
              </h2>
            </div>
            <div>
              <p>
                {t(
                  "Share your location, buildings, users and equipment. We can scope the materials, installation, testing and support in one considered quotation.",
                  "Taja eneo, majengo, watumiaji na vifaa vyako. Tunaweza kuainisha vifaa, ufungaji, vipimo na huduma ya baadaye kwenye makadirio moja yaliyo wazi.",
                )}
              </p>
              <div className="nf-actions">
                <a className="nf-button nf-button-light" href={links.survey}>
                  {t("Request a site survey", "Omba tathmini ya eneo")} ↗
                </a>
                <a
                  className="nf-button nf-button-ghost"
                  href={
                    networkingLinks(
                      lang,
                      t(
                        "Networking equipment / institutional BOQ",
                        "Vifaa vya mtandao / BOQ ya taasisi",
                      ),
                    ).quote
                  }
                >
                  {t("Send your BOQ / RFQ", "Tuma BOQ / RFQ")} ↗
                </a>
              </div>
              <div className="nf-closing-contact">
                <a href={links.whatsapp}>WhatsApp ↗</a>
                <a href={links.call}>
                  {t("Call national sales", "Piga simu mauzo")} ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
