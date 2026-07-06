/**
 * Projects Data
 * -------------
 * Temporary project/gallery data for BM Contractors.
 *
 * Purpose:
 * - Allows us to build the Projects/Gallery page before admin/database integration.
 * - Supports English and Swahili from the beginning.
 * - Uses placeholder image paths that can later be replaced with real site photos.
 *
 * Later:
 * - Move this data to Neon Postgres.
 * - Manage projects from /admin/projects.
 * - Upload images through admin dashboard.
 */

export const projects = [
  {
    slug: "residential-cctv-installation",
    titleEn: "Residential CCTV Installation",
    titleSw: "Installation ya CCTV Nyumbani",
    category: "CCTV",
    location: "Residential Site",
    imageUrl: "/images/projects/residential-cctv.jpg",
    descriptionEn:
      "CCTV camera planning and installation for a home compound, including camera positioning, cabling and remote viewing setup.",
    descriptionSw:
      "Kupanga na kufunga CCTV kwa nyumba, ikijumuisha sehemu za camera, cabling na setup ya kuangalia kwa simu.",
  },
  {
    slug: "shop-cctv-and-networking",
    titleEn: "Shop CCTV & Networking",
    titleSw: "CCTV na Networking ya Duka",
    category: "CCTV / Networking",
    location: "Business Site",
    imageUrl: "/images/projects/shop-cctv-networking.jpg",
    descriptionEn:
      "Security camera and network setup for a shop, helping the owner monitor stock, entrance and customer areas.",
    descriptionSw:
      "CCTV na network setup kwa duka, kusaidia mmiliki kuangalia stock, mlango na maeneo ya wateja.",
  },
  {
    slug: "electric-fence-compound",
    titleEn: "Electric Fence Compound Security",
    titleSw: "Electric Fence ya Compound",
    category: "Electric Fence",
    location: "Compound",
    imageUrl: "/images/projects/electric-fence-compound.jpg",
    descriptionEn:
      "Electric fence installation for compound security with energizer, HT wire, insulators and warning signs.",
    descriptionSw:
      "Installation ya electric fence kwa compound ikijumuisha energizer, HT wire, insulators na warning signs.",
  },
  {
    slug: "office-access-control",
    titleEn: "Office Access Control",
    titleSw: "Access Control ya Ofisi",
    category: "Access Control",
    location: "Office",
    imageUrl: "/images/projects/office-access-control.jpg",
    descriptionEn:
      "Access control setup for an office entrance, including biometric device and door access management.",
    descriptionSw:
      "Setup ya access control kwenye ofisi, ikijumuisha biometric na mfumo wa kudhibiti mlango.",
  },
  {
    slug: "gate-motor-installation",
    titleEn: "Gate Motor Installation",
    titleSw: "Installation ya Gate Motor",
    category: "Gate Motors",
    location: "Residential / Business",
    imageUrl: "/images/projects/gate-motor.jpg",
    descriptionEn:
      "Automatic gate motor installation for easier access, improved security and remote-controlled entry.",
    descriptionSw:
      "Installation ya gate motor automatic kwa urahisi wa kuingia, usalama na kutumia remote.",
  },
  {
    slug: "power-backup-for-cctv",
    titleEn: "Power Backup for CCTV",
    titleSw: "Power Backup kwa CCTV",
    category: "Power Backup",
    location: "Security System",
    imageUrl: "/images/projects/power-backup-cctv.jpg",
    descriptionEn:
      "UPS backup setup for CCTV and networking equipment to reduce downtime during power interruptions.",
    descriptionSw:
      "Setup ya UPS kwa CCTV na vifaa vya network ili kupunguza kukatika kwa mfumo umeme unapokatika.",
  },
];
