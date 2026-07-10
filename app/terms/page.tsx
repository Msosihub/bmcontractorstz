/**
 * Terms Page
 * ----------
 * Basic website terms for BM Contractors Tanzania.
 */

import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for using the BM Contractors Tanzania website and submitting inquiries or site survey requests.",
};

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
      title: "Terms of Service",
      updated: "Imesasishwa mwisho: Julai 2026",
      intro:
        "Masharti haya yanatumika unapotumia website ya BM Contractors, kutuma inquiry, kuomba site survey au kuwasiliana nasi kupitia online forms.",
      sections: [
        {
          title: "Taarifa za website",
          text: "Taarifa zilizopo kwenye website hii ni kwa ajili ya mwongozo kuhusu huduma na bidhaa za BM Contractors. Ushauri wa mwisho na quotation hutegemea hali ya site na upatikanaji wa bidhaa.",
        },
        {
          title: "Site survey na quotation",
          text: "Kutuma site survey request hakumaanishi bei ya mwisho imethibitishwa. Bei ya mwisho inaweza kutegemea location, materials, umbali wa cable, bidhaa, ugumu wa installation na mahitaji ya site.",
        },
        {
          title: "Upatikanaji wa bidhaa",
          text: "Bidhaa, brands na bei zinaweza kubadilika kulingana na stock, suppliers na mahitaji ya project.",
        },
        {
          title: "Wajibu wa mteja",
          text: "Mteja anatakiwa kutoa taarifa sahihi za mawasiliano, location na mahitaji ya site ili BM Contractors waweze kujibu vizuri.",
        },
        {
          title: "External links",
          text: "Website inaweza kuwa na links za WhatsApp, catalogs au platforms nyingine. BM Contractors haihusiki na upatikanaji au sera za third-party platforms.",
        },
        {
          title: "Mabadiliko",
          text: "BM Contractors inaweza kuboresha masharti haya kadri huduma, website features au operations zinavyobadilika.",
        },
      ],
    },
  }[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white px-4 py-14 text-slate-950 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-4xl">
          <p className="text-sm font-black text-red-600">{t.updated}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{t.intro}</p>

          <div className="mt-10 grid gap-5">
            {t.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
              >
                <h2 className="text-xl font-black text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">{section.text}</p>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
