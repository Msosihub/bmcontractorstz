/**
 * Services Page
 * -------------
 * Modernized public services overview page for BM Contractors.
 */

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { services as staticServices } from "@/data/services";
import { prisma } from "@/lib/prisma";
import { isLanguage, type Language } from "@/lib/i18n/config";
import type { Metadata } from "next";
import {
  ArrowRight,
  Shield,
  Video,
  Flame,
  Key,
  Radio,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Safety Services | BM Contractors",
  description:
    "Explore BM Contractors Tanzania services including CCTV, electric fence, gate motors, access control, networking and power backup.",
  openGraph: {
    title: "BM Contractors Tanzania Services",
    description:
      "CCTV, electric fence, gate motors, access control, networking and power backup services in Tanzania.",
    images: ["/og/bm-contractors-og.jpg"],
  },
};

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const dbServices = await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
  });

  const services =
    dbServices.length > 0
      ? dbServices
      : staticServices.map((service) => ({
          ...service,
          id: service.slug,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

  // Native database slug mapping system to inject icons dynamically inside server components
  const getServiceIcon = (slug: string) => {
    const s = slug ? slug.toLowerCase() : "";
    if (s.includes("cctv") || s.includes("camera"))
      return <Video className="h-6 w-6 stroke-[1.5]" />;
    if (s.includes("fire") || s.includes("moto"))
      return <Flame className="h-6 w-6 stroke-[1.5]" />;
    if (s.includes("access") || s.includes("gati"))
      return <Key className="h-6 w-6 stroke-[1.5]" />;
    if (s.includes("alarm") || s.includes("kingora"))
      return <Radio className="h-6 w-6 stroke-[1.5]" />;
    if (s.includes("fence") || s.includes("waya"))
      return <Shield className="h-6 w-6 stroke-[1.5]" />;
    return <Activity className="h-6 w-6 stroke-[1.5]" />;
  };

  const content = {
    en: {
      label: "BM Services",
      title: "Security, safety and smart system services",
      description:
        "BM Contractors provides practical solutions for homes, businesses, institutions and industrial sites. Choose a service below and request a site survey for proper guidance.",
      survey: "Request Site Survey",
      contact: "Contact BM Team",
      sectionTitle: "Our main services",
      ctaTitle: "Not sure what your site needs?",
      ctaText:
        "Tell us your location and the challenge you want to solve. Our team will guide you on the right system and quotation.",
      ctaButton: "Request Site Survey",
    },
    sw: {
      label: "Huduma za BM",
      title: "Huduma za ulinzi, usalama na mifumo smart",
      description:
        "BM Contractors tunatoa solutions kwa nyumba, biashara, taasisi na sites za viwanda. Chagua huduma hapa chini kisha omba ukaguzi wa site kwa ushauri sahihi.",
      survey: "Omba Ukaguzi wa Site",
      contact: "Wasiliana na Timu ya BM",
      sectionTitle: "Huduma zetu kuu",
      ctaTitle: "Hujui site yako inahitaji nini?",
      ctaText:
        "Tuambie location yako na changamoto unayotaka kutatua. Timu yetu itakuongoza kwenye mfumo sahihi na quotation.",
      ctaButton: "Omba Ukaguzi wa Site",
    },
  };

  const t = content[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-slate-950 text-white antialiased">
        {/* ========================================================================= */}
        {/* HERO HEADER SECTION (Premium Dark Canvas)                                  */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-24 border-b border-white/[0.05]">
          {/* Subtle Industrial Grid Lighting */}
          <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[130px]" />
          <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-red-400 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                {t.label}
              </p>

              <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                {t.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
                {t.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LoadingLink
                  href={`/request-site-survey?lang=${lang}`}
                  className="w-full rounded-2xl bg-red-600 px-7 py-4 text-center text-sm font-bold text-white shadow-lg shadow-red-950/50 transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 sm:w-auto"
                >
                  {t.survey}
                </LoadingLink>

                <LoadingLink
                  href={`/contact?lang=${lang}`}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 text-center text-sm font-bold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.08] sm:w-auto"
                >
                  {t.contact}
                </LoadingLink>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WORKSPACE MATRIX SECTION (Clean Studio Light Theme Layout)                */}
        {/* ========================================================================= */}
        <section className="bg-slate-50 px-4 py-16 text-slate-950 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 border-b border-slate-200 pb-8 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-8">
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-600">
                  <span className="h-1.5 w-6 rounded-full bg-red-600" />
                  {t.sectionTitle}
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:leading-[1.15]">
                  BM Contractors Solutions
                </h2>
              </div>
            </div>

            {/* Premium Interactive Architecture Grid */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
                >
                  <div>
                    {/* Architectural Vector Badge */}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 transition-all duration-300 group-hover:bg-red-50 group-hover:text-red-600">
                      {getServiceIcon(service.slug)}
                    </div>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-red-600">
                      {lang === "sw" ? service.titleSw : service.titleEn}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-4">
                      {lang === "sw"
                        ? service.descriptionSw
                        : service.descriptionEn}
                    </p>
                  </div>

                  {/* Clean Bottom Route Anchor Block */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <LoadingLink
                      href={`/services/${service.slug}?lang=${lang}`}
                      className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-slate-900 group-hover:text-red-600 transition-colors duration-200"
                    >
                      {lang === "sw" ? "Soma Zaidi" : "Explore Solution"}
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </LoadingLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CLOSING HIGH-CONVERSION CTA SECTION (Premium Frame Shell)                  */}
        {/* ========================================================================= */}
        <section className="bg-slate-50 px-4 pb-16 text-white sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950 p-8 shadow-2xl sm:p-12 lg:p-16">
              {/* Internal Accent Flares */}
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="lg:col-span-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                    <Shield className="h-3.5 w-3.5" /> Engineering Assessment
                  </span>

                  <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:leading-[1.1]">
                    {t.ctaTitle}
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                    {t.ctaText}
                  </p>
                </div>

                <div className="flex lg:col-span-4 lg:justify-end">
                  <LoadingLink
                    href={`/request-site-survey?lang=${lang}`}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-center text-sm font-black text-white shadow-lg shadow-red-950/50 transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 sm:w-auto"
                  >
                    {t.ctaButton}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </LoadingLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
