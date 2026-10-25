import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Photo } from "./Frame";
import type { Language } from "@/lib/i18n/config";
import type { EnquiryState } from "@/lib/enquiries/validation";
export function PremiumEnquiry({
  lang,
  survey = false,
  action,
  service = "",
  product = "",
  selectedPackage = "",
}: {
  lang: Language;
  survey?: boolean;
  action: (s: EnquiryState, f: FormData) => Promise<EnquiryState>;
  service?: string;
  product?: string;
  selectedPackage?: string;
}) {
  const sw = lang === "sw";
  return (
    <>
      <Header lang={lang} />
      <main id="main" className="premium-main">
        <section className="enquiry-layout section">
          <aside>
            <p className="eyebrow">
              {sw
                ? "MAWASILIANO / HATUA INAYOFUATA"
                : "CONTACT / THE NEXT STEP"}
            </p>
            <h1>
              {sw
                ? "Tuanzie kwenye\nmahitaji yako."
                : "Let’s begin\nwith your brief."}
            </h1>
            <p className="lead">
              {survey
                ? sw
                  ? "Tueleze kuhusu eneo na mfumo unaohitaji. Timu yetu itapitia taarifa zako kabla ya kupanga tathmini au nukuu ya bei."
                  : "Tell us about the site and the system you need. Our team will review your brief before arranging assessment or quotation."
                : sw
                  ? "Una swali la vifaa, mradi au ugavi wa jumla? Tuma maelezo yatakayosaidia kuandaa jibu linalofaa."
                  : "Equipment, installation or trade supply? Share the details that will help us prepare a useful response."}
            </p>
            <div className="direct-details">
              <p>{sw ? "Simu" : "Telephone"}</p>
              <a href="tel:+255745778821">+255 745 778 821</a>
              <p>{sw ? "Barua pepe" : "Email"}</p>
              <a href="mailto:sales@bmcontractorstz.com">
                sales@bmcontractorstz.com
              </a>
            </div>
            <Photo asset="engineering" lang={lang} />
          </aside>
          <div className="enquiry-sheet">
            <p className="eyebrow">
              {survey
                ? sw
                  ? "OMBA UKAGUZI WA ENEO"
                  : "REQUEST A SITE SURVEY"
                : sw
                  ? "TUMA OMBI"
                  : "SEND AN ENQUIRY"}
            </p>
            <EnquiryForm action={action} lang={lang} className="premium-form">
              <input type="hidden" name="lang" value={lang} />
              <input
                type="hidden"
                name="selectedPackage"
                value={selectedPackage}
              />
              <input type="hidden" name="selectedProduct" value={product} />
              {product && (
                <p>
                  {sw ? "Bidhaa iliyochaguliwa" : "Selected product"}: {product}
                </p>
              )}
              <label>
                {sw ? "Jina lako au la taasisi" : "Your name or organization"} *
                <input
                  name="fullName"
                  autoComplete="name"
                  required
                  maxLength={120}
                />
              </label>
              <div className="form-columns">
                <label>
                  {sw ? "Namba ya simu" : "Phone number"}
                  {survey ? " *" : ""}
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required={survey}
                    maxLength={30}
                  />
                </label>
                <label>
                  {sw ? "Barua pepe" : "Email address"}
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                  />
                </label>
              </div>
              {survey ? (
                <>
                  <label>
                    {sw ? "Eneo la kazi" : "Site location"} *
                    <input name="location" required maxLength={200} />
                  </label>
                  <label>
                    {sw ? "Huduma unayohitaji" : "Service required"}
                    <input
                      name="serviceType"
                      defaultValue={service}
                      maxLength={100}
                    />
                  </label>
                  <div className="form-columns">
                    <label>
                      {sw ? "Aina ya eneo" : "Property type"}
                      <select name="propertyType">
                        <option value="">{sw ? "Chagua" : "Select"}</option>
                        {(sw
                          ? [
                              "Makazi",
                              "Biashara",
                              "Ofisi",
                              "Hoteli",
                              "Taasisi",
                              "Ghala",
                              "Nyingine",
                            ]
                          : [
                              "Residential",
                              "Retail",
                              "Office",
                              "Hotel",
                              "Institution",
                              "Warehouse",
                              "Other",
                            ]
                        ).map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      {sw ? "Ratiba" : "Timeframe"}
                      <select name="urgency">
                        <option value="">{sw ? "Chagua" : "Select"}</option>
                        <option value="Planning">
                          {sw ? "Kupanga tu" : "Planning stage"}
                        </option>
                        <option value="This month">
                          {sw ? "Mwezi huu" : "This month"}
                        </option>
                        <option value="Urgent">
                          {sw ? "Haraka" : "Urgent"}
                        </option>
                      </select>
                    </label>
                  </div>
                  <label>
                    {sw ? "Namna ya kuwasiliana" : "Preferred contact method"}
                    <select name="preferredContactMethod">
                      <option value="">{sw ? "Chagua" : "Select"}</option>
                      <option>Phone</option>
                      <option>Email</option>
                      <option>WhatsApp</option>
                    </select>
                  </label>
                </>
              ) : (
                <label>
                  {sw ? "Kichwa cha ombi" : "Enquiry subject"}
                  <input
                    name="subject"
                    maxLength={200}
                    defaultValue={service}
                  />
                </label>
              )}
              <label>
                {sw ? "Maelezo ya mahitaji" : "Your requirements"}
                {!survey ? " *" : ""}
                <textarea
                  name="message"
                  rows={5}
                  required={!survey}
                  maxLength={3000}
                />
              </label>
              <p className="scope-note">
                {sw
                  ? "Usiweke nywila, taarifa za akaunti au taarifa nyeti. Omba maelekezo ya kutuma BOQ au michoro kwa usalama."
                  : "Do not include passwords, account credentials or sensitive information. Ask us how to share drawings or a BOQ securely."}{" "}
                <a href={"/privacy-policy?lang=" + lang}>
                  {sw ? "Sera ya faragha" : "Privacy policy"} ↗
                </a>
              </p>
              <SubmitButton
                className="premium-submit"
                loadingText={sw ? "Inahifadhi..." : "Saving enquiry..."}
              >
                {sw ? "Tuma ombi" : "Submit enquiry"} ↗
              </SubmitButton>
            </EnquiryForm>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
