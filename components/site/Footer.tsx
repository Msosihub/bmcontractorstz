import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
export function Footer({ lang }: { lang: Language }) {
  return (
    <footer>
      <div className="footer-top">
        <a className="brand" href={"/?lang=" + lang}>
          <Image
            src="/assets/official-logo.png"
            width={38}
            height={42}
            alt="BM Contractors"
          />
          <span>
            BM CONTRACTORS
            <small>
              {lang === "sw"
                ? "Usalama. Uhandisi. Teknolojia."
                : "Security. Engineering. Technology."}
            </small>
          </span>
        </a>
        <p>BM Engineering Contractors Limited</p>
        <a href={"/contact?lang=" + lang}>
          {lang === "sw" ? "Mawasiliano" : "Contact"} ↗
        </a>
      </div>
      <nav
        className="footer-links"
        aria-label={lang === "sw" ? "Viungo vya tovuti" : "Website resources"}
      >
        <a href={"/about?lang=" + lang}>
          {lang === "sw" ? "Kuhusu BM" : "About BM"}
        </a>
        <a href={"/cctv-packages?lang=" + lang}>
          {lang === "sw" ? "Vifurushi vya CCTV" : "CCTV packages"}
        </a>
        <a href={"/support?lang=" + lang}>
          {lang === "sw" ? "Miongozo na msaada" : "Guides & support"}
        </a>
        <a href={"/services/institutional-procurement?lang=" + lang}>
          {lang === "sw" ? "Ununuzi wa taasisi" : "Institutional procurement"}
        </a>
      </nav>
      <p className="disclosure">
        {lang === "sw"
          ? "Picha zilizoainishwa kuwa za AI ni mifano ya kueleza huduma. Hazionyeshi miradi, wafanyakazi au wateja wa BM. Modeli, bei, upatikanaji na sifa za kiufundi huthibitishwa kwenye nukuu ya bei."
          : "Images labeled AI are service illustrations, not BM projects, staff or clients. Models, prices, availability and technical requirements are confirmed in the quotation."}
      </p>
      <div className="footer-bottom">
        <span>© 2026 BM Engineering Contractors Limited</span>
        <div>
          <a href={"/privacy-policy?lang=" + lang}>
            {lang === "sw" ? "Faragha" : "Privacy"}
          </a>{" "}
          ·{" "}
          <a href={"/terms?lang=" + lang}>
            {lang === "sw" ? "Masharti" : "Terms"}
          </a>
        </div>
      </div>
    </footer>
  );
}
