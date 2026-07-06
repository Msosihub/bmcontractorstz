/**
 * Site Survey Success Page
 * ------------------------
 * Confirms that BM Contractors received the customer request.
 *
 * Important:
 * - Supports English and Swahili.
 * - Offers quick WhatsApp chat.
 * - Uses final BM UI style: clean white/slate, red CTA, green success.
 */

import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { isLanguage, type Language } from "@/lib/i18n/config";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function SiteSurveySuccessPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const content = {
    en: {
      title: "Request received",
      message:
        "Thank you. BM Contractors has received your site survey request. Our team will contact you soon.",
      whatsapp: "For urgent help, chat with us on WhatsApp.",
      home: "Back to Home",
      chat: "Chat WhatsApp",
    },
    sw: {
      title: "Ombi limepokelewa",
      message:
        "Asante. BM Contractors tumepokea ombi lako la ukaguzi wa site. Timu yetu itakutafuta hivi karibuni.",
      whatsapp: "Kwa msaada wa haraka, tuandikie WhatsApp.",
      home: "Rudi Mwanzo",
      chat: "Chat WhatsApp",
    },
  };

  const t = content[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-950 sm:px-6">
        <section className="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl font-black text-green-700">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-black sm:text-4xl">{t.title}</h1>

          <p className="mt-4 leading-7 text-slate-600">{t.message}</p>

          <p className="mt-3 text-sm font-semibold text-slate-500">
            {t.whatsapp}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={`/?lang=${lang}`}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              {t.home}
            </Link>

            <Link
              href="https://wa.me/255735111881"
              className="rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700"
            >
              {t.chat}
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
