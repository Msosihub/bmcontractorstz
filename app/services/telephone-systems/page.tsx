import { notFound } from "next/navigation";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getServiceRecord } from "@/lib/services";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { telephonyLinks } from "@/lib/catalogue/telephony/links";
import {
  telephonyProducts,
  telephonyCategories,
} from "@/lib/catalogue/telephony";
import {
  approaches,
  hotelScenarios,
  workplaceScenarios,
  buyerFunctions,
  faultGroups,
  delivery,
  voiceFAQs,
} from "@/data/telephony";
import { CallFlow } from "./CallFlow";
import { VoiceRibbons } from "./VoiceMotion";
import "./telephony.css";
type Props = { searchParams: Promise<{ lang?: string }> };
const path = "/services/telephone-systems";
const metadata: Record<Language, [string, string]> = {
  en: [
    "Business Telephony, IP-PBX & Hotel Telephone Systems Tanzania",
    "PABX and IP-PBX installation, analogue hotel phones, hybrid upgrades, Yeastar gateways and business telephone maintenance. BM Contractors, Moshi, Arusha and Tanzania.",
  ],
  sw: [
    "Mifumo ya Simu za Ofisi, Hoteli na PBX Tanzania",
    "Ufungaji na matengenezo ya PABX/IP-PBX, simu za analogue za hoteli, maboresho ya hybrid na gateway za Yeastar. BM Contractors, Moshi, Arusha na Tanzania.",
  ],
};
export async function generateMetadata({ searchParams }: Props) {
  const [q, record] = await Promise.all([
    searchParams,
    getServiceRecord("telephone-systems"),
  ]);
  if (record && !record.isPublished)
    return { robots: { index: false, follow: false } };
  const lang = isLanguage(q.lang) ? q.lang : "en",
    m = pageMetadata(path, lang, metadata[lang]);
  return {
    ...m,
    openGraph: { ...m.openGraph, images: ["/images/telephony/reception.webp"] },
  };
}
export default async function Page({ searchParams }: Props) {
  const [q, record] = await Promise.all([
    searchParams,
    getServiceRecord("telephone-systems"),
  ]);
  if (record && !record.isPublished) notFound();
  const lang: Language = isLanguage(q.lang) ? q.lang : "en",
    sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en),
    links = telephonyLinks(
      lang,
      t(
        "Complete business telephone system",
        "Mfumo kamili wa simu za biashara",
      ),
    ),
    intent = (en: string, ki: string) => telephonyLinks(lang, t(en, ki));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: metadata[lang][0],
    description: metadata[lang][1],
    serviceType:
      "Business telephone installation, PBX maintenance and hybrid upgrades",
    provider: {
      "@type": "Organization",
      name: "BM Engineering Contractors Limited",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "Tanzania" },
    url: languageUrl(path, lang),
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="tp-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <header className="tp-hero">
          <div className="tp-hero-photo">
            <Image
              src="/images/telephony/reception.webp"
              width={1672}
              height={941}
              sizes="100vw"
              preload
              alt={t(
                "Receptionist speaking on a wired desk telephone in an elegant hotel reception",
                "Mhudumu wa mapokezi akizungumza kwa simu ya mezani kwenye mapokezi ya hoteli",
              )}
            />
            <VoiceRibbons />
          </div>
          <div className="tp-hero-shade" />
          <div className="tp-hero-copy tp-wrap">
            <p className="tp-kicker">
              {t(
                "BUSINESS TELEPHONY / PABX / HOTEL SYSTEMS",
                "SIMU ZA BIASHARA / PABX / HOTELI",
              )}
            </p>
            <h1>
              {t("Every call.", "Kila simu.")}
              <em>{t("The right connection.", "Imfikie anayehitajika.")}</em>
            </h1>
            <p className="tp-hero-intro">
              {t(
                "Business telephone systems designed around reception, guest rooms, teams and the calls that keep your operations moving.",
                "Mifumo ya simu iliyopangwa kwa mapokezi, vyumba vya wageni, idara na mawasiliano yanayoendesha shughuli zako.",
              )}
            </p>
            <div className="tp-actions">
              <a className="tp-button" href={links.quote}>
                {t("Discuss a telephone system", "Jadili mfumo wa simu")}
              </a>
              <a className="tp-button tp-button-outline" href={links.survey}>
                {t("Request a site survey", "Omba tathmini ya eneo")}
              </a>
            </div>
            <a
              className="tp-textlink tp-hero-link"
              href={`/catalogue/telephony?lang=${lang}`}
            >
              {t("Explore telephony equipment", "Angalia vifaa vya simu")}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="tp-hero-route" aria-hidden="true">
            <span>{t("Caller", "Mpigaji")}</span>
            <i />
            <span>PBX</span>
            <i />
            <span>{t("The right person", "Anayehitajika")}</span>
          </div>
          <p className="sr-only">
            {t(
              "Press Alt+P to pause or resume the decorative light animation.",
              "Bonyeza Alt+P kusimamisha au kuendeleza mwendo wa mwanga.",
            )}
          </p>
        </header>
        <nav
          className="tp-section-nav"
          aria-label={t(
            "Telephone service chapters",
            "Sehemu za huduma ya simu",
          )}
        >
          {[
            ["systems", t("Analogue · IP · Hybrid", "Analogue · IP · Hybrid")],
            ["hotels", t("Hotels & lodges", "Hoteli na lodges")],
            ["workplaces", t("Offices & institutions", "Ofisi na taasisi")],
            ["maintenance", t("Repairs & support", "Matengenezo")],
            ["equipment", t("Equipment", "Vifaa")],
          ].map(([id, label]) => (
            <a key={id} href={"#" + id}>
              {label}
            </a>
          ))}
        </nav>
        <div className="tp-wrap tp-crumb">
          <Breadcrumbs id="telephone-systems" lang={lang} />
        </div>
        <section className="tp-section tp-wrap" id="systems">
          <div className="tp-section-head">
            <div>
              <p className="tp-kicker">
                {t("START WITH THE SYSTEM YOU NEED", "ANZA NA MFUMO UNAOKUFAA")}
              </p>
              <h2>
                {t("Three ways to connect.", "Njia tatu za kuunganisha.")}
                <em>{t("One considered plan.", "Mpango mmoja makini.")}</em>
              </h2>
            </div>
            <p>
              {t(
                "Supply, installation, configuration and maintenance—from a working analogue PABX to a modern IP or hybrid system.",
                "Ugavi, ufungaji, usanidi na matengenezo—kuanzia PABX ya analogue hadi mfumo wa IP au hybrid.",
              )}
            </p>
          </div>
          <div className="tp-approaches">
            {approaches.map((a, i) => (
              <article id={a.id} key={a.id}>
                <div className="tp-approach-mark" aria-hidden="true">
                  {["A", "IP", "H"][i]}
                  <span />
                </div>
                <div>
                  <h3>{a.title[lang]}</h3>
                  <p>{a.intro[lang]}</p>
                  <details className="tp-detail">
                    <summary>
                      {t("How we assess it", "Tunavyotathmini")}
                    </summary>
                    <p>{a.detail[lang]}</p>
                  </details>
                  <a
                    className="tp-textlink"
                    href={telephonyLinks(lang, a.intent[lang]).quote}
                  >
                    {a.intent[lang]} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="tp-hotel-section" id="hotels">
          <div className="tp-wrap tp-split">
            <div className="tp-editorial-photo">
              <Image
                src="/images/telephony/hotel-portrait.webp"
                width={1086}
                height={1448}
                sizes="(max-width:760px) 100vw, 48vw"
                alt={t(
                  "Guest-room telephone beside a bed in a contemporary lodge room",
                  "Simu ya mgeni kando ya kitanda kwenye chumba cha lodge",
                )}
              />
              <div className="tp-image-caption">
                <span>
                  {t("ROOMS. RECEPTION. SERVICE.", "VYUMBA. MAPOKEZI. HUDUMA.")}
                </span>
                <p>
                  {t(
                    "A better guest experience starts with a clear connection.",
                    "Mawasiliano yanayoeleweka huboresha huduma kwa mgeni.",
                  )}
                </p>
              </div>
            </div>
            <div className="tp-chapter-copy">
              <p className="tp-kicker">
                {t(
                  "HOTELS, LODGES & HOSPITALITY",
                  "HOTELI, LODGES NA HUDUMA ZA WAGENI",
                )}
              </p>
              <h2>
                {t("From the room.", "Kutoka chumbani.")}
                <em>
                  {t("To the right response.", "Hadi huduma inayohitajika.")}
                </em>
              </h2>
              <p>
                {t(
                  "A guest calls reception. Reception reaches housekeeping. The right system makes those everyday moments simpler.",
                  "Mgeni anapiga mapokezi. Mapokezi yanafikia housekeeping. Mfumo unaofaa hurahisisha mawasiliano hayo ya kila siku.",
                )}
              </p>
              <div className="tp-accordion">
                {hotelScenarios.map((s, i) => (
                  <details key={s.title.en} open={i === 0}>
                    <summary>{s.title[lang]}</summary>
                    <p>{s.text[lang]}</p>
                    <a
                      className="tp-textlink"
                      href={telephonyLinks(lang, s.intent[lang]).quote}
                    >
                      {t(
                        "Discuss this hotel setup",
                        "Jadili mfumo huu wa hoteli",
                      )}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </details>
                ))}
              </div>
              <details className="tp-detail tp-platform-note">
                <summary>
                  {t(
                    "Wake-up calls, room status, billing and PMS",
                    "Wake-up calls, hali ya chumba, billing na PMS",
                  )}
                </summary>
                <p>
                  {t(
                    "These are platform-dependent hotel functions. Yeastar documents hotel-phone and PMS integration options, but check the exact PBX edition, licence, supported PMS/interface, firmware and handset signalling before promising check-in/check-out, wake-up calls, room status or call billing. Integration scope is agreed in the quotation.",
                    "Hivi ni vipengele vinavyotegemea platform ya hoteli. Yeastar inaeleza chaguo za hotel-phone na PMS integration, lakini hakiki edition ya PBX, leseni, PMS/interface inayoungwa mkono, firmware na signalling ya simu kabla ya kuahidi check-in/check-out, wake-up calls, hali ya chumba au call billing. Wigo wa integration ukubaliwe kwenye makadirio.",
                  )}
                </p>
                <a
                  className="tp-textlink"
                  href="https://www.yeastar.com/solution/integration-hotel-phones/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(
                    "Official hotel integration reference",
                    "Rejea rasmi ya hotel integration",
                  )}
                </a>
              </details>
            </div>
          </div>
        </section>
        <CallFlow lang={lang} />
        <section className="tp-workplaces-section" id="workplaces">
          <div className="tp-wrap tp-split tp-split-reverse">
            <div className="tp-chapter-copy">
              <p className="tp-kicker">
                {t(
                  "OFFICES, SCHOOLS & INSTITUTIONS",
                  "OFISI, SHULE NA TAASISI",
                )}
              </p>
              <h2>
                {t("A front desk.", "Mapokezi.")}
                <em>
                  {t("A connected organisation.", "Taasisi iliyounganishwa.")}
                </em>
              </h2>
              <p>
                {t(
                  "Route calls with purpose. Make extensions easy to use, control outside calling and leave room for the next department.",
                  "Elekeza simu kwa mpango. Rahisisha matumizi ya extension, dhibiti simu za nje na acha nafasi ya kuongeza idara.",
                )}
              </p>
              <div className="tp-accordion">
                {workplaceScenarios.map((s, i) => (
                  <details key={s.title.en} open={i === 0}>
                    <summary>{s.title[lang]}</summary>
                    <p>{s.text[lang]}</p>
                    <a
                      className="tp-textlink"
                      href={telephonyLinks(lang, s.intent[lang]).quote}
                    >
                      {t(
                        "Plan this workplace",
                        "Panga mawasiliano ya eneo hili",
                      )}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </details>
                ))}
              </div>
            </div>
            <div className="tp-office-visual">
              <Image
                src="/images/telephony/office-portrait.webp"
                width={1086}
                height={1448}
                sizes="(max-width:760px) 100vw, 48vw"
                alt={t(
                  "A modern workplace with a neatly arranged communications rack",
                  "Ofisi ya kisasa yenye rack ya mawasiliano iliyopangwa vizuri",
                )}
              />
              <a
                className="tp-device-inset"
                href={`/catalogue/telephony/yealink-sip-t31p?lang=${lang}`}
              >
                <Image
                  src="/images/telephony/yealink-sip-t31p.webp"
                  width={480}
                  height={480}
                  sizes="180px"
                  alt="Yealink SIP-T31P"
                />
                <span>
                  Yealink SIP-T31P
                  <small>
                    {t("IP handset reference", "Rejea ya simu ya IP")}
                  </small>
                </span>
              </a>
            </div>
          </div>
        </section>
        <section className="tp-functions-section">
          <div className="tp-wrap">
            <div className="tp-section-head">
              <div>
                <p className="tp-kicker">
                  {t(
                    "WHAT YOUR SYSTEM SHOULD DO",
                    "MFUMO WAKO UFANYE KAZI IPI",
                  )}
                </p>
                <h2>
                  {t("Useful features.", "Vipengele vyenye manufaa.")}
                  <em>
                    {t("Chosen for your work.", "Vichaguliwe kwa kazi yako.")}
                  </em>
                </h2>
              </div>
              <p>
                {t(
                  "Start with the calls you handle. Choose the platform and licences that support them.",
                  "Anza na mawasiliano mnayoshughulikia. Chagua platform na leseni zinazoyawezesha.",
                )}
              </p>
            </div>
            <div className="tp-functions">
              {buyerFunctions.map(([title, copy]) => (
                <div key={title.en}>
                  <h3>{title[lang]}</h3>
                  <p>{copy[lang]}</p>
                </div>
              ))}
            </div>
            <details className="tp-detail">
              <summary>
                {t(
                  "Features, licences and compatibility—what we confirm",
                  "Vipengele, leseni na compatibility—tunachohakiki",
                )}
              </summary>
              <p>
                {t(
                  "IVR, queues, voicemail, forwarding, call detail records, mobile extensions and integrations vary by platform, edition and licence. We review provisioning, firmware and codec support, trunks and provider availability, network segmentation/QoS, extension count and concurrent calls. An appliance’s maximum user count is not a promise of the same number of simultaneous outside calls. External-line modules, licences and endpoint power supplies are confirmed separately.",
                  "IVR, foleni za simu, voicemail, forwarding, call detail records, mobile extension na integration hutofautiana kwa platform, edition na leseni. Tunahakiki provisioning, firmware, codec, trunk na huduma za watoa laini, VLAN/QoS, idadi ya extension na simu zinazoendelea kwa pamoja. Kiwango cha juu cha watumiaji si ahadi ya idadi hiyo hiyo ya simu za nje kwa wakati mmoja. Module za laini, leseni na adapta za simu huthibitishwa kando.",
                )}
              </p>
            </details>
          </div>
        </section>
        <section className="tp-maintenance-section" id="maintenance">
          <div className="tp-wrap tp-split">
            <div className="tp-editorial-photo">
              <Image
                src="/images/telephony/maintenance-portrait.webp"
                width={1086}
                height={1448}
                sizes="(max-width:760px) 100vw, 48vw"
                alt={t(
                  "Technician checking telephone distribution wiring beside communications equipment",
                  "Fundi akikagua nyaya za mgawanyo wa simu karibu na vifaa vya mawasiliano",
                )}
              />
              <div className="tp-image-caption">
                <span>
                  {t("KEEP THE CONVERSATION GOING", "MAWASILIANO YAENDELEE")}
                </span>
                <p>
                  {t(
                    "Find the fault. Restore the service.",
                    "Tambua hitilafu. Rejesha huduma.",
                  )}
                </p>
              </div>
            </div>
            <div className="tp-chapter-copy">
              <p className="tp-kicker">
                {t(
                  "ALREADY HAVE A TELEPHONE SYSTEM?",
                  "TAYARI UNA MFUMO WA SIMU?",
                )}
              </p>
              <h2>
                {t("Keep what works.", "Hifadhi kinachofanya kazi.")}
                <em>{t("Fix what does not.", "Rekebisha kilichokwama.")}</em>
              </h2>
              <p>
                {t(
                  "Dead extensions, noisy lines, failed transfers or one-way audio? We isolate the fault across phones, wiring, trunks, gateways, PBX and network.",
                  "Extension zilizokufa, kelele, uhamishaji usiofanikiwa au sauti ya upande mmoja? Tunatenganisha chanzo kati ya simu, nyaya, trunk, gateway, PBX na mtandao.",
                )}
              </p>
              <div className="tp-accordion">
                {faultGroups.map((f) => (
                  <details key={f.title.en}>
                    <summary>{f.title[lang]}</summary>
                    <p>{f.text[lang]}</p>
                  </details>
                ))}
              </div>
              <div className="tp-actions">
                <a
                  className="tp-button"
                  href={
                    intent(
                      "Existing PBX repair and maintenance",
                      "Matengenezo ya PBX iliyopo",
                    ).quote
                  }
                >
                  {t("Request technical support", "Omba msaada wa kiufundi")}
                </a>
                <a
                  className="tp-textlink"
                  href={
                    intent(
                      "PBX expansion or relocation",
                      "Upanuzi au uhamishaji wa PBX",
                    ).quote
                  }
                >
                  {t("Expand or move a system", "Panua au hamisha mfumo")}
                </a>
              </div>
            </div>
          </div>
          <div
            className="tp-wrap tp-repair-line"
            aria-label={t("Maintenance approach", "Hatua za matengenezo")}
          >
            {[
              t("Inspect", "Kagua"),
              t("Isolate", "Tambua chanzo"),
              t("Repair / configure", "Rekebisha / sanidi"),
              t("Test", "Jaribu"),
              t("Document & hand over", "Andika na kabidhi"),
            ].map((s, i) => (
              <span key={s}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {s}
              </span>
            ))}
          </div>
        </section>
        <section className="tp-section tp-wrap" id="equipment">
          <div className="tp-section-head">
            <div>
              <p className="tp-kicker">
                {t(
                  "THE EQUIPMENT BEHIND THE CONVERSATION",
                  "VIFAA VINAVYOWEZESHA MAWASILIANO",
                )}
              </p>
              <h2>
                {t("A phone is one part.", "Simu ni sehemu moja.")}
                <em>
                  {t("Choose the whole system.", "Chagua mfumo unaokamilika.")}
                </em>
              </h2>
            </div>
            <p>
              {t(
                "Yeastar PBXs and gateways. Yealink handsets. Grandstream phone systems and endpoints. Different manufacturers, selected for a verified design.",
                "PBX na gateway za Yeastar. Simu za Yealink. Mifumo na simu za Grandstream. Watengenezaji tofauti, wakichaguliwa kwa usanifu unaohakikiwa.",
              )}
            </p>
          </div>
          <div className="tp-equipment-preview">
            {telephonyProducts
              .filter((p) =>
                [
                  "yeastar-p550",
                  "yeastar-ta400",
                  "grandstream-ghp610",
                ].includes(p.slug),
              )
              .map((p) => (
                <article key={p.slug}>
                  <a
                    className="tp-equipment-photo"
                    href={`/catalogue/telephony/${p.slug}?lang=${lang}`}
                  >
                    <Image
                      src={p.images[0].src}
                      width={640}
                      height={480}
                      sizes="(max-width:760px) 89vw, 29vw"
                      alt={p.images[0].alt}
                    />
                  </a>
                  <p className="tp-kicker">
                    {p.brand} / {telephonyCategories[p.category][lang]}
                  </p>
                  <h3>
                    <a href={`/catalogue/telephony/${p.slug}?lang=${lang}`}>
                      {p.name}
                    </a>
                  </h3>
                  <p>{p.summary[lang]}</p>
                  <a
                    className="tp-textlink"
                    href={
                      telephonyLinks(
                        lang,
                        t("Equipment supply", "Ugavi wa vifaa"),
                        p.brand + " " + p.name,
                      ).quote
                    }
                  >
                    {t("Request Current Price", "Omba bei ya sasa")}
                  </a>
                </article>
              ))}
          </div>
          <div className="tp-equipment-bottom">
            <a className="tp-button" href={`/catalogue/telephony?lang=${lang}`}>
              {t(
                "Explore the telephony catalogue",
                "Angalia katalogi ya vifaa vya simu",
              )}
            </a>
            <p>
              {t(
                "Manufacturer references—not a stock list. Prices, exact revisions, licences, power accessories and availability are confirmed in your quotation.",
                "Rejea za watengenezaji—si orodha ya stock. Bei, matoleo, leseni, adapta na upatikanaji huthibitishwa kwenye makadirio.",
              )}
            </p>
          </div>
          <details className="tp-detail">
            <summary>
              {t(
                "Other equipment and materials we can assess",
                "Vifaa na nyenzo nyingine tunazoweza kutathmini",
              )}
            </summary>
            <p>
              {t(
                "Analogue/hybrid PBX systems; existing S-Series support; reception/executive phones; analogue guest-room handsets; DECT bases and compatible cordless handsets; SIP trunk/gateway accessories; telephone cables, distribution blocks, patching and terminations; suitable PoE switches, power adapters and UPS. Specify rooms, extensions and the existing system without needing an exact handset model. Exact equipment, quantities and included items are confirmed in your quotation.",
                "PABX za analogue/hybrid; msaada wa S-Series zilizopo; simu za mapokezi/uongozi; simu za analogue za vyumbani; base na handset za DECT zinazolingana; vifaa vya trunk/gateway; nyaya za simu, distribution block, patching na termination; swichi za PoE, adapta na UPS zinazofaa. Eleza vyumba, extension na mfumo uliopo hata kama hujui modeli ya simu. Vifaa halisi, idadi na vilivyojumuishwa huthibitishwa kwenye makadirio.",
              )}
            </p>
            <a
              className="tp-textlink"
              href={
                intent(
                  "Telephone equipment and materials quotation",
                  "Makadirio ya vifaa na nyenzo za simu",
                ).quote
              }
            >
              {t("Send an equipment requirement", "Tuma mahitaji ya vifaa")}
            </a>
          </details>
        </section>
        <section className="tp-delivery-section" id="delivery">
          <div className="tp-wrap">
            <div className="tp-section-head">
              <div>
                <p className="tp-kicker">
                  {t(
                    "ONE ACCOUNTABLE ENGINEERING JOURNEY",
                    "HATUA ZA KAZI ZINAZOELEWEKA",
                  )}
                </p>
                <h2>
                  {t("From the first survey.", "Kuanzia tathmini ya kwanza.")}
                  <em>
                    {t("To the next extension.", "Hadi extension inayofuata.")}
                  </em>
                </h2>
              </div>
              <p>
                {t(
                  "A clear scope, neat installation and documented handover. Plan maintenance before the first fault.",
                  "Wigo wazi, ufungaji nadhifu na makabidhiano yaliyoandikwa. Panga matengenezo kabla ya hitilafu ya kwanza.",
                )}
              </p>
            </div>
            <ol className="tp-delivery">
              {delivery.map(([title, text], i) => (
                <li key={title.en}>
                  <span aria-hidden="true">0{i + 1}</span>
                  <h3>{title[lang]}</h3>
                  <p>{text[lang]}</p>
                </li>
              ))}
            </ol>
            <details className="tp-detail">
              <summary>
                {t(
                  "Commissioning and recovery checks",
                  "Majaribio ya kukabidhi na kurejesha mfumo",
                )}
              </summary>
              <p>
                {t(
                  "Agree internal and outside calls, incoming routing, transfers, caller identification where supported, extension permissions, audio and configured recovery/failover tests. Document room/extension mapping, trunk responsibilities and backup/export procedures. Test power continuity across the whole required chain. Hand over credentials securely to authorised staff, not through a public enquiry form.",
                  "Kubalianeni majaribio ya simu za ndani/nje, incoming routing, uhamishaji, caller ID inapoungwa mkono, ruhusa, sauti na recovery/failover iliyosanidiwa. Andika ramani ya vyumba/extension, majukumu ya trunk na utaratibu wa backup/export. Jaribu umeme wa akiba kwa vifaa vyote muhimu. Kabidhi credentials kwa njia salama kwa wenye mamlaka, si kupitia fomu ya umma.",
                )}
              </p>
            </details>
          </div>
        </section>
        <section className="tp-section tp-wrap tp-reading">
          <div>
            <p className="tp-kicker">
              {t("MAKE AN INFORMED START", "ANZA UKIWA NA UFAHAMU")}
            </p>
            <h2>
              {t("Good questions.", "Maswali yenye maana.")}
              <em>{t("A more useful quotation.", "Makadirio yanayokufaa.")}</em>
            </h2>
            <a
              className="tp-reading-link"
              href={`/blog/hotel-analogue-phone-upgrade?lang=${lang}`}
            >
              <span>{t("THE BM FIELD GUIDE", "MWONGOZO WA BM")}</span>
              <h3>
                {t(
                  "Must a hotel replace its analogue phones?",
                  "Lazima hoteli ibadili simu zake za analogue?",
                )}
              </h3>
              <p>
                {t(
                  "Start with the rooms, wiring and the call plan.",
                  "Anza na vyumba, nyaya na mpango wa simu.",
                )}
              </p>
              <span>
                {t("Read the short guide", "Soma mwongozo mfupi")}{" "}
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          </div>
          <div className="tp-accordion">
            {voiceFAQs.map(([question, answer]) => (
              <details key={question.en}>
                <summary>{question[lang]}</summary>
                <p>{answer[lang]}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="tp-final">
          <div className="tp-wrap tp-section-head">
            <div>
              <p className="tp-kicker">
                {t(
                  "LET’S GET YOUR CALLS WORKING",
                  "MAWASILIANO YAKO YAFANYE KAZI",
                )}
              </p>
              <h2>
                {t("Tell us about your rooms.", "Tuambie kuhusu vyumba.")}
                <em>
                  {t("Your team. Your calls.", "Timu. Na mahitaji ya simu.")}
                </em>
              </h2>
              <p>
                {t(
                  "A new installation, equipment supply or help with the system you already have. Start with your location and number of extensions.",
                  "Ufungaji mpya, ugavi wa vifaa au msaada kwa mfumo uliopo. Anza na eneo na idadi ya extension.",
                )}
              </p>
            </div>
            <div className="tp-final-actions">
              <a className="tp-button" href={links.quote}>
                {t("Request a quotation", "Omba makadirio")}
              </a>
              <a className="tp-button tp-button-outline" href={links.survey}>
                {t("Request a site survey", "Omba tathmini ya eneo")}
              </a>
              <div>
                <a className="tp-textlink" href={links.whatsapp}>
                  WhatsApp
                </a>
                <a className="tp-textlink" href={links.call}>
                  {t("Call national sales", "Piga simu mauzo")}
                </a>
              </div>
              <nav
                aria-label={t(
                  "Related engineering services",
                  "Huduma zinazohusiana",
                )}
              >
                <a href={`/services/networking?lang=${lang}`}>
                  {t("Networking & fibre", "Mitandao na fibre")}
                </a>
                <a href={`/services/power-backup?lang=${lang}`}>
                  {t("Power continuity", "Umeme wa akiba")}
                </a>
                <a href={`/services/institutional-procurement?lang=${lang}`}>
                  {t("Institutional RFQs", "Maombi ya bei ya taasisi")}
                </a>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
