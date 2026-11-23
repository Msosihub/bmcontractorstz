import { EngineeringMotionControl } from "./EngineeringMotionControl";
import type { Language } from "@/lib/i18n/config";
import "./engineering-motion.css";
export const heroTreatments: Record<
  string,
  { family: string; en: string; sw: string }
> = {
  cctv: {
    family: "optical",
    en: "A clearer field of view",
    sw: "Uangalizi ulio wazi",
  },
  "electric-fence": {
    family: "perimeter",
    en: "A considered perimeter",
    sw: "Mpaka uliopangwa vizuri",
  },
  "fire-alarm-systems": {
    family: "detection",
    en: "Detection. Communication. Response.",
    sw: "Utambuzi. Taarifa. Mwitikio.",
  },
  "video-intercom": {
    family: "communication",
    en: "See. Speak. Welcome.",
    sw: "Ona. Zungumza. Karibisha.",
  },
  "telephone-systems": {
    family: "communication",
    en: "Keep the conversation connected",
    sw: "Dumisha mawasiliano",
  },
  "air-conditioners": {
    family: "airflow",
    en: "Comfort, carefully directed",
    sw: "Mazingira yenye hali nzuri",
  },
  "solar-street-lights": {
    family: "daylight",
    en: "Daylight, carried into the evening",
    sw: "Mwanga wa jua hadi nyakati za usiku",
  },
  "maintenance-support": {
    family: "diagnostic",
    en: "Look closer. Keep systems working.",
    sw: "Kagua vizuri. Dumisha mifumo.",
  },
  "institutional-procurement": {
    family: "coordination",
    en: "A coordinated technical brief",
    sw: "Mahitaji ya kiufundi yaliyoratibiwa",
  },
  directory: {
    family: "coordination",
    en: "Security. Energy. Connected buildings.",
    sw: "Ulinzi. Nishati. Majengo yaliyounganishwa.",
  },
};
/** Decorative conceptual motion. Existing technical diagrams remain the engineering explanation. */
export function EngineeringMotion({
  slug,
  lang,
}: {
  slug: string;
  lang: Language;
}) {
  const t = heroTreatments[slug];
  if (!t) return null;
  const family = t.family;
  return (
    <div className={"engineering-motion em-" + family} data-em-family={family}>
      <div className="em-art" aria-hidden="true">
        <svg viewBox="0 0 600 155" fill="none">
          <g className="em-traces" stroke="currentColor" strokeWidth="1.3">
            {family === "optical" ? (
              <>
                <path d="M92 76L161 48L190 76L161 104Z" />
                <circle cx="166" cy="76" r="12" />
                <path className="em-sweep" d="M205 76L468 20L468 133Z" />
                <path d="M354 48Q381 76 354 105M393 39Q429 76 393 113" />
              </>
            ) : family === "perimeter" ? (
              <>
                <path d="M88 38V126M206 28V126M324 28V126M442 38V126" />
                <path d="M70 49H480M70 76H480M70 103H480" />
                <path className="em-flow" d="M70 49H480M480 76H70M70 103H480" />
              </>
            ) : family === "airflow" ? (
              <>
                <rect x="75" y="30" width="160" height="45" rx="8" />
                <path d="M92 62H217" />
                <path
                  className="em-flow"
                  d="M101 83C120 137 221 119 278 91S420 68 499 109M145 83C183 135 248 136 311 111S432 98 492 133"
                />
              </>
            ) : family === "daylight" ? (
              <>
                <path d="M78 113H520M305 118V49H383L400 65M295 48H340L352 34H310Z" />
                <circle className="em-sun" cx="161" cy="47" r="21" />
                <path
                  className="em-flow"
                  d="M178 65L217 104H303V49H387L424 105"
                />
                <path d="M390 66L367 103H433Z" />
              </>
            ) : family === "communication" ? (
              <>
                <rect x="96" y="35" width="47" height="83" rx="8" />
                <rect x="420" y="35" width="62" height="83" rx="6" />
                <path d="M106 95H133M433 96H469" />
                <path className="em-flow" d="M157 75H406" />
                <path
                  className="em-wave"
                  d="M249 55Q271 75 249 95M272 40Q309 75 272 110"
                />
              </>
            ) : (
              <>
                <rect x="257" y="40" width="78" height="70" rx="6" />
                <path d="M272 57H320M272 75H320M272 93H320" />
                <circle cx="95" cy="42" r="10" />
                <circle cx="95" cy="111" r="10" />
                <circle cx="503" cy="42" r="10" />
                <circle cx="503" cy="111" r="10" />
                <path d="M105 42H190L257 67M105 111H191L257 85M335 67L405 42H493M335 85L405 111H493" />
                <path
                  className="em-flow"
                  d="M105 42H190L257 67M335 85L405 111H493"
                />
                {family === "detection" && (
                  <circle className="em-wave" cx="296" cy="75" r="57" />
                )}
                {family === "diagnostic" && (
                  <path className="em-sweep" d="M185 21V133" />
                )}
              </>
            )}
          </g>
        </svg>
      </div>
      <div className="em-caption">
        <span>{t[lang]}</span>
        <EngineeringMotionControl lang={lang} />
      </div>
    </div>
  );
}
