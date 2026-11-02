import Image from "next/image";
import type { Service } from "@prisma/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { approvedRecordMedia } from "@/lib/approved-record-media";
import type { Language } from "@/lib/i18n/config";
import { languageUrl } from "@/lib/seo";
import { ReferenceCard } from "@/components/catalogue/ReferenceCard";
import { solutionLinks } from "@/components/catalogue/links";
import { zktecoProducts } from "@/lib/catalogue/zkteco";
import { paths, software, faqs } from "./content";
import { SystemExplanation } from "./SystemExplanation";
import {
  CatalogueInvitation,
  CompleteSolutions,
  BioTimeSpotlight,
} from "./CommercialSections";
import "./access.css";
export function AccessPage({
  lang,
  record,
}: {
  lang: Language;
  record: Service | null;
}) {
  const sw = lang === "sw",
    links = solutionLinks(
      lang,
      sw
        ? "ZKTeco — access control na mahudhurio"
        : "ZKTeco access control & attendance",
    ),
    hero = record ? approvedRecordMedia("service", record) : null;
  const structured = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sw
      ? "Udhibiti wa Milango na Mahudhurio"
      : "Access Control & Time Attendance",
    serviceType: sw
      ? "Ufungaji, vifaa na matengenezo"
      : "Installation, equipment & maintenance",
    provider: {
      "@type": "Organization",
      "@id": "https://www.bmcontractorstz.com/#organization",
      name: "BM Engineering Contractors Limited",
    },
    areaServed: { "@type": "Country", name: "Tanzania" },
    url: languageUrl("/services/access-control", lang),
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ac-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
          }}
        />
        <section className="ac-hero">
          <div className="ac-hero-copy">
            <p className="eyebrow">
              <a href={`/services?lang=${lang}`}>
                {sw ? "USALAMA NA AUTOMATION" : "SECURITY & AUTOMATION"}
              </a>{" "}
              / ZKTECO
            </p>
            <p className="ac-identity">
              {sw
                ? "Udhibiti wa milango · Mahudhurio · Makufuli janja"
                : "Door access · Time attendance · Smart locks"}
            </p>
            <h1>
              {sw ? "Watu sahihi." : "The right people."}
              <br />
              <em>{sw ? "Mahali sahihi." : "In the right places."}</em>
            </h1>
            <p className="lead">
              {sw
                ? "Fungua milango kwa mpangilio. Fuatilia mahudhurio kwa taarifa sahihi. BM hukusaidia kuchagua na kufunga mfumo wa ZKTeco unaofaa watu, milango na namna unavyofanya kazi."
                : "Make entry effortless and attendance meaningful. BM helps you choose and install a ZKTeco system around your people, your doors and the way you work."}
            </p>
            <div className="ac-actions">
              <a className="button dark" href="#solutions">
                {sw ? "Chagua unachohitaji" : "Find your solution"} ↘
              </a>
              <a className="ac-textlink" href={links.whatsapp}>
                WhatsApp ↗
              </a>
            </div>
            <p className="ac-note">
              {sw
                ? "Moshi · Arusha · Maombi ya miradi Tanzania nzima"
                : "Moshi · Arusha · Project enquiries across Tanzania"}
            </p>
          </div>
          <div className="ac-hero-scene">
            <Image
              src={
                hero?.imageUrl || "/images/access-control/workplace-1440.webp"
              }
              fill
              priority
              sizes="(max-width:800px) 100vw, 56vw"
              alt={
                (hero ? (sw ? hero.altSw : hero.altEn) : null) ||
                (sw
                  ? "Wafanyakazi wakifika kwenye ofisi yenye mlango wa kisasa"
                  : "Professionals arriving at a contemporary office entrance")
              }
            />
            <div className="ac-scene-caption">
              <span>
                01 / {sw ? "OFISI YA KISASA" : "THE MODERN WORKPLACE"}
              </span>
              <p>
                {sw
                  ? "Kuingia kwa urahisi. Usimamizi wenye taarifa."
                  : "A smoother arrival. A clearer overview."}
              </p>
            </div>
          </div>
        </section>
        <nav
          className="ac-jump"
          aria-label={sw ? "Chagua huduma" : "Explore solutions"}
        >
          <a href="#doors">{sw ? "Milango" : "Door access"}</a>
          <a href={`/services/access-control/time-attendance?lang=${lang}`}>
            {sw ? "Mahudhurio" : "Time attendance"}
          </a>
          <a href={`/services/access-control/smart-locks?lang=${lang}`}>
            {sw ? "Makufuli janja" : "Smart locks"}
          </a>
          <a href="#software">{sw ? "Programu" : "Software"}</a>
          <a href="#entrances">Turnstiles</a>
          <a href={`/catalogue/zkteco?lang=${lang}`}>
            {sw ? "Katalogi" : "Catalogue"} ↗
          </a>
        </nav>
        <CatalogueInvitation lang={lang} />
        <section id="solutions" className="ac-section">
          <div className="ac-heading">
            <div>
              <p className="eyebrow">
                {sw ? "ANZA NA UNACHOHITAJI" : "START WITH WHAT YOU NEED"}
              </p>
              <h2>
                {sw ? "Mahitaji tofauti." : "Different needs."}
                <br />
                <em>{sw ? "Mfumo unaokufaa." : "A considered solution."}</em>
              </h2>
            </div>
            <p>
              {sw
                ? "Unahitaji kufungua milango, kufuatilia wafanyakazi au kusimamia wageni? Hizi ni njia tofauti. Tutakusaidia kuzipanga bila kununua vifaa visivyohitajika."
                : "Opening a door, tracking staff hours and welcoming a guest solve different problems. Choose a starting point; we will help you build a complete, appropriate system."}
            </p>
          </div>
          <div className="ac-path-grid">
            {paths.map((p, i) => (
              <a
                key={p.id}
                className="ac-path"
                href={
                  p.link.startsWith("/")
                    ? p.link.split("#")[0] +
                      "?lang=" +
                      lang +
                      (p.link.includes("#") ? "#" + p.link.split("#")[1] : "")
                    : p.link
                }
              >
                <div className="ac-path-art">
                  {p.id === "software" ? (
                    <div className="ac-platform-preview" aria-hidden="true">
                      <div>
                        <i />
                        <i />
                        <i />
                      </div>
                      <b>{sw ? "Usimamizi" : "Management"}</b>
                      <small>
                        {sw
                          ? "Watu · Milango · Ripoti"
                          : "People · Doors · Reports"}
                      </small>
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : (
                    <Image
                      src={`/images/access-control/${p.image}.webp`}
                      width={500}
                      height={500}
                      sizes="(max-width:650px) 85vw, 28vw"
                      alt=""
                    />
                  )}
                  <span>0{i + 1}</span>
                </div>
                <div className="ac-path-copy">
                  <p className="eyebrow">{p.label[lang]}</p>
                  <h3>
                    {p.title[lang]} <span>↗</span>
                  </h3>
                  <p>{p.body[lang]}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
        <BioTimeSpotlight lang={lang} />
        <section id="doors" className="ac-section ac-sage">
          <div className="ac-heading">
            <div>
              <p className="eyebrow">
                {sw ? "UDHIBITI WA KUINGIA MLANGONI" : "DOOR ACCESS CONTROL"}
              </p>
              <h2>
                {sw ? "Ruhusa zenye maana." : "Permissions with purpose."}
              </h2>
            </div>
            <p>
              {sw
                ? "Kwa ofisi za utalii, vyumba vya kumbukumbu, zahanati, shule, maghala na taasisi. Chagua nani aingie, mlango upi na wakati gani—bila kuzuia kutoka kwa usalama."
                : "For tour offices, records rooms, clinics, schools, warehouses and institutions. Decide who may enter, which door and when—while planning safe exit."}
            </p>
          </div>
          <div className="ac-two">
            <article className="ac-door-option">
              <span className="ac-number">01</span>
              <h3>
                {sw
                  ? "Mlango mmoja, mfumo unaofaa."
                  : "One door. A considered system."}
              </h3>
              <p>
                {sw
                  ? "Terminal ya standalone inaweza kujumuisha reader na controller. Kadi, PIN, alama za vidole au uso huchaguliwa kulingana na watumiaji. Kufuli, sensor, exit button na umeme huainishwa pamoja."
                  : "A standalone terminal can combine reader and controller. Card, PIN, fingerprint or face is chosen around users. The lock, sensor, exit button and power supply are specified together."}
              </p>
              <a
                href={
                  solutionLinks(
                    lang,
                    sw ? "Mfumo wa mlango mmoja" : "Single-door access system",
                  ).survey
                }
              >
                {sw ? "Tathmini mlango wangu" : "Assess my door"} ↗
              </a>
            </article>
            <article className="ac-door-option">
              <span className="ac-number">02</span>
              <h3>
                {sw
                  ? "Milango mingi, usimamizi mmoja."
                  : "More doors. One clear view."}
              </h3>
              <p>
                {sw
                  ? "Readers za KR au biometriki zinazooana zinaweza kuunganishwa na controller iliyolindwa. Linganisha InBio Pro Plus, C3 Plus au C2-260; milango, protocol na programu lazima vihakikiwe."
                  : "Compatible KR or biometric readers can connect to a protected controller. Compare InBio Pro Plus, C3 Plus or C2-260; door count, reader protocol and software must be checked."}
              </p>
              <a
                href={
                  solutionLinks(
                    lang,
                    sw ? "Mfumo wa milango mingi" : "Multi-door access control",
                  ).quote
                }
              >
                {sw ? "Panga mfumo wa jengo" : "Plan building access"} ↗
              </a>
            </article>
          </div>
          <details className="ac-detail">
            <summary>
              {sw
                ? "Kufuli na vifaa vidogo vina umuhimu gani?"
                : "What about locks and the smaller components?"}
            </summary>
            <p>
              {sw
                ? "Magnetic locks hushikilia mlango kwa sumaku; electric strikes hufanya kazi na latch inayooana. Readers hutambua kadi au biometriki, si kufuli lenyewe. Tunachagua brackets, cards, power supply, backup, door sensor, exit button na emergency release kwa mlango na matumizi husika. Usibadilishe vifaa kwa jina la brand pekee."
                : "Magnetic locks hold a door electromagnetically; electric strikes work with a compatible latch. Readers identify credentials rather than lock the door themselves. Brackets, cards, power, backup, sensors, exit buttons and emergency release are selected for the door and its use. Brand name alone does not establish compatibility."}
            </p>
          </details>
        </section>
        <section className="ac-feature ac-attendance">
          <div className="ac-feature-art">
            <Image
              src="/images/access-control/senseface-4a.webp"
              width={960}
              height={540}
              sizes="(max-width:800px) 100vw, 48vw"
              alt="ZKTeco SenseFace 4A"
            />
            <div
              className="ac-report"
              aria-label={
                sw
                  ? "Mfano wa hatua za mahudhurio"
                  : "Attendance workflow example"
              }
            >
              <span>{sw ? "MFANO WA MFUMO" : "WORKFLOW EXAMPLE"}</span>
              <b>
                {sw ? "Ingia → Zamu → Ripoti" : "Check in → Shift → Report"}
              </b>
              <div>
                <i />
                {sw
                  ? "Kanuni zako. Taarifa zinazofaa."
                  : "Your rules. Useful records."}
              </div>
            </div>
          </div>
          <div className="ac-feature-copy">
            <p className="eyebrow">
              {sw ? "MAHUDHURIO YA WAFANYAKAZI" : "STAFF TIME ATTENDANCE"}
            </p>
            <h2>
              {sw ? "Muda uonekane." : "Make time visible."}
              <br />
              <em>
                {sw ? "Usimamizi uwe rahisi." : "Make management simpler."}
              </em>
            </h2>
            <p className="lead">
              {sw
                ? "Ofisi ndogo, zamu za hoteli au matawi kadhaa: panga namna ya kuingia, kuchelewa, muda wa ziada na ripoti unazohitaji."
                : "A small office, hotel shifts or several branches: plan check-in, lateness, overtime and the reports your team actually needs."}
            </p>
            <p>
              {sw
                ? "Kifaa + programu inayooana + usajili wa wafanyakazi + mafunzo. Mahudhurio hayamaanishi kufungua mlango au kuendesha mishahara moja kwa moja."
                : "Terminal + compatible software + employee setup + training. Attendance does not automatically unlock doors or run payroll."}
            </p>
            <a
              className="button dark"
              href={`/services/access-control/time-attendance?lang=${lang}`}
            >
              {sw
                ? "Panga mfumo wa mahudhurio"
                : "Build an attendance solution"}{" "}
              ↗
            </a>
          </div>
        </section>
        <section className="ac-feature ac-hotel">
          <div className="ac-feature-copy">
            <p className="eyebrow">
              {sw ? "MAKUFULI JANJA NA HOTELI" : "SMART LOCKS & HOTEL ACCESS"}
            </p>
            <h2>
              {sw ? "Karibu," : "Welcome,"}
              <br />
              <em>{sw ? "kwa namna yako." : "on your terms."}</em>
            </h2>
            <p className="lead">
              {sw
                ? "Kufuli la nyumba si mfumo mzima wa hoteli. Chagua kuingia kwa app, PIN au kadi kulingana na mlango na namna unavyopokea wageni."
                : "A home smart lock is not a complete hotel system. Choose app, PIN or card access around the door and the way you welcome guests."}
            </p>
            <p>
              {sw
                ? "ML100 na SL01-T430H kwa matumizi yanayofaa; hotelini, panga makufuli ya vyumba, kadi, encoder na programu moja inayooana."
                : "Explore ML100 and SL01-T430H for suitable doors; for hotels, plan room locks, cards, encoder and matching management software together."}
            </p>
            <a
              className="button dark"
              href={`/services/access-control/smart-locks?lang=${lang}`}
            >
              {sw ? "Nyumba, ofisi au hoteli?" : "Home, office or hotel?"} ↗
            </a>
          </div>
          <div className="ac-hotel-scene">
            <Image
              src="/images/access-control/hotel-960.webp"
              fill
              sizes="(max-width:800px) 100vw, 50vw"
              alt={
                sw
                  ? "Mapokezi ya mgeni kwenye mlango wa chumba cha hoteli"
                  : "A guest being welcomed at a contemporary hotel-room door"
              }
            />
          </div>
        </section>
        <section id="software" className="ac-section ac-software">
          <div className="ac-heading">
            <div>
              <p className="eyebrow">
                {sw
                  ? "PROGRAMU SAHIHI, KWA KAZI SAHIHI"
                  : "THE RIGHT SOFTWARE FOR THE JOB"}
              </p>
              <h2>
                {sw ? "Vifaa vinarekodi." : "Devices collect."}
                <br />
                <em>
                  {sw
                    ? "Programu inakusaidia kusimamia."
                    : "Software makes it useful."}
                </em>
              </h2>
            </div>
            <p>
              {sw
                ? "BM husaidia kuchagua, kuratibu leseni, kusanidi na kufundisha. Hizi ni programu za mtengenezaji; ada, ulinganifu na huduma Tanzania huthibitishwa kabla ya kuagiza."
                : "BM helps select, coordinate licensing, configure and train. These are manufacturer platforms; costs, compatibility and Tanzania service availability are confirmed before ordering."}
            </p>
          </div>
          <div className="ac-software-list">
            {software.map((s, i) => (
              <details key={s.name} className="ac-detail">
                <summary>
                  <span className="ac-software-index">0{i + 1}</span>
                  <span>
                    <b>{s.name}</b>
                    <small>{s.mode[lang]}</small>
                  </span>
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="ac-software-body">
                  <p>{s.purpose[lang]}</p>
                  <p>{s.checks[lang]}</p>
                  <div className="ac-actions">
                    <a
                      className="button dark"
                      href={
                        solutionLinks(
                          lang,
                          s.name +
                            " — " +
                            (sw
                              ? "usanidi na leseni"
                              : "configuration & licensing"),
                        ).quote
                      }
                    >
                      {sw ? "Jadili programu hii" : "Discuss this platform"} ↗
                    </a>
                    <a href={s.source} target="_blank" rel="noreferrer">
                      {sw
                        ? "Taarifa za mtengenezaji"
                        : "Manufacturer information"}{" "}
                      ↗
                    </a>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <details className="ac-detail ac-security">
            <summary>
              {sw
                ? "Mfumo uliopo? Hakiki toleo na usalama."
                : "Already installed? Check the version and security."}
            </summary>
            <p>
              {sw
                ? "Taarifa rasmi za Septemba na Oktoba 2026 zinahitaji uhakiki wa CVAccess, CVSecurity na baadhi ya builds za BioTime 9.5. Usakinishaji au uboreshaji uanze na version check, backup na utaratibu rasmi. Hatuweki installers hapa wala kuahidi kila kifaa kinaweza kuboreshwa."
                : "Official September and October 2026 notices require version checks for CVAccess, CVSecurity and affected BioTime 9.5 builds. Installation or upgrade starts with the exact build, backup and official remediation procedure. We do not host installers or promise every device can be upgraded."}
            </p>
            <p>
              <a
                href="https://www.zkteco.com/en/Security_Bulletinsibs/26"
                target="_blank"
                rel="noreferrer"
              >
                CVAccess / CVSecurity ↗
              </a>{" "}
              ·{" "}
              <a
                href="https://www.zkteco.com/en/Security_Bulletinsibs/27"
                target="_blank"
                rel="noreferrer"
              >
                BioTime 9.5 ↗
              </a>
            </p>
          </details>
        </section>
        <section id="entrances" className="ac-section ac-sage ac-entrances">
          <div>
            <p className="eyebrow">
              {sw
                ? "TURNSTILES NA VIINGILIO"
                : "TURNSTILES & ENTRANCE MANAGEMENT"}
            </p>
            <h2>{sw ? "Upitaji wenye mpangilio." : "A well-managed flow."}</h2>
            <p className="lead">
              {sw
                ? "Mapokezi, viwanda, gym na taasisi zinahitaji mfumo unaofaa watu wanaopita."
                : "Reception, factories, gyms and institutions need an entrance designed around the people passing through."}
            </p>
            <p>
              {sw
                ? "Tripod, swing au flap barrier huchaguliwa kwa upana, mahitaji ya ufikivu na dharura. Readers, controller na programu lazima ziendane. Tiketi, usajili wa wanachama na mifumo ya wageni vinahitaji uunganishaji uliothibitishwa."
                : "Tripod, swing and flap barriers have different space, accessibility and emergency requirements. Readers, controller and software must match. Ticketing, memberships and visitor platforms require a separately verified integration."}
            </p>
            <a
              className="button dark"
              href={
                solutionLinks(
                  lang,
                  sw
                    ? "Tathmini ya turnstile na viingilio"
                    : "Turnstile & pedestrian entrance assessment",
                ).survey
              }
            >
              {sw ? "Panga kiingilio chako" : "Plan your entrance"} ↗
            </a>
          </div>
          <a
            className="ac-entrance-photo"
            href={`/catalogue/zkteco/ts2000-plus?lang=${lang}`}
          >
            <Image
              src="/images/access-control/ts2000-plus.webp"
              width={600}
              height={600}
              sizes="(max-width:800px) 90vw, 40vw"
              alt="ZKTeco TS2000 Plus Series"
            />
            <span>TS2000 Plus Series ↗</span>
          </a>
        </section>
        <section className="ac-section">
          <div className="ac-heading">
            <div>
              <p className="eyebrow">
                {sw ? "VIFAA VINAVYOTAMBULIKA" : "RECOGNIZABLE EQUIPMENT"}
              </p>
              <h2>
                {sw ? "Anza na chaguo sahihi." : "Start with the right fit."}
              </h2>
            </div>
            <a className="button dark" href={`/catalogue/zkteco?lang=${lang}`}>
              {sw ? "Katalogi nzima ya ZKTeco" : "Explore the ZKTeco catalogue"}{" "}
              ↗
            </a>
          </div>
          <div className="rc-grid">
            {["f18-pro", "senseface-4a", "inbio-pro-plus"].map((id) => (
              <ReferenceCard
                key={id}
                p={zktecoProducts.find((p) => p.slug === id)!}
                lang={lang}
                namespace="/catalogue/zkteco"
              />
            ))}
          </div>
          <p className="ac-note">
            {sw
              ? "Rejea za mtengenezaji, si uthibitisho wa stock. Bei, modeli halisi na upatikanaji huandikwa kwenye nukuu."
              : "Manufacturer references, not a stock declaration. Current price, exact revision and availability are confirmed in your quotation."}
          </p>
        </section>
        <section id="support" className="ac-section ac-support">
          <div className="ac-heading">
            <div>
              <p className="eyebrow">
                {sw
                  ? "KUTOKA TATHMINI HADI MATUMIZI"
                  : "FROM ASSESSMENT TO EVERYDAY USE"}
              </p>
              <h2>{sw ? "Mfumo uliokamilika." : "A complete handover."}</h2>
            </div>
            <a
              href={
                solutionLinks(
                  lang,
                  sw
                    ? "ZKTeco — matengenezo au uboreshaji"
                    : "ZKTeco maintenance or upgrade",
                ).quote
              }
            >
              {sw
                ? "Una mfumo tayari? Tuambie tatizo"
                : "Already installed? Tell us what needs attention"}{" "}
              ↗
            </a>
          </div>
          <ol className="ac-process">
            {(sw
              ? [
                  [
                    "Tunaelewa kazi",
                    "Milango, wafanyakazi, wageni, zamu na taarifa unazohitaji.",
                  ],
                  [
                    "Tunaainisha mfumo",
                    "Vifaa, nyaya, umeme, programu, leseni na wajibu wa data kwenye nukuu.",
                  ],
                  [
                    "Tunafunga na kujaribu",
                    "Umaliziaji nadhifu, ruhusa, mtandao, backup na kutoka dharura hujaribiwa.",
                  ],
                  [
                    "Tunakabidhi na kusaidia",
                    "Mafunzo, msimamizi wa mfumo, nyaraka na mpango wa matengenezo unaokubaliwa.",
                  ],
                ]
              : [
                  [
                    "Understand the work",
                    "Doors, staff, visitors, shifts and the information you need.",
                  ],
                  [
                    "Specify clearly",
                    "Equipment, cables, power, software, licences and data responsibilities in the quotation.",
                  ],
                  [
                    "Install & verify",
                    "Neat finishing, permissions, networking, backup and emergency release are tested.",
                  ],
                  [
                    "Hand over & support",
                    "Training, an accountable administrator, documentation and an agreed maintenance scope.",
                  ],
                ]
            ).map(([a, b], i) => (
              <li key={a}>
                <span>0{i + 1}</span>
                <h3>{a}</h3>
                <p>{b}</p>
              </li>
            ))}
          </ol>
        </section>
        <CompleteSolutions lang={lang} />
        <SystemExplanation lang={lang} />
        <section className="ac-section ac-faq">
          <p className="eyebrow">
            {sw ? "MASWALI YA WATEJA" : "PRACTICAL QUESTIONS"}
          </p>
          <h2>{sw ? "Kabla hujachagua." : "Before you decide."}</h2>
          {faqs.map(([q, a]) => (
            <details className="ac-detail" key={q.en}>
              <summary>{q[lang]}</summary>
              <p>{a[lang]}</p>
            </details>
          ))}
        </section>
        <section className="ac-section ac-final">
          <p className="eyebrow">
            {sw ? "TUANZE NA ENEO LAKO" : "LET’S START WITH YOUR SITE"}
          </p>
          <h2>
            {sw ? "Mlango mmoja?" : "One door?"}
            <br />
            <em>{sw ? "Au matawi kadhaa?" : "Or several locations?"}</em>
          </h2>
          <p className="lead">
            {sw
              ? "Tuambie eneo, idadi ya milango au wafanyakazi, na unachotaka mfumo ufanye. Usitume nywila au taarifa za biometriki kwenye fomu."
              : "Tell us your location, door or staff count and what you want the system to do. Do not send passwords or biometric records through the enquiry form."}
          </p>
          <div className="ac-actions">
            <a className="button light" href={links.quote}>
              {sw ? "Omba nukuu" : "Request quotation"} ↗
            </a>
            <a href={links.survey}>
              {sw ? "Omba ukaguzi wa eneo" : "Request a site survey"} ↗
            </a>
            <a href={links.call}>{sw ? "Piga simu" : "Call BM"} ↗</a>
          </div>
          <nav
            className="ac-related"
            aria-label={sw ? "Huduma zinazohusiana" : "Related services"}
          >
            <a href={`/services/cctv?lang=${lang}`}>CCTV ↗</a>
            <a href={`/services/gate-motors?lang=${lang}`}>CENTURION ↗</a>
            <a href={`/services/networking?lang=${lang}`}>
              {sw ? "Mitandao" : "Networking"} ↗
            </a>
            <a href={`/services/institutional-procurement?lang=${lang}`}>
              {sw ? "Ununuzi wa taasisi" : "Institutional procurement"} ↗
            </a>
          </nav>
        </section>
        <p className="ac-section ac-image-note">
          {sw
            ? "Picha za mazingira na watu zimetengenezwa kwa AI kuelezea matumizi, si miradi au wafanyakazi halisi wa BM. Picha za bidhaa ni za mtengenezaji."
            : "Workplace and hotel scenes are AI-created application visuals, not BM projects or staff. Equipment photographs are manufacturer references."}
        </p>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
