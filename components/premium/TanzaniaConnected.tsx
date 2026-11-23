import geography from "@/data/tanzania-geography.json";
import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";
import { LivingMotion } from "./LivingMotion";
import "./living.css";

/** City-reference geography is deliberately separate from business street addresses. */
export function TanzaniaConnected({
  lang,
  survey = false,
}: {
  lang: Language;
  survey?: boolean;
}) {
  const sw = lang === "sw",
    id = survey ? "tz-survey" : "tz-contact";
  const point = (name: keyof typeof geography.cities) =>
    geography.cities[name].point;
  const [ax, ay] = point("Arusha"),
    [mx, my] = point("Moshi"),
    [dx, dy] = point("Dodoma"),
    [sx, sy] = point("Dar es Salaam");
  return (
    <section
      className="tz-connected"
      data-living="tanzania"
      aria-labelledby={id + "-title"}
    >
      <LivingMotion />
      <div className="tz-intro">
        <p className="tz-kicker">
          {sw
            ? "OFISI ZA KARIBU. HUDUMA NCHI NZIMA."
            : "LOCAL OFFICES. NATIONAL REACH."}
        </p>
        <h2 id={id + "-title"}>
          {survey
            ? sw
              ? "Eneo lako. Hatua inayofuata."
              : "Your site. A clear next step."
            : sw
              ? "Tuanzie hapa. Tufanikishe mradi wako."
              : "From here. To your next project."}
        </h2>
      </div>
      <div className="tz-atlas">
        <svg
          viewBox="0 0 560 450"
          aria-labelledby={id + "-map-title " + id + "-map-desc"}
        >
          <title id={id + "-map-title"}>
            {sw
              ? "Tanzania: ofisi na maeneo ya huduma"
              : "Tanzania: offices and service enquiries"}
          </title>
          <desc id={id + "-map-desc"}>
            {sw
              ? "Alama za Moshi na Arusha zinawakilisha miji yenye ofisi, si mahali halisi pa mlango wa ofisi. Dar es Salaam na Dodoma ni maeneo ya huduma kwa mpango, si ofisi. Mistari ni ya kuonyesha huduma pekee."
              : "Moshi and Arusha markers indicate office cities, not exact street locations. Dar es Salaam and Dodoma indicate arranged service coverage, not offices. Lines are illustrative, not live connections or travel routes."}
          </desc>
          <defs>
            <linearGradient id={id + "-land"} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#376c65" />
              <stop offset=".5" stopColor="#244a46" />
              <stop offset="1" stopColor="#132e30" />
            </linearGradient>
            <linearGradient id={id + "-light"}>
              <stop stopColor="#dfc398" stopOpacity=".1" />
              <stop offset=".5" stopColor="#ecd1a7" />
              <stop offset="1" stopColor="#95ccc3" stopOpacity=".2" />
            </linearGradient>
            <clipPath id={id + "-clip"}>
              <path d={geography.path} />
            </clipPath>
          </defs>
          <ellipse className="tz-ground" cx="270" cy="406" rx="164" ry="12" />
          <path
            className="tz-depth"
            d={geography.path}
            transform="translate(0 5)"
          />
          <path
            d={geography.path}
            fill={`url(#${id}-land)`}
            className="tz-land"
          />
          <g
            clipPath={`url(#${id}-clip)`}
            className="tz-graticule"
            aria-hidden="true"
          >
            {[100, 160, 220, 280, 340, 400, 460].map((x) => (
              <path key={x} d={`M${x} 20Q${x - 32} 230 ${x} 430`} />
            ))}
            {[90, 150, 210, 270, 330, 390].map((y) => (
              <path key={y} d={`M40 ${y}Q280 ${y + 28} 500 ${y}`} />
            ))}
          </g>
          <g className="tz-coverage-lines" aria-hidden="true">
            <path
              d={`M${ax} ${ay}Q${dx - 65} ${dy - 80} ${dx} ${dy}`}
              stroke={`url(#${id}-light)`}
            />
            <path
              d={`M${mx} ${my}Q${sx + 60} ${sy - 100} ${sx} ${sy}`}
              stroke={`url(#${id}-light)`}
            />
            <path
              className="tz-travelling"
              d={`M${ax} ${ay}Q${dx - 65} ${dy - 80} ${dx} ${dy}`}
              pathLength="100"
            />
          </g>
          <g className="tz-city-labels" aria-hidden="true">
            <path d={`M${ax} ${ay}l-22 -28h-62M${mx} ${my}l20 -13h45`} />
            <text x={ax - 90} y={ay - 35}>
              ARUSHA
            </text>
            <text x={mx + 28} y={my - 21}>
              MOSHI
            </text>
            <text x={dx - 11} y={dy + 26} textAnchor="middle">
              Dodoma
            </text>
            <text x={sx + 14} y={sy + 6}>
              Dar es Salaam
            </text>
            <text className="tz-country" x="230" y="276" textAnchor="middle">
              TANZANIA
            </text>
          </g>
          {[
            { key: "arusha", x: ax, y: ay, label: "Arusha — Mianzini" },
            { key: "moshi", x: mx, y: my, label: "Moshi — Kilimanjaro" },
          ].map((m) => (
            <a
              key={m.key}
              href={`#${id}-${m.key}`}
              data-office-link
              aria-label={
                (sw ? "Maelezo ya ofisi: " : "Office details: ") + m.label
              }
            >
              <circle className="tz-marker-hit" cx={m.x} cy={m.y} r="11" />
              <circle className="tz-office-pulse" cx={m.x} cy={m.y} r="11" />
              <circle className="tz-office-marker" cx={m.x} cy={m.y} r="5" />
            </a>
          ))}
          {[
            { name: "Dodoma", x: dx, y: dy },
            { name: "Dar es Salaam", x: sx, y: sy },
          ].map((m) => (
            <a
              key={m.name}
              href="#bm-enquiry-form"
              aria-label={
                (sw ? "Omba tathmini: " : "Enquire about service: ") + m.name
              }
            >
              <circle className="tz-marker-hit" cx={m.x} cy={m.y} r="12" />
              <path
                className="tz-coverage-marker"
                d={`M${m.x} ${m.y - 5}l5 5-5 5-5-5Z`}
              />
            </a>
          ))}
        </svg>
      </div>
      <div className="tz-legend">
        <span>
          <i className="tz-office-dot" />
          {sw ? "Miji yenye ofisi" : "Office cities"}
        </span>
        <span>
          <i className="tz-coverage-dot" />
          {sw ? "Huduma kwa mpango" : "Service by arrangement"}
        </span>
      </div>
      <div className="tz-offices">
        {(["moshi", "arusha"] as const).map((key) => {
          const office = siteConfig.offices[key];
          return (
            <details id={`${id}-${key}`} key={key}>
              <summary>
                <span>
                  {office.city}
                  <small>{key === "arusha" ? "Mianzini" : "Kilimanjaro"}</small>
                </span>
                <span aria-hidden="true">+</span>
              </summary>
              <div>
                <p>{office.address}</p>
                <a href={"tel:" + office.phone.raw}>{office.phone.label} ↗</a>
                <a href="#bm-enquiry-form">
                  {survey
                    ? sw
                      ? "Eleza eneo la tathmini"
                      : "Tell us about your site"
                    : sw
                      ? "Tuma maelezo ya mradi"
                      : "Share your project brief"}{" "}
                  ↗
                </a>
              </div>
            </details>
          );
        })}
      </div>
      <p className="tz-note">
        {survey
          ? sw
            ? "Taja eneo kwenye fomu. Tutapitia mahitaji kabla ya kupanga ziara."
            : "Add your location to the form. We review your requirements before arranging a visit."
          : sw
            ? "Miradi na ugavi Tanzania nzima, kulingana na mahitaji na mpango wa kazi."
            : "Project and supply enquiries across Tanzania, planned around your requirements."}
      </p>
      <p className="tz-map-note">
        {sw
          ? "Alama zinaonyesha miji; si ramani ya kufika ofisini."
          : "City reference locations; not street-level directions."}
      </p>
    </section>
  );
}
