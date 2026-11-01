import { PremiumArticle } from "@/components/premium/Article";
/**
 * Privacy Policy Page
 * -------------------
 * Basic privacy policy for BM Contractors website.
 */

import { isLanguage, type Language } from "@/lib/i18n/config";

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
      title: "Sera ya faragha",
      updated: "Imesasishwa mwisho: Julai 2026",
      intro:
        "BM Engineering Contractors LTD tunaheshimu faragha yako. Sera hii inaeleza tunavyokusanya na kutumia taarifa unazotuma kupitia tovuti.",
      sections: [
        {
          title: "Taarifa tunazokusanya",
          text: "Tunaweza kukusanya jina, namba ya simu, barua pepe, eneo, huduma unayohitaji, aina ya eneo na ujumbe wako unapojaza fomu ya mawasiliano au ombi la ukaguzi wa eneo.",
        },
        {
          title: "Tunavyotumia taarifa zako",
          text: "Tunatumia taarifa zako kuwasiliana nawe, kuelewa mahitaji yako ya ulinzi na usalama, kutoa ushauri, kupanga ukaguzi wa eneo na kuandaa nukuu ya bei.",
        },
        {
          title: "Kushirikisha taarifa",
          text: "Hatuuzi taarifa zako binafsi. Tunaweza kushirikisha taarifa muhimu tu kwa timu ya BM Contractors au watoa huduma wanaohusika kujibu ombi lako.",
        },
        {
          title: "Namna ya kuwasiliana nawe",
          text: "Tunaweza kuwasiliana nawe kwa simu, SMS, WhatsApp au barua pepe kuhusu ombi lako, ukaguzi wa eneo, nukuu ya bei au msaada.",
        },
        {
          title: "Usalama wa taarifa",
          text: "Tunachukua hatua za kawaida kulinda taarifa zinazotumwa, lakini hakuna tovuti au njia ya mawasiliano inayoweza kuhakikishwa kuwa salama asilimia 100.",
        },
        {
          title: "Maswali kuhusu faragha",
          text: "Kwa maswali kuhusu faragha, wasiliana na BM Contractors kupitia taarifa za mawasiliano zilizopo kwenye tovuti hii.",
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
