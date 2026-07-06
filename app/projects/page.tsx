/**
 * Projects Page
 * -------------
 * Public project gallery / portfolio page for BM Contractors.
 *
 * Current features:
 * - Shows project/gallery cards for common BM service scenarios.
 * - Supports English and Swahili.
 * - Mobile-friendly grid.
 * - Ready for real project images.
 *
 * Future:
 * - Pull projects from Neon database.
 * - Add admin project upload/edit/delete.
 * - Add project detail pages.
 * - Add before/after gallery.
 */

import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/data/projects";
import { isLanguage, type Language } from "@/lib/i18n/config";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const content = {
    en: {
      label: "Projects & Site Work",
      title: "Real security and safety work for homes and businesses",
      description:
        "Explore examples of BM Contractors project categories. This gallery will later show real installation photos from our technicians and completed sites.",
      requestSurvey: "Request Site Survey",
      contact: "Contact BM Team",
      galleryTitle: "Project gallery",
      galleryText:
        "From CCTV and electric fence to access control, gate motors, networking and power backup.",
      ctaTitle: "Want your site handled professionally?",
      ctaText:
        "Request a site survey and our team will guide you on the right system, materials and installation plan.",
      ctaButton: "Request Site Survey",
      imageNote:
        "Real project photos will be added here as BM Contractors uploads completed site work.",
    },
    sw: {
      label: "Projects na Kazi za Site",
      title: "Kazi za ulinzi na usalama kwa nyumba na biashara",
      description:
        "Angalia mifano ya categories za projects za BM Contractors. Gallery hii itaonyesha picha halisi za kazi kutoka kwa mafundi na sites zilizokamilika.",
      requestSurvey: "Omba Ukaguzi wa Site",
      contact: "Wasiliana na Timu ya BM",
      galleryTitle: "Gallery ya projects",
      galleryText:
        "Kuanzia CCTV na electric fence mpaka access control, gate motors, networking na power backup.",
      ctaTitle: "Unataka site yako ifanyiwe kazi kitaalamu?",
      ctaText:
        "Omba ukaguzi wa site na timu yetu itakuongoza kwenye mfumo sahihi, materials na mpango wa installation.",
      ctaButton: "Omba Ukaguzi wa Site",
      imageNote:
        "Picha halisi za projects zitaongezwa hapa BM Contractors tukianza ku-upload kazi zilizokamilika.",
    },
  };

  const t = content[lang];

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-200 ring-1 ring-white/10">
                {t.label}
              </p>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                {t.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {t.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/request-site-survey?lang=${lang}`}
                  className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-red-700"
                >
                  {t.requestSurvey}
                </Link>

                <Link
                  href={`/contact?lang=${lang}`}
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  {t.contact}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-6 text-slate-950">
                <p className="text-sm font-black text-red-600">
                  {t.galleryTitle}
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  CCTV • Fence • Gate • Access • Network
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {t.galleryText}
                </p>

                <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                  {t.imageNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.galleryTitle}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  BM Contractors site work
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-slate-600">
                {t.galleryText}
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  lang={lang}
                  titleEn={project.titleEn}
                  titleSw={project.titleSw}
                  category={project.category}
                  location={project.location}
                  imageUrl={project.imageUrl}
                  descriptionEn={project.descriptionEn}
                  descriptionSw={project.descriptionSw}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-red-600 p-8 text-white shadow-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-black">{t.ctaTitle}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-red-50">
                  {t.ctaText}
                </p>
              </div>

              <Link
                href={`/request-site-survey?lang=${lang}`}
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-red-700 transition hover:bg-red-50"
              >
                {t.ctaButton}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
