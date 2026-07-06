/**
 * CCTV Packages Seed Data
 * -----------------------
 * Sample CCTV packages for BM Contractors.
 *
 * Purpose:
 * - Quickly fills Neon database with professional sample packages.
 * - Avoids manual data entry during early development.
 * - Public /cctv-packages can display real database records immediately.
 */

export const cctvPackageSeeds = [
  {
    slug: "4-camera-package",
    titleEn: "4 Camera CCTV Package",
    titleSw: "Package ya CCTV Camera 4",
    cameras: 4,
    descriptionEn:
      "A good starting package for homes, small shops and small offices that need basic security coverage.",
    descriptionSw:
      "Package nzuri ya kuanzia kwa nyumba, maduka madogo na ofisi ndogo zinazohitaji ulinzi wa msingi.",
    priceFrom: null,
    includedItems: [
      "4 CCTV cameras",
      "DVR/NVR",
      "HDD storage",
      "Power supply",
      "Cables and connectors",
      "Installation option",
    ],
  },
  {
    slug: "8-camera-package",
    titleEn: "8 Camera CCTV Package",
    titleSw: "Package ya CCTV Camera 8",
    cameras: 8,
    descriptionEn:
      "Suitable for homes, medium shops, offices and business premises needing wider coverage.",
    descriptionSw:
      "Inafaa kwa nyumba, maduka ya kati, ofisi na biashara zinazohitaji coverage kubwa zaidi.",
    priceFrom: null,
    includedItems: [
      "8 CCTV cameras",
      "8 channel DVR/NVR",
      "HDD storage",
      "Power supply",
      "Cables and connectors",
      "Remote viewing setup",
      "Installation option",
    ],
  },
  {
    slug: "10-camera-package",
    titleEn: "10 Camera CCTV Package",
    titleSw: "Package ya CCTV Camera 10",
    cameras: 10,
    descriptionEn:
      "Designed for larger homes, shops, offices and sites with several important coverage points.",
    descriptionSw:
      "Imeandaliwa kwa nyumba kubwa, maduka, ofisi na sites zenye maeneo mengi muhimu ya coverage.",
    priceFrom: null,
    includedItems: [
      "10 CCTV cameras",
      "DVR/NVR",
      "HDD storage",
      "Power distribution",
      "Cables and connectors",
      "Remote viewing setup",
      "Installation option",
    ],
  },
  {
    slug: "16-camera-package",
    titleEn: "16 Camera CCTV Package",
    titleSw: "Package ya CCTV Camera 16",
    cameras: 16,
    descriptionEn:
      "A strong package for offices, schools, warehouses, hotels and businesses with multiple areas to monitor.",
    descriptionSw:
      "Package imara kwa ofisi, shule, warehouses, hotels na biashara zenye maeneo mengi ya kuangalia.",
    priceFrom: null,
    includedItems: [
      "16 CCTV cameras",
      "16 channel DVR/NVR",
      "HDD storage",
      "Power supply",
      "Cables and connectors",
      "Remote viewing setup",
      "Installation option",
    ],
  },
  {
    slug: "24-camera-package",
    titleEn: "24 Camera CCTV Package",
    titleSw: "Package ya CCTV Camera 24",
    cameras: 24,
    descriptionEn:
      "Suitable for institutions, warehouses, factories and commercial sites requiring expanded security coverage.",
    descriptionSw:
      "Inafaa kwa taasisi, warehouses, factories na maeneo ya biashara yanayohitaji coverage kubwa.",
    priceFrom: null,
    includedItems: [
      "24 CCTV cameras",
      "DVR/NVR solution",
      "HDD storage planning",
      "Network or coaxial cabling",
      "Power planning",
      "Remote viewing setup",
      "Installation option",
    ],
  },
  {
    slug: "32-camera-package",
    titleEn: "32 Camera CCTV Package",
    titleSw: "Package ya CCTV Camera 32",
    cameras: 32,
    descriptionEn:
      "A large-site CCTV package for factories, schools, warehouses, hotels and institutions needing high coverage.",
    descriptionSw:
      "Package ya site kubwa kwa factories, shule, warehouses, hotels na taasisi zinazohitaji coverage kubwa sana.",
    priceFrom: null,
    includedItems: [
      "32 CCTV cameras",
      "32 channel DVR/NVR",
      "HDD storage planning",
      "Structured cabling",
      "Power planning",
      "Remote viewing setup",
      "Installation option",
    ],
  },
];
