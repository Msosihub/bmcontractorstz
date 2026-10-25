import type { ReactNode } from "react";
import type { Language } from "@/lib/i18n/config";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { EnquiryLink } from "./Frame";
export function PremiumArticle({
  lang,
  title,
  intro,
  label,
  children,
  enquiry = true,
}: {
  lang: Language;
  title: string;
  intro?: string;
  label?: string;
  children?: ReactNode;
  enquiry?: boolean;
}) {
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main">
        <article className="section editorial-article">
          <header>
            <p className="eyebrow">{label || "BM CONTRACTORS"}</p>
            <h1>{title}</h1>
            {intro && <p className="lead">{intro}</p>}
          </header>
          <div className="article-body">{children}</div>
          {enquiry && <EnquiryLink lang={lang} subject={title} />}
        </article>
      </main>
      <Footer lang={lang} />
    </>
  );
}
