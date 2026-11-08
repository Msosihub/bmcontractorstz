import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import { solutionLinks } from "@/components/catalogue/links";
import { zktecoCategories } from "@/lib/catalogue/zkteco";

export function CatalogueInvitation({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  return (
    <section
      className="ac-section ac-catalogue-invite"
      aria-labelledby="ac-explore-title"
    >
      <div>
        <p className="eyebrow">
          ZKTECO / {sw ? "VIFAA NA PROGRAMU" : "EQUIPMENT & SOFTWARE"}
        </p>
        <h2 id="ac-explore-title">
          {sw
            ? "Tambua kifaa. Panga mfumo."
            : "Know the device. Plan the system."}
        </h2>
        <p>
          {sw
            ? "Mashine ya mahudhurio, mlango mmoja au matawi mengi? Linganisha modeli, programu na vifaa vya kukamilisha ufungaji."
            : "An attendance machine, one secure door or several branches? Compare models, software and the accessories that complete the installation."}
        </p>
        <a className="button dark" href={`/catalogue/zkteco?lang=${lang}`}>
          {sw ? "Chunguza Bidhaa za ZKTeco" : "Explore ZKTeco Products"} ↗
        </a>
      </div>
      <div className="ac-category-links">
        {Object.entries(zktecoCategories).map(([key, label]) => (
          <a key={key} href={`/catalogue/zkteco?lang=${lang}&category=${key}`}>
            {label[lang]} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

const benefits = [
  [
    "People & departments",
    "Wafanyakazi na idara",
    "Organize staff, departments and authorized managers.",
    "Panga wafanyakazi, idara na wasimamizi wenye ruhusa.",
  ],
  [
    "A daily overview",
    "Muhtasari wa kila siku",
    "Review attendance from a browser dashboard.",
    "Kagua mahudhurio kupitia dashboard ya kivinjari.",
  ],
  [
    "Clock-in / clock-out",
    "Kuingia na kutoka",
    "Collect terminal punches and review missing records.",
    "Kusanya rekodi za mashine na kagua zilizo pungufu.",
  ],
  [
    "Exceptions that need attention",
    "Tofauti zinazohitaji ukaguzi",
    "Identify late arrivals, absences and early departures against agreed rules.",
    "Tambua kuchelewa, kutokuwepo na kutoka mapema kwa kanuni zilizokubaliwa.",
  ],
  [
    "Shifts & rosters",
    "Zamu na ratiba",
    "Plan office hours, hotel shifts and overnight schedules.",
    "Panga saa za ofisi, zamu za hoteli na ratiba za usiku.",
  ],
  [
    "Overtime with rules",
    "Muda wa ziada wenye kanuni",
    "Calculate approved overtime under configured policies; managers verify it.",
    "Hesabu muda wa ziada kwa sera zilizowekwa; msimamizi ahakiki.",
  ],
  [
    "Reports & exports",
    "Ripoti na export",
    "Prepare attendance reports and agreed export formats.",
    "Andaa ripoti za mahudhurio na miundo ya export iliyokubaliwa.",
  ],
  [
    "Devices & branches",
    "Vifaa na matawi",
    "Bring supported terminals into one managed deployment.",
    "Unganisha mashine zinazooana kwenye mfumo unaosimamiwa pamoja.",
  ],
  [
    "Review & approvals",
    "Ukaguzi na idhini",
    "Scope approval levels and supported leave/exception workflows.",
    "Ainisha ngazi za idhini na taratibu za likizo au marekebisho zinazoungwa mkono.",
  ],
  [
    "HR / payroll connections",
    "Uunganishaji wa HR na mishahara",
    "API or payroll integration is separately scoped, licensed and tested.",
    "API au uunganishaji wa mishahara huainishwa, hupewa leseni na kujaribiwa tofauti.",
  ],
];
export function BioTimePresentation({ lang }: { lang: Language }) {
  const sw = lang === "sw",
    links = solutionLinks(
      lang,
      "ZKTeco BioTime 9.5 — software, terminals & training",
    );
  return (
    <>
      <section
        id="biotime"
        className="ac-section ac-biotime"
        aria-labelledby="bt-title"
      >
        <div className="ac-bt-intro">
          <p className="eyebrow">
            BIOTIME 9.5 /{" "}
            {sw ? "MAHUDHURIO YENYE MAANA" : "ATTENDANCE, MADE USEFUL"}
          </p>
          <h2 id="bt-title">
            {sw
              ? "Mashine inarekodi. Menejimenti inaelewa."
              : "The machine records. Management understands."}
          </h2>
          <p className="lead">
            {sw
              ? "Zaidi ya alama za vidole mlangoni. BM hupanga mashine, programu ya usimamizi, zamu, ripoti na mafunzo kama suluhisho moja lenye vipengele vilivyoainishwa."
              : "More than a fingerprint at the door. BM scopes the terminals, management software, shifts, reports and training as one considered solution."}
          </p>
        </div>
        <div className="ac-bt-stage">
          <div className="ac-office-photo">
            <Image
              src="/images/access-control/hr-office-1440.webp"
              width={1440}
              height={960}
              sizes="(max-width:800px) 100vw, 70vw"
              alt={
                sw
                  ? "Wasimamizi wakipanga kazi katika ofisi ya kisasa"
                  : "Managers reviewing work in a contemporary office"
              }
            />
            <div className="ac-office-screen" aria-hidden="true">
              <Image
                src="/images/access-control/biotime-dashboard.webp"
                width={1600}
                height={381}
                sizes="24vw"
                alt=""
              />
            </div>
          </div>
          <figure className="ac-bt-monitor">
            <Image
              src="/images/access-control/biotime-dashboard.webp"
              width={1600}
              height={381}
              sizes="(max-width:800px) 100vw, 66vw"
              alt={
                sw
                  ? "Picha rasmi ya BioTime 9.5: login na dashboard ya maonyesho ya mtengenezaji"
                  : "Official BioTime 9.5 marketing screen: manufacturer demonstration login and dashboard"
              }
            />
            <figcaption>
              {sw
                ? "BioTime 9.5 · Picha rasmi ya maonyesho ya ZKTeco; si mfumo wa mteja."
                : "BioTime 9.5 · Official ZKTeco demonstration media, not a customer system."}
            </figcaption>
          </figure>
        </div>
        <div className="ac-actions">
          <a className="button dark" href={links.quote}>
            {sw ? "Panga mfumo wa mahudhurio" : "Plan my attendance system"} ↗
          </a>
          <a href={`/catalogue/zkteco/biotime-9-5?lang=${lang}`}>
            {sw
              ? "Leseni na mahitaji ya programu"
              : "Software, licensing & requirements"}{" "}
            ↗
          </a>
        </div>
        <div className="ac-benefits">
          {benefits.map((b, i) => (
            <article key={b[0]}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{b[sw ? 1 : 0]}</h3>
                <p>{b[sw ? 3 : 2]}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="ac-note">
          {sw
            ? "Vipengele vinavyoonyeshwa vinategemea build, leseni na usanidi. App ya simu, cloud, API, payroll na modules za ziada zithibitishwe tofauti; si vyote vimejumuishwa kwenye kila leseni."
            : "Features depend on build, licence and configuration. Mobile app, cloud, API, payroll and additional modules require separate confirmation; they are not included in every licence."}
        </p>
        <a className="ac-textlink" href="https://www.zkteco-ea.com/biotime9-5/">
          {sw ? "Rejea rasmi ya BioTime 9.5" : "Official BioTime 9.5 reference"}{" "}
          ↗
        </a>
      </section>
      <section
        className="ac-section ac-report-section"
        aria-labelledby="report-title"
      >
        <div>
          <p className="eyebrow">
            {sw
              ? "MFANO WA RIPOTI · TAARIFA ZA KUBUNI"
              : "SAMPLE REPORT · FICTIONAL DATA"}
          </p>
          <h2 id="report-title">
            {sw
              ? "Mazungumzo bora huanza na taarifa."
              : "Better conversations start with clear records."}
          </h2>
          <p>
            {sw
              ? "Mfano huu wa BM unaonyesha namna ripoti inavyoweza kusaidia ukaguzi. Si screenshot ya programu, ripoti ya mteja au hesabu ya mshahara. Rekodi pungufu na overtime huhitaji idhini."
              : "This original BM example shows how a report can support review. It is not a software screenshot, customer report or payroll calculation. Missing punches and overtime need approval."}
          </p>
          <a href={links.quote}>
            {sw
              ? "Tuonyeshe unachohitaji kwenye ripoti"
              : "Tell us what your reports need to show"}{" "}
            ↗
          </a>
        </div>
        <div
          className="ac-report-scroll"
          tabIndex={0}
          role="region"
          aria-label={
            sw
              ? "Jedwali la mfano wa mahudhurio"
              : "Sample attendance report table"
          }
        >
          <table>
            <caption>
              {sw
                ? "Mfano tu — wafanyakazi wa kubuni · 02 Nov 2026"
                : "Sample only — fictional staff · 02 Nov 2026"}
            </caption>
            <thead>
              <tr>
                {(sw
                  ? [
                      "Mfanyakazi",
                      "Idara",
                      "Zamu",
                      "Kuingia",
                      "Kutoka",
                      "Ukaguzi",
                    ]
                  : ["Employee", "Department", "Shift", "In", "Out", "Review"]
                ).map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Demo 001",
                  sw ? "Mapokezi" : "Reception",
                  "08:00–17:00",
                  "07:56",
                  "17:02",
                  sw ? "Kwa wakati" : "On time",
                ],
                [
                  "Demo 002",
                  sw ? "Utawala" : "Admin",
                  "08:00–17:00",
                  "08:18",
                  "17:01",
                  sw ? "Chelewa: dk 18" : "Late: 18 min",
                ],
                [
                  "Demo 003",
                  sw ? "Huduma" : "Operations",
                  "14:00–22:00",
                  "13:55",
                  "—",
                  sw ? "Hakiki kutoka" : "Review missing out",
                ],
                [
                  "Demo 004",
                  sw ? "Ghala" : "Stores",
                  "08:00–17:00",
                  "07:52",
                  "18:00",
                  sw ? "Hakiki overtime" : "Review overtime",
                ],
              ].map((r) => (
                <tr key={r[0]}>
                  {r.map((v, i) =>
                    i === 0 ? (
                      <th scope="row" key={i}>
                        {v}
                      </th>
                    ) : (
                      <td key={i}>{v}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="ac-section ac-sage">
        <div className="ac-heading">
          <h2>
            {sw
              ? "Intaneti ikikatika, nini kinaendelea?"
              : "What happens when the Internet stops?"}
          </h2>
          <p>
            {sw
              ? "Mtandao wa ndani, intaneti na umeme ni mahitaji tofauti. Tunapima hali hizi kabla ya kukabidhi."
              : "Your local network, Internet and power are separate dependencies. We test these scenarios before handover."}
          </p>
        </div>
        <div className="ac-three">
          {[
            [
              "Local BioTime server",
              "BioTime kwenye seva yako",
              "A working LAN can connect compatible terminals, server and manager browsers without public Internet. Remote branches, cloud functions and external integrations still need their own connectivity.",
              "LAN inayofanya kazi inaweza kuunganisha mashine zinazooana, seva na vivinjari bila intaneti ya nje. Matawi ya mbali, cloud na mifumo ya nje bado huhitaji muunganisho wake.",
            ],
            [
              "Cloud / remote branches",
              "Cloud na matawi ya mbali",
              "Internet interruption delays cloud synchronization. A supported terminal may retain punches within its configured storage limit while powered; verify recovery, capacity and duplicate handling on the exact device.",
              "Intaneti ikikatika, usawazishaji wa cloud huchelewa. Mashine inayounga mkono uhifadhi inaweza kuhifadhi rekodi ndani ya kikomo chake ikiwa ina umeme; hakiki kurejea kwa data na kutorudia rekodi kwenye modeli husika.",
            ],
            [
              "Basic USB collection",
              "Kukusanya kwa USB",
              "Supported export can suit a simple local workflow. It is manual, not a live multi-branch dashboard; confirm file format, compatible software, safe transfer and who collects the records.",
              "Export inayoungwa mkono inaweza kufaa kazi rahisi. Inahitaji mtu kukusanya; si dashboard ya matawi ya moja kwa moja. Hakiki aina ya faili, programu, usalama wa kuhamisha na anayehusika.",
            ],
          ].map((r) => (
            <article className="ac-editorial" key={r[0]}>
              <h3>{r[sw ? 1 : 0]}</h3>
              <p>{r[sw ? 3 : 2]}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function CompleteSolutions({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  const solutions = [
    [
      "Small office attendance",
      "Mahudhurio ya ofisi ndogo",
      "Suitable terminal + enrolment + supported software + report setup + training.",
      "Mashine inayofaa + usajili + programu inayooana + usanidi wa ripoti + mafunzo.",
    ],
    [
      "Hotel staff & shifts",
      "Wafanyakazi na zamu za hoteli",
      "Attendance points + departments + overnight shifts + manager reports + support.",
      "Vituo vya mahudhurio + idara + zamu za usiku + ripoti za meneja + msaada.",
    ],
    [
      "Multi-branch organization",
      "Taasisi yenye matawi",
      "Compatible terminals + connectivity + server/cloud plan + permissions + synchronization tests.",
      "Mashine zinazooana + mtandao + seva/cloud + ruhusa + majaribio ya kusawazisha data.",
    ],
    [
      "A complete office door",
      "Mlango wa ofisi uliokamilika",
      "Terminal/reader + controller where needed + suitable lock/brackets + exit/release + protected power + installation.",
      "Terminal/reader + controller inapohitajika + kufuli/brackets + vifaa vya kutoka/dharura + umeme salama + ufungaji.",
    ],
    [
      "Repair or upgrade",
      "Matengenezo au uboreshaji",
      "Diagnosis + authorized backup + firmware/software checks + reconfiguration + handover.",
      "Uchunguzi + backup yenye ruhusa + ukaguzi wa firmware/programu + usanidi upya + makabidhiano.",
    ],
  ];
  return (
    <section className="ac-section ac-complete">
      <p className="eyebrow">
        {sw
          ? "VIFAA, PROGRAMU NA HUDUMA KWA PAMOJA"
          : "EQUIPMENT, SOFTWARE & SERVICE TOGETHER"}
      </p>
      <h2>
        {sw
          ? "Nukuu inayokamilisha kazi."
          : "A quotation that completes the job."}
      </h2>
      <p className="lead">
        {sw
          ? "Hii ni mifano ya vipengele vya kuandaa nukuu, si packages zenye vifaa au leseni zinazofanana kwa kila eneo."
          : "These are configurable quotation examples, not fixed bundles with universal inclusions."}
      </p>
      {solutions.map((s, i) => (
        <article key={s[0]}>
          <span className="ac-number">0{i + 1}</span>
          <h3>{s[sw ? 1 : 0]}</h3>
          <p>{s[sw ? 3 : 2]}</p>
          <a href={solutionLinks(lang, "ZKTeco — " + s[sw ? 1 : 0]).quote}>
            {sw ? "Omba nukuu" : "Request quotation"} ↗
          </a>
        </article>
      ))}
    </section>
  );
}

export function BioTimeSpotlight({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  return (
    <section className="ac-section ac-bt-spotlight">
      <div>
        <p className="eyebrow">BIOTIME 9.5</p>
        <h2>
          {sw
            ? "Mashine mlangoni. Taarifa mezani."
            : "At the door. On your dashboard."}
        </h2>
        <p className="lead">
          {sw
            ? "Jua mahudhurio, panga zamu na toa ripoti zinazoeleweka. Chagua mfumo kamili wa mahudhurio, si mashine pekee."
            : "See attendance, organize shifts and give managers useful reports. Choose a complete attendance system, beyond the machine."}
        </p>
        <a
          className="button dark"
          href={`/services/access-control/time-attendance?lang=${lang}#biotime`}
        >
          {sw
            ? "Tazama BioTime na mfano wa ripoti"
            : "Explore BioTime & sample reports"}{" "}
          ↗
        </a>
      </div>
      <a href={`/services/access-control/time-attendance?lang=${lang}#biotime`}>
        <Image
          src="/images/access-control/biotime-dashboard.webp"
          width={1600}
          height={381}
          sizes="(max-width:800px) 90vw, 48vw"
          alt={
            sw
              ? "Picha rasmi ya BioTime 9.5 ya ZKTeco"
              : "Official ZKTeco BioTime 9.5 software marketing screen"
          }
        />
      </a>
    </section>
  );
}
