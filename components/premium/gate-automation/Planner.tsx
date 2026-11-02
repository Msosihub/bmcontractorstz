"use client";
import { useState } from "react";
import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import { gateLinks } from "./links";
const data = {
  en: [
    [
      "Sliding gate",
      "For homes, compounds & busy entrances",
      "A gate that travels along the boundary. We assess the track, wheels, rack, gate mass and daily cycles before choosing a D-Series operator.",
      "/assets/gate-automation/arrival-1440.webp",
      "Automate my sliding gate",
    ],
    [
      "Swing gate",
      "For a considered, welcoming entrance",
      "Single or double leaves need the right geometry. VANTAGE SMΔRT+ selection considers the pillars, opening angle, leaf width, wind and locking.",
      "/assets/gate-automation/swing-1440.webp",
      "Plan my swing gate",
    ],
    [
      "Garage & roller door",
      "For homes, workshops & commercial doors",
      "Sectional, roll-up and industrial shutters need different operators. SDO5 SMΔRT+, RDO and RSO are distinct families; a door assessment comes first.",
      "/assets/gate-automation/products/sdo5.webp",
      "Assess my garage or shutter",
    ],
    [
      "Barrier & vehicle access",
      "For parking, institutions & high traffic",
      "Control vehicle flow with a correctly specified boom barrier, detection and access system. Keep pedestrian routes separate and assess emergency access.",
      "/assets/gate-automation/products/sector.webp",
      "Plan commercial access",
    ],
  ],
  sw: [
    [
      "Geti la kuteleza",
      "Kwa nyumba, makazi na biashara",
      "Geti linasogea pembeni ya mpaka. Tunakagua reli, magurudumu, rack, uzito na marudio ya matumizi kabla ya kuchagua mota ya D-Series.",
      "/assets/gate-automation/arrival-1440.webp",
      "Weka mota kwenye geti la kuteleza",
    ],
    [
      "Geti la bawaba",
      "Lango lenye mvuto na urahisi",
      "Mlango mmoja au miwili inahitaji mpangilio sahihi. Uchaguzi wa VANTAGE SMΔRT+ unazingatia nguzo, pembe ya kufunguka, upana, upepo na kufuli.",
      "/assets/gate-automation/swing-1440.webp",
      "Panga geti langu la bawaba",
    ],
    [
      "Gereji na shutter",
      "Kwa nyumba, karakana na biashara",
      "Milango ya sectional, roll-up na shutter za viwandani hutumia mota tofauti. SDO5 SMΔRT+, RDO na RSO ni makundi tofauti; ukaguzi wa mlango unatangulia.",
      "/assets/gate-automation/products/sdo5.webp",
      "Kagua gereji au shutter yangu",
    ],
    [
      "Kizuizi cha magari",
      "Kwa maegesho na maeneo yenye magari mengi",
      "Dhibiti magari kwa kizuizi, vitambuzi na mfumo wa ruhusa unaofaa. Njia za watembea kwa miguu na ufikiaji wa dharura vinahitaji kuzingatiwa.",
      "/assets/gate-automation/products/sector.webp",
      "Panga udhibiti wa magari",
    ],
  ],
};
export function GatePlanner({ lang }: { lang: Language }) {
  const [active, setActive] = useState(0),
    sw = lang === "sw";
  return (
    <section className="ga-section ga-planner" id="gate-solutions">
      <p className="eyebrow">
        {sw ? "ANZA NA AINA YA LANGO" : "START WITH YOUR ENTRANCE"}
      </p>
      <h2>
        {sw
          ? "Kila geti lina mahitaji yake."
          : "Different entrances. Different solutions."}
      </h2>
      <div
        className="ga-tabs"
        role="group"
        aria-label={sw ? "Aina ya lango" : "Entrance type"}
      >
        {data[lang].map(([title], i) => (
          <button
            key={title}
            type="button"
            aria-pressed={active === i}
            aria-controls={`gate-panel-${i}`}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {title}
          </button>
        ))}
      </div>
      {data[lang].map(([title, heading, body, src, context], i) => {
        const links = gateLinks(lang, context);
        return (
          <article
            className="ga-plan-panel"
            key={title}
            id={`gate-panel-${i}`}
            hidden={active !== i}
          >
            <div className={"ga-plan-photo " + (i > 1 ? "ga-contain" : "")}>
              <Image
                src={src}
                fill
                sizes="(max-width:760px) 100vw, 50vw"
                alt={
                  title +
                  (sw ? " — mfano wa matumizi" : " — application and equipment")
                }
              />
            </div>
            <div className="ga-plan-copy">
              <p className="eyebrow">{title}</p>
              <h3>{heading}</h3>
              <p>{body}</p>
              <div className="ga-actions">
                <a className="button dark" href={links.survey}>
                  {sw ? "Panga ukaguzi" : "Arrange assessment"} ↗
                </a>
                <a className="ga-textlink" href={links.whatsapp}>
                  WhatsApp ↗
                </a>
              </div>
              <p className="ga-note">
                {sw
                  ? "Nyumba · Hoteli na lodge · Ofisi za utalii · Shule · Hospitali · Maghala"
                  : "Homes · Hotels & lodges · Tour offices · Schools · Hospitals · Warehouses"}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
