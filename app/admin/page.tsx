/**
 * Admin Dashboard Page
 * --------------------
 * Main backend dashboard for BM Contractors.
 *
 * Current features:
 * - Shows high-level admin overview.
 * - Links to key backend windows.
 * - Reads site survey and contact message counts from Neon.
 *
 * Later features:
 * - Login protection.
 * - Recent requests/messages.
 * - Product counts.
 * - Lead statistics.
 */

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";

export default async function AdminPage() {
  const siteSurveyCount = await prisma.siteSurveyRequest.count();

  const newSurveyCount = await prisma.siteSurveyRequest.count({
    where: {
      status: "NEW",
    },
  });

  const messageCount = await prisma.contactMessage.count();

  const newMessageCount = await prisma.contactMessage.count({
    where: {
      status: "NEW",
    },
  });

  const windows = [
    {
      title: "Site Surveys",
      description:
        "View customer site survey requests from the public website.",
      href: "/admin/site-surveys",
    },
    {
      title: "Messages",
      description: "View contact messages and customer inquiries.",
      href: "/admin/messages",
    },
    {
      title: "Products",
      description: "Manage security and safety products, brands and prices.",
      href: "/admin/products",
    },
    {
      title: "CCTV Packages",
      description: "Manage 4, 8, 10, 16, 24 and 32 camera packages.",
      href: "/admin/packages",
    },
    {
      title: "Settings",
      description: "Manage contacts, office numbers and website settings.",
      href: "/admin/settings",
    },
  ];

  return (
    <AdminShell
      title="Admin Dashboard"
      subtitle="Backend foundation for managing BM Contractors website data, requests, products and content."
    >
      <div className="grid gap-4 sm:grid-cols-4">
        <AdminStatCard
          label="Site Surveys"
          value={siteSurveyCount}
          hint="Total survey requests"
        />

        <AdminStatCard
          label="New Surveys"
          value={newSurveyCount}
          hint="Need attention"
        />

        <AdminStatCard
          label="Messages"
          value={messageCount}
          hint="Total contact messages"
        />

        <AdminStatCard
          label="New Messages"
          value={newMessageCount}
          hint="Need follow-up"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {windows.map((window) => (
          <Link
            key={window.href}
            href={window.href}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/[0.1]"
          >
            <h2 className="text-xl font-black text-white">{window.title}</h2>
            <p className="mt-3 leading-7 text-slate-300">
              {window.description}
            </p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
