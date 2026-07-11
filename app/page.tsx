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
import { BmAssistantPopup } from "@/components/site/BmAssistantPopup";
import WhyChooseBM from "@/components/sections/WhyChooseBM";
import HeroSection from "@/components/sections/HeroSection";
import BrandMarquee from "@/components/sections/BrandMarquee";
import SecuritySolutionsSection from "@/components/sections/SecuritySolutionsSection";
import CatalogSection from "@/components/sections/CatalogSection";
import BrandTrustSection from "@/components/sections/BrandTrustSection";
import SelectedProjectsSection from "@/components/sections/SelectedProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";

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

      <main className="min-h-screen bg-slate-950 text-white antialiased">
        {/* Hero Section */}
        <HeroSection
          lang={lang}
          t={t}
          siteConfig={siteConfig}
          LoadingLink={LoadingLink}
        />

        {/* Moving Solutions Marquee */}
        {/* <BrandMarquee lang={lang} t={t} /> */}

        {/* Services */}
        <SecuritySolutionsSection
          lang={lang}
          t={t}
          services={services}
          ServiceCard={ServiceCard}
          LoadingLink={LoadingLink}
        />

        {/* Why Choose BM */}
        <WhyChooseBM lang={lang} />

        <CatalogSection
          lang={lang}
          t={t}
          packages={packages}
          products={packages}
          CctvPackageCard={CctvPackageCard}
          ProductCard={ProductCard}
          LoadingLink={LoadingLink}
          formatPriceLabel={formatPriceLabel}
        />

        {/* Brand / Product Trust */}
        <BrandTrustSection lang={lang} t={t} />

        {/* Projects */}
        <SelectedProjectsSection
          lang={lang}
          t={t}
          projects={projects}
          ProjectCard={ProjectCard}
          LoadingLink={LoadingLink}
        />

        {/* Testimonials */}
        <TestimonialsSection lang={lang} t={t} />

        {/* FAQ */}
        <FaqSection lang={lang} t={t} />

        {/* Final CTA */}
        <FinalCtaSection lang={lang} t={t} LoadingLink={LoadingLink} />
      </main>

      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
      <BmAssistantPopup lang={lang} />
    </>
  );
}
