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
      "Confirm the support scope, inspection needs and fault-reporting route. Record model details and symptoms when requesting help; service arrangements are agreed for the specific system.",
    ],
  ],
  sw: [
    [
      "Kuelewa mahitaji",
      "Taja eneo, matumizi, vifaa vilivyopo na tatizo unalotaka kutatua. Michoro, BOQ au historia ya hitilafu husaidia kubaini mambo yanayohitaji tathmini.",
    ],
    [
      "Kutathmini na kupanga wigo wa kazi",
      "Kubalianeni kuhusu ukaguzi wa eneo na vipimo vinavyohitajika. Uoanifu wa vifaa, njia za nyaya, umeme, usalama wa kufikia eneo na mipaka ya kazi hupangwa kabla ya kukamilisha nukuu.",
    ],
    [
      "Kufunga, kujaribu na kukabidhi",
      "Wigo uliokubaliwa ueleze ufungaji, usanidi, majaribio ya utendaji na taarifa za makabidhiano. Jadili namna watumiaji watakavyoendesha mfumo na nyaraka wanazohitaji.",
    ],
    [
      "Kupanga matengenezo na msaada",
      "Thibitisha huduma za msaada, mahitaji ya ukaguzi na namna ya kuripoti hitilafu. Unapoomba msaada, taja modeli na dalili za tatizo; masharti ya huduma hukubaliwa kwa mfumo husika.",
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
