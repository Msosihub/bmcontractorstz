/**
 * Contact Page
 * ------------
 * Public contact and inquiry page for BM Contractors.
 *
 * Current features:
 * - Mobile-friendly contact form.
 * - Saves customer messages to Neon Postgres.
 * - Sends office SMS notification through Africa's Talking.
 * - Supports English and Swahili.
 *
 * Future features:
 * - Google Maps embed.
 * - Office branch cards.
 * - Department-specific routing.
 */

import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { createContactMessage } from "./actions";
import { siteConfig } from "@/data/site";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const content = {
    en: {
      label: "Contact BM Contractors",
      title: "Talk to our team",
      description:
        "Send us your inquiry for CCTV, electric fence, gate motors, access control, networking, products, quotation, or support.",
      fullName: "Full name",
      phone: "Phone number",
      email: "Email address (optional)",
      subject: "Subject (optional)",
      message: "Write your message",
      submit: "Send Message",
      submitting: "Sending...",
      directContact: "Direct Contact",
      whatsapp: "WhatsApp",
      emailLabel: "Email",
      surveyTitle: "Need a site visit?",
      surveyText:
        "For installation jobs, request a site survey so we can guide you properly.",
      surveyButton: "Request Site Survey",
    },
    sw: {
      label: "Wasiliana na BM Contractors",
      title: "Ongea na timu yetu",
      description:
        "Tuma ujumbe kwa huduma za CCTV, electric fence, gate motors, access control, networking, bidhaa, quotation au support.",
      fullName: "Jina kamili",
      phone: "Namba ya simu",
      email: "Email (si lazima)",
      subject: "Kichwa cha ujumbe (si lazima)",
      message: "Andika ujumbe wako",
      submit: "Tuma Ujumbe",
      submitting: "Inatuma...",
      directContact: "Mawasiliano ya Moja kwa Moja",
      whatsapp: "WhatsApp",
      emailLabel: "Email",
      surveyTitle: "Unahitaji kufanyiwa site visit?",
      surveyText:
        "Kwa kazi za installation, omba ukaguzi wa site ili tukupe ushauri sahihi.",
      surveyButton: "Omba Ukaguzi wa Site",
    },
  };

  const t = content[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold text-red-600">{t.label}</p>

              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                {t.title}
              </h1>

              <p className="mt-5 max-w-xl leading-8 text-slate-600">
                {t.description}
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h2 className="text-lg font-black">{t.directContact}</h2>

                  <div className="mt-4 grid gap-3 text-sm text-slate-700">
                    <p>
                      <span className="font-bold">{t.whatsapp}:</span>{" "}
                      {siteConfig.whatsapp.label}
                    </p>

                    <p>
                      <span className="font-bold">Phone:</span>{" "}
                      {siteConfig.phones
                        .map((phone) => phone.label)
                        .join(" / ")}
                    </p>

                    <p>
                      <span className="font-bold">{t.emailLabel}:</span>{" "}
                      {siteConfig.email}
                    </p>
                  </div>

                  <Link
                    href={siteConfig.whatsapp.url}
                    className="mt-5 inline-flex rounded-full bg-green-600 px-5 py-2.5 text-sm font-black text-white hover:bg-green-700"
                  >
                    Chat WhatsApp
                  </Link>
                </div>

                <div className="rounded-[2rem] bg-red-600 p-6 text-white shadow-sm">
                  <h2 className="text-lg font-black">{t.surveyTitle}</h2>
                  <p className="mt-3 text-sm leading-6 text-red-50">
                    {t.surveyText}
                  </p>

                  <Link
                    href={`/request-site-survey?lang=${lang}`}
                    className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-black text-red-700 hover:bg-red-50"
                  >
                    {t.surveyButton}
                  </Link>
                </div>
              </div>
            </div>

            <form
              action={createContactMessage}
              className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
              {/* Keep selected language after form submission. */}
              <input type="hidden" name="lang" value={lang} />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="fullName"
                  required
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                  placeholder={t.fullName}
                />

                <input
                  name="phone"
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                  placeholder={t.phone}
                />
              </div>

              <input
                name="email"
                type="email"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder={t.email}
              />

              <input
                name="subject"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder={t.subject}
              />

              <textarea
                name="message"
                required
                className="min-h-40 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
                placeholder={t.message}
              />

              <SubmitButton loadingText={t.submitting}>{t.submit}</SubmitButton>
            </form>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
