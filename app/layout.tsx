import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Root Layout
 * -----------
 * Main app layout and SEO/social sharing metadata.
 *
 * Purpose:
 * - Sets professional website title and description.
 * - Controls WhatsApp/Facebook/LinkedIn link preview through Open Graph.
 * - Controls X/Twitter preview card.
 * - Prevents default "Create Next App" preview.
 *
 * Important:
 * - Make sure /public/og/bm-contractors-og.jpg exists.
 */

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bmcontractorstz.com"),

  title: {
    default:
      "BM Contractors Tanzania | CCTV, Electric Fence & Security Systems",
    template: "%s | BM Contractors Tanzania",
  },

  description:
    "BM Contractors Tanzania provides CCTV installation, electric fence, gate motors, access control, networking and power backup solutions for homes, businesses and institutions.",

  keywords: [
    "BM Contractors Tanzania",
    "BM Engineering Contractors LTD",
    "CCTV installation Tanzania",
    "CCTV cameras Tanzania",
    "CCTV packages Tanzania",
    "Electric fence Tanzania",
    "Gate motors Tanzania",
    "Access control Tanzania",
    "ZKTeco Tanzania",
    "Hikvision Tanzania",
    "Tiandy Tanzania",
    "MikroTik Tanzania",
    "Networking Tanzania",
    "UPS backup Tanzania",
    "Security systems Tanzania",
    "Site survey Tanzania",
  ],

  authors: [{ name: "BM Engineering Contractors LTD" }],
  creator: "BM Engineering Contractors LTD",
  publisher: "BM Engineering Contractors LTD",

  alternates: {
    canonical: "https://bmcontractorstz.com",
    languages: {
      en: "https://bmcontractorstz.com?lang=en",
      sw: "https://bmcontractorstz.com?lang=sw",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_TZ",
    alternateLocale: ["sw_TZ"],
    url: "https://bmcontractorstz.com",
    siteName: "BM Contractors Tanzania",
    title: "BM Contractors Tanzania | CCTV, Electric Fence & Security Systems",
    description:
      "Professional CCTV, electric fence, gate motors, access control, networking and power backup solutions in Tanzania.",
    images: [
      {
        url: "/og/bm-contractors-og.jpg",
        width: 1200,
        height: 630,
        alt: "BM Contractors Tanzania security and safety systems",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BM Contractors Tanzania | CCTV, Electric Fence & Security Systems",
    description:
      "CCTV, electric fence, gate motors, access control, networking and power backup solutions in Tanzania.",
    images: ["/og/bm-contractors-og.jpg"],
  },

  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
