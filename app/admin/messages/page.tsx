/**
 * Admin Messages Page
 * -------------------
 * Shows contact messages submitted from the public website.
 *
 * Current features:
 * - Reads ContactMessage records from Neon Postgres.
 * - Displays latest customer messages.
 * - Allows admin to update message status.
 *
 * Later improvements:
 * - Admin login protection.
 * - Search/filter by status.
 * - Reply directly from dashboard.
 */

import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminStatusButton } from "@/components/admin/AdminStatusButton";
import { updateContactMessageStatus } from "./actions";

function formatDate(date: Date) {
  /**
   * Admin-readable date format.
   */
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusClass(status: string) {
  /**
   * Badge color based on message follow-up status.
   */
  if (status === "NEW") return "bg-green-50 text-green-700 ring-green-200";
  if (status === "CONTACTED") return "bg-sky-50 text-sky-700 ring-sky-200";
  if (status === "CLOSED") return "bg-slate-100 text-slate-700 ring-slate-200";

  return "bg-amber-50 text-amber-700 ring-amber-200";
}

const statuses = ["NEW", "CONTACTED", "CLOSED"];

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const total = await prisma.contactMessage.count();

  const newCount = await prisma.contactMessage.count({
    where: {
      status: "NEW",
    },
  });

  const contactedCount = await prisma.contactMessage.count({
    where: {
      status: "CONTACTED",
    },
  });

  return (
    <AdminShell
      title="Contact Messages"
      subtitle="View and manage customer inquiries submitted through the contact page."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Total Messages"
          value={total}
          hint="All website contact messages"
        />

        <AdminStatCard
          label="New Messages"
          value={newCount}
          hint="Need follow-up"
        />

        <AdminStatCard
          label="Contacted"
          value={contactedCount}
          hint="Already followed up"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white text-slate-950 shadow-2xl shadow-black/20">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-black">Latest Messages</h2>
          <p className="mt-1 text-sm text-slate-500">
            Customer contact details, subject, message and follow-up status.
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-lg font-black">No messages yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Contact messages will appear here after customers submit the
              public form.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {messages.map((message) => (
              <article
                key={message.id}
                className="grid gap-5 p-5 transition hover:bg-slate-50 xl:grid-cols-[1fr_1fr_1.4fr_1fr]"
              >
                <div>
                  <p className="font-black">{message.fullName}</p>

                  {message.phone ? (
                    <p className="mt-1 text-sm text-slate-600">
                      {message.phone}
                    </p>
                  ) : null}

                  {message.email ? (
                    <p className="mt-1 text-sm text-slate-500">
                      {message.email}
                    </p>
                  ) : null}

                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    {formatDate(message.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    {message.subject || "No subject"}
                  </p>
                </div>

                <div>
                  <p className="line-clamp-5 text-sm leading-6 text-slate-600">
                    {message.message}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${statusClass(
                      message.status,
                    )}`}
                  >
                    {message.status}
                  </span>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <form key={status} action={updateContactMessageStatus}>
                        {/* Hidden values tell the server action which message to update. */}
                        <input
                          type="hidden"
                          name="messageId"
                          value={message.id}
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
