import type { Language } from "./config";

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      cctvPackages: "CCTV Packages",
      products: "Products",
      projects: "Projects",
      support: "Support",
      contact: "Contact",
      requestSurvey: "Request Site Survey",
    },
    home: {
      badge: "Security • Safety • Smart Systems",
      title: "BM Engineering Contractors LTD",
      description:
        "Professional security and safety solutions for homes, businesses, offices, schools, shops, and industrial sites across Tanzania.",
      primaryCta: "Request Site Survey",
      secondaryCta: "View CCTV Packages",
      popularSolutions: "Popular Solutions",
      popularTitle: "CCTV, Electric Fence, Gate Motors & Access Control",
      popularText:
        "Get a clean quotation, professional installation, and reliable after-sales support.",
      servicesLabel: "Services",
      servicesTitle: "What we do",
      viewAllServices: "View all services",
      packagesLabel: "Popular CCTV Packages",
      packagesTitle: "Choose a package, then request site survey",
      seePackages: "See packages",
      requestQuote: "Request Quote",
      surveyTitle: "Need a site survey?",
      surveyText:
        "Tell us your location, property type, and the service you need. Our team will contact you for guidance and quotation.",
    },
    survey: {
      label: "Request Site Survey",
      title: "Tell us what you need",
      description:
        "Fill this form and BM Contractors will contact you for CCTV, electric fence, gate motor, access control, networking, or power backup service.",
      fullName: "Full name",
      phone: "Phone number",
      location: "Location",
      selectService: "Select service",
      message: "Describe your site or request",
      submit: "Submit Request",
    },
  },
  sw: {
    nav: {
      home: "Nyumbani",
      services: "Huduma",
      cctvPackages: "Package za CCTV",
      products: "Bidhaa",
      projects: "Kazi Zetu",
      support: "Msaada",
      contact: "Mawasiliano",
      requestSurvey: "Omba Ukaguzi wa Site",
    },
    home: {
      badge: "Ulinzi • Usalama • Mifumo Smart",
      title: "BM Engineering Contractors LTD",
      description:
        "Tunatoa huduma za kisasa za ulinzi na usalama kwa nyumba, biashara, ofisi, shule, maduka na maeneo ya viwanda Tanzania.",
      primaryCta: "Omba Ukaguzi wa Site",
      secondaryCta: "Angalia Package za CCTV",
      popularSolutions: "Huduma Maarufu",
      popularTitle: "CCTV, Electric Fence, Gate Motors & Access Control",
      popularText:
        "Pata quotation safi, installation ya kitaalamu na huduma nzuri baada ya kazi.",
      servicesLabel: "Huduma",
      servicesTitle: "Tunachofanya",
      viewAllServices: "Angalia huduma zote",
      packagesLabel: "Package Maarufu za CCTV",
      packagesTitle: "Chagua package, kisha omba ukaguzi wa site",
      seePackages: "Angalia package",
      requestQuote: "Omba Bei",
      surveyTitle: "Unahitaji ukaguzi wa site?",
      surveyText:
        "Tueleze location yako, aina ya eneo na huduma unayohitaji. Timu yetu itakupigia kwa maelekezo na quotation.",
    },
    survey: {
      label: "Omba Ukaguzi wa Site",
      title: "Tuambie unachohitaji",
      description:
        "Jaza fomu hii, BM Contractors tutakutafuta kwa huduma za CCTV, electric fence, gate motor, access control, networking au power backup.",
      fullName: "Jina kamili",
      phone: "Namba ya simu",
      location: "Location",
      selectService: "Chagua huduma",
      message: "Elezea site yako au ombi lako",
      submit: "Tuma Ombi",
    },
  },
} satisfies Record<Language, unknown>;

export function getDictionary(lang: Language) {
  return dictionary[lang];
}
