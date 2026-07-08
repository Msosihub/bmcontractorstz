/**
 * Request Site Survey Page
 * ------------------------
 * This page lets customers request a site survey from BM Contractors.
 *
 * Key features:
 * - Mobile-friendly professional form.
 * - Supports English and Swahili.
 * - Saves customer request to Neon Postgres using a server action.
 * - Can receive selected CCTV package from URL query.
 */

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { createSiteSurveyRequest } from "./actions";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Site Survey",
  description:
    "Request a BM Contractors site survey for CCTV, electric fence, gate motors, access control, networking or power backup.",
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
    package?: string;
    product?: string;
    service?: string;
  }>;
};

function cleanProductLabel(productSlug?: string) {
  /**
   * Converts product slug like "hikvision-2mp-camera" into readable text.
   */
  if (!productSlug) return "";

  return productSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function cleanServiceLabel(serviceSlug?: string) {
  /**
   * Converts service slug like "electric-fence" into readable text.
   */
  if (!serviceSlug) return "";

  return serviceSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function cleanPackageLabel(packageSlug?: string) {
  /**
   * Converts package slug like "8-camera-package" into readable text.
   */

  if (!packageSlug) return "";

  return packageSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function RequestSiteSurveyPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = getDictionary(lang) as any;

  const selectedPackage = cleanPackageLabel(params.package);
  const selectedProduct = cleanProductLabel(params.product);
  const selectedService = cleanServiceLabel(params.service);

  const labels = {
    en: {
      email: "Email address (optional)",
      propertyType: "Property type",
      home: "Home / Residential",
      shop: "Shop / Business",
      office: "Office",
      school: "School / Institution",
      industry: "Factory / Warehouse",
      other: "Other",
      note: "Our team will contact you after receiving your request.",
      selectedPackage: "Selected package",
      selectedProduct: "Selected product",
      selectedService: "Selected service",
    },
    sw: {
      email: "Email (si lazima)",
      propertyType: "Aina ya eneo",
      home: "Nyumba / Makazi",
      shop: "Duka / Biashara",
      office: "Ofisi",
      school: "Shule / Taasisi",
      industry: "Factory / Warehouse",
      other: "Nyingine",
      note: "Timu yetu itakutafuta baada ya kupokea ombi lako.",
      selectedPackage: "Package uliyochagua",
      selectedProduct: "Bidhaa uliyochagua",
      selectedService: "Huduma uliyochagua",
    },
  };

  const l = labels[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-black text-red-600">
                {t.survey.label}
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                {t.survey.title}
              </h1>

              <p className="mt-5 max-w-xl leading-8 text-slate-600">
                {t.survey.description}
              </p>

              {selectedPackage ? (
                <div className="mt-6 rounded-[2rem] border border-red-100 bg-red-50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">
                    {l.selectedPackage}
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-950">
                    {selectedPackage}
                  </p>
                </div>
              ) : null}

              {selectedProduct ? (
                <div className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">
                    {l.selectedProduct}
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-950">
                    {selectedProduct}
                  </p>
                </div>
              ) : null}

              {selectedService ? (
                <div className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-red-600">
                    {l.selectedService}
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-950">
                    {selectedService}
                  </p>
                </div>
              ) : null}

              <div className="mt-8 grid gap-3 text-sm text-slate-700">
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  CCTV • Electric Fence • Gate Motors
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  Access Control • Networking • Power Backup
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  WhatsApp: +255 735 111 881
                </div>
              </div>
            </div>

            <form
              action={createSiteSurveyRequest}
              className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
              {/* Keep selected language and package after form submission. */}
              <input type="hidden" name="lang" value={lang} />

              {selectedPackage ? (
                <input
                  type="hidden"
                  name="selectedPackage"
                  value={selectedPackage}
                />
              ) : null}

              {selectedProduct ? (
                <input
                  type="hidden"
                  name="selectedProduct"
                  value={selectedProduct}
                />
              ) : null}

              {selectedService ? (
                <input
                  type="hidden"
                  name="selectedService"
                  value={selectedService}
                />
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="fullName"
                  required
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                  placeholder={t.survey.fullName}
                />

                <input
                  name="phone"
                  required
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                  placeholder={t.survey.phone}
                />
              </div>

              <input
                name="email"
                type="email"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder={l.email}
              />

              <input
                name="location"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder={t.survey.location}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  name="serviceType"
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                  defaultValue={
                    selectedPackage
                      ? "CCTV"
                      : selectedService
                        ? selectedService
                        : ""
                  }
                >
                  <option value="" disabled>
                    {t.survey.selectService}
                  </option>
                  <option value="CCTV">CCTV</option>
                  <option value="Electric Fence">Electric Fence</option>
                  <option value="Gate Motor">Gate Motor</option>
                  <option value="Access Control">Access Control</option>
                  <option value="Networking">Networking</option>
                  <option value="Power Backup">Power Backup</option>
                </select>

                <select
                  name="propertyType"
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {l.propertyType}
                  </option>
                  <option value="Residential">{l.home}</option>
                  <option value="Business">{l.shop}</option>
                  <option value="Office">{l.office}</option>
                  <option value="Institution">{l.school}</option>
                  <option value="Industrial">{l.industry}</option>
                  <option value="Other">{l.other}</option>
                </select>
              </div>

              <textarea
                name="message"
                className="min-h-32 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder={t.survey.message}
              />

              <SubmitButton
                loadingText={lang === "sw" ? "Inatuma..." : "Submitting..."}
              >
                {t.survey.submit}
              </SubmitButton>

              <p className="text-center text-xs leading-5 text-slate-500">
                {l.note}
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
