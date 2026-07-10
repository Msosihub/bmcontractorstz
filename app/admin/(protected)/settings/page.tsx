/**
 * Admin Settings Page
 * -------------------
 * Reserved backend page for BM Contractors website settings.
 *
 * Current features:
 * - Displays current hardcoded siteConfig values.
 *
 * Future features:
 * - Edit company name, email, phone numbers and WhatsApp number.
 * - Save settings to Neon Postgres SiteSetting table.
 * - Manage social links, office locations and business hours.
 */

import { AdminShell } from "@/components/admin/AdminShell";
import { siteConfig } from "@/data/site";

export default function AdminSettingsPage() {
  return (
    <AdminShell
      title="Website Settings"
      subtitle="Manage BM Contractors website contacts, brand details, office numbers and system settings."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Company
          </p>

          <div className="mt-5 grid gap-3 text-sm">
            <p>
              <span className="font-black">Company:</span>{" "}
              {siteConfig.companyName}
            </p>
            <p>
              <span className="font-black">Short Name:</span>{" "}
              {siteConfig.shortName}
            </p>
            <p>
              <span className="font-black">Domain:</span> {siteConfig.domain}
            </p>
            <p>
              <span className="font-black">Email:</span> {siteConfig.email}
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Contacts
          </p>

          <div className="mt-5 grid gap-3 text-sm">
            <p>
              <span className="font-black">WhatsApp:</span>{" "}
              {siteConfig.whatsapp.label}
            </p>

            {siteConfig.phones.map((phone) => (
              <p key={phone.raw}>
                <span className="font-black">{phone.type}:</span> {phone.label}
              </p>
            ))}

            <p>
              <span className="font-black">Notification Numbers:</span>{" "}
              {siteConfig.notificationNumbers.join(", ")}
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/20 lg:col-span-2">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Future Admin Editing
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            This page currently reads values from <code>data/site.ts</code>.
            Later we will connect it to the SiteSetting table in Neon so BM
            staff can edit these values without changing code.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
