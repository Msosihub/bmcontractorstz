import Image from "@/components/media/ReliableLocalImage";
import type { Language } from "@/lib/i18n/config";
import {
  networkingFamilies,
  networkingApplications,
  networkingProducts,
  networkingFamilyPath,
  networkingCataloguePath,
  networkingLinks,
} from "@/lib/catalogue/networking";
export function FamilyDiscovery({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  return (
    <section
      className="nf-family-discovery nf-wrap"
      aria-labelledby="nf-families-title"
      id="families"
    >
      <div className="nf-discovery-heading">
        <div>
          <p className="nf-kicker">
            {sw ? "CHAGUA KWA AINA YA VIFAA" : "SHOP BY EQUIPMENT"}
          </p>
          <h2 id="nf-families-title">
            {sw ? "Zaidi ya router." : "Beyond the router."}
          </h2>
        </div>
        <p>
          {sw
            ? "Chagua cabinet, nyaya au vifaa vya fibre. Tuambie mahitaji yako; tutahakiki vipimo, vifaa vinavyojumuishwa na bei ya sasa."
            : "Explore cabinets, cabling and fibre connections. Tell us what you need; we will confirm the specification, included items and current price."}
        </p>
      </div>
      <nav
        className="nf-categories"
        aria-label={
          sw ? "Modeli zilizothibitishwa" : "Verified model categories"
        }
      >
        {[
          ["routers", sw ? "Router" : "Routers"],
          ["access-points", sw ? "Access point" : "Access points"],
          ["switches", sw ? "Swichi" : "Switches"],
        ].map(([id, title]) => (
          <a
            key={id}
            href={`${networkingCataloguePath}?lang=${lang}&category=${id}#models`}
          >
            {title} ↗
          </a>
        ))}
      </nav>
      <div className="nf-family-grid">
        {networkingFamilies.map((f) => (
          <a
            className="nf-family-card"
            href={`${networkingFamilyPath(f.slug)}?lang=${lang}`}
            key={f.slug}
          >
            <Image
              src={`/images/networking/${f.image}.webp`}
              alt={f.alt[lang]}
              width={1536}
              height={1024}
              sizes="(max-width:760px) 89vw, (max-width:1100px) 43vw, 21vw"
            />
            <div>
              <h3>
                {f.title[lang]} <span aria-hidden="true">↗</span>
              </h3>
              <p>
                {f.slug === "data-cabinets"
                  ? sw
                    ? "4U–42U · ukutani au kusimama"
                    : "4U–42U · wall or floor mounting"
                  : f.slug === "cat6-cabling"
                    ? sw
                      ? "Ndani / nje · patching na outlet"
                      : "Indoor / outdoor · patching & outlets"
                    : f.slug === "fibre-cables"
                      ? sw
                        ? "Njia · core · aina ya fibre"
                        : "Route · core count · fibre type"
                      : sw
                        ? "LC / SC · termination na optics"
                        : "LC / SC · termination & optics"}
              </p>
              <span className="nf-family-label">
                {sw ? "Mwongozo na ombi la bei" : "Buyer guide & quotation"} ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
export function ApplicationDiscovery({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  return (
    <section className="nf-application-discovery" id="applications">
      <div className="nf-wrap nf-discovery-split">
        <div>
          <p className="nf-kicker">
            {sw ? "CHAGUA KWA MATUMIZI" : "SHOP BY APPLICATION"}
          </p>
          <h2>
            {sw
              ? "Mtandao unahitaji kufanya nini?"
              : "What should your network do?"}
          </h2>
          <p>
            {sw
              ? "Anza na eneo na kazi. Chagua matumizi kuona vifaa vinavyohusika na mambo ya kuhakiki."
              : "Start with the premises and the job. Open an application to see relevant references and what needs checking."}
          </p>
          <a className="nf-link" href={`/services/networking?lang=${lang}`}>
            {sw
              ? "Huduma ya usanifu na ufungaji"
              : "Explore network installation"}{" "}
            ↗
          </a>
        </div>
        <div>
          {networkingApplications.map((a) => (
            <details className="nf-detail" key={a.slug}>
              <summary>{a.title[lang]}</summary>
              <p>{a.summary[lang]}</p>
              <div className="nf-scenario-links">
                {a.models.map((slug) => {
                  const p = networkingProducts.find((p) => p.slug === slug)!;
                  return (
                    <a
                      href={`${networkingCataloguePath}/${slug}?lang=${lang}`}
                      key={slug}
                    >
                      {p.brand} {p.name} ↗
                    </a>
                  );
                })}
              </div>
              <a
                className="nf-link"
                href={networkingLinks(lang, a.title[lang]).quote}
              >
                {sw ? "Omba makadirio ya mfumo huu" : "Request this solution"}{" "}
                ↗
              </a>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
