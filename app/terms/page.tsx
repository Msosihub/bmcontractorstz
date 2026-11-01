import { PremiumArticle } from "@/components/premium/Article";
/**
 * Terms Page
 * ----------
 * Basic website terms for BM Contractors Tanzania.
 */

import { isLanguage, type Language } from "@/lib/i18n/config";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function TermsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const t = {
    en: {
      title: "Terms of Service",
      updated: "Last updated: July 2026",
      intro:
        "These terms apply when you use the BM Contractors website, submit inquiries, request site surveys or contact us through online forms.",
      sections: [
        {
          title: "Website information",
          text: "Information on this website is provided for general guidance about BM Contractors services and products. Final recommendations and quotations may depend on site conditions and product availability.",
        },
        {
          title: "Site survey and quotations",
          text: "Submitting a site survey request does not guarantee a fixed price. Final pricing may depend on location, materials, cable distance, product selection, installation complexity and site requirements.",
        },
        {
          title: "Product availability",
          text: "Products, brands and prices may change depending on stock, supplier availability and project requirements.",
        },
        {
          title: "Customer responsibility",
          text: "Customers should provide accurate contact details, location information and site requirements to help BM Contractors respond properly.",
        },
        {
          title: "External links",
          text: "The website may include links to WhatsApp, catalogs or external platforms. BM Contractors is not responsible for third-party platform availability or policies.",
        },
        {
          title: "Changes",
          text: "BM Contractors may update these terms from time to time as services, website features or business operations change.",
        },
      ],
    },
    sw: {
      title: "Masharti ya huduma",
      updated: "Imesasishwa mwisho: Julai 2026",
      intro:
        "Masharti haya yanatumika unapotumia tovuti ya BM Contractors, kutuma maombi, kuomba ukaguzi wa eneo au kuwasiliana nasi kupitia fomu za mtandaoni.",
      sections: [
        {
          title: "Taarifa za tovuti",
          text: "Taarifa zilizopo kwenye tovuti hii ni kwa ajili ya mwongozo kuhusu huduma na bidhaa za BM Contractors. Ushauri wa mwisho na nukuu ya bei hutegemea hali ya eneo na upatikanaji wa bidhaa.",
        },
        {
          title: "Ukaguzi wa eneo na nukuu ya bei",
          text: "Kutuma ombi la ukaguzi wa eneo hakumaanishi bei ya mwisho imethibitishwa. Bei ya mwisho inaweza kutegemea eneo, vifaa, umbali wa nyaya, bidhaa, ugumu wa ufungaji na mahitaji ya eneo.",
        },
        {
          title: "Upatikanaji wa bidhaa",
          text: "Bidhaa, chapa na bei zinaweza kubadilika kulingana na vifaa vilivyopo, wasambazaji na mahitaji ya kazi.",
        },
        {
          title: "Wajibu wa mteja",
          text: "Mteja anatakiwa kutoa taarifa sahihi za mawasiliano, eneo na mahitaji ya eneo ili BM Contractors waweze kujibu vizuri.",
        },
        {
          title: "Viungo vya nje",
          text: "Tovuti inaweza kuwa na viungo vya WhatsApp, orodha za bidhaa au majukwaa mengine. BM Contractors haihusiki na upatikanaji au sera za majukwaa ya wahusika wengine.",
        },
        {
          title: "Mabadiliko",
          text: "BM Contractors inaweza kuboresha masharti haya kadri huduma, vipengele vya tovuti au shughuli zinavyobadilika.",
        },
      ],
    },
  }[lang];

  return (
    <PremiumArticle
      lang={lang}
      title={t.title}
      label={t.updated}
      intro={t.intro}
      enquiry={false}
    >
      {t.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
    </PremiumArticle>
  );
}
