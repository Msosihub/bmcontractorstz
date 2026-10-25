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
        <article>
          <h3>{sw ? "Ofisi ya Moshi" : "Moshi office"}</h3>
          <address>{moshi.address}</address>
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
        <article>
          <h3>{sw ? "Ofisi ya Arusha" : "Arusha office"}</h3>
          <p>
            {sw
              ? "Ofisi ya Arusha hupokea na kuratibu maombi ya wateja, ziara za kutathmini maeneo na huduma zinazohusiana. Wasiliana nasi kupanga ziara; anwani kamili itatolewa baadaye."
              : "Our Arusha office receives and coordinates customer enquiries, site visits and related services. Contact us to arrange a visit; the full public address will be supplied separately."}
          </p>
          <a className="office-phone" href={"tel:" + arusha.phone.raw}>
            {arusha.phone.label}
          </a>
        </article>
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
        <a href={"tel:" + offices.arusha.phone.raw}>
          {offices.arusha.phone.label}
        </a>
        <a href={"/contact?lang=" + lang + "#offices"}>
          {sw
            ? "Maombi na mipango ya ziara"
            : "Enquiries & site visit coordination"}{" "}
          ↗
        </a>
      </div>
    </div>
  );
}
