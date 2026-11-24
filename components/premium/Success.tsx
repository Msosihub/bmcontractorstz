import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ClearEnquiryDraft } from "@/components/site/ClearEnquiryDraft";
import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";
import "@/components/site/enquiry-journey.css";
export function PremiumSuccess({
  lang,
  survey = false,
  id,
}: {
  lang: Language;
  survey?: boolean;
  id?: string;
}) {
  const sw = lang === "sw",
    t = (en: string, ki: string) => (sw ? ki : en);
  return (
    <>
      <Header lang={lang} />
      <main className="premium-main enquiry-experience" id="main">
        <section className="receipt-panel section">
          {id && <ClearEnquiryDraft survey={survey} id={id} />}
          <div className="receipt-mark" aria-hidden="true">
            {id ? "✓" : "↗"}
          </div>
          <p className="eyebrow">
            {id
              ? t("SAFELY RECEIVED", "OMBI LIMEHIFADHIWA")
              : t("YOUR NEXT STEP", "HATUA INAYOFUATA")}
          </p>
          <h1>
            {id
              ? t(
                  "Thank you.\nWe have your brief.",
                  "Asante.\nTumepokea ombi lako.",
                )
              : t(
                  "Let’s make sure\nyour brief reaches us.",
                  "Tuhakikishe\nombi lako limetufikia.",
                )}
          </h1>
          <p className="lead">
            {id
              ? survey
                ? t(
                    "Your survey request is saved for review. Our team will contact you to discuss the site and agree a suitable assessment time. A visit has not yet been booked.",
                    "Ombi lako la tathmini limehifadhiwa kwa ajili ya kupitia. Timu itawasiliana nawe kuhusu eneo na kukubaliana muda unaofaa. Ziara haijapangwa bado.",
                  )
                : t(
                    "Your enquiry is saved. Our team will review the requirements and contact you about the next step.",
                    "Ombi lako limehifadhiwa. Timu itapitia mahitaji yako na kuwasiliana nawe kuhusu hatua inayofuata.",
                  )
              : t(
                  "There is no recent confirmed receipt in this browser. If you are unsure whether a request was saved, contact us before sending it again.",
                  "Hakuna risiti ya hivi karibuni iliyothibitishwa kwenye kivinjari hiki. Kama huna uhakika ombi limehifadhiwa, wasiliana nasi kabla ya kulituma tena.",
                )}
          </p>
          {id && (
            <p className="receipt-reference">
              {t("Request reference", "Rejea ya ombi")}
              <strong>{id}</strong>
            </p>
          )}
          <div className="receipt-links">
            <a className="button dark" href={"/services?lang=" + lang}>
              {t("Explore services", "Angalia huduma")} ↗
            </a>
            <a className="button" href={"/products?lang=" + lang}>
              {t("Explore equipment", "Angalia vifaa")} ↗
            </a>
          </div>
          <p className="receipt-contact">
            {t("Prefer to talk?", "Ungependa kuzungumza?")}{" "}
            <a href={"tel:" + siteConfig.sales.raw}>{siteConfig.sales.label}</a>{" "}
            · <a href="/whatsapp">WhatsApp</a>
          </p>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
