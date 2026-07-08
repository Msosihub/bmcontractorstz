/**
 * LoadingLink Component
 * ---------------------
 * Reusable client-side link with click loading feedback.
 *
 * Purpose:
 * - Shows a small spinner after user clicks navigation/CTA links.
 * - Improves UX by showing that page navigation is taking place.
 * - Keeps normal Next.js Link behavior.
 *
 * Used for:
 * - Navbar links
 * - CTA buttons
 * - Footer links
 * - Admin links later
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type LoadingLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  showSpinner?: boolean;
  target?: string;
};

function cleanPath(href: string) {
  /**
   * Removes query string so active state works with ?lang=en / ?lang=sw.
   */
  return href.split("?")[0];
}

export function LoadingLink({
  href,
  children,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  showSpinner = true,
  target,
}: LoadingLinkProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const hrefPath = cleanPath(href);

  /**
   * Active when current pathname matches the link path.
   * Home needs exact matching so "/" does not activate every link.
   */
  const isActive =
    hrefPath === "/" ? pathname === "/" : pathname.startsWith(hrefPath);

  return (
    <Link
      href={href}
      target={target}
      onClick={() => {
        /**
         * Only show loading for internal links.
         */
        if (!target) {
          setIsLoading(true);
        }
      }}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
    >
      <span className="inline-flex items-center gap-2">
        {children}

        {showSpinner && isLoading ? (
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-current/30 border-t-current" />
        ) : null}
      </span>
    </Link>
  );
}
