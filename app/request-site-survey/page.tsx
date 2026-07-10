/**
 * Request Site Survey Page
 * ------------------------
 * Public lead form for customers requesting BM Contractors site survey.
 *
 * Current features:
 * - Supports English and Swahili.
 * - Accepts preselected service, package or product from URL.
 * - Collects better lead details for BM office follow-up.
 * - Sends data to server action.
 */

import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { createSiteSurveyRequest } from "./actions";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Request Security Site Survey",
  description:
    "Request a BM Contractors site survey for CCTV, electric fence, gate motors, access control, networking or power backup in Tanzania.",
  openGraph: {
    title: "Request Site Survey | BM Contractors Tanzania",
    description:
      "Send your site details and get guidance for the right security and safety system.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
    service?: string;
    package?: string;
    product?: string;
  }>;
};

export default async function RequestSiteSurveyPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const selectedService = params.service || "";
  const selectedPackage = params.package || "";
  const selectedProduct = params.product || "";

  const whatsappMessage = encodeURIComponent(
    lang === "sw"
      ? `Habari BM Contractors, naomba site survey.\n\nHuduma: ${
          selectedService || "Nitajaza"
        }\nPackage: ${selectedPackage || "Hakuna"}\nBidhaa: ${
          selectedProduct || "Hakuna"
        }\nLocation: \nAina ya eneo: \nMaelezo: `
      : `Hello BM Contractors, I would like to request a site survey.\n\nService: ${
          selectedService || "I will specify"
        }\nPackage: ${selectedPackage || "None"}\nProduct: ${
          selectedProduct || "None"
        }\nLocation: \nProperty type: \nDetails: `,
  );

  const whatsappSurveyUrl = `${siteConfig.whatsapp.url}?text=${whatsappMessage}`;

  const t = {
    en: {
      label: "Site Survey Request",
      title: "Tell us about your site",
      description:
        "Share the basic details and BM Contractors will contact you for guidance, quotation or site survey arrangement.",
      fullName: "Full name",
      phone: "Phone / WhatsApp number",
      email: "Email address optional",
      location: "Site location",
      serviceType: "Service needed",
      propertyType: "Property type",
      budgetRange: "Budget range",
      urgency: "Urgency",
      preferredContactMethod: "Preferred contact method",
      message: "Additional details",
      submit: "Submit Request",
      required: "Full name, phone and location are required.",
      selectedTitle: "Selected from website",
      tipsTitle: "Helpful details",
      tips: [
        "Mention number of cameras if you need CCTV.",
        "Mention property type: home, shop, office, school or warehouse.",
        "Mention location clearly for easier follow-up.",
        "Site survey helps BM prepare a more accurate quotation.",
      ],
      services: [
        { label: "CCTV Installation", value: "cctv" },
        { label: "Electric Fence", value: "electric-fence" },
        { label: "Gate Motor", value: "gate-motors" },
        { label: "Access Control", value: "access-control" },
        { label: "Networking", value: "networking" },
        { label: "Power Backup", value: "power-backup" },
        { label: "Other", value: "other" },
      ],
      properties: [
        "Home / Residential",
        "Shop / Retail",
        "Office",
        "School / Institution",
        "Warehouse",
        "Apartment / Compound",
        "Other",
      ],
      budgets: [
        "Not sure yet",
        "Below TZS 500,000",
        "TZS 500,000 - 1,500,000",
        "TZS 1,500,000 - 3,000,000",
        "Above TZS 3,000,000",
      ],
      urgencies: ["This week", "This month", "Planning only", "Emergency"],
      contacts: ["Phone call", "WhatsApp", "SMS", "Email"],
      whatsappTitle: "Prefer WhatsApp?",
      whatsappText:
        "You can also send your site details directly through WhatsApp.",
      whatsappButton: "Send details by WhatsApp",
    },
    sw: {
      label: "Maombi ya Site Survey",
      title: "Tuambie kuhusu site yako",
      description:
        "Tuma taarifa za msingi na BM Contractors tutawasiliana nawe kwa ushauri, quotation au kupanga site survey.",
      fullName: "Jina kamili",
      phone: "Namba ya simu / WhatsApp",
      email: "Email si lazima",
      location: "Location ya site",
      serviceType: "Huduma unayohitaji",
      propertyType: "Aina ya eneo",
      budgetRange: "Budget range",
      urgency: "Uharaka",
      preferredContactMethod: "Njia ya mawasiliano",
      message: "Maelezo ya ziada",
      submit: "Tuma Maombi",
      required: "Jina, simu na location vinahitajika.",
      selectedTitle: "Ulichochagua kwenye website",
      tipsTitle: "Taarifa zinazosaidia",
      tips: [
        "Taja idadi ya camera kama unahitaji CCTV.",
        "Taja aina ya eneo: nyumba, duka, ofisi, shule au warehouse.",
        "Taja location vizuri ili follow-up iwe rahisi.",
        "Site survey husaidia BM kuandaa quotation sahihi zaidi.",
      ],
      services: [
        { label: "CCTV Installation", value: "cctv" },
        { label: "Electric Fence", value: "electric-fence" },
        { label: "Gate Motor", value: "gate-motors" },
        { label: "Access Control", value: "access-control" },
        { label: "Networking", value: "networking" },
        { label: "Power Backup", value: "power-backup" },
        { label: "Nyingine", value: "other" },
      ],
      properties: [
        "Nyumba",
        "Duka / Biashara",
        "Ofisi",
        "Shule / Taasisi",
        "Warehouse",
        "Apartment / Compound",
        "Nyingine",
      ],
      budgets: [
        "Sijajua bado",
        "Chini ya TZS 500,000",
        "TZS 500,000 - 1,500,000",
        "TZS 1,500,000 - 3,000,000",
        "Zaidi ya TZS 3,000,000",
      ],
      urgencies: ["Wiki hii", "Mwezi huu", "Ninapanga tu", "Dharura"],
      contacts: ["Kupigiwa simu", "WhatsApp", "SMS", "Email"],
      whatsappTitle: "Unapendelea WhatsApp?",
      whatsappText:
        "Unaweza pia kutuma taarifa za site yako moja kwa moja kupitia WhatsApp.",
      whatsappButton: "Tuma taarifa kwa WhatsApp",
    },
  }[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-200 ring-1 ring-white/10">
              {t.label}
            </p>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {t.description}
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <form
              action={createSiteSurveyRequest}
              className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <input
                type="hidden"
                name="selectedPackage"
                value={selectedPackage}
              />
              <input
                type="hidden"
                name="selectedProduct"
                value={selectedProduct}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="fullName"
                  required
                  placeholder={t.fullName}
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                />

                <input
                  name="phone"
                  required
                  placeholder={t.phone}
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="email"
                  type="email"
                  placeholder={t.email}
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                />

                <input
                  name="location"
                  required
                  placeholder={t.location}
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  name="serviceType"
                  defaultValue={selectedService}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                >
                  <option value="">{t.serviceType}</option>
                  {t.services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>

                <select
                  name="propertyType"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                >
                  <option value="">{t.propertyType}</option>
                  {t.properties.map((property) => (
                    <option key={property} value={property}>
                      {property}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <select
                  name="budgetRange"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                >
                  <option value="">{t.budgetRange}</option>
                  {t.budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>

                <select
                  name="urgency"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                >
                  <option value="">{t.urgency}</option>
                  {t.urgencies.map((urgency) => (
                    <option key={urgency} value={urgency}>
                      {urgency}
                    </option>
                  ))}
                </select>

                <select
                  name="preferredContactMethod"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                >
                  <option value="">{t.preferredContactMethod}</option>
                  {t.contacts.map((contact) => (
                    <option key={contact} value={contact}>
                      {contact}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                name="message"
                rows={6}
                placeholder={t.message}
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
              />

              <p className="text-sm font-semibold text-slate-500">
                {t.required}
              </p>

              <SubmitButton>{t.submit}</SubmitButton>
              <a
                href={whatsappSurveyUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-green-200 bg-green-50 px-5 py-3 text-center text-sm font-black text-green-700 transition hover:bg-green-100"
              >
                {t.whatsappButton}
              </a>
            </form>

            <aside className="grid gap-5">
              {selectedService || selectedPackage || selectedProduct ? (
                <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
                  <p className="text-sm font-black text-red-300">
                    {t.selectedTitle}
                  </p>

                  <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-300">
                    {selectedService ? <p>Service: {selectedService}</p> : null}
                    {selectedPackage ? <p>Package: {selectedPackage}</p> : null}
                    {selectedProduct ? <p>Product: {selectedProduct}</p> : null}
                  </div>
                </div>
              ) : null}

              <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="text-xl font-black text-slate-950">
                  {t.tipsTitle}
                </p>

                <div className="mt-5 grid gap-3">
                  {t.tips.map((tip) => (
                    <div key={tip} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-red-600" />
                      <p className="text-sm font-semibold leading-6 text-slate-600">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-green-600 p-6 text-white shadow-sm">
                <p className="text-xl font-black">{t.whatsappTitle}</p>

                <p className="mt-3 text-sm leading-7 text-green-50">
                  {t.whatsappText}
                </p>

                <a
                  href={whatsappSurveyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-green-700 transition hover:bg-green-50"
                >
                  {t.whatsappButton}
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
