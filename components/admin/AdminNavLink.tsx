/**
 * AdminNavLink Component
 * ----------------------
 * Admin sidebar link with active state and loading feedback.
 *
 * Purpose:
 * - Shows active admin page in sidebar.
 * - Shows small spinner after clicking a navigation link.
 * - Improves admin dashboard UX.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type AdminNavLinkProps = {
  href: string;
  label: string;
};

export function AdminNavLink({ href, label }: AdminNavLinkProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Dashboard uses exact match.
   * Other pages use startsWith so nested routes can still appear active.
   */
  const isActive =
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={() => setIsLoading(true)}
      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black transition ${
        isActive
          ? "bg-red-600 text-white shadow-lg shadow-red-950/20"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span>{label}</span>

      {isLoading ? (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-current/30 border-t-current" />
      ) : null}
    </Link>
  );
}
