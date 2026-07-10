/**
 * Privacy Policy Page
 * -------------------
 * Basic privacy policy for BM Contractors website.
 */

import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { isLanguage, type Language } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for BM Contractors Tanzania website, contact forms and site survey requests.",
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function PrivacyPolicyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const t = {
    en: {
      title: "Privacy Policy",
      updated: "Last updated: July 2026",
      intro:
        "BM Engineering Contractors LTD respects your privacy. This policy explains how we collect and use information submitted through our website.",
      sections: [
        {
          title: "Information we collect",
          text: "We may collect your name, phone number, email address, location, service interest, property type and message when you submit a contact form or site survey request.",
        },
        {
          title: "How we use your information",
          text: "We use your information to contact you, understand your security or safety needs, prepare guidance, arrange site surveys and provide quotations.",
        },
        {
          title: "Sharing of information",
          text: "We do not sell your personal information. We may share necessary details only with BM Contractors team members or trusted service providers involved in responding to your request.",
        },
        {
          title: "Communication",
          text: "We may contact you by phone, SMS, WhatsApp or email regarding your inquiry, site survey request, quotation or service support.",
        },
        {
          title: "Data security",
          text: "We take reasonable steps to protect submitted information, but no website or communication method can be guaranteed to be completely secure.",
        },
        {
          title: "Contact",
          text: "For privacy questions, contact BM Contractors through the contact details provided on this website.",
        },
      ],
    },
    sw: {
      title: "Privacy Policy",
      updated: "Imesasishwa mwisho: Julai 2026",
      intro:
        "BM Engineering Contractors LTD tunaheshimu faragha yako. Sera hii inaeleza tunavyokusanya na kutumia taarifa unazotuma kupitia website.",
      sections: [
        {
          title: "Taarifa tunazokusanya",
          text: "Tunaweza kukusanya jina, namba ya simu, email, location, huduma unayohitaji, aina ya eneo na ujumbe wako unapojaza contact form au site survey request.",
        },
        {
          title: "Tunavyotumia taarifa zako",
          text: "Tunatumia taarifa zako kuwasiliana na wewe, kuelewa mahitaji yako ya security/safety, kutoa ushauri, kupanga site survey na kuandaa quotation.",
        },
        {
          title: "Kushirikisha taarifa",
          text: "Hatuuzi taarifa zako binafsi. Tunaweza kushirikisha taarifa muhimu tu kwa timu ya BM Contractors au service providers wanaohusika kujibu ombi lako.",
        },
        {
          title: "Mawasiliano",
          text: "Tunaweza kuwasiliana nawe kwa simu, SMS, WhatsApp au email kuhusu inquiry yako, site survey, quotation au support.",
        },
        {
          title: "Usalama wa taarifa",
          text: "Tunachukua hatua za kawaida kulinda taarifa zinazotumwa, lakini hakuna website au njia ya mawasiliano inayoweza kuhakikishwa kuwa salama asilimia 100.",
        },
        {
          title: "Mawasiliano",
          text: "Kwa maswali ya privacy, wasiliana na BM Contractors kupitia contact details zilizopo kwenye website hii.",
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
