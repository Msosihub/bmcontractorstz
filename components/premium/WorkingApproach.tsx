import { Photo } from "./Frame";
import type { Language } from "@/lib/i18n/config";
const steps = {
  en: [
    [
      "Understand the requirement",
      "Share the location, intended use, existing equipment and the problem to solve. Drawings, a BOQ or a fault history help establish what needs assessing.",
    ],
    [
      "Assess and define the scope",
      "Agree the site survey and technical checks needed. Plan equipment compatibility, cable routes, power, safe access and work boundaries before finalising a quotation.",
    ],
    [
      "Install, test and hand over",
      "The agreed scope should identify installation, configuration, functional tests and handover information. Discuss how users will operate the system and what records they need.",
    ],
    [
      "Plan maintenance and support",
      "Confirm the support scope, inspection needs and fault-reporting route. Record model details, symptoms and recent changes when requesting help; service arrangements are agreed for the specific system.",
    ],
  ],
  sw: [
    [
      "Kuelewa mahitaji yako",
      "Taja eneo, matumizi, vifaa vilivyopo na tatizo unalotaka kutatua. Michoro, orodha ya kazi na vifaa (BOQ) au historia ya hitilafu husaidia kubaini mambo yanayohitaji tathmini.",
    ],
    [
      "Tathmini na mpango wa kazi",
      "Ukaguzi wa eneo na vipimo vinavyohitajika hukubaliwa kulingana na kazi. Njia za nyaya, upatikanaji wa umeme, uoanifu wa vifaa, ufikaji salama na mipaka ya kazi huainishwa kabla ya kukamilisha nukuu ya bei.",
    ],
    [
      "Ufungaji, majaribio na makabidhiano",
      "Wigo uliokubaliwa ueleze ufungaji na usanidi wa vifaa. Majaribio ya utendaji na makabidhiano yaweke wazi namna ya kutumia mfumo na nyaraka zinazotolewa.",
    ],
    [
      "Matengenezo na msaada wa kiufundi",
      "Mahitaji ya ukaguzi, matengenezo na utaratibu wa kuripoti hitilafu huwekwa wazi kwa mfumo husika. Unapoomba msaada, taja modeli ya kifaa, dalili za tatizo na mabadiliko yaliyofanyika karibuni.",
    ],
  ],
};
export function WorkingApproach({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  return (
    <section
      className="working-approach"
      aria-labelledby="working-approach-title"
      data-content-owner="reviewed-source:working-approach"
    >
      <p className="eyebrow">
        {sw ? "NAMNA KAZI INAVYOPANGWA" : "HOW THE WORK IS PLANNED"}
      </p>
      <h2 id="working-approach-title">
        {sw
          ? "Wigo ulio wazi. Hatua zinazoeleweka."
          : "A clear scope. A practical sequence."}
      </h2>
      <Photo
        asset="electrical"
        lang={lang}
        className="working-photo"
        alt={
          sw
            ? "Mfano wa AI wa mazingira ya mfumo wa umeme; si kazi halisi ya BM"
            : "AI illustration of electrical system equipment; not a BM installation"
        }
        sizes="(max-width:760px) 100vw, 65vw"
      />
      <ol>
        {steps[lang].map(([title, body], i) => (
          <li key={title}>
            <span className="work-step-index" aria-hidden="true">
              0{i + 1}
            </span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <a className="text-link" href={"/request-site-survey?lang=" + lang}>
        {sw
          ? "Panga tathmini ya eneo lako"
          : "Discuss an assessment for your site"}{" "}
        ↗
      </a>
    </section>
  );
}
