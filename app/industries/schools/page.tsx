import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/config";
import Image from "@/components/media/ReliableLocalImage";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { navigationSnapshot } from "@/lib/navigation/server";
import { destinationById, isVisible } from "@/lib/navigation/resolve";
import { navigationHref } from "@/lib/navigation/href";
import { pageMetadata, languageUrl, SITE_URL } from "@/lib/seo";
import {
  schoolsPath,
  schoolsMeta,
  schoolLinks,
  campusAreas,
} from "@/lib/industries/schools";
import { SchoolHeroImage } from "./HeroImage";
import { CampusFlow } from "./CampusFlow";
import "./schools.css";
type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en",
    m = pageMetadata(schoolsPath, lang, schoolsMeta[lang]);
  const image = {
    url: "/images/schools/hero.webp",
    width: 1536,
    height: 1024,
    alt:
      lang === "sw"
        ? "Majengo ya shule na njia za kupita katika mazingira ya Tanzania"
        : "School buildings and campus walkways in a Tanzanian setting",
  };
  return {
    ...m,
    title: { absolute: schoolsMeta[lang][0] },
    openGraph: { ...m.openGraph, images: [image] },
    twitter: { ...m.twitter, images: [image.url] },
  };
}
export default async function Page({ searchParams }: Props) {
  const lang: Language = (await searchParams).lang === "sw" ? "sw" : "en",
    sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en),
    links = schoolLinks(lang),
    { unpublished } = await navigationSnapshot();
  const related = (ids: readonly string[], label?: string) => (
    <nav
      className="sc-links"
      aria-label={
        label ||
        t(
          "Explore related services and equipment",
          "Huduma na vifaa vinavyohusiana",
        )
      }
    >
      {ids.map((id) => {
        const d = destinationById.get(id);
        return d && isVisible(d, unpublished) ? (
          <a key={id} href={navigationHref(d.href!, lang)}>
            {d.title[lang]} <span aria-hidden="true">↗</span>
          </a>
        ) : null;
      })}
    </nav>
  );
  const fire = schoolLinks(
    lang,
    t(
      "Boarding school fire safety assessment",
      "Tathmini ya usalama wa moto shuleni na mabwenini",
    ),
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": languageUrl(schoolsPath, lang) + "#service",
    name: schoolsMeta[lang][0].split(" | ")[0],
    description: schoolsMeta[lang][1],
    url: languageUrl(schoolsPath, lang),
    provider: { "@id": SITE_URL + "/#business" },
    areaServed: { "@type": "Country", name: "Tanzania" },
    serviceType: t(
      "School security, fire safety and engineering assessment, installation and maintenance",
      "Tathmini, ufungaji na matengenezo ya mifumo ya usalama na uhandisi shuleni",
    ),
  };
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="sc-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <section className="sc-hero" aria-labelledby="sc-title">
          <SchoolHeroImage
            alt={t(
              "School staff walking beside classrooms and a shaded campus courtyard",
              "Wafanyakazi wa shule karibu na madarasa na kiwanja chenye miti",
            )}
          />
          <div className="sc-hero-shade" />
          <div className="sc-hero-copy sc-wrap">
            <p className="sc-kicker">
              {t(
                "SCHOOLS · BOARDING · EDUCATIONAL CAMPUSES",
                "SHULE · MABWENI · VYUO",
              )}
            </p>
            <h1 id="sc-title">
              {t("Safer schools.", "Shule salama.")}
              <br />
              <em>{t("Smarter campuses.", "Mifumo bora.")}</em>
            </h1>
            <p className="sc-hero-sub">
              {t(
                "Security, safety & engineering for education.",
                "Usalama na uhandisi kwa taasisi za elimu.",
              )}
            </p>
            <p>
              {t(
                "From the school gate to the boarding block. Practical systems, thoughtfully planned around the people who learn and work here.",
                "Kuanzia getini hadi mabwenini. Mifumo inayopangwa kwa makini kwa ajili ya wanafunzi na wafanyakazi.",
              )}
            </p>
            <div className="sc-actions">
              <a className="sc-button" href={links.survey}>
                {t("Request a school site survey", "Omba tathmini ya shule")}{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="sc-textlink" href="#campus">
                {t("Explore school solutions", "Tazama suluhisho za shule")} ↓
              </a>
            </div>
            <span className="sc-hero-foot">
              {t(
                "DAY SCHOOLS / BOARDING SCHOOLS / COLLEGES",
                "SHULE ZA KUTWA / SHULE ZA BWENI / VYUO",
              )}
            </span>
          </div>
        </section>
        <div className="sc-chapterbar">
          <nav
            className="sc-wrap"
            aria-label={t("On this page", "Katika ukurasa huu")}
          >
            {[
              ["campus", "Your campus", "Shule yako"],
              ["boarding-safety", "Boarding safety", "Usalama mabwenini"],
              ["security", "Security", "Ulinzi"],
              [
                "connected",
                "Technology & communication",
                "TEHAMA na mawasiliano",
              ],
              ["power", "Reliable power", "Umeme wa uhakika"],
              ["school-quotation", "Plan your project", "Panga mradi"],
            ].map(([id, en, ki]) => (
              <a key={id} href={"#" + id}>
                {t(en, ki)} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
        <Breadcrumbs id="schools" lang={lang} />
        <section id="campus" className="sc-section sc-wrap sc-campus">
          <header>
            <p className="sc-kicker">
              {t(
                "01 / ONE CAMPUS. MULTIPLE CRITICAL SYSTEMS.",
                "01 / SHULE MOJA. MAHITAJI TOFAUTI.",
              )}
            </p>
            <h2>
              {t("Start with the place.", "Tuanze na eneo.")}
              <br />
              <em>{t("Then plan the systems.", "Kisha tupange mifumo.")}</em>
            </h2>
            <p className="sc-lead">
              {t(
                "BM Contractors assesses, supplies, installs and maintains school security and engineering systems. Select a campus area to see what belongs there.",
                "BM Contractors hufanya tathmini, husambaza, hufunga na kutunza mifumo ya usalama na uhandisi shuleni. Chagua eneo uone mahitaji yake.",
              )}
            </p>
            <CampusFlow sw={sw} />
          </header>
          <div className="sc-area-list">
            {campusAreas.map((a, i) => (
              <details key={a.id} id={"area-" + a.id} open={i === 0}>
                <summary>
                  <span className="sc-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {a.name[sw ? 1 : 0]}
                  <span className="sc-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div>
                  <p>{a.text[sw ? 1 : 0]}</p>
                  {related(
                    a.services,
                    t("Services for " + a.name[0], "Huduma kwa " + a.name[1]),
                  )}
                  {a.id === "boarding" && (
                    <a className="sc-textlink" href="#boarding-safety">
                      {t(
                        "Explore boarding fire safety",
                        "Soma kuhusu usalama wa moto mabwenini",
                      )}{" "}
                      ↓
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
        <section id="boarding-safety" className="sc-boarding sc-section">
          <div className="sc-wrap sc-split">
            <figure className="sc-photo">
              <Image
                src="/images/schools/boarding.webp"
                alt={t(
                  "School corridor with an unobstructed exit, alarm call point, wall sounder and mounted extinguisher",
                  "Ukanda wa shule wenye njia wazi ya kutokea, kitufe cha tahadhari, king’ora na kizima moto ukutani",
                )}
                width={1536}
                height={1024}
                sizes="(max-width:760px) 100vw, 48vw"
              />
            </figure>
            <div>
              <p className="sc-kicker">
                {t(
                  "02 / BOARDING SCHOOL FIRE SAFETY",
                  "02 / USALAMA WA MOTO MABWENINI",
                )}
              </p>
              <h2>
                {t("When the school day ends,", "Baada ya masomo,")}
                <br />
                <em>{t("care continues.", "uangalizi unaendelea.")}</em>
              </h2>
              <p className="sc-lead">
                {t(
                  "Boarding school fire alarm systems begin with the buildings, the risks and a clear plan for people to get out safely.",
                  "Mifumo ya tahadhari ya moto mabwenini huanza na tathmini ya majengo, hatari na njia salama za watu kutoka.",
                )}
              </p>
              <ul className="sc-checks">
                <li>
                  {t(
                    "Detection and audible warnings for sleeping accommodation, with devices selected for each space.",
                    "Vihisio na tahadhari zinazosikika kwa majengo ya mabweni, vikichaguliwa kulingana na kila eneo.",
                  )}
                </li>
                <li>
                  {t(
                    "Risk-appropriate protection for kitchens, laboratories, stores and electrical rooms.",
                    "Kinga inayolingana na hatari za jikoni, maabara, stoo na vyumba vya umeme.",
                  )}
                </li>
                <li>
                  {t(
                    "Exit signs, emergency lighting, equipment checks and evacuation awareness.",
                    "Alama za kutokea, taa za dharura, ukaguzi wa vifaa na uelewa wa uokoaji.",
                  )}
                </li>
              </ul>
              <a className="sc-button sc-button-dark" href={fire.survey}>
                {t(
                  "Assess boarding fire safety",
                  "Omba tathmini ya moto mabwenini",
                )}{" "}
                ↗
              </a>
              <details className="sc-disclosure">
                <summary>
                  {t(
                    "Extinguisher choices & statutory boundaries",
                    "Uchaguzi wa vizima moto na mamlaka husika",
                  )}
                </summary>
                <p>
                  {t(
                    "ABC dry-powder extinguishers in 6 kg and 9 kg options, CO₂ and other appropriate types are selected against the actual hazard. Cooking oils may need specialist protection. Quantities, positions, alarm design and inspection needs follow the site assessment and applicable Tanzanian requirements—not one universal size or package. BM’s technical assessment does not replace statutory Fire and Rescue Force inspection or certification.",
                    "Vizima moto vya unga mkavu ABC vya kilo 6 na kilo 9, CO₂ na aina nyingine huchaguliwa kwa hatari halisi. Mafuta ya kupikia yanaweza kuhitaji kinga maalumu. Idadi, nafasi, mfumo wa tahadhari na ukaguzi hufuata tathmini na matakwa husika ya Tanzania—si kifurushi au ukubwa mmoja kwa shule zote. Tathmini ya kiufundi ya BM haichukui nafasi ya ukaguzi au cheti cha kisheria cha Jeshi la Zimamoto na Uokoaji.",
                  )}
                </p>
              </details>
              {related(["fire-alarm-systems", "catalogue-fire-safety"])}
            </div>
          </div>
        </section>
        <section id="security" className="sc-security sc-section">
          <div className="sc-wrap">
            <div className="sc-section-heading">
              <div>
                <p className="sc-kicker">
                  {t(
                    "03 / SECURITY & CAMPUS PROTECTION",
                    "03 / ULINZI WA SHULE",
                  )}
                </p>
                <h2>
                  {t("Welcoming by design.", "Mazingira ya ukarimu.")}
                  <br />
                  <em>
                    {t(
                      "Controlled where it matters.",
                      "Udhibiti panapohitajika.",
                    )}
                  </em>
                </h2>
              </div>
              <p className="sc-lead">
                {t(
                  "School security systems work best when entrances, boundaries, common areas and authorized access are planned together.",
                  "Mifumo ya usalama shuleni hupangwa vizuri kwa kuangalia malango, mipaka, maeneo ya pamoja na ruhusa za kuingia kwa pamoja.",
                )}
              </p>
            </div>
            <div className="sc-security-columns">
              <article>
                <span className="sc-number">01 / CCTV</span>
                <h3>{t("See the right places.", "Ona maeneo yanayofaa.")}</h3>
                <p>
                  {t(
                    "CCTV installation for school entrances, corridors, compounds and key infrastructure, with suitable recording, access permissions and backup. Never inside toilets, changing rooms or private dormitory sleeping areas.",
                    "Ufungaji wa CCTV shuleni kwenye malango, korido, viwanja na miundombinu muhimu, pamoja na uhifadhi, ruhusa za kutazama na umeme wa akiba. Si vyooni, sehemu za kubadilishia nguo au sehemu binafsi za kulala mabwenini.",
                  )}
                </p>
                {related(["cctv", "catalogue-hikvision"])}
              </article>
              <article>
                <span className="sc-number">
                  02 / {t("PERIMETER", "MIPAKA")}
                </span>
                <h3>
                  {t("A considered boundary.", "Mpaka uliopangwa vizuri.")}
                </h3>
                <p>
                  {t(
                    "School electric fence installation needs an assessed wall or fence, appropriate energizer, earthing, warning signs and safe separation. Gate motors need safety sensors and a controlled vehicle/pedestrian plan.",
                    "Uzio wa umeme kwa shule huhitaji ukuta au uzio uliotathminiwa, energizer inayofaa, earth, alama za tahadhari na nafasi salama. Geti la mota huhitaji vihisio na mpango salama wa magari na watembea kwa miguu.",
                  )}
                </p>
                {related([
                  "electric-fence",
                  "gate-motors",
                  "catalogue-centurion",
                ])}
              </article>
              <article>
                <span className="sc-number">
                  03 / {t("AUTHORIZED ACCESS", "RUHUSA ZA KUINGIA")}
                </span>
                <h3>{t("Access with a purpose.", "Kuingia kwa utaratibu.")}</h3>
                <p>
                  {t(
                    "Staff and authorized-person access for offices, stores and laboratories. Intercoms support gate/reception communication; assessed intrusion alarms protect appropriate restricted spaces.",
                    "Udhibiti wa wafanyakazi na wenye ruhusa katika ofisi, stoo na maabara. Intercom huunganisha geti na mapokezi; alarm za uvamizi huchaguliwa kwa maeneo yenye udhibiti.",
                  )}
                </p>
                {related(["access-control", "hikvision"])}
              </article>
            </div>
            <details className="sc-disclosure sc-privacy">
              <summary>
                {t(
                  "Privacy, safeguarding & recording policy",
                  "Faragha, ulinzi wa wanafunzi na sera ya kurekodi",
                )}
              </summary>
              <p>
                {t(
                  "Agree camera views, signage, lawful use, retention periods and who may see or export recordings with school management. Personal information, children’s data and biometric information need appropriate safeguards and applicable PDPC requirements. An installation is not a safeguarding or legal-compliance guarantee.",
                  "Kubaliana na uongozi kuhusu maeneo ya kamera, alama za taarifa, matumizi halali, muda wa kuhifadhi na wenye ruhusa ya kutazama au kutoa video. Taarifa binafsi, za watoto na za kibayometriki huhitaji ulinzi na kufuata matakwa husika ya PDPC. Ufungaji pekee si dhamana ya kukidhi kila wajibu wa kisheria au ulinzi wa wanafunzi.",
                )}
              </p>
            </details>
          </div>
        </section>
        <section id="connected" className="sc-section sc-wrap">
          <div className="sc-split sc-connected">
            <div>
              <p className="sc-kicker">
                {t(
                  "04 / TECHNOLOGY THAT SUPPORTS THE SCHOOL DAY",
                  "04 / TEKNOLOJIA YA KUSAIDIA SHUGHULI ZA SHULE",
                )}
              </p>
              <h2>
                {t("Connected classrooms.", "Madarasa yaliyounganishwa.")}
                <br />
                <em>{t("Clear communication.", "Mawasiliano yaliyo wazi.")}</em>
              </h2>
              <p className="sc-lead">
                {t(
                  "From an administration office to several learning blocks. Build a manageable network and make everyday communication easier.",
                  "Kutoka ofisi ya utawala hadi majengo mengi ya masomo. Jenga mtandao unaosimamiwa vizuri na mawasiliano rahisi ya kila siku.",
                )}
              </p>
              {related(["networking", "catalogue-networking"])}
            </div>
            <figure className="sc-photo">
              <Image
                src="/images/networking/connected-campus.webp"
                alt={t(
                  "Covered campus walkways with a discreet access point serving learning and administration buildings",
                  "Njia za kupita katika majengo ya masomo na utawala zenye kifaa cha Wi-Fi",
                )}
                width={1536}
                height={1024}
                sizes="(max-width:760px) 100vw, 46vw"
              />
            </figure>
          </div>
          <div className="sc-tech-pair">
            <article>
              <h3>
                {t(
                  "Staff attendance. Useful records.",
                  "Mahudhurio ya wafanyakazi. Taarifa zenye maana.",
                )}
              </h3>
              <p>
                {t(
                  "ZKTeco and Hikvision staff time-attendance and access options, selected for actual shift, reporting and licensing needs. Student attendance is a separate requirement to assess—not a feature assumed on every terminal.",
                  "Chaguo za ZKTeco na Hikvision kwa mahudhurio na udhibiti wa kuingia kwa wafanyakazi, kulingana na zamu, ripoti na leseni. Mahudhurio ya wanafunzi hutathminiwa kando; si kipengele cha kudhaniwa kwenye kila mashine.",
                )}
              </p>
              {related(["access-control", "catalogue-zkteco", "hikvision"])}
              <details className="sc-disclosure">
                <summary>
                  {t(
                    "Campus networking & Wi-Fi installation",
                    "Ufungaji wa mitandao na Wi-Fi shuleni",
                  )}
                </summary>
                <p>
                  {t(
                    "Survey CAT6 routes, fibre links between buildings, access-point placement, capacity and power. Separate administration, staff and permitted student/guest networks as appropriate. Confirm coverage and security through commissioning tests; do not promise universal Wi-Fi coverage from a device count.",
                    "Tathmini njia za CAT6, fibre kati ya majengo, sehemu za access point, uwezo na umeme. Tenganisha mitandao ya utawala, wafanyakazi na wanafunzi/wageni pale inapofaa. Thibitisha eneo la Wi-Fi na usalama kwa majaribio; idadi ya vifaa pekee haitoi dhamana ya kufunika kila eneo.",
                  )}
                </p>
              </details>
            </article>
            <article>
              <h3>
                {t(
                  "A message everyone can hear.",
                  "Tangazo linalosikika vizuri.",
                )}
              </h3>
              <p>
                {t(
                  "School PA and bell systems for classrooms, assembly grounds, dining halls and chapels. Match speaker zones, intelligibility and scheduling equipment to the timetable. Internal telephones and intercoms help staff coordinate.",
                  "Mfumo wa matangazo shuleni na kengele kwa madarasa, eneo la gwaride, kumbi za chakula na nyumba za ibada. Panga kanda za spika, usikivu na kifaa cha ratiba. Simu za ndani na intercom husaidia uratibu wa wafanyakazi.",
                )}
              </p>
              {related([
                "pa-sound-systems",
                "telephone-systems",
                "catalogue-telephony",
              ])}
              <details className="sc-disclosure">
                <summary>
                  {t(
                    "Announcements and emergency warnings are different",
                    "Matangazo ya kawaida na tahadhari za dharura ni tofauti",
                  )}
                </summary>
                <p>
                  {t(
                    "An ordinary PA system does not automatically qualify as an emergency voice-alarm system. Any fire-alarm interface, priority override or backup must be designed and verified for its intended purpose.",
                    "PA ya kawaida si mfumo wa sauti wa tahadhari ya moto moja kwa moja. Muunganisho wa fire alarm, kipaumbele cha dharura na umeme wa akiba lazima vipangwe na kuthibitishwa kwa matumizi yake.",
                  )}
                </p>
              </details>
            </article>
          </div>
        </section>
        <section id="power" className="sc-power sc-section">
          <div className="sc-wrap sc-split">
            <div className="sc-power-visual">
              <Image
                src="/images/solar-engineering/campus-1600.webp"
                alt={t(
                  "Institutional buildings with solar panels and planned electrical infrastructure",
                  "Majengo ya taasisi yenye paneli za jua na miundombinu ya umeme",
                )}
                width={1536}
                height={1024}
                sizes="(max-width:760px) 100vw, 46vw"
              />
              <span>
                {t(
                  "LIGHTING / SECURITY / ICT / ESSENTIAL LOADS",
                  "TAA / ULINZI / TEHAMA / MATUMIZI MUHIMU",
                )}
              </span>
            </div>
            <div>
              <p className="sc-kicker">
                {t(
                  "05 / ELECTRICAL, SOLAR & BACKUP",
                  "05 / UMEME, SOLAR NA AKIBA",
                )}
              </p>
              <h2>
                {t("Keep the essentials", "Linda matumizi")}
                <br />
                <em>{t("working.", "muhimu.")}</em>
              </h2>
              <p className="sc-lead">
                {t(
                  "Electrical installation for schools, distribution and protection, earthing, testing and LED lighting—then a practical power plan for the loads that matter.",
                  "Ufungaji wa umeme shuleni, usambazaji na ulinzi, earth, vipimo na taa za LED—kisha mpango wa umeme kwa matumizi muhimu.",
                )}
              </p>
              <p>
                {t(
                  "Assess solar PV, security/street lighting, inverters, batteries, UPS and generator changeover around the school’s demand. Keep cameras, recorders, networking and administration equipment in the backup calculation.",
                  "Tathmini solar PV, taa za ulinzi, inverter, betri, UPS na changeover ya jenereta kwa mahitaji ya shule. Hesabu kamera, rekoda, mtandao na vifaa vya utawala katika mpango wa akiba.",
                )}
              </p>
              {related([
                "electrical-contracting",
                "solar-panel-systems",
                "solar-street-lights",
                "power-backup",
                "generators",
              ])}
              <details className="sc-disclosure">
                <summary>
                  {t(
                    "What determines backup duration?",
                    "Muda wa umeme wa akiba huamuliwaje?",
                  )}
                </summary>
                <p>
                  {t(
                    "Measured load, starting currents, battery condition, required operating hours and transfer behavior. Solar generation and uninterrupted power are different design questions. No blanket saving or uptime guarantee is assumed.",
                    "Mzigo uliopimwa, mkondo wa kuanzisha vifaa, hali ya betri, saa za matumizi na namna ya kubadilisha chanzo. Uzalishaji wa solar na umeme usiokatika ni maswali tofauti ya usanifu. Hakuna dhamana ya jumla ya kuokoa gharama au kutokatika kwa umeme.",
                  )}
                </p>
              </details>
            </div>
          </div>
        </section>
        <section id="delivery" className="sc-section sc-wrap">
          <div className="sc-section-heading">
            <div>
              <p className="sc-kicker">
                {t(
                  "06 / A PLAN YOUR SCHOOL CAN DELIVER",
                  "06 / MPANGO UNAOTEKELEZEKA",
                )}
              </p>
              <h2>
                {t("One project,", "Mradi mmoja,")}
                <br />
                <em>
                  {t("or the next practical step.", "au hatua inayofuata.")}
                </em>
              </h2>
            </div>
            <p className="sc-lead">
              {t(
                "For proprietors, school boards, administrators, bursars and procurement teams. Start with a new block, an existing-system repair or a phased campus plan.",
                "Kwa wamiliki, bodi, wakuu wa shule, wahasibu na timu za ununuzi. Anza na jengo jipya, ukarabati wa mfumo au mpango wa awamu wa shule nzima.",
              )}
            </p>
          </div>
          <div className="sc-types">
            {[
              [
                "Private boarding",
                "Bweni binafsi",
                "Prioritize dormitories, overnight warning and staff readiness.",
                "Zingatia mabweni, tahadhari za usiku na utayari wa wafanyakazi.",
              ],
              [
                "Day & boarding",
                "Kutwa na bweni",
                "Separate day-time access from residential operating needs.",
                "Tenganisha mahitaji ya kutwa na uendeshaji wa mabweni.",
              ],
              [
                "Primary & secondary",
                "Msingi na sekondari",
                "Age-appropriate access, supervised circulation and learning spaces.",
                "Udhibiti unaofaa umri, uangalizi wa njia na maeneo ya kujifunzia.",
              ],
              [
                "International schools",
                "Shule za kimataifa",
                "Coordinate technical requirements with the school’s own policies.",
                "Linganisha mahitaji ya kiufundi na sera za shule.",
              ],
              [
                "Seminaries & religious schools",
                "Seminari na shule za dini",
                "Combine boarding safety, chapel audio and administration needs.",
                "Unganisha mahitaji ya mabweni, sauti za ibadani na utawala.",
              ],
              [
                "Colleges & universities",
                "Vyuo na vyuo vikuu",
                "Plan separate blocks, hostels, laboratories and campus networks.",
                "Panga majengo, hosteli, maabara na mitandao ya chuo.",
              ],
            ].map(([en, ki, body, maelezo]) => (
              <details key={en}>
                <summary>
                  {t(en, ki)} <span aria-hidden="true">↗</span>
                </summary>
                <p>{t(body, maelezo)}</p>
              </details>
            ))}
          </div>
          <ol className="sc-process">
            {[
              [
                "Assess & prioritize",
                "Tathmini na vipaumbele",
                "Review buildings, risks, existing equipment and the budget. Agree a scope, BOQ or phased quotation.",
                "Pitia majengo, hatari, vifaa vilivyopo na bajeti. Kubaliana wigo, BOQ au nukuu ya awamu.",
              ],
              [
                "Install & hand over",
                "Ufungaji na makabidhiano",
                "Coordinate cabling and installation around school activity. Test, commission and explain everyday use.",
                "Ratibu nyaya na ufungaji kwa shughuli za shule. Jaribu mifumo, kabidhi na eleza matumizi.",
              ],
              [
                "Maintain & improve",
                "Matengenezo na maboresho",
                "Plan equipment checks, fault diagnosis, documentation and future expansion. Confirm support terms in the quotation.",
                "Panga ukaguzi wa vifaa, utambuzi wa hitilafu, nyaraka na upanuzi. Thibitisha masharti ya msaada kwenye nukuu.",
              ],
            ].map(([en, ki, body, maelezo], i) => (
              <li key={en}>
                <span className="sc-number">0{i + 1}</span>
                <h3>{t(en, ki)}</h3>
                <p>{t(body, maelezo)}</p>
              </li>
            ))}
          </ol>
          {related(["support"])}
          <p className="sc-fine">
            {t(
              "Equipment-only, installation, upgrades and maintenance can be quoted separately. Public institutions follow their applicable procurement channels. Scope, compatibility, scheduling and prices are confirmed after assessment.",
              "Vifaa pekee, ufungaji, maboresho na matengenezo vinaweza kupewa nukuu tofauti. Taasisi za umma hufuata taratibu husika za ununuzi. Wigo, utangamano, ratiba na bei huthibitishwa baada ya tathmini.",
            )}
          </p>
        </section>
        <section id="school-quotation" className="sc-quotation sc-section">
          <div className="sc-wrap sc-split">
            <div>
              <p className="sc-kicker">
                {t("LET’S PLAN YOUR CAMPUS", "TUPANGE MAHITAJI YA SHULE YAKO")}
              </p>
              <h2>
                {t("A safer, better-connected", "Shule salama, yenye")}
                <br />
                <em>{t("place to learn.", "mifumo bora.")}</em>
              </h2>
              <p className="sc-lead">
                {t(
                  "Tell us about your buildings and the first problem you want to solve. We’ll help define a practical next step.",
                  "Tueleze kuhusu majengo yako na tatizo la kwanza unalotaka kutatua. Tutakusaidia kupanga hatua inayofaa.",
                )}
              </p>
              <div className="sc-actions">
                <a className="sc-button" href={links.survey}>
                  {t("Request a school site survey", "Omba tathmini ya shule")}{" "}
                  ↗
                </a>
                <a className="sc-textlink" href={links.quote}>
                  {t("Request a quotation", "Omba makadirio")} ↗
                </a>
              </div>
              <div className="sc-contact-links">
                <a href={links.whatsapp}>
                  {t("Discuss on WhatsApp", "Uliza kwa WhatsApp")} ↗
                </a>
                <a href={links.call}>
                  {t("Call national sales", "Piga simu mauzo")} ↗
                </a>
              </div>
            </div>
            <aside className="sc-brief">
              <p className="sc-kicker">
                {t(
                  "HELP US UNDERSTAND YOUR PROJECT",
                  "TUSAIDIE KUELEWA MRADI WAKO",
                )}
              </p>
              <ul>
                {[
                  t(
                    "School name, location and level",
                    "Jina la shule, eneo na ngazi",
                  ),
                  t("Day, boarding or both", "Kutwa, bweni au vyote"),
                  t(
                    "Approximate buildings and required systems",
                    "Majengo kwa makadirio na mifumo inayohitajika",
                  ),
                  t(
                    "New project, upgrade or maintenance",
                    "Mradi mpya, maboresho au matengenezo",
                  ),
                ].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p>
                {t(
                  "These prompts carry into your enquiry. You can edit them before sending.",
                  "Maswali haya yanaingia kwenye ombi lako. Unaweza kuhariri maelezo kabla ya kutuma.",
                )}
              </p>
              <small>
                {t(
                  "Supporting projects across Tanzania from Moshi, Kilimanjaro and Mianzini, Arusha.",
                  "Tunasaidia miradi Tanzania kutoka Moshi, Kilimanjaro na Mianzini, Arusha.",
                )}
              </small>
            </aside>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
