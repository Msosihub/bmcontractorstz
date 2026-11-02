import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import type { Language } from "@/lib/i18n/config";
import { ReferenceCard } from "@/components/catalogue/ReferenceCard";
import { solutionLinks } from "@/components/catalogue/links";
import { zktecoProducts } from "@/lib/catalogue/zkteco";
import { t } from "./content";
import "./access.css";
export const solutionContent = {
  "time-attendance": {
    title: t(
      "Staff Time Attendance Systems",
      "Mifumo ya Mahudhurio ya Wafanyakazi",
    ),
    headline: t(
      "Every shift. A clearer picture.",
      "Kila zamu. Taarifa zilizo wazi.",
    ),
    intro: t(
      "Fingerprint, face, card or PIN attendance for Tanzanian offices, hotels, shops, schools, clinics, factories and multi-branch teams. BM helps select the terminal, management software and reporting workflow together.",
      "Mahudhurio kwa alama za vidole, uso, kadi au PIN kwa ofisi, hoteli, maduka, shule, zahanati, viwanda na matawi nchini Tanzania. BM husaidia kuchagua kifaa, programu na namna ya kutoa ripoti kwa pamoja.",
    ),
    image: "workplace",
    models: ["senseface-4a", "speedface-v5l", "f18-pro"],
    options: [
      [
        t("Small office or shop", "Ofisi ndogo au duka"),
        t(
          "One location, a suitable terminal, employee registration and clear check-in/out rules. Choose the simplest supported management option and a responsible administrator.",
          "Eneo moja, kifaa kinachofaa, usajili wa wafanyakazi na kanuni za kuingia/kutoka. Chagua programu rahisi inayoungwa mkono na msimamizi anayewajibika.",
        ),
      ],
      [
        t("Shifts & a growing team", "Zamu na wafanyakazi wanaoongezeka"),
        t(
          "Hotels, clinics, schools and warehouses need shift definitions, lateness/overtime rules and report review. Validate night shifts, breaks and exceptions using sample schedules before handover.",
          "Hoteli, zahanati, shule na maghala huhitaji zamu, kanuni za kuchelewa/muda wa ziada na ukaguzi wa ripoti. Jaribu zamu za usiku, mapumziko na hali maalumu kabla ya kukabidhi.",
        ),
      ],
      [
        t("Several branches or field teams", "Matawi mengi au timu za nje"),
        t(
          "Confirm device synchronization, branch connectivity, user permissions and a supported server or cloud plan. Mobile/geofenced attendance depends on the software subscription and employee-data policy.",
          "Hakiki ulinganifu wa vifaa, mtandao wa matawi, ruhusa na mpango wa seva au cloud. Mahudhurio ya simu/geofencing hutegemea usajili wa programu na sera ya taarifa za wafanyakazi.",
        ),
      ],
    ],
    details: [
      [
        t(
          "The workflow matters more than the device alone",
          "Mpangilio wa kazi ni muhimu kuliko kifaa pekee",
        ),
        t(
          "Register employees and appropriate credentials; define departments, shifts, grace periods and approved overtime rules. Import device events, review missed punches and approved exceptions, then issue reports. A supervisor should verify exceptions before any payroll decision.",
          "Sajili wafanyakazi na utambulisho unaofaa; panga idara, zamu, muda wa nyongeza wa kufika na kanuni za overtime. Kusanya matukio, kagua kuingia/kutoka kulikosahaulika na marekebisho yaliyoidhinishwa, kisha toa ripoti. Msimamizi ahakiki tofauti kabla ya maamuzi ya mishahara.",
        ),
      ],
      [
        t("Local software or cloud?", "Programu ya ndani au cloud?"),
        t(
          "ZKBio Time 9.5 is a locally hosted attendance option with exact-build and hardware checks. ZKBioTime Cloud adds subscription and Internet/data-hosting considerations. Decide who maintains backups, updates, user access and licences. HR/payroll export or API work is confirmed separately.",
          "ZKBio Time 9.5 inaweza kuwekwa kwenye seva yako baada ya kuhakiki build na vifaa. ZKBioTime Cloud ina mahitaji ya usajili, intaneti na eneo la data. Panga nani atasimamia backup, updates, ruhusa na leseni. Export/API ya HR na mishahara huthibitishwa tofauti.",
        ),
      ],
      [
        t("Attendance is not door access", "Mahudhurio si udhibiti wa mlango"),
        t(
          "An attendance-only terminal can record check-ins without operating a lock. If you also need door control, specify compatible firmware, locks, controller/relay, exit hardware and permissions as a separate part of the system.",
          "Kifaa cha mahudhurio pekee kinaweza kurekodi bila kufungua kufuli. Ukihitaji mlango pia, ainisha firmware inayooana, makufuli, controller/relay, vifaa vya kutoka na ruhusa kama sehemu tofauti.",
        ),
      ],
      [
        t(
          "Protect staff data from day one",
          "Linda taarifa za wafanyakazi tangu mwanzo",
        ),
        t(
          "Use lawful, proportionate enrollment, inform employees and offer appropriate supported alternatives. Limit administrators, protect templates and exports, define retention/deletion and assess hosting contracts. Do not collect children’s biometrics by default. Do not email biometric templates to request a quotation.",
          "Sajili kwa msingi halali na unaofaa, waeleze wafanyakazi na toa mbadala unaokubalika. Punguza wasimamizi, linda templates na exports, panga muda wa uhifadhi/ufutaji na tathmini masharti ya cloud. Usikusanye biometriki za watoto kwa mazoea. Usitume templates kwa barua pepe ukiomba nukuu.",
        ),
      ],
    ],
    faq: [
      [
        t("Will the system calculate salaries?", "Mfumo utahesabu mishahara?"),
        t(
          "Attendance reports can support payroll, but wage rules, approvals, export format and any payroll API are a separately scoped and tested integration.",
          "Ripoti zinaweza kusaidia mishahara, lakini kanuni za malipo, approvals, muundo wa export na API huainishwa na kujaribiwa tofauti.",
        ),
      ],
      [
        t("What if staff forget to check out?", "Mfanyakazi akisahau kutoka?"),
        t(
          "Use authorized exception review with an audit trail and agreed rules. A missing punch is not proof that someone was absent.",
          "Tumia ukaguzi wa marekebisho wenye ruhusa, historia ya mabadiliko na kanuni zilizokubaliwa. Kukosa rekodi ya kutoka si uthibitisho wa kutokuwepo.",
        ),
      ],
      [
        t(
          "Can an old fingerprint machine connect?",
          "Mashine ya zamani ya fingerprint inaweza kuunganishwa?",
        ),
        t(
          "Send its model and software/firmware version. PUSH protocol, generation and licensed support must be confirmed before promising migration.",
          "Tuma modeli na toleo la programu/firmware. PUSH protocol, kizazi na leseni lazima vihakikiwe kabla ya kuahidi kuhamisha mfumo.",
        ),
      ],
    ],
  },
  "smart-locks": {
    title: t(
      "Smart Locks & Hotel Access",
      "Makufuli Janja na Mifumo ya Hoteli",
    ),
    headline: t(
      "A better welcome begins at the door.",
      "Mapokezi mazuri huanzia mlangoni.",
    ),
    intro: t(
      "Smart-lock selection for homes, apartments, offices and hotels in Tanzania. BM assesses the door, chooses supported entry methods and plans installation, everyday management and emergency access.",
      "Uchaguzi wa makufuli janja kwa nyumba, apartments, ofisi na hoteli Tanzania. BM hutathmini mlango, njia za kufungua na mpangilio wa ufungaji, usimamizi na ufunguaji wa dharura.",
    ),
    image: "hotel",
    models: ["ml100", "sl01-t430h", "lh4000"],
    options: [
      [
        t("Home or apartment", "Nyumba au apartment"),
        t(
          "Consider ML100 or SL01-T430H only after checking the door and mortise. Choose supported fingerprint, PIN, card or app access; agree battery and emergency-access procedures.",
          "Fikiria ML100 au SL01-T430H baada ya kukagua mlango na mortise. Chagua alama za vidole, PIN, kadi au app inayoungwa mkono; panga betri na kufungua dharura.",
        ),
      ],
      [
        t("Office room", "Chumba cha ofisi"),
        t(
          "A self-contained smart lock may suit a compatible office door. For central permissions, multiple doors or fire-system interfaces, a separate controller-based system may be more appropriate.",
          "Kufuli janja linaweza kufaa mlango wa ofisi unaolingana. Kwa ruhusa za kati, milango mingi au kuunganisha fire alarm, mfumo wa controller tofauti unaweza kufaa zaidi.",
        ),
      ],
      [
        t("Hotel or lodge", "Hoteli au lodge"),
        t(
          "Plan a matched room-lock system: locks, guest cards, reception encoder and supported management software. Specify lost-card replacement, checkout and staff access workflows.",
          "Panga mfumo unaolingana: makufuli, kadi za wageni, encoder ya mapokezi na programu. Ainisha kubadilisha kadi iliyopotea, checkout na ruhusa za wafanyakazi.",
        ),
      ],
    ],
    details: [
      [
        t("The door decides the fit", "Mlango huamua kufuli linalofaa"),
        t(
          "Measure thickness, material, mortise dimensions, backset, handing and existing cut-outs. ML100 specifies a European 5050 mortise and 35–60 mm door thickness; SL01-T430H specifies 35–60 mm standard, 55 mm backset and 72 mm centres for suitable wooden swing doors. A photograph alone cannot confirm fit.",
          "Pima unene, aina ya mlango, mortise, backset, mwelekeo na sehemu zilizokatwa. ML100 hutaja European 5050 na unene wa 35–60 mm; SL01-T430H hutaja 35–60 mm, backset 55 mm na centres 72 mm kwa mlango wa mbao wa bawaba unaofaa. Picha pekee haitoshi kuthibitisha.",
        ),
      ],
      [
        t(
          "App access and guest cards are different",
          "App na kadi za hoteli ni mifumo tofauti",
        ),
        t(
          "ML100 and SL01-T430H reference the ZSmart ecosystem; remote features need compatible Wi-Fi and Internet. Hotel HLMS/CVSecurity SmartLock configurations require matched lock firmware, encoder, cards and licences. Do not assume a ZSmart lock connects to hotel software or any PMS.",
          "ML100 na SL01-T430H hutaja ZSmart; huduma za mbali zinahitaji Wi-Fi na intaneti zinazofaa. HLMS/CVSecurity SmartLock ya hoteli huhitaji firmware, encoder, kadi na leseni zinazolingana. Usidhani kufuli la ZSmart linaoana na programu yoyote ya hoteli au PMS.",
        ),
      ],
      [
        t(
          "Always plan battery replacement and emergency access",
          "Panga kubadilisha betri na kufungua dharura",
        ),
        t(
          "Agree who checks low-battery warnings and retains emergency keys where the model supports them. ML100 lists Micro-USB emergency power; SL01-T430H lists USB-C 5V and mechanical-key access. These interfaces are not substitutes for scheduled battery care or a safe exit plan.",
          "Panga anayekagua onyo la betri na anayehifadhi funguo za dharura kwa modeli inayozitumia. ML100 ina Micro-USB kwa umeme wa dharura; SL01-T430H ina USB-C 5V na ufunguo wa kawaida. Hivi si mbadala wa kutunza betri au njia salama ya kutoka.",
        ),
      ],
      [
        t(
          "A reception system staff can use",
          "Mfumo ambao mapokezi yanaweza kutumia",
        ),
        t(
          "Test card issuing, correct room allocation, expiry/checkout, a lost-card scenario and staff permissions with the exact hotel system. PMS connectivity, online gateways and reporting are separately confirmed, not included by default. Train the team and document recovery procedures.",
          "Jaribu kutoa kadi, chumba sahihi, kuisha kwa ruhusa/checkout, kadi iliyopotea na ruhusa za staff kwenye mfumo halisi. PMS, gateways na ripoti huhakikiwa tofauti; si lazima viwepo. Fundisha timu na andika taratibu za kurejesha huduma.",
        ),
      ],
    ],
    faq: [
      [
        t(
          "Will a smart lock fit my existing door?",
          "Kufuli janja litafaa mlango wangu?",
        ),
        t(
          "Only after measurements and mortise/handing checks. Some doors need alterations; some are unsuitable. Request assessment before buying.",
          "Ni baada ya vipimo na ukaguzi wa mortise/mwelekeo. Baadhi huhitaji marekebisho na mingine haifai. Omba tathmini kabla ya kununua.",
        ),
      ],
      [
        t("Will it still open without Internet?", "Litafunguka bila intaneti?"),
        t(
          "Supported local credentials can work independently of remote app features. Exact offline behaviour and emergency methods must be tested on the chosen model.",
          "Njia za karibu zinazoungwa mkono zinaweza kufanya kazi bila huduma za mbali za app. Tabia bila intaneti na njia za dharura lazima zijaribiwe kwenye modeli husika.",
        ),
      ],
      [
        t(
          "Can we use one app for every lock and hotel?",
          "App moja inaweza kutumika kwa kila kufuli na hoteli?",
        ),
        t(
          "No universal compatibility is claimed. Match the exact lock generation, firmware, software, region and licensing before ordering.",
          "Hatusemi kila kifaa kinaoana. Linganisha kizazi, firmware, programu, eneo la huduma na leseni kabla ya kuagiza.",
        ),
      ],
    ],
  },
};
export type SolutionKey = keyof typeof solutionContent;
export function SolutionPage({
  kind,
  lang,
}: {
  kind: SolutionKey;
  lang: Language;
}) {
  const c = solutionContent[kind],
    sw = lang === "sw",
    links = solutionLinks(lang, "ZKTeco — " + c.title[lang]);
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main ac-main">
        <section className="ac-hero ac-child-hero">
          <div className="ac-hero-copy">
            <p className="eyebrow">
              <a href={`/services/access-control?lang=${lang}`}>
                {sw
                  ? "ACCESS CONTROL NA MAHUDHURIO"
                  : "ACCESS CONTROL & ATTENDANCE"}
              </a>{" "}
              / ZKTECO
            </p>
            <p className="ac-identity">{c.title[lang]}</p>
            <h1>{c.headline[lang]}</h1>
            <p className="lead">{c.intro[lang]}</p>
            <div className="ac-actions">
              <a className="button dark" href={links.quote}>
                {sw ? "Omba mfumo unaofaa" : "Request a suitable solution"} ↗
              </a>
              <a className="ac-textlink" href={links.whatsapp}>
                WhatsApp ↗
              </a>
            </div>
          </div>
          <div className="ac-hero-scene">
            <Image
              src={`/images/access-control/${c.image}-1440.webp`}
              fill
              priority
              sizes="(max-width:800px) 100vw, 55vw"
              alt={
                sw
                  ? "Mazingira ya " +
                    (kind === "smart-locks"
                      ? "mlango wa chumba cha hoteli"
                      : "ofisi ya kisasa")
                  : kind === "smart-locks"
                    ? "Contemporary hotel-room entrance"
                    : "Contemporary workplace arrival"
              }
            />
          </div>
        </section>
        <section className="ac-section ac-sage">
          <p className="eyebrow">
            {sw
              ? "ANZA NA NAMNA UNAVYOFANYA KAZI"
              : "START WITH THE WAY YOU WORK"}
          </p>
          <h2>
            {sw
              ? "Chaguo linalofaa watu wako."
              : "A solution around your people."}
          </h2>
          <div className="ac-three">
            {c.options.map(([a, b], i) => (
              <article className="ac-door-option" key={a.en}>
                <span className="ac-number">0{i + 1}</span>
                <h3>{a[lang]}</h3>
                <p>{b[lang]}</p>
                <a href={solutionLinks(lang, "ZKTeco — " + a[lang]).survey}>
                  {sw ? "Panga tathmini" : "Plan an assessment"} ↗
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className="ac-section">
          <div className="ac-heading">
            <h2>
              {sw
                ? "Vifaa vinavyoendana na kazi."
                : "Equipment that fits the task."}
            </h2>
            <a href={`/catalogue/zkteco?lang=${lang}`}>
              {sw ? "Linganisha katalogini" : "Compare in the catalogue"} ↗
            </a>
          </div>
          <div className="rc-grid">
            {c.models.map((id) => (
              <ReferenceCard
                key={id}
                p={zktecoProducts.find((p) => p.slug === id)!}
                lang={lang}
                namespace="/catalogue/zkteco"
              />
            ))}
          </div>
        </section>
        <section className="ac-section ac-software">
          <p className="eyebrow">
            {sw ? "VIPENGELE MUHIMU" : "THE IMPORTANT DETAILS"}
          </p>
          <h2>
            {sw
              ? "Fanya uchaguzi ukiwa na taarifa."
              : "Choose with the full picture."}
          </h2>
          <div className="ac-two">
            {c.details.map(([a, b]) => (
              <article className="ac-editorial" key={a.en}>
                <h3>{a[lang]}</h3>
                <p>{b[lang]}</p>
              </article>
            ))}
          </div>
          <a
            className="ac-textlink"
            href={`/services/access-control?lang=${lang}#software`}
          >
            {sw
              ? "Programu, ulinganifu na taarifa za usalama"
              : "Software, compatibility & security notices"}{" "}
            ↗
          </a>
        </section>
        <section className="ac-section ac-faq">
          <h2>{sw ? "Maswali yanayoulizwa." : "Questions worth asking."}</h2>
          {c.faq.map(([q, a]) => (
            <details className="ac-detail" key={q.en}>
              <summary>{q[lang]}</summary>
              <p>{a[lang]}</p>
            </details>
          ))}
        </section>
        <section className="ac-section ac-final">
          <p className="eyebrow">
            {sw
              ? "VIFAA · UFUNGAJI · MAFUNZO · MSAADA"
              : "EQUIPMENT · INSTALLATION · TRAINING · SUPPORT"}
          </p>
          <h2>{sw ? "Tuandae mfumo wako." : "Let’s plan your system."}</h2>
          <p className="lead">
            {sw
              ? "Tuambie eneo, milango au wafanyakazi, mfumo uliopo na unachohitaji. Tutatenganisha vifaa, leseni, ufungaji na msaada kwenye nukuu."
              : "Tell us the location, doors or staff involved, existing equipment and the outcome you need. We will distinguish equipment, licensing, installation and support in the quotation."}
          </p>
          <div className="ac-actions">
            <a className="button light" href={links.quote}>
              {sw ? "Omba nukuu" : "Request quotation"} ↗
            </a>
            <a href={links.survey}>
              {sw ? "Ukaguzi wa eneo" : "Site survey"} ↗
            </a>
            <a href={links.call}>{sw ? "Piga simu" : "Call BM"} ↗</a>
          </div>
        </section>
        <p className="ac-section ac-image-note">
          {sw
            ? "Picha ya mazingira ni mfano uliotengenezwa kwa AI, si mradi halisi wa BM. Picha za bidhaa ni za mtengenezaji."
            : "The environment scene is an AI-created application visual, not a BM project. Equipment photographs are manufacturer references."}
        </p>
      </main>
      <Footer lang={lang} imageNotice={false} />
    </>
  );
}
