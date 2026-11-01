import Image from "next/image";
import content from "@/data/trust-belts.json";
import type { Language } from "@/lib/i18n/config";

/** Contexts and system categories, never a client/partner endorsement strip. */
export function TrustBelt({
  kind,
  lang,
  excludedSlugs = [],
}: {
  kind: "sectors" | "systems";
  lang: Language;
  excludedSlugs?: readonly string[];
}) {
  const sw = lang === "sw";
  const sectors = kind === "sectors";
  const id = "belt-" + kind;
  const items = sectors
    ? content.sectors
    : content.systems.filter((item) => !excludedSlugs.includes(item.slug));
  return (
    <section
      className={"trust-belt " + (sectors ? "sector-belt" : "system-belt")}
      aria-labelledby={id + "-title"}
      data-content-owner={"reviewed-source:" + kind}
    >
      <div className="belt-heading">
        <div>
          <p className="eyebrow">
            {sectors
              ? sw
                ? "MAZINGIRA YA KAZI"
                : "PLACES & REQUIREMENTS"
              : sw
                ? "MIFUMO INAYOFANYA KAZI PAMOJA"
                : "SYSTEMS THAT WORK TOGETHER"}
          </p>
          <h2 id={id + "-title"}>
            {sectors
              ? sw
                ? "Kila eneo lina mahitaji yake."
                : "Every setting has its own brief."
              : sw
                ? "Anza na mfumo unaohitaji."
                : "Start with the system you need."}
          </h2>
        </div>
        <p>
          {sectors
            ? sw
              ? "Mifano ya mazingira ya kupanga huduma. Wigo wa kazi huthibitishwa baada ya tathmini; hizi si rekodi za wateja au miradi."
              : "Settings for service planning. Scope is confirmed after assessment; these are not client or project records."
            : sw
              ? "Chaguo la vifaa na uoanifu huthibitishwa kwenye nukuu ya bei."
              : "Equipment selection and compatibility are confirmed in your quotation."}
        </p>
      </div>
      <input className="belt-pause-input" type="checkbox" id={id + "-pause"} />
      <label className="belt-pause-control" htmlFor={id + "-pause"}>
        <span className="belt-pause-label">
          {sw ? "Sitisha mwendo" : "Pause movement"}
        </span>
        <span className="belt-resume-label">
          {sw ? "Endelea na mwendo" : "Resume movement"}
        </span>
      </label>
      <div className="belt-window">
        <div className="belt-track">
          {[false, true].map((duplicate) => (
            <ul
              className="belt-list"
              key={String(duplicate)}
              aria-hidden={duplicate ? true : undefined}
              inert={duplicate ? true : undefined}
            >
              {items.map((item, i) => (
                <li key={"slug" in item ? item.slug : item.id}>
                  {sectors ? (
                    <div className="sector-token">
                      {"asset" in item && item.asset && (
                        <Image
                          src={"/assets/" + item.asset + "-640.webp"}
                          alt=""
                          width={112}
                          height={84}
                          sizes="112px"
                        />
                      )}
                      <span className="belt-item-index" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item[lang]}</span>
                    </div>
                  ) : (
                    <a
                      href={
                        "/services/" +
                        ("slug" in item ? item.slug : "") +
                        "?lang=" +
                        lang
                      }
                    >
                      <span aria-hidden="true">↗</span>
                      {item[lang]}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {sectors && (
        <p className="belt-caption">
          {sw
            ? "Picha za mfano za AI · Si wafanyakazi, wateja au miradi halisi ya BM"
            : "AI illustrations · Not actual BM staff, clients or projects"}
        </p>
      )}
    </section>
  );
}
