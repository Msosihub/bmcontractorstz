"use client";
import { useState } from "react";
import {
  House,
  Store,
  Briefcase,
  Hotel,
  School,
  Warehouse,
  Landmark,
} from "lucide-react";
const propertyIcons = [
  House,
  Store,
  Briefcase,
  Hotel,
  School,
  Warehouse,
  Landmark,
];
import copy from "@/data/cctv-commercial.json";
import type { Language } from "@/lib/i18n/config";
import { cctvLinks } from "./links";
export function CctvPlanner({ lang }: { lang: Language }) {
  const t = copy[lang],
    sw = lang === "sw";
  const [place, setPlace] = useState(0);
  return (
    <section
      className="cctv-section cctv-planner"
      id="plan"
      aria-labelledby="planner-title"
    >
      <div className="cctv-section-heading">
        <p className="eyebrow">{t.plannerLabel}</p>
        <h2 id="planner-title">{t.plannerTitle}</h2>
        <p>{t.plannerIntro}</p>
      </div>
      <div className="cctv-property-guide">
        <h3 id="cctv-property-question">{t.propertyQuestion}</h3>
        <div
          className="cctv-place-picker"
          role="group"
          aria-labelledby="cctv-property-question"
        >
          {t.cases.map((x, i) => {
            const Icon = propertyIcons[i];
            return (
              <button
                type="button"
                key={x.id}
                aria-pressed={i === place}
                onClick={() => setPlace(i)}
              >
                <Icon size={23} strokeWidth={1.35} aria-hidden="true" />
                <span>{x.name}</span>
                <span className="cctv-property-check" aria-hidden="true">
                  {i === place ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>
        <div className="cctv-place-brief" aria-live="polite">
          <span className="eyebrow">{t.coverageLabel}</span>
          <p>{t.cases[place].coverage}</p>
        </div>
      </div>
      <div className="cctv-package-grid">
        {t.sizes.map((x, i) => {
          const links = cctvLinks(
            lang,
            `CCTV — ${x.count} ${sw ? "kamera" : "cameras"} — ${t.cases[place].name}`,
          );
          return (
            <article className={"cctv-package package-" + i} key={x.count}>
              <div className="cctv-package-top">
                <span className="cctv-package-count">{x.count}</span>
                <span>
                  {sw ? "KAMERA" : "CAMERAS"}
                  <br />
                  {sw ? "PAMOJA NA UFUNGAJI" : "WITH INSTALLATION"}
                </span>
                <span aria-hidden="true" className="cctv-package-symbol">
                  ↗
                </span>
              </div>
              <h3>{x.title}</h3>
              <ul>
                {x.items.map((y) => (
                  <li key={y}>{y}</li>
                ))}
              </ul>
              <p className="cctv-package-price">{t.packagePrice}</p>
              <a className="button" href={links.quote}>
                {t.packageQuote}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="cctv-package-wa" href={links.whatsapp}>
                {t.whatsapp} ↗
              </a>
            </article>
          );
        })}
      </div>
      <p className="cctv-package-note">{t.packageNote}</p>
      <a
        className="cctv-package-survey"
        href={
          cctvLinks(lang, `CCTV installation — ${t.cases[place].name}`).survey
        }
      >
        {sw
          ? "Huna uhakika? Omba ukaguzi wa eneo"
          : "Not sure where to start? Request a site survey"}{" "}
        ↗
      </a>
      <div className="cctv-included">
        <p>{t.includedLabel}</p>
        <ul>
          {t.included.map((x) => (
            <li key={x}>
              <span aria-hidden="true">✓</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
