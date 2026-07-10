/**
 * BM Contractors Homepage
 * -----------------------
 * Main public landing page for BM Engineering Contractors LTD.
 *
 * Current features:
 * - Reads services, CCTV packages, products, projects and support articles from Neon.
 * - Falls back to static data if database is empty.
 * - Supports English and Swahili using ?lang=en / ?lang=sw.
 * - Professional security/safety business homepage.
 * - Strong site survey, WhatsApp and service CTAs.
 *
 * Future:
 * - Add real hero images.
 * - Add testimonials.
 * - Add partner/brand logos.
 * - Add homepage content editing from admin settings.
 */

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CctvPackageCard } from "@/components/site/CctvPackageCard";
import { ProductCard } from "@/components/site/ProductCard";
import { ProjectCard } from "@/components/site/ProjectCard";
import { SupportArticleCard } from "@/components/site/SupportArticleCard";
import { siteConfig } from "@/data/site";
import { services as staticServices } from "@/data/services";
import { cctvPackages as staticPackages } from "@/data/packages";
import { productCategories as staticProductCategories } from "@/data/products";
import { projects as staticProjects } from "@/data/projects";
import { supportArticles as staticSupportArticles } from "@/data/support";
import { prisma } from "@/lib/prisma";
import { isLanguage, type Language } from "@/lib/i18n/config";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

type PageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

function asStringArray(value: unknown) {
  /**
   * Converts Prisma Json arrays into safe string arrays.
   */
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is string => typeof item === "string");
}

function formatPriceLabel(value: number | null, lang: Language) {
  /**
   * Formats product price for homepage cards.
   */
  if (!value) {
    return lang === "sw" ? "Uliza bei" : "Request price";
  }

  const prefix = lang === "sw" ? "TZS" : "TZS";
  return `${prefix} ${value.toLocaleString("en-US")}`;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang: Language = isLanguage(params.lang) ? params.lang : "en";

  const [dbServices, dbPackages, dbProducts, dbProjects, dbSupportArticles] =
    await Promise.all([
      prisma.service.findMany({
        where: {
          isPublished: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        take: 6,
      }),

      prisma.cctvPackage.findMany({
        where: {
          isPublished: true,
        },
        orderBy: {
          cameras: "asc",
        },
        take: 3,
      }),

      prisma.product.findMany({
        where: {
          isPublished: true,
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
      }),

      prisma.project.findMany({
        where: {
          isPublished: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      }),

      prisma.supportArticle.findMany({
        where: {
          isPublished: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      }),
    ]);

  const services =
    dbServices.length > 0
      ? dbServices
      : staticServices.slice(0, 6).map((service) => ({
          ...service,
          id: service.slug,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

  const packages =
    dbPackages.length > 0
      ? dbPackages.map((pkg) => ({
          ...pkg,
          includedItems: asStringArray(pkg.includedItems),
        }))
      : staticPackages.slice(0, 3).map((pkg) => ({
          ...pkg,
          id: pkg.slug,
          priceFrom: null,
          includedItems: [],
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

  const fallbackProducts = [
    {
      slug: "hikvision-2mp-camera",
      name: "Hikvision 2MP Camera",
      brand: "Hikvision",
      imageUrl: null,
      description:
        "Reliable CCTV camera option for homes, shops, offices and small business installations.",
      categorySlug: "cctv-cameras",
      categoryNameEn: "CCTV Cameras",
      categoryNameSw: "Camera za CCTV",
    },
    {
      slug: "tiandy-2mp-camera",
      name: "Tiandy 2MP Camera",
      brand: "Tiandy",
      imageUrl: null,
      description:
        "Affordable CCTV camera option for residential and small business installations.",
      categorySlug: "cctv-cameras",
      categoryNameEn: "CCTV Cameras",
      categoryNameSw: "Camera za CCTV",
    },
    {
      slug: "electric-fence-energizer",
      name: "Electric Fence Energizer",
      brand: "Electric Fence",
      imageUrl: null,
      description:
        "Core power unit for electric fence installations in homes, compounds and businesses.",
      categorySlug: "electric-fence",
      categoryNameEn: "Electric Fence",
      categoryNameSw: "Uzio wa Umeme",
    },
    {
      slug: "gate-motor-kit",
      name: "Gate Motor Kit",
      brand: "Gate Automation",
      imageUrl: null,
      description:
        "Automatic gate motor solution for homes, apartments and business premises.",
      categorySlug: "gate-motors",
      categoryNameEn: "Gate Motors",
      categoryNameSw: "Gate Motors",
    },
    {
      slug: "mikrotik-router",
      name: "MikroTik Router",
      brand: "MikroTik",
      imageUrl: null,
      description:
        "Business router for office networks, CCTV remote viewing and internet sharing.",
      categorySlug: "networking",
      categoryNameEn: "Networking",
      categoryNameSw: "Networking",
    },
    {
      slug: "ups-650va",
      name: "UPS 650VA",
      brand: "UPS",
      imageUrl: null,
      description:
        "Backup power for CCTV systems, routers, NVRs and small office devices.",
      categorySlug: "power-backup",
      categoryNameEn: "Power Backup",
      categoryNameSw: "Power Backup",
    },
  ];

  const products =
    dbProducts.length > 0
      ? dbProducts
      : fallbackProducts.map((product) => ({
          id: product.slug,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          description: product.description,
          imageUrl: product?.imageUrl,
          price: null,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: product.categorySlug,
          category: {
            id: product.categorySlug,
            slug: product.categorySlug,
            nameEn: product.categoryNameEn,
            nameSw: product.categoryNameSw,
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }));

  const projects =
    dbProjects.length > 0
      ? dbProjects
      : staticProjects.slice(0, 3).map((project) => ({
          ...project,
          id: project.slug,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

  const supportArticles =
    dbSupportArticles.length > 0
      ? dbSupportArticles
      : staticSupportArticles.slice(0, 3).map((article) => ({
          ...article,
          id: article.slug,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

  const content = {
    en: {
      heroLabel: "Security • Safety • Smart Systems",
      heroTitle:
        "Professional security systems for homes, businesses and institutions",
      heroDescription:
        "BM Contractors helps you plan, supply, install and support CCTV, electric fence, gate motors, access control, networking and power backup systems across Tanzania.",
      requestSurvey: "Request Site Survey",
      whatsapp: "Chat WhatsApp",
      viewServices: "View Services",
      trustedText:
        "Built for practical site work, clear quotations and reliable support.",
      stats: [
        { value: "6+", label: "Core services" },
        { value: "32", label: "Camera packages up to" },
        { value: "TZ", label: "Serving Tanzania" },
      ],
      servicesLabel: "What we do",
      servicesTitle: "Security and safety services",
      servicesText:
        "Choose the service you need, then request a site survey for a proper recommendation and quotation.",
      packagesLabel: "Popular CCTV packages",
      packagesTitle: "Start with a package, finish with a proper site survey",
      productsLabel: "Products",
      productsTitle: "Security and safety products",
      productsText:
        "Explore common products and request price or site guidance from BM Contractors.",
      projectsLabel: "Project examples",
      projectsTitle: "Site work and installation categories",
      supportLabel: "Help center",
      supportTitle: "Useful customer guides",
      finalTitle: "Ready to secure your home, office or business?",
      finalText:
        "Send your site details and our team will guide you on the right system, materials and quotation.",
      finalButton: "Request Site Survey",
      viewAll: "View all",
      whyTitle: "Why customers choose BM Contractors",
      whyItems: [
        "Practical guidance before buying equipment",
        "Site survey before final quotation",
        "Installation and after-sales support",
        "Solutions for homes, shops, offices and institutions",
      ],
      processLabel: "How BM works",
      processTitle: "From request to installation",
      processSteps: [
        {
          title: "1. Request site survey",
          text: "Send your location, service need and property type through the website form or WhatsApp.",
        },
        {
          title: "2. Site guidance",
          text: "We check the site requirements, coverage areas, cable routes, materials and equipment needs.",
        },
        {
          title: "3. Clear quotation",
          text: "You receive a practical quotation based on real site needs, not guesswork.",
        },
        {
          title: "4. Installation & support",
          text: "BM Contractors handles installation, setup, testing and after-sales support.",
        },
      ],
      testimonialsLabel: "Customer confidence",
      testimonialsTitle: "What customers need from a contractor",
      testimonials: [
        {
          name: "Home Customer",
          role: "Residential Security",
          text: "I wanted someone who could explain the right CCTV setup before buying equipment. The site survey approach made the quotation easier to understand.",
        },
        {
          name: "Business Owner",
          role: "Shop Security",
          text: "For a shop, camera position and storage matter. A proper recommendation helps avoid buying the wrong system.",
        },
        {
          name: "Office Client",
          role: "Access & Networking",
          text: "The best part is having one team that can handle security, networking and support together.",
        },
      ],
      brandStripLabel: "Solutions we support",
      brandStripTitle: "From planning to installation and support",
      brandNames: [
        "CCTV Systems",
        "Electric Fence",
        "Gate Motors",
        "Access Control",
        "Networking",
        "Power Backup",
      ],
      quickActionsLabel: "Quick actions",
      quickActionsTitle: "What do you need today?",
      quickActions: [
        {
          title: "Request Site Survey",
          text: "Best for new CCTV, electric fence, gate motor or access control installation.",
          href: "/request-site-survey",
        },
        {
          title: "Ask for Product Price",
          text: "Need cameras, DVR/NVR, HDD, UPS, routers, cables or installation accessories?",
          href: "/products",
        },
        {
          title: "Talk to BM Team",
          text: "Use WhatsApp or contact form for quick guidance from our team.",
          href: "/contact",
        },
      ],
      brandSupportLabel: "Trusted product categories",
      brandSupportTitle: "Systems and brands our customers commonly request",
      brandSupportText:
        "BM Contractors works with common security and networking products used in Tanzania. Brand availability depends on stock, project requirement and customer preference.",
      brandSupportItems: [
        "Hikvision CCTV",
        "ZKTeco Access Control",
        "MikroTik & TP-Link Networking",
        "Centurion Gate Motors",
        "Nemtek Energizers",
        "UPS & Power Backup",
      ],
      surveyShortcutLabel: "Start here",
      surveyShortcutTitle: "Tell us what you want to secure",
      surveyShortcutText:
        "Choose the service you need and continue to the full site survey form. This helps BM Contractors guide you faster.",
      surveyShortcutServices: [
        { label: "CCTV Installation", value: "cctv" },
        { label: "Electric Fence", value: "electric-fence" },
        { label: "Gate Motor", value: "gate-motors" },
        { label: "Access Control", value: "access-control" },
        { label: "Networking", value: "networking" },
        { label: "Power Backup", value: "power-backup" },
      ],
      faqLabel: "Common questions",
      faqTitle: "Before requesting security installation",
      faqItems: [
        {
          question: "Do I need a site survey before CCTV installation?",
          answer:
            "Yes. A site survey helps decide camera positions, cable routes, DVR/NVR size, HDD storage and installation materials.",
        },
        {
          question: "Can BM Contractors help me choose the right CCTV package?",
          answer:
            "Yes. You can start with 4, 8, 16, 24 or 32 camera package ideas, then BM Contractors can guide you based on your actual site.",
        },
        {
          question: "Do you support electric fence and gate motors?",
          answer:
            "Yes. BM Contractors supports electric fence, gate motors, access control, networking and power backup solutions.",
        },
      ],
    },
    sw: {
      heroLabel: "Security • Safety • Smart Systems",
      heroTitle: "Mifumo ya usalama kwa nyumba, biashara na taasisi",
      heroDescription:
        "BM Contractors tunakusaidia kupanga, kusupply, kufunga na kusupport CCTV, electric fence, gate motors, access control, networking na power backup Tanzania.",
      requestSurvey: "Omba Ukaguzi wa Site",
      whatsapp: "Chat WhatsApp",
      viewServices: "Angalia Huduma",
      trustedText:
        "Imejengwa kwa kazi halisi za site, quotation safi na support ya kuaminika.",
      stats: [
        { value: "6+", label: "Huduma kuu" },
        { value: "32", label: "Camera packages mpaka" },
        { value: "TZ", label: "Tanzania" },
      ],
      servicesLabel: "Tunachofanya",
      servicesTitle: "Huduma za ulinzi na usalama",
      servicesText:
        "Chagua huduma unayohitaji, kisha omba ukaguzi wa site kwa ushauri na quotation sahihi.",
      packagesLabel: "Package maarufu za CCTV",
      packagesTitle: "Anza na package, malizia na survey ya site",
      productsLabel: "Bidhaa",
      productsTitle: "Bidhaa za security na safety",
      productsText:
        "Angalia bidhaa muhimu na omba bei au ushauri wa site kutoka BM Contractors.",
      projectsLabel: "Mifano ya projects",
      projectsTitle: "Kazi za site na categories za installation",
      supportLabel: "Help center",
      supportTitle: "Miongozo muhimu kwa wateja",
      finalTitle: "Uko tayari kulinda nyumba, ofisi au biashara yako?",
      finalText:
        "Tuma taarifa za site yako na timu yetu itakuongoza kwenye mfumo sahihi, materials na quotation.",
      finalButton: "Omba Ukaguzi wa Site",
      viewAll: "Angalia zote",
      whyTitle: "Kwa nini wateja huchagua BM Contractors",
      whyItems: [
        "Ushauri wa vitendo kabla ya kununua vifaa",
        "Site survey kabla ya quotation ya mwisho",
        "Installation na support baada ya kazi",
        "Solutions kwa nyumba, maduka, ofisi na taasisi",
      ],
      processLabel: "Jinsi BM inavyofanya kazi",
      processTitle: "Kuanzia maombi mpaka installation",
      processSteps: [
        {
          title: "1. Omba ukaguzi wa site",
          text: "Tuma location, huduma unayohitaji na aina ya eneo kupitia website form au WhatsApp.",
        },
        {
          title: "2. Ushauri wa site",
          text: "Tunaangalia mahitaji ya site, maeneo ya coverage, njia za cable, materials na vifaa vinavyohitajika.",
        },
        {
          title: "3. Quotation safi",
          text: "Unapata quotation ya vitendo kulingana na mahitaji halisi ya site, siyo kubahatisha.",
        },
        {
          title: "4. Installation na support",
          text: "BM Contractors tunashughulikia installation, setup, testing na support baada ya kazi.",
        },
      ],
      testimonialsLabel: "Imani ya mteja",
      testimonialsTitle: "Kile ambacho wateja huhitaji kwa contractor",
      testimonials: [
        {
          name: "Mteja wa Nyumbani",
          role: "Usalama wa Nyumba",
          text: "Nilihitaji mtu anielekeze CCTV sahihi kabla ya kununua vifaa. Njia ya site survey hufanya quotation ieleweke vizuri.",
        },
        {
          name: "Mfanyabiashara",
          role: "Usalama wa Duka",
          text: "Kwa duka, sehemu za camera na storage ni muhimu. Ushauri sahihi husaidia kuepuka kununua mfumo usiofaa.",
        },
        {
          name: "Mteja wa Ofisi",
          role: "Access na Networking",
          text: "Kitu kizuri ni kupata timu moja inayoweza kushughulikia security, networking na support kwa pamoja.",
        },
      ],
      brandStripLabel: "Solutions tunazosupport",
      brandStripTitle: "Kuanzia planning mpaka installation na support",
      brandNames: [
        "CCTV Systems",
        "Electric Fence",
        "Gate Motors",
        "Access Control",
        "Networking",
        "Power Backup",
      ],
      quickActionsLabel: "Hatua za haraka",
      quickActionsTitle: "Unahitaji nini leo?",
      quickActions: [
        {
          title: "Omba Ukaguzi wa Site",
          text: "Inafaa kwa installation mpya ya CCTV, electric fence, gate motor au access control.",
          href: "/request-site-survey",
        },
        {
          title: "Uliza Bei ya Bidhaa",
          text: "Unahitaji camera, DVR/NVR, HDD, UPS, routers, cables au accessories za installation?",
          href: "/products",
        },
        {
          title: "Ongea na Timu ya BM",
          text: "Tumia WhatsApp au contact form kupata ushauri wa haraka kutoka timu yetu.",
          href: "/contact",
        },
      ],
      brandSupportLabel: "Bidhaa zinazoombwa mara nyingi",
      brandSupportTitle: "Mifumo na brands ambazo wateja wetu huulizia",
      brandSupportText:
        "BM Contractors tunafanya kazi na bidhaa za security na networking zinazotumika sana Tanzania. Upatikanaji wa brand hutegemea stock, mahitaji ya project na preference ya mteja.",
      brandSupportItems: [
        "Hikvision CCTV",
        "ZKTeco Access Control",
        "MikroTik & TP-Link Networking",
        "Centurion Gate Motors",
        "Nemtek Energizers",
        "UPS & Power Backup",
      ],
      surveyShortcutLabel: "Anzia hapa",
      surveyShortcutTitle: "Tuambie unataka kulinda nini",
      surveyShortcutText:
        "Chagua huduma unayohitaji kisha endelea kwenye form ya site survey. Hii inasaidia BM Contractors kukuongoza haraka.",
      surveyShortcutServices: [
        { label: "CCTV Installation", value: "cctv" },
        { label: "Electric Fence", value: "electric-fence" },
        { label: "Gate Motor", value: "gate-motors" },
        { label: "Access Control", value: "access-control" },
        { label: "Networking", value: "networking" },
        { label: "Power Backup", value: "power-backup" },
      ],
      faqLabel: "Maswali ya kawaida",
      faqTitle: "Kabla ya kuomba installation ya security",
      faqItems: [
        {
          question: "Je, nahitaji site survey kabla ya kufunga CCTV?",
          answer:
            "Ndiyo. Site survey husaidia kupanga sehemu za camera, njia za cable, ukubwa wa DVR/NVR, HDD na materials za installation.",
        },
        {
          question:
            "BM Contractors wanaweza kunisaidia kuchagua package ya CCTV?",
          answer:
            "Ndiyo. Unaweza kuanzia na package za camera 4, 8, 16, 24 au 32, kisha BM Contractors tutakuongoza kulingana na site yako.",
        },
        {
          question: "Mnasupport electric fence na gate motors?",
          answer:
            "Ndiyo. BM Contractors tunasupport electric fence, gate motors, access control, networking na power backup.",
        },
      ],
    },
  };

  const t = content[lang];

  return (
    <>
      <FaqJsonLd items={t.faqItems} />
      <Header lang={lang} />

      <main className="min-h-screen bg-white text-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-600/25 blur-3xl" />
          <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="bm-fade-up">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-200 ring-1 ring-white/10">
                {t.heroLabel}
              </p>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                {t.heroTitle}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {t.heroDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LoadingLink
                  href={`/request-site-survey?lang=${lang}`}
                  className="w-full sm:w-auto rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white shadow-lg shadow-red-950/30 transition hover:-translate-y-0.5 hover:bg-red-700"
                >
                  {t.requestSurvey}
                </LoadingLink>

                <a
                  href={siteConfig.whatsapp.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto rounded-full bg-green-600 px-6 py-3 text-center text-sm font-black text-white shadow-lg shadow-green-950/20 transition hover:-translate-y-0.5 hover:bg-green-700"
                >
                  {t.whatsapp}
                </a>

                <LoadingLink
                  href={`/services?lang=${lang}`}
                  className="w-full sm:w-auto rounded-full bg-white px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  {t.viewServices}
                </LoadingLink>
              </div>

              <p className="mt-6 text-sm font-semibold text-slate-400">
                {t.trustedText}
              </p>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {t.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <p className="text-2xl font-black text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bm-fade-up rounded-[2.25rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="overflow-hidden rounded-[1.75rem] bg-white text-slate-950">
                <div className="relative aspect-[16/11] bg-slate-900">
                  <img
                    src="/images/hero/bm-security-hero.jpg"
                    alt="BM Contractors security systems"
                    className="h-full w-full object-cover opacity-90"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black text-white ring-1 ring-white/20 backdrop-blur">
                      Site Survey • Installation • Support
                    </p>

                    <h2 className="mt-3 max-w-md text-2xl font-black text-white">
                      {lang === "sw"
                        ? "Mfumo sahihi huanza na kuelewa site yako."
                        : "The right system starts with understanding your site."}
                    </h2>
                  </div>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-3">
                  {[
                    lang === "sw" ? "Ukaguzi wa site" : "Site survey",
                    lang === "sw" ? "Quotation safi" : "Clear quotation",
                    lang === "sw"
                      ? "Support baada ya kazi"
                      : "After-sales support",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-slate-50 p-4">
                      <span className="block h-2 w-8 rounded-full bg-red-600" />
                      <p className="mt-3 text-sm font-black text-slate-800">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Strip */}
        <section className="border-b border-slate-200 bg-white px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
                  {t.brandStripLabel}
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {t.brandStripTitle}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {t.brandNames.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand / Product Trust */}
        <section className="bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black text-red-300">
                  {t.brandSupportLabel}
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {t.brandSupportTitle}
                </h2>

                <p className="mt-5 max-w-2xl leading-7 text-slate-300">
                  {t.brandSupportText}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t.brandSupportItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 shadow-sm transition hover:-translate-y-1 hover:bg-white/[0.1]"
                  >
                    <p className="text-lg font-black">{item}</p>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {lang === "sw"
                        ? "Kwa quotation na ushauri wa matumizi sahihi."
                        : "For quotation and guidance on the right usage."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.quickActionsLabel}
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {t.quickActionsTitle}
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.quickActions.map((action, index) => (
                <LoadingLink
                  key={action.title}
                  href={`${action.href}?lang=${lang}`}
                  className={`group rounded-[2rem] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    index === 0
                      ? "bg-red-600 text-white"
                      : "border border-slate-200 bg-white text-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p
                        className={`text-xs font-black uppercase tracking-[0.18em] ${
                          index === 0 ? "text-red-100" : "text-red-600"
                        }`}
                      >
                        0{index + 1}
                      </p>

                      <h3 className="mt-3 text-2xl font-black">
                        {action.title}
                      </h3>
                    </div>

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-2xl text-lg font-black leading-none ${
                        index === 0
                          ? "bg-white text-red-600"
                          : "bg-slate-950 text-white"
                      }`}
                    >
                      →
                    </span>
                  </div>

                  <p
                    className={`mt-4 text-sm leading-7 ${
                      index === 0 ? "text-red-50" : "text-slate-600"
                    }`}
                  >
                    {action.text}
                  </p>
                </LoadingLink>
              ))}
            </div>
          </div>
        </section>

        {/* Site Survey Shortcut */}
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-50 shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="bg-slate-950 p-8 text-white sm:p-10">
                  <p className="text-sm font-black text-red-300">
                    {t.surveyShortcutLabel}
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                    {t.surveyShortcutTitle}
                  </h2>

                  <p className="mt-5 leading-7 text-slate-300">
                    {t.surveyShortcutText}
                  </p>

                  <div className="mt-8 rounded-[1.5rem] bg-white/10 p-5 ring-1 ring-white/10">
                    <p className="text-sm font-black text-white">
                      {lang === "sw"
                        ? "Tip: Site survey husaidia kupata quotation sahihi."
                        : "Tip: A site survey helps you get a more accurate quotation."}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
                  {t.surveyShortcutServices.map((service) => (
                    <LoadingLink
                      key={service.value}
                      href={`/request-site-survey?lang=${lang}&service=${service.value}`}
                      className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-black text-slate-950">
                            {service.label}
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {lang === "sw"
                              ? "Endelea kuomba survey"
                              : "Continue to survey request"}
                          </p>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black leading-none text-white transition group-hover:bg-red-600">
                          →
                        </span>
                      </div>
                    </LoadingLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.servicesLabel}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {t.servicesTitle}
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  {t.servicesText}
                </p>
              </div>

              <LoadingLink
                href={`/services?lang=${lang}`}
                className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                {t.viewAll}
              </LoadingLink>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  lang={lang}
                  slug={service.slug}
                  titleEn={service.titleEn}
                  titleSw={service.titleSw}
                  descriptionEn={service.descriptionEn}
                  descriptionSw={service.descriptionSw}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.processLabel}
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {t.processTitle}
                </h2>

                <p className="mt-5 leading-7 text-slate-600">
                  {lang === "sw"
                    ? "Tunapendelea kuelewa site kabla ya kutoa ushauri wa mwisho, ili mteja apate mfumo unaofaa na quotation inayoeleweka."
                    : "We prefer understanding the site before final recommendation, so the customer gets the right system and a quotation that makes sense."}
                </p>

                <div className="mt-6 rounded-[2rem] bg-slate-950 p-5 text-white">
                  <p className="text-sm font-black text-red-300">
                    {lang === "sw" ? "Kanuni yetu" : "Our principle"}
                  </p>

                  <p className="mt-3 text-xl font-black leading-8">
                    {lang === "sw"
                      ? "Usinunue mfumo wa usalama kwa kubahatisha. Anza na site survey."
                      : "Do not buy a security system by guesswork. Start with a site survey."}
                  </p>
                </div>

                <LoadingLink
                  href={`/request-site-survey?lang=${lang}`}
                  className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700"
                >
                  {t.requestSurvey}
                </LoadingLink>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {t.processSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <p className="text-lg font-black text-slate-950">
                      {step.title}
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CCTV Packages */}
        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.packagesLabel}
                </p>
                <h2 className="mt-2 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
                  {t.packagesTitle}
                </h2>
              </div>

              <LoadingLink
                href={`/cctv-packages?lang=${lang}`}
                className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                {t.viewAll}
              </LoadingLink>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {packages.map((pkg) => (
                <CctvPackageCard
                  key={pkg.slug}
                  lang={lang}
                  slug={pkg.slug}
                  titleEn={pkg.titleEn}
                  titleSw={pkg.titleSw}
                  cameras={pkg.cameras}
                  descriptionEn={pkg.descriptionEn}
                  descriptionSw={pkg.descriptionSw}
                  priceFrom={pkg.priceFrom}
                  includedItems={pkg.includedItems}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.productsLabel}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {t.productsTitle}
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  {t.productsText}
                </p>
              </div>

              <LoadingLink
                href={`/products?lang=${lang}`}
                className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                {t.viewAll}
              </LoadingLink>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.slug}
                  lang={lang}
                  slug={product.slug}
                  name={product.name}
                  brand={product.brand}
                  imageUrl={product.imageUrl}
                  categoryName={
                    lang === "sw"
                      ? product?.category?.nameSw ||
                        product?.category?.nameEn ||
                        ""
                      : product?.category?.nameEn || ""
                  }
                  summaryEn={product.description || ""}
                  summarySw={product.description || ""}
                  priceLabelEn={formatPriceLabel(product.price, "en")}
                  priceLabelSw={formatPriceLabel(product.price, "sw")}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.projectsLabel}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {t.projectsTitle}
                </h2>
              </div>

              <LoadingLink
                href={`/projects?lang=${lang}`}
                className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                {t.viewAll}
              </LoadingLink>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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

        {/* Support */}
        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black text-red-600">
                  {t.supportLabel}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  {t.supportTitle}
                </h2>
              </div>

              <LoadingLink
                href={`/support?lang=${lang}`}
                className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                {t.viewAll}
              </LoadingLink>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {supportArticles.map((article) => (
                <SupportArticleCard
                  key={article.slug}
                  lang={lang}
                  slug={article.slug}
                  categoryEn={article.categoryEn}
                  categorySw={article.categorySw}
                  titleEn={article.titleEn}
                  titleSw={article.titleSw}
                  summaryEn={article.summaryEn}
                  summarySw={article.summarySw}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black text-red-600">
                {t.testimonialsLabel}
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                {t.testimonialsTitle}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {lang === "sw"
                  ? "Hizi ni aina za maoni na mahitaji ambayo wateja wengi huwa nayo wanapotafuta contractor wa mifumo ya usalama."
                  : "These represent the kinds of needs and expectations customers usually have when choosing a security systems contractor."}
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.testimonials.map((item) => (
                <article
                  key={item.name}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                      BM
                    </div>

                    <div>
                      <p className="font-black text-slate-950">{item.name}</p>
                      <p className="text-xs font-bold text-red-600">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    “{item.text}”
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-black text-red-600">{t.faqLabel}</p>

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                {t.faqTitle}
              </h2>
            </div>

            <div className="mt-8 grid gap-4">
              {t.faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-black text-slate-950">
                    {item.question}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300 sm:p-10">
            <div className="relative">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                    {t.finalTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                    {t.finalText}
                  </p>
                </div>

                <LoadingLink
                  href={`/request-site-survey?lang=${lang}`}
                  className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-red-700"
                >
                  {t.finalButton}
                </LoadingLink>
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
