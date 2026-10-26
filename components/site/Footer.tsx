import { FooterContacts } from "@/components/premium/OfficeContacts";
import { siteConfig } from "@/data/site";
import navigation from "@/data/footer-navigation.json";
import Image from "next/image";
import type { Language } from "@/lib/i18n/config";

export function Footer({ lang }: { lang: Language }) {
  const sw = lang === "sw";
  return (
    <footer
      className="premium-footer"
      data-content-owner="siteConfig + reviewed footer navigation"
    >
      <div className="footer-introduction">
        <div>
          <a className="brand" href={"/?lang=" + lang}>
            <Image
              src="/assets/official-logo.png"
              width={42}
              height={46}
              alt="BM Contractors"
            />
            <span>
              BM CONTRACTORS
              <small>
                {sw
                  ? "Usalama. Uhandisi. Teknolojia."
                  : "Security. Engineering. Technology."}
              </small>
            </span>
          </a>
          <p>
            {sw
              ? "BM Engineering Contractors Limited: CCTV, uzio wa umeme, mageti ya kiotomatiki na mifumo ya umeme, nishati na mawasiliano. Mahitaji yako yanaongoza wigo wa kazi."
              : "BM Engineering Contractors Limited: CCTV, electric fencing, gate automation and electrical, power and communications systems. Your requirements guide the scope."}
          </p>
        </div>
        <a
          className="footer-enquiry"
          href={"/request-site-survey?lang=" + lang}
        >
          {sw ? "Tuzungumzie mahitaji yako" : "Let’s discuss your requirements"}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-directory">
        {navigation.map((group) => (
          <nav key={group.id} aria-labelledby={"footer-" + group.id}>
            <h2 id={"footer-" + group.id}>{group[lang]}</h2>
            <ul>
              {group.links.map((link) => {
                const href =
                  "query" in link
                    ? "/products?" +
                      new URLSearchParams({ lang, q: link.query }).toString()
                    : link.href + "?lang=" + lang;
                return (
                  <li key={href}>
                    <a href={href}>{link[lang]}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>
      <FooterContacts lang={lang} />
      <nav
        className="footer-shortcuts"
        aria-label={
          sw
            ? "Njia fupi za mawasiliano na huduma"
            : "Contact and service shortcuts"
        }
      >
        <a href="/whatsapp">WhatsApp · {siteConfig.whatsapp.label} ↗</a>
        <a href="/huduma" lang="sw">
          Huduma kwa Kiswahili ↗
        </a>
        <a href="#main">{sw ? "Rudi juu" : "Back to top"} ↑</a>
      </nav>
      <p className="disclosure">
        {sw
          ? "Picha zilizoainishwa kuwa za AI ni mifano ya kueleza huduma. Hazionyeshi miradi, wafanyakazi au wateja wa BM. Modeli, bei, upatikanaji na mahitaji ya kiufundi huthibitishwa kwenye nukuu ya bei."
          : "Images labelled AI illustrate services; they do not show actual BM projects, employees or clients. Models, prices, availability and technical requirements are confirmed in the quotation."}
      </p>
      <div className="footer-bottom">
        <span>© 2026 BM Engineering Contractors Limited</span>
        <div>
          <a href={"/privacy-policy?lang=" + lang}>
            {sw ? "Faragha" : "Privacy"}
          </a>
          <a href={"/terms?lang=" + lang}>{sw ? "Masharti" : "Terms"}</a>
        </div>
      </div>
    </footer>
  );
}
