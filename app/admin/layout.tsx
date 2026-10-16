import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };
/**
 * Admin Root Layout
 * -----------------
 * Allows auth and protected route groups to manage their own layouts.
 */

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
