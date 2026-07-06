import Link from "next/link";
import { services } from "@/data/services";
import { cctvPackages } from "@/data/packages";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLanguage, type Language } from "@/lib/i18n/config";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = getDictionary(lang) as any;

  return (
    <>
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-700 sm:text-sm">
                {t.home.badge}
              </p>

              <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                {t.home.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {t.home.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/request-site-survey?lang=${lang}`}
                  className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-red-700"
                >
                  {t.home.primaryCta}
                </Link>

                <Link
                  href={`/cctv-packages?lang=${lang}`}
                  className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-bold text-slate-900 hover:bg-slate-50"
                >
                  {t.home.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-100 p-4 sm:p-8">
              <div className="rounded-[1.5rem] bg-white p-6 shadow-sm sm:p-8">
                <p className="text-sm font-bold text-red-600">
                  {t.home.popularSolutions}
                </p>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                  {t.home.popularTitle}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {t.home.popularText}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
                  <div className="rounded-2xl bg-slate-50 p-4">CCTV</div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    Electric Fence
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">Gate Motors</div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    Access Control
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold text-red-600">
                  {t.home.servicesLabel}
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  {t.home.servicesTitle}
                </h2>
              </div>

              <Link
                href={`/services?lang=${lang}`}
                className="text-sm font-bold text-red-700 hover:text-red-800"
              >
                {t.home.viewAllServices} →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  href={`/services/${service.slug}?lang=${lang}`}
                  key={service.slug}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-lg font-black">
                    {lang === "sw" ? service.titleSw : service.titleEn}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {lang === "sw"
                      ? service.descriptionSw
                      : service.descriptionEn}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold text-red-600">
                {t.home.packagesLabel}
              </p>
              <h2 className="mt-2 text-3xl font-black">
                {t.home.packagesTitle}
              </h2>
            </div>

            <Link
              href={`/cctv-packages?lang=${lang}`}
              className="text-sm font-bold text-red-700 hover:text-red-800"
            >
              {t.home.seePackages} →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cctvPackages.map((pkg) => (
              <div
                key={pkg.slug}
                className="rounded-3xl border border-slate-200 p-6 shadow-sm"
              >
                <p className="text-sm font-bold text-red-600">
                  {pkg.cameras} Cameras
                </p>
                <h3 className="mt-2 text-xl font-black">
                  {lang === "sw" ? pkg.titleSw : pkg.titleEn}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {lang === "sw" ? pkg.descriptionSw : pkg.descriptionEn}
                </p>
                <Link
                  href={`/request-site-survey?lang=${lang}`}
                  className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
                >
                  {t.home.requestQuote}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-red-600 py-14 text-white sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-black">{t.home.surveyTitle}</h2>
                <p className="mt-3 max-w-2xl text-red-50">
                  {t.home.surveyText}
                </p>
              </div>

              <Link
                href={`/request-site-survey?lang=${lang}`}
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-red-700 hover:bg-red-50"
              >
                {t.home.primaryCta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
