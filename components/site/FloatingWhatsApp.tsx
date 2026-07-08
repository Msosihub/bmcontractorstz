/**
 * FloatingWhatsApp Component
 * --------------------------
 * Floating WhatsApp contact button for public website pages.
 *
 * Purpose:
 * - Makes it easy for visitors to contact BM Contractors quickly.
 * - Uses centralized siteConfig WhatsApp details.
 * - Adds subtle animation and clear action.
 *
 * Future:
 * - Hide/show based on admin setting.
 * - Add tracking event.
 */

import { siteConfig } from "@/data/site";
import type { Language } from "@/lib/i18n/config";

type FloatingWhatsAppProps = {
  lang: Language;
};

export function FloatingWhatsApp({ lang }: FloatingWhatsAppProps) {
  const label = lang === "sw" ? "Chat WhatsApp" : "Chat WhatsApp";

  return (
    <a
      href={siteConfig.whatsapp.url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-black text-white shadow-2xl shadow-green-900/30 ring-1 ring-white/20 transition hover:-translate-y-1 hover:bg-green-700"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>
      {label}
    </a>
  );
}
