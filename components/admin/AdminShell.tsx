/**
 * AdminShell Component
 * --------------------
 * Shared admin dashboard layout for BM Contractors backend pages.
 *
 * What it provides:
 * - Dark professional admin sidebar/header style.
 * - Mobile-friendly admin container.
 * - Reusable wrapper for future admin sections.
 *
 * Future use:
 * - Products
 * - CCTV packages
 * - Site survey requests
 * - Messages
 * - Appointments
 * - Settings
 */

import Link from "next/link";

type AdminShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Site Surveys", href: "/admin/site-surveys" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Products", href: "/admin/products" },
  { label: "CCTV Packages", href: "/admin/packages" },
  { label: "Support Articles", href: "/admin/support" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminShell({ title, subtitle, children }: AdminShellProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        {/* Admin navigation sidebar */}
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20">
          <div className="rounded-3xl bg-white p-5 text-slate-950">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
              BM Admin
            </p>
            <h2 className="mt-2 text-xl font-black">Control Center</h2>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Manage requests, products, packages and website content.
            </p>
          </div>

          <nav className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          {/* Admin page heading */}
          <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
              BM Contractors LTD
            </p>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">{title}</h1>
            {subtitle ? (
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                {subtitle}
              </p>
            ) : null}
          </div>

          {children}
        </section>
      </div>
    </main>
  );
}
