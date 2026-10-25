import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Photo } from "./Frame";
import type { Language } from "@/lib/i18n/config";
export function PremiumSuccess({
  lang,
  survey = false,
  id,
}: {
  lang: Language;
  survey?: boolean;
  id?: string;
}) {
  const sw = lang === "sw";
  return (
    <>
      <Header lang={lang} />
      <main className="premium-main" id="main">
        <section className="service-hero">
          <div>
            <p className="eyebrow">
              {sw ? "OMBI LIMEHIFADHIWA" : "ENQUIRY RECEIVED"}
            </p>
            <h1>
              {sw
                ? "Asante kwa\nkuwasiliana nasi."
                : "Thank you.\nWe have your brief."}
            </h1>
            <p className="lead">
              {survey
                ? sw
                  ? "Ombi lako la ukaguzi limepokelewa. Timu itapitia mahitaji na kuwasiliana nawe kuhusu hatua inayofuata."
                  : "Your site survey request has been received. Our team will review the requirements and contact you about the next step."
                : sw
                  ? "Ujumbe wako umehifadhiwa. Timu itapitia taarifa ulizotuma na kuwasiliana nawe."
                  : "Your message has been saved. Our team will review the details and contact you."}
            </p>
            {id && (
              <p className="scope-note">
                {sw ? "Rejea ya ombi" : "Request reference"}: {id}
              </p>
            )}
            <a className="button dark" href={"/services?lang=" + lang}>
              {sw ? "Endelea kufahamu huduma" : "Continue exploring"} ↗
            </a>
          </div>
          <Photo asset="engineering" lang={lang} />
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
