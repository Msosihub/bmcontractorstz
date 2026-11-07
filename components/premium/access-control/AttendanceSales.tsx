import { RelatedGuides } from "@/components/blog/Guides";
import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReferenceCard } from "@/components/catalogue/ReferenceCard";
import { solutionLinks } from "@/components/catalogue/links";
import { zktecoProducts } from "@/lib/catalogue/zkteco";
import type { Language } from "@/lib/i18n/config";
import { AttendanceComparison, SoftwareScopeMatrix } from "./EquipmentGuide";
import { AttendanceFlow } from "./AttendanceFlow";
import type { Localized } from "@/lib/catalogue/types";
import "./attendance-sales.css";

export function AttendanceSales({
  lang,
  content,
}: {
  lang: Language;
  content: { faq: Localized[][]; details: Localized[][] };
}) {
  const sw = lang === "sw",
    copy = (en: string, swahili: string) => (sw ? swahili : en);
  const links = solutionLinks(
    lang,
    copy(
      "Staff attendance — equipment, BioTime & installation",
      "Mahudhurio ya wafanyakazi — mashine, BioTime na ufungaji",
    ),
  );
  const needs = [
    [
      "office",
      "An office or small business",
      "Ofisi au biashara ndogo",
      "Know who arrived, review lateness and prepare a clear attendance report.",
      "Jua waliofika, kagua kuchelewa na pata ripoti inayoeleweka.",
      "K40 Pro or a suitable MB terminal · setup · staff enrolment · training",
      "K40 Pro au mashine ya MB inayofaa · usanidi · usajili · mafunzo",
    ],
    [
      "hotel",
      "A hotel or lodge",
      "Hoteli au lodge",
      "Bring reception, housekeeping and other departments into one shift plan.",
      "Panga zamu za mapokezi, usafi wa vyumba na idara nyingine kwa pamoja.",
      "Suitable terminals · agreed shift rules · manager reports · support",
      "Mashine zinazofaa · kanuni za zamu · ripoti za meneja · msaada",
    ],
    [
      "branches",
      "Several branches",
      "Biashara yenye matawi",
      "Give authorized managers a shared view of attendance across locations.",
      "Wasimamizi wenye ruhusa waone mahudhurio ya maeneo tofauti kwa pamoja.",
      "Compatible terminals · connectivity · server/cloud assessment · reporting",
      "Mashine zinazooana · mtandao · tathmini ya seva/cloud · ripoti",
    ],
  ];
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ac-main ta-main">
        <nav
          className="ta-navigation"
          aria-label={copy(
            "Attendance page sections",
            "Sehemu za ukurasa wa mahudhurio",
          )}
        >
          <a href="#your-business">{copy("Your business", "Biashara yako")}</a>
          <a href="#biotime">BioTime 9.5</a>
          <a href="#attendance-machines">
            {copy("Attendance machines", "Mashine za mahudhurio")}
          </a>
          <a href={`/catalogue/zkteco?lang=${lang}`}>
            {copy("Explore ZKTeco Products", "Chunguza Bidhaa za ZKTeco")} ↗
          </a>
        </nav>
        <section id="your-business" className="ta-section ta-business">
          <div className="ta-section-title">
            <p className="eyebrow">
              {copy("START WITH YOUR BUSINESS", "ANZA NA BIASHARA YAKO")}
            </p>
            <h1>
              {copy("Staff attendance.", "Mahudhurio ya wafanyakazi.")}
              <br />
              <em>
                {copy(
                  "Made easier for your business.",
                  "Rahisi kusimamia biashara yako.",
                )}
              </em>
            </h1>
            <p>
              {copy(
                "Choose your starting point. We will recommend the equipment and software that fit.",
                "Chagua unapoanzia. Tutakushauri vifaa na programu zinazofaa.",
              )}
            </p>
          </div>
          <div className="ta-business-grid">
            {needs.map((n, i) => (
              <article key={n[0]}>
                <span className="ta-index">0{i + 1}</span>
                <h3>{n[sw ? 2 : 1]}</h3>
                <p>{n[sw ? 4 : 3]}</p>
                <p className="ta-components">{n[sw ? 6 : 5]}</p>
                <a
                  href={solutionLinks(lang, "ZKTeco — " + n[sw ? 2 : 1]).quote}
                >
                  {copy("Discuss this solution", "Jadili suluhisho hili")} ↗
                </a>
              </article>
            ))}
          </div>
          <p className="ta-small">
            {copy(
              "Quotation examples, not fixed bundles. Models, software licences and installation scope are confirmed for your business.",
              "Hii ni mifano ya kuandaa nukuu, si packages zisizobadilika. Modeli, leseni na kazi za ufungaji huthibitishwa kwa biashara yako.",
            )}
          </p>
        </section>
        <section
          id="biotime"
          className="ta-section ta-biotime"
          aria-labelledby="bt-title"
        >
          <div className="ta-biotime-copy">
            <p className="eyebrow">
              BIOTIME 9.5 /{" "}
              {copy("FOR OWNERS & MANAGERS", "KWA WAMILIKI NA WASIMAMIZI")}
            </p>
            <h2 id="bt-title">
              {copy("Your attendance.", "Mahudhurio yako.")}
              <br />
              <em>{copy("In one clear view.", "Kwa muhtasari ulio wazi.")}</em>
            </h2>
            <p className="lead">
              {copy(
                "The machine records arrivals. BioTime helps your manager turn those records into an organized working day.",
                "Mashine inarekodi kuingia na kutoka. BioTime humsaidia msimamizi kutumia rekodi hizo kupanga na kufuatilia kazi.",
              )}
            </p>
            <ul className="ta-outcomes">
              {[
                [
                  "See who is in today",
                  "Ona waliofika leo",
                  "Review arrivals, missing punches and attendance exceptions.",
                  "Kagua waliofika, rekodi pungufu na mahudhurio yanayohitaji ufafanuzi.",
                ],
                [
                  "Manage hotel and office shifts",
                  "Simamia zamu za hoteli na ofisi",
                  "Set departments, rosters and agreed lateness or overtime rules.",
                  "Panga idara, ratiba na kanuni za kuchelewa au muda wa ziada.",
                ],
                [
                  "Get a report you can use",
                  "Pata ripoti yenye manufaa",
                  "Review results, approve corrections and export agreed reports.",
                  "Kagua matokeo, idhinisha marekebisho na toa ripoti zilizokubaliwa.",
                ],
              ].map((r) => (
                <li key={r[0]}>
                  <span aria-hidden="true">✓</span>
                  <div>
                    <h3>{r[sw ? 1 : 0]}</h3>
                    <p>{r[sw ? 3 : 2]}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              className="button dark"
              href={
                solutionLinks(
                  lang,
                  "BioTime 9.5 — attendance system demonstration & quotation",
                ).quote
              }
            >
              {copy(
                "Discuss BioTime for my business",
                "Jadili BioTime kwa biashara yangu",
              )}{" "}
              ↗
            </a>
          </div>
          <div className="ta-biotime-visual">
            <figure>
              <div className="ta-screen-top">
                <span aria-hidden="true">● ● ●</span>
                <b>BioTime 9.5</b>
              </div>
              <div className="ta-screen-image">
                <Image
                  src="/images/access-control/biotime-dashboard-detail.webp"
                  unoptimized
                  width={1600}
                  height={381}
                  sizes="(max-width:800px) 100vw, 65vw"
                  alt={copy(
                    "Official BioTime 9.5 demonstration dashboard from ZKTeco",
                    "Dashboard rasmi ya maonyesho ya BioTime 9.5 kutoka ZKTeco",
                  )}
                />
              </div>
            </figure>
            <p className="ta-visual-note">
              {copy(
                "BM scopes the software, compatible devices, setup and training together. Licence limits and optional modules are confirmed in your quotation.",
                "BM huainisha programu, vifaa vinavyooana, usanidi na mafunzo kwa pamoja. Mipaka ya leseni na modules za hiari huthibitishwa kwenye nukuu.",
              )}
            </p>
            <a href={`/catalogue/zkteco/biotime-9-5?lang=${lang}`}>
              {copy("View BioTime details", "Tazama maelezo ya BioTime")} ↗
            </a>
          </div>
        </section>
        <section className="ta-section ta-report-section">
          <div>
            <p className="eyebrow">
              {copy(
                "FROM RECORDS TO A USEFUL REPORT",
                "KUTOKA REKODI HADI RIPOTI MUHIMU",
              )}
            </p>
            <h2>
              {copy(
                "Less chasing. More clarity.",
                "Punguza ufuatiliaji. Pata taarifa zilizo wazi.",
              )}
            </h2>
            <p>
              {copy(
                "Spot what needs a conversation before making a payroll decision. A missing clock-out needs review—not an automatic absence.",
                "Tambua kinachohitaji mazungumzo kabla ya kuandaa mishahara. Kukosa rekodi ya kutoka kunahitaji ukaguzi; si kutokuwepo moja kwa moja.",
              )}
            </p>
          </div>
          <div className="ta-report">
            <p className="ta-report-caption">
              {copy(
                "SAMPLE REPORT · FICTIONAL DATA",
                "MFANO WA RIPOTI · TAARIFA ZA KUBUNI",
              )}
            </p>
            <div
              className="ta-report-scroll"
              tabIndex={0}
              role="region"
              aria-label={copy(
                "Fictional sample attendance report",
                "Mfano wa ripoti ya mahudhurio yenye taarifa za kubuni",
              )}
            >
              <table>
                <caption className="sr-only">
                  {copy(
                    "Original BM example, not a software screenshot or customer report",
                    "Mfano wa BM, si screenshot ya programu au ripoti ya mteja",
                  )}
                </caption>
                <thead>
                  <tr>
                    {(sw
                      ? ["Mfanyakazi", "Kuingia", "Kutoka", "Ukaguzi"]
                      : ["Employee", "In", "Out", "Review"]
                    ).map((x) => (
                      <th scope="col" key={x}>
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Demo 001",
                      "07:56",
                      "17:02",
                      copy("On time", "Kwa wakati"),
                    ],
                    [
                      "Demo 002",
                      "08:18",
                      "17:01",
                      copy("Review lateness", "Kagua kuchelewa"),
                    ],
                    [
                      "Demo 003",
                      "13:55",
                      "—",
                      copy("Missing clock-out", "Kutoka hakujarekodiwa"),
                    ],
                  ].map((r) => (
                    <tr key={r[0]}>
                      {r.map((x, i) =>
                        i === 0 ? (
                          <th scope="row" key={i}>
                            {x}
                          </th>
                        ) : (
                          <td key={i}>{x}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <AttendanceFlow lang={lang} />
        <section id="attendance-machines" className="ta-section">
          <div className="ta-product-heading">
            <div>
              <p className="eyebrow">
                {copy(
                  "START WITH THE RIGHT MACHINE",
                  "ANZA NA MASHINE INAYOFAA",
                )}
              </p>
              <h2>
                {copy(
                  "Familiar devices. Properly set up.",
                  "Vifaa vinavyofahamika. Usanidi ulio sahihi.",
                )}
              </h2>
              <p>
                {copy(
                  "Fingerprint, face or card/PIN options. We check the exact model and software before recommending it.",
                  "Machaguo ya fingerprint, uso au kadi/PIN. Tunahakiki modeli na programu kabla ya kukushauri.",
                )}
              </p>
            </div>
            <a
              href={`/catalogue/zkteco?lang=${lang}&category=fingerprint-attendance`}
            >
              {copy(
                "Explore attendance products",
                "Chunguza mashine za mahudhurio",
              )}{" "}
              ↗
            </a>
          </div>
          <div className="rc-grid">
            {["k40-pro", "mb360", "senseface-4a"].map((id) => (
              <ReferenceCard
                key={id}
                p={zktecoProducts.find((p) => p.slug === id)!}
                lang={lang}
                namespace="/catalogue/zkteco"
              />
            ))}
          </div>
        </section>
        <section className="ta-section ta-delivery">
          <div className="ta-section-title">
            <p className="eyebrow">
              {copy("BM TAKES CARE OF THE SETUP", "BM HUSHUGHULIKIA USANIDI")}
            </p>
            <h2>
              {copy(
                "From choosing to using.",
                "Kuanzia uchaguzi hadi matumizi.",
              )}
            </h2>
          </div>
          <ol>
            {[
              [
                "Tell us about your team",
                "Tuambie kuhusu wafanyakazi wako",
                "Staff numbers, shifts, branches and any existing machine.",
                "Idadi ya wafanyakazi, zamu, matawi na mashine iliyopo.",
              ],
              [
                "We plan and configure",
                "Tunapanga na kusanidi",
                "Suitable equipment, software, power and connectivity—with a clear quotation.",
                "Vifaa, programu, umeme na mtandao unaofaa, pamoja na nukuu iliyo wazi.",
              ],
              [
                "Your manager takes over",
                "Msimamizi wako anakabidhiwa",
                "Enrolment, sample shifts, report checks, training and agreed support.",
                "Usajili, majaribio ya zamu, ukaguzi wa ripoti, mafunzo na msaada uliokubaliwa.",
              ],
            ].map((r, i) => (
              <li key={r[0]}>
                <span>0{i + 1}</span>
                <h3>{r[sw ? 1 : 0]}</h3>
                <p>{r[sw ? 3 : 2]}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="ta-section ta-questions">
          <div className="ta-section-title">
            <p className="eyebrow">
              {copy("ONLY IF YOU NEED THE DETAIL", "MAELEZO ZAIDI UKIYAHITAJI")}
            </p>
            <h2>
              {copy(
                "A few practical questions.",
                "Maswali machache ya msingi.",
              )}
            </h2>
          </div>
          <details className="ac-detail">
            <summary>
              {copy(
                "Will it work if the Internet goes down?",
                "Intaneti ikikatika, mfumo utafanya kazi?",
              )}
            </summary>
            <p>
              {copy(
                "A local BioTime server can work over a functioning LAN without public Internet. Cloud and remote branches need connectivity. A supported, powered terminal can retain punches within its storage limit; synchronization and recovery must be tested on the actual model. USB collection is a separate manual option, not a live dashboard.",
                "BioTime kwenye seva ya ndani inaweza kufanya kazi kwa LAN inayofanya kazi bila intaneti ya nje. Cloud na matawi ya mbali huhitaji muunganisho. Mashine inayounga mkono uhifadhi na yenye umeme inaweza kuhifadhi rekodi ndani ya kikomo chake; kurejesha na kusawazisha data hupimwa kwenye modeli husika. Kukusanya kwa USB ni chaguo la mkono, si dashboard ya moja kwa moja.",
              )}
            </p>
          </details>
          {content.faq.map(([q, a]) => (
            <details key={q.en} className="ac-detail">
              <summary>{q[lang]}</summary>
              <p>{a[lang]}</p>
            </details>
          ))}
          <details className="ac-detail ta-technical">
            <summary>
              {copy(
                "Already have a machine? Check models and compatibility",
                "Una mashine tayari? Hakiki modeli na ulinganifu",
              )}
            </summary>
            <AttendanceComparison lang={lang} />
          </details>
          <details className="ac-detail ta-technical">
            <summary>
              {copy(
                "Software, licences and optional features",
                "Programu, leseni na vipengele vya hiari",
              )}
            </summary>
            <SoftwareScopeMatrix lang={lang} />
            <p>
              {copy(
                "Personnel/departments, daily dashboards, punches, lateness/absence/early departure review, shifts, overtime, reports, devices/branches and approval workflows depend on the supported build and configuration. Mobile, API and HR/payroll integration require separate scope and licence confirmation.",
                "Wafanyakazi/idara, dashboard, rekodi za kuingia/kutoka, kuchelewa/kutokuwepo/kutoka mapema, zamu, muda wa ziada, ripoti, vifaa/matawi na idhini hutegemea build na usanidi unaoungwa mkono. Simu, API na uunganishaji wa HR/mishahara huainishwa na kuthibitishiwa leseni tofauti.",
              )}
            </p>
          </details>

          <details className="ac-detail">
            <summary>
              {copy(
                "How is employee information protected?",
                "Taarifa za wafanyakazi zinalindwaje?",
              )}
            </summary>
            <p>{content.details[3][1][lang]}</p>
          </details>
        </section>
        <section className="ta-section ta-final">
          <div>
            <p className="eyebrow">
              {copy(
                "LET’S MAKE ATTENDANCE EASIER",
                "TURAHISISHE USIMAMIZI WA MAHUDHURIO",
              )}
            </p>
            <h2>
              {copy(
                "Tell us about your team.",
                "Tuambie kuhusu wafanyakazi wako.",
              )}
            </h2>
            <p>
              {copy(
                "How many staff? One location or several? Fixed hours or shifts? That is enough to start.",
                "Wafanyakazi wangapi? Eneo moja au matawi? Saa za kawaida au zamu? Hapo tunaweza kuanzia.",
              )}
            </p>
          </div>
          <div className="ac-actions">
            <a className="button light" href={links.quote}>
              {copy("Request my quotation", "Omba nukuu yangu")} ↗
            </a>
            <a href={links.whatsapp}>WhatsApp ↗</a>
            <a href={links.survey}>
              {copy("Book a site assessment", "Panga tathmini ya eneo")} ↗
            </a>
            <a href={links.call}>{copy("Call BM", "Piga simu BM")} ↗</a>
          </div>
        </section>

        <RelatedGuides lang={lang} service="access-control" />
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
