import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";

export function OfficeLocations({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  const { moshi, arusha } = siteConfig.offices;
  return (
    <section
      id="offices"
      className="section office-section"
      aria-labelledby="office-heading"
    >
      <p className="eyebrow">MOSHI / KILIMANJARO / ARUSHA</p>
      <h2 id="office-heading">
        {sw
          ? "Ofisi zetu. Karibu nasi."
          : "Our offices. A local point of contact."}
      </h2>
      <div className="office-locations">
        <article id="moshi-office">
          <h3>{sw ? "Ofisi ya Moshi" : "Moshi office"}</h3>
          <address>{moshi.address}</address>
          <p>
            {sw
              ? "Ofisi ya BM kwa vifaa, nukuu za bei na mipango ya ufungaji na huduma."
              : "A BM office for equipment enquiries, quotations, installation and service planning."}
          </p>
          <a className="office-phone" href={"tel:" + moshi.phone.raw}>
            {moshi.phone.label}
          </a>
          <a
            className="office-whatsapp"
            href={
              siteConfig.whatsapp.url.startsWith("/")
                ? siteConfig.whatsapp.url + "?lang=" + lang
                : siteConfig.whatsapp.url
            }
          >
            WhatsApp · Moshi ↗
          </a>
        </article>
        <article id="arusha-office">
          <h3>{sw ? "Ofisi ya Arusha" : "Arusha office"}</h3>
          <address>{arusha.address}</address>
          <p>
            {sw
              ? "Ofisi ya BM kwa vifaa, nukuu za bei na mipango ya ufungaji na huduma. Wasiliana nasi kuhusu ofisi yetu ya Mianzini."
              : "A BM office for equipment enquiries, quotations, installation and service planning. Contact our Mianzini office."}
          </p>
          <a className="office-phone" href={"tel:" + arusha.phone.raw}>
            {arusha.phone.label}
          </a>
        </article>
      </div>
      <div className="office-field-coverage">
        <p>
          <strong>
            {sw ? "Huduma za mafundi kwa miadi" : "Scheduled field services"}
          </strong>{" "}
          · {siteConfig.coverage.scheduledFieldCities.join(" · ")}
        </p>
        <p>
          {sw
            ? "Mafundi kwa tathmini na utekelezaji wa miradi iliyopangwa. Ugavi na huduma kaskazini mwa Tanzania, ikiwemo Tanga; maeneo mengine kwa makubaliano."
            : "Technicians for scheduled surveys and project execution. Supply and services across northern Tanzania, including Tanga; other locations by agreement."}
        </p>
        <a href={"/request-site-survey?lang=" + lang}>
          {sw ? "Panga tathmini ya eneo" : "Arrange a site assessment"} ↗
        </a>
      </div>
    </section>
  );
}

export function FooterContacts({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  const { sales, email, offices } = siteConfig;
  return (
    <div className="footer-contacts">
      <div>
        <p>
          {sw ? "Mauzo na maombi nchi nzima" : "Sales & national enquiries"}
        </p>
        <a href={"tel:" + sales.raw}>{sales.label}</a>
        <a href={"mailto:" + email}>{email}</a>
        <small className="footer-service-reach">
          {sw ? "Tunahudumia Tanzania kutoka Moshi na Arusha." : "Serving Tanzania from Moshi & Arusha."}
        </small>
      </div>
      <div>
        <p>{sw ? "Ofisi ya Moshi" : "Moshi office"}</p>
        <a href={"tel:" + offices.moshi.phone.raw}>
          {offices.moshi.phone.label}
        </a>
        <address>{offices.moshi.address}</address>
      </div>
      <div>
        <p>{sw ? "Ofisi ya Arusha" : "Arusha office"}</p>
        <address>{offices.arusha.address}</address>
        <a href={"tel:" + offices.arusha.phone.raw}>
          {offices.arusha.phone.label}
        </a>
        <a href={"/contact?lang=" + lang + "#offices"}>
          {sw ? "Mawasiliano na ofisi" : "Office details"} ↗
        </a>
      </div>
    </div>
  );
}
