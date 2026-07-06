/**
 * Services Data
 * -------------
 * Temporary service data for BM Contractors frontend pages.
 *
 * Purpose:
 * - Powers the Services overview page and individual service pages.
 * - Keeps English and Swahili fields from the beginning.
 * - Later this can move to Neon Postgres and be managed from /admin/services.
 */

export const services = [
  {
    slug: "cctv",
    titleEn: "CCTV Systems",
    titleSw: "Mifumo ya CCTV",
    eyebrowEn: "Security Camera Installation",
    eyebrowSw: "Installation ya Camera za Usalama",
    descriptionEn:
      "Professional CCTV installation for homes, shops, offices, schools, warehouses and business premises.",
    descriptionSw:
      "Installation ya CCTV kwa nyumba, maduka, ofisi, shule, warehouses na maeneo ya biashara.",
    contentEn:
      "We help customers choose the right camera positions, DVR/NVR size, HDD storage, cables, power supply and remote viewing setup. Our CCTV solutions can be designed for homes, shops, offices, schools, warehouses and larger sites.",
    contentSw:
      "Tunamsaidia mteja kuchagua sehemu sahihi za camera, ukubwa wa DVR/NVR, HDD, cables, power supply na remote viewing. Huduma zetu za CCTV zinafaa kwa nyumba, maduka, ofisi, shule, warehouses na sites kubwa.",
    imageUrl: "/images/services/cctv.jpg",
    featuresEn: [
      "Indoor and outdoor camera installation",
      "DVR/NVR setup",
      "HDD recording setup",
      "Remote viewing on phone",
      "Cabling and installation materials",
      "Maintenance and support",
    ],
    featuresSw: [
      "Installation ya camera za ndani na nje",
      "Setup ya DVR/NVR",
      "Setup ya HDD ya kurekodi",
      "Kuangalia camera kwenye simu",
      "Cabling na materials za installation",
      "Maintenance na support",
    ],
  },
  {
    slug: "electric-fence",
    titleEn: "Electric Fence",
    titleSw: "Uzio wa Umeme",
    eyebrowEn: "Perimeter Security",
    eyebrowSw: "Ulinzi wa Eneo",
    descriptionEn:
      "Reliable electric fence installation for residential, commercial and industrial security.",
    descriptionSw:
      "Installation ya electric fence kwa nyumba, biashara na maeneo ya viwanda.",
    contentEn:
      "We install electric fence systems for homes, compounds, shops, schools, warehouses and industrial premises. We help plan fence lines, energizer size, earth rods, warning signs and accessories.",
    contentSw:
      "Tunafunga electric fence kwa nyumba, compounds, maduka, shule, warehouses na maeneo ya viwanda. Tunasaidia kupanga njia ya fence, ukubwa wa energizer, earth rods, warning signs na accessories.",
    imageUrl: "/images/services/electric-fence.jpg",
    featuresEn: [
      "Energizer selection",
      "HT wire installation",
      "Insulators and brackets",
      "Earth rod setup",
      "Warning signs",
      "Fence testing and support",
    ],
    featuresSw: [
      "Uchaguzi wa energizer",
      "Installation ya HT wire",
      "Insulators na brackets",
      "Setup ya earth rods",
      "Warning signs",
      "Testing na support ya fence",
    ],
  },
  {
    slug: "gate-motors",
    titleEn: "Gate Motors",
    titleSw: "Gate Motors",
    eyebrowEn: "Automatic Gate Solutions",
    eyebrowSw: "Mfumo wa Gate Automatic",
    descriptionEn:
      "Automatic gate motor installation, service and support for homes and businesses.",
    descriptionSw:
      "Installation, service na matengenezo ya gate motors kwa nyumba na biashara.",
    contentEn:
      "We install and support automatic gate motors for sliding and swing gates. We can assist with motor selection, rails, remotes, safety sensors and service support.",
    contentSw:
      "Tunafunga na kusupport gate motors kwa sliding gates na swing gates. Tunasaidia kuchagua motor, rails, remotes, safety sensors na service support.",
    imageUrl: "/images/services/gate-motors.jpg",
    featuresEn: [
      "Sliding gate motors",
      "Swing gate solutions",
      "Remote control setup",
      "Safety sensor setup",
      "Motor servicing",
      "Troubleshooting and repair",
    ],
    featuresSw: [
      "Sliding gate motors",
      "Swing gate solutions",
      "Setup ya remote control",
      "Setup ya safety sensors",
      "Service ya gate motor",
      "Troubleshooting na repair",
    ],
  },
  {
    slug: "access-control",
    titleEn: "Access Control",
    titleSw: "Access Control",
    eyebrowEn: "Smart Entry Management",
    eyebrowSw: "Udhibiti wa Kuingia",
    descriptionEn:
      "Door access systems, biometric devices, attendance control and smart entry solutions.",
    descriptionSw:
      "Mifumo ya milango, biometric, attendance control na smart entry solutions.",
    contentEn:
      "We provide access control systems for offices, shops, institutions and secure rooms. Solutions can include biometric devices, magnetic locks, exit buttons, door controllers and attendance support.",
    contentSw:
      "Tunatoa mifumo ya access control kwa ofisi, maduka, taasisi na vyumba vya usalama. Inaweza kujumuisha biometric, magnetic locks, exit buttons, door controllers na attendance support.",
    imageUrl: "/images/services/access-control.jpg",
    featuresEn: [
      "Biometric access devices",
      "Door locks and controllers",
      "Exit buttons",
      "Attendance systems",
      "Office access management",
      "Support and maintenance",
    ],
    featuresSw: [
      "Biometric access devices",
      "Door locks na controllers",
      "Exit buttons",
      "Attendance systems",
      "Usimamizi wa access ya ofisi",
      "Support na maintenance",
    ],
  },
  {
    slug: "networking",
    titleEn: "Networking",
    titleSw: "Networking",
    eyebrowEn: "Business Connectivity",
    eyebrowSw: "Connectivity ya Biashara",
    descriptionEn:
      "Networking setup for CCTV, offices, internet sharing, routers and business connectivity.",
    descriptionSw:
      "Networking kwa CCTV, ofisi, internet sharing, routers na biashara.",
    contentEn:
      "We design and install network solutions for offices, CCTV systems, Wi-Fi coverage, routers, switches and business connectivity. Good networking helps CCTV remote viewing and office operations work smoothly.",
    contentSw:
      "Tunatengeneza na kufunga network kwa ofisi, CCTV, Wi-Fi coverage, routers, switches na business connectivity. Networking nzuri husaidia CCTV remote viewing na kazi za ofisi kwenda vizuri.",
    imageUrl: "/images/services/networking.jpg",
    featuresEn: [
      "Office network setup",
      "CCTV networking",
      "Router and switch setup",
      "Wi-Fi coverage planning",
      "Point-to-point links",
      "Network troubleshooting",
    ],
    featuresSw: [
      "Setup ya network ya ofisi",
      "Networking ya CCTV",
      "Setup ya routers na switches",
      "Kupanga Wi-Fi coverage",
      "Point-to-point links",
      "Network troubleshooting",
    ],
  },
  {
    slug: "power-backup",
    titleEn: "Power Backup",
    titleSw: "Power Backup",
    eyebrowEn: "Reliable Backup Power",
    eyebrowSw: "Backup Power ya Kuaminika",
    descriptionEn:
      "UPS and backup power solutions for CCTV, routers, offices and security systems.",
    descriptionSw:
      "UPS na backup power kwa CCTV, routers, ofisi na mifumo ya usalama.",
    contentEn:
      "We help protect CCTV, routers, NVRs, access control and office equipment with suitable UPS and backup power solutions. This improves uptime and reduces interruptions.",
    contentSw:
      "Tunasaidia kulinda CCTV, routers, NVR, access control na vifaa vya ofisi kwa UPS na backup power inayofaa. Hii husaidia kuongeza uptime na kupunguza kukatika kwa huduma.",
    imageUrl: "/images/services/power-backup.jpg",
    featuresEn: [
      "UPS selection",
      "Backup for CCTV systems",
      "Backup for routers and internet",
      "Power protection",
      "Runtime planning",
      "Support and replacement guidance",
    ],
    featuresSw: [
      "Uchaguzi wa UPS",
      "Backup kwa mifumo ya CCTV",
      "Backup kwa routers na internet",
      "Power protection",
      "Kupanga muda wa backup",
      "Support na ushauri wa replacement",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
