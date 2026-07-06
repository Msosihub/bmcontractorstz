/**
 * Admin Support Articles Page
 * ---------------------------
 * Reserved admin window for managing support/help center articles.
 *
 * Future features:
 * - Create support articles.
 * - Edit English and Swahili content.
 * - Publish/unpublish articles.
 * - Categorize help articles.
 */

import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminSupportPage() {
  return (
    <AdminShell
      title="Support Articles"
      subtitle="Manage customer help center articles, FAQs and support guides."
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
        <h2 className="text-2xl font-black text-white">Coming soon</h2>
        <p className="mt-3 leading-7 text-slate-300">
          This section will allow BM staff to create and edit support articles
          in English and Swahili.
        </p>
      </div>
    </AdminShell>
  );
}
