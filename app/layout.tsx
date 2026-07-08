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
    default: "BM Contractors Tanzania | Security, CCTV & Safety Systems",
    template: "%s | BM Contractors Tanzania",
  },
  description:
    "BM Contractors Tanzania provides CCTV installation, electric fence, gate motors, access control, networking and power backup solutions for homes, businesses and institutions.",

  keywords: [
    "BM Contractors Tanzania",
    "BM Engineering Contractors LTD",
    "CCTV Tanzania",
    "CCTV installation Tanzania",
    "Electric fence Tanzania",
    "Gate motors Tanzania",
    "Access control Tanzania",
    "Security systems Tanzania",
    "Networking Tanzania",
    "Power backup Tanzania",
  ],

  authors: [{ name: "BM Engineering Contractors LTD" }],
  creator: "BM Engineering Contractors LTD",
  publisher: "BM Engineering Contractors LTD",

  openGraph: {
    type: "website",
    locale: "en_TZ",
    url: "https://bmcontractorstz.com",
    siteName: "BM Contractors Tanzania",
    title: "BM Contractors Tanzania | Security, CCTV & Safety Systems",
    description:
      "Professional CCTV, electric fence, gate motors, access control, networking and power backup solutions for homes, businesses and institutions in Tanzania.",
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
    title: "BM Contractors Tanzania | Security, CCTV & Safety Systems",
    description:
      "CCTV, electric fence, gate motors, access control, networking and power backup solutions in Tanzania.",
    images: ["/og/bm-contractors-og.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://bmcontractorstz.com",
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
