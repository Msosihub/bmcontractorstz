import { siteConfig } from "@/data/site";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { EnquiryJourney } from "@/components/site/EnquiryJourney";
import { HeroLight } from "./HeroLight";
import { TanzaniaConnected } from "./TanzaniaConnected";
import type { Language } from "@/lib/i18n/config";
import type { EnquiryState } from "@/lib/enquiries/validation";
export function PremiumEnquiry({
  lang,
  survey = false,
  action,
  service = "",
  product = "",
  selectedPackage = "",
  initialMessage = "",
}: {
  lang: Language;
  survey?: boolean;
  action: (s: EnquiryState, f: FormData) => Promise<EnquiryState>;
  service?: string;
  product?: string;
  selectedPackage?: string;
  initialMessage?: string;
}) {
  const sw = lang === "sw";
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main enquiry-experience">
        <div className="enquiry-ribbon-background">
          <HeroLight lang={lang} />
        </div>
        <section className="enquiry-layout journey-layout section">
          <aside className="journey-intro">
            <p className="eyebrow">
              {sw ? "MAZUNGUMZO YENYE MWELEKEO" : "A CONVERSATION WITH PURPOSE"}
            </p>
            <h1>
              {survey
                ? sw
                  ? "Tuangalie eneo.\nTupange vizuri."
                  : "Your site.\nA considered start."
                : sw
                  ? "Mradi mzuri huanza\nkwa kuelewana."
                  : "Good projects start\nwith a conversation."}
            </h1>
            <p className="lead">
              {survey
                ? sw
                  ? "Eleza eneo lako na mfumo unaohitaji. Tutapitia ombi lako kabla ya kukubaliana ratiba ya tathmini."
                  : "Share the site and the system you need. We review your request before arranging an assessment."
                : sw
                  ? "Vifaa, ufungaji au matengenezo. Anza na unachohitaji; timu yetu itakusaidia kufafanua hatua inayofuata."
                  : "Equipment, installation or maintenance. Start with what you need; we’ll help you find the right next step."}
            </p>
            <a className="enquiry-form-jump" href="#bm-enquiry-form">
              {sw ? "Anza ombi lako" : "Start your enquiry"} ↓
            </a>
            <div className="direct-details">
              <p>
                {sw
                  ? "Mauzo na maombi nchi nzima"
                  : "Sales & national enquiries"}
              </p>
              <a href={"tel:" + siteConfig.sales.raw}>
                {siteConfig.sales.label}
              </a>
              <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>
              <div className="journey-direct-actions">
                <a href="/whatsapp">WhatsApp ↗</a>
                <a href="#offices">{sw ? "Ofisi zetu" : "Our offices"} ↓</a>
              </div>
            </div>
            <TanzaniaConnected lang={lang} survey={survey} />
          </aside>
          <div className="enquiry-sheet" id="bm-enquiry-form">
            <EnquiryJourney
              lang={lang}
              survey={survey}
              action={action}
              service={service}
              product={product}
              selectedPackage={selectedPackage}
              initialMessage={initialMessage}
            />
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
