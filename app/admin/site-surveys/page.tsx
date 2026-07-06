/**
 * Admin Site Surveys Page
 * -----------------------
 * Shows site survey requests submitted from the public website.
 *
 * Current features:
 * - Reads SiteSurveyRequest records from Neon Postgres.
 * - Displays recent customer requests.
 * - Shows statistics.
 * - Allows admin to update request status.
 *
 * Later improvements:
 * - Admin login protection.
 * - Search/filter by status/service/location.
 * - Add internal notes.
 * - Send follow-up SMS/WhatsApp.
 */

import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminStatusButton } from "@/components/admin/AdminStatusButton";
import { updateSiteSurveyStatus } from "./actions";

function formatDate(date: Date) {
  /**
   * Admin-readable date.
   * Later we can force Africa/Dar_es_Salaam timezone formatting.
   */
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusClass(status: string) {
  /**
   * Simple badge colors for request status.
   */
  if (status === "NEW") return "bg-green-50 text-green-700 ring-green-200";
  if (status === "CONTACTED") return "bg-sky-50 text-sky-700 ring-sky-200";
  if (status === "QUOTED")
    return "bg-purple-50 text-purple-700 ring-purple-200";
  if (status === "COMPLETED")
    return "bg-slate-100 text-slate-700 ring-slate-200";
  if (status === "CANCELLED") return "bg-red-50 text-red-700 ring-red-200";

  return "bg-amber-50 text-amber-700 ring-amber-200";
}

const statuses = ["NEW", "CONTACTED", "QUOTED", "COMPLETED", "CANCELLED"];

export default async function AdminSiteSurveysPage() {
  const requests = await prisma.siteSurveyRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const total = await prisma.siteSurveyRequest.count();

  const newCount = await prisma.siteSurveyRequest.count({
    where: {
      status: "NEW",
    },
  });

  const contactedCount = await prisma.siteSurveyRequest.count({
    where: {
      status: "CONTACTED",
    },
  });

  return (
    <AdminShell
      title="Site Survey Requests"
      subtitle="View and manage customer site survey requests submitted from bmcontractorstz.com."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Total Requests"
          value={total}
          hint="All received site survey requests"
        />

        <AdminStatCard
          label="New Requests"
          value={newCount}
          hint="Need first follow-up"
        />

        <AdminStatCard
          label="Contacted"
          value={contactedCount}
          hint="Already reached by BM team"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white text-slate-950 shadow-2xl shadow-black/20">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-black">Latest Requests</h2>
          <p className="mt-1 text-sm text-slate-500">
            Customer details, service type, location, message and follow-up
            status.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-lg font-black">No requests yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Site survey requests will appear here after customers submit the
              public form.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {requests.map((request) => (
              <article
                key={request.id}
                className="grid gap-5 p-5 transition hover:bg-slate-50 xl:grid-cols-[1fr_1fr_1fr_1.2fr]"
              >
                <div>
                  <p className="font-black">{request.fullName}</p>
                  <p className="mt-1 text-sm text-slate-600">{request.phone}</p>

                  {request.email ? (
                    <p className="mt-1 text-sm text-slate-500">
                      {request.email}
                    </p>
                  ) : null}

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    {formatDate(request.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    {request.serviceType || "No service selected"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {request.propertyType || "No property type"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {request.location || "No location"}
                  </p>
                </div>

                <div>
                  <p className="line-clamp-4 text-sm leading-6 text-slate-600">
                    {request.message || "No message provided."}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${statusClass(
                      request.status,
                    )}`}
                  >
                    {request.status}
                  </span>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <form key={status} action={updateSiteSurveyStatus}>
                        {/* Hidden values tell the server action which record to update. */}
                        <input
                          type="hidden"
                          name="requestId"
                          value={request.id}
                        />
                        <input type="hidden" name="status" value={status} />

                        <AdminStatusButton>{status}</AdminStatusButton>
                      </form>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
