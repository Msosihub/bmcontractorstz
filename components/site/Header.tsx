"use client";
import { PreviewNotice } from "./PreviewNotice";
import { SecurityNavigation, SecurityLinks } from "./SecurityNavigation";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import type { Language } from "@/lib/i18n/config";
export function Header({ lang }: { lang: Language }) {
  const path = usePathname();
  const search = useSearchParams();
  const language = (value: string) => {
    const q = new URLSearchParams(search.toString());
    q.set("lang", value);
    return path + "?" + q.toString();
  };
  const nav = [
    ["/services", lang === "sw" ? "Huduma zote" : "All services"],
    ["/products", lang === "sw" ? "Vifaa" : "Equipment"],
    ["/projects", lang === "sw" ? "Miradi" : "Projects"],
    ["/contact", lang === "sw" ? "Mawasiliano" : "Contact"],
  ];
  return (
    <>
      <a className="skip" href="#main">
        {lang === "sw" ? "Nenda kwenye maudhui" : "Skip to content"}
      </a>
      <PreviewNotice lang={lang} />
      <header className="site-header">
        <a className="brand" href={"/?lang=" + lang}>
          <Image
            src="/assets/official-logo.png"
            width={42}
            height={46}
            alt="BM Contractors"
          />
          <span>
            BM CONTRACTORS<small>ENGINEERING · TANZANIA</small>
          </span>
        </a>
        <nav
          className="desktop-nav"
          aria-label={lang === "sw" ? "Menyu kuu" : "Main navigation"}
        >
          <SecurityNavigation lang={lang} />
          {nav.map(([url, name]) => (
            <a
              aria-current={path === url ? "page" : undefined}
              key={url}
              href={url + "?lang=" + lang}
            >
              {name}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="languages">
            <a
              href={language("en")}
              aria-current={lang === "en" ? "page" : undefined}
              lang="en"
            >
              EN
            </a>
            <span>/</span>
            <a
              href={language("sw")}
              aria-current={lang === "sw" ? "page" : undefined}
              lang="sw"
            >
              SW
            </a>
          </div>
          <a
            className="header-enquiry"
            href={"/request-site-survey?lang=" + lang}
          >
            {lang === "sw" ? "Jadili mradi wako" : "Discuss your project"} ↗
          </a>
          <details className="bm-mobile-disclosure">
            <summary className="menu-toggle" aria-controls="premium-menu">
              {lang === "sw" ? "Menyu" : "Menu"}{" "}
              <span aria-hidden="true">+</span>
            </summary>
            <nav
              id="premium-menu"
              className="mobile-menu"
              aria-label={lang === "sw" ? "Menyu kuu" : "Main navigation"}
            >
              <SecurityLinks lang={lang} />
              {nav.map(([url, name]) => (
                <a
                  key={url}
                  href={url + "?lang=" + lang}
                  aria-current={path === url ? "page" : undefined}
                >
                  {name} ↗
                </a>
              ))}
              <a href={"/request-site-survey?lang=" + lang}>
                {lang === "sw"
                  ? "Omba ukaguzi wa eneo"
                  : "Request a site survey"}{" "}
                ↗
              </a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
