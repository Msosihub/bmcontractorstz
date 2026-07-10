/**
 * AdminShell Component
 * --------------------
 * Shared admin layout for BM Contractors backend pages.
 *
 * Purpose:
 * - Provides consistent admin sidebar, header and content wrapper.
 * - Uses active sidebar links.
 * - Uses loading feedback on admin navigation.
 * - Allows sidebar and main content to scroll properly.
 *
 * Future:
 * - Add authentication/user profile display.
 * - Add mobile sidebar drawer.
 */

import { AdminNavLink } from "@/components/admin/AdminNavLink";

type AdminShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Site Surveys", href: "/admin/site-surveys" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Services", href: "/admin/services" },
  { label: "Products", href: "/admin/products" },
  { label: "CCTV Packages", href: "/admin/packages" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Support Articles", href: "/admin/support" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Logout", href: "/admin/logout" },
];

export function AdminShell({ title, subtitle, children }: AdminShellProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
              BM Admin
            </p>

            <h1 className="mt-2 text-xl font-black">Control Center</h1>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Website content, requests, products, services and support.
            </p>
          </div>

          <nav className="mt-4 grid gap-2 pb-2">
            {navItems.map((item) => (
              <AdminNavLink
                key={item.href}
                href={item.href}
                label={item.label}
              />
            ))}
          </nav>
        </aside>

        <section className="min-w-0 pb-10">
          <header className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
              BM Contractors Backend
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title}
            </h2>

            {subtitle ? (
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                {subtitle}
              </p>
            ) : null}
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
