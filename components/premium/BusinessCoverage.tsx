import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";

/** The two physical offices and scheduled field coverage have distinct labels. */
export function BusinessCoverage({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  return (
    <section
      className="business-coverage"
      id="where-we-work"
      aria-labelledby="coverage-title"
    >
      <div className="coverage-heading">
        <p>{sw ? "MAENEO TUNAYOHUDUMIA" : "WHERE WE WORK"}</p>
        <h2 id="coverage-title">
          {sw
            ? "Ofisi mbili. Huduma zinazokufikia."
            : "Two offices. A wider reach."}
        </h2>
      </div>
      <div className="coverage-offices">
        {Object.entries(siteConfig.offices).map(([key, office]) => (
          <article key={key}>
            <span className="coverage-kind">
              {sw ? "OFISI YA BM" : "BM OFFICE"}
            </span>
            <h3>{office.city}</h3>
            <address>{office.address}</address>
            <a href={`tel:${office.phone.raw}`}>{office.phone.label}</a>
          </article>
        ))}
      </div>
      <div className="coverage-field">
        <div>
          <span className="coverage-kind">
            {sw ? "HUDUMA ZA MAFUNDI KWA MIADI" : "SCHEDULED FIELD SERVICES"}
          </span>
          <p>
            <strong>
              {siteConfig.coverage.scheduledFieldCities.join(" · ")}
            </strong>
            <br />
            {sw
              ? "Mafundi kwa tathmini za maeneo na utekelezaji wa miradi iliyopangwa. Maeneo mengine kwa makubaliano."
              : "Technicians for scheduled site surveys and project execution. Other locations by agreement."}
          </p>
        </div>
        <a
          href={`/request-site-survey?lang=${lang}&service=${encodeURIComponent(sw ? "Tathmini ya eneo na upatikanaji wa mafundi" : "Site assessment and field-service coordination")}`}
        >
          {sw ? "Panga ziara" : "Plan a visit"} ↗
        </a>
      </div>
      <p className="coverage-supply">
        {sw
          ? "Ugavi wa vifaa na huduma kaskazini mwa Tanzania, ikiwemo Moshi, Arusha na Tanga. Kuratibu mahitaji nchi nzima"
          : "Equipment supply and services across northern Tanzania, including Moshi, Arusha and Tanga. National coordination"}{" "}
        · <a href={`tel:${siteConfig.sales.raw}`}>{siteConfig.sales.label}</a>
      </p>
    </section>
  );
}
