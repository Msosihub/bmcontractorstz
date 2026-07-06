/**
 * Reusable Loading Link
 * ---------------------
 * Client-side link that shows a loading spinner after click.
 *
 * Used for:
 * - CTA buttons
 * - Request Site Survey links
 * - CCTV Packages links
 *
 * This improves user experience on mobile and slower networks.
 */

"use client";

import Link from "next/link";
import { useState } from "react";

type LoadingLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
};

export function LoadingLink({
  href,
  children,
  className = "",
  loadingText = "Loading...",
}: LoadingLinkProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href={href}
      onClick={() => setLoading(true)}
      className={`inline-flex items-center justify-center gap-2 ${className}`}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Link>
  );
}
