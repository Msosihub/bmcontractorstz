/**
 * Admin Services Page
 * -------------------
 * Backend service page management for BM Contractors.
 *
 * Current features:
 * - Reads services from Neon database.
 * - Shows service counts.
 * - Allows admin to create or update service pages.
 *
 * Future:
 * - Admin login protection.
 * - Image uploads.
 * - Edit/delete services.
 * - Publish/unpublish services.
 */

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminServiceForm } from "@/components/admin/AdminServiceForm";
import { AdminToggleButton } from "@/components/admin/AdminToggleButton";
import { toggleServicePublished } from "./actions";

function asStringArray(value: unknown) {
  /**
   * Safely converts Prisma Json fields into string[].
   */
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is string => typeof item === "string");
}

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const serviceCount = await prisma.service.count();

  const publishedCount = await prisma.service.count({
    where: {
      isPublished: true,
    },
  });

  return (
    <AdminShell
      title="Services"
      subtitle="Manage BM Contractors service pages and customer-facing service content."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Services"
          value={serviceCount}
          hint="Total service pages"
        />

        <AdminStatCard
          label="Published"
          value={publishedCount}
          hint="Visible on public website"
        />

        <AdminStatCard
          label="Main Set"
          value={6}
          hint="CCTV, Fence, Gate, Access, Network, Power"
        />
      </div>

      <div className="mt-6 grid item-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminServiceForm />

        <section className="overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl shadow-black/20">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-black">Current Services</h2>
            <p className="mt-1 text-sm text-slate-500">
              Service pages shown on the public website.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-black">No services yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Run <code>npm run seed</code> or add your first service using
                the form.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {services.map((service) => {
                const features = asStringArray(service.featuresEn);

                return (
                  <article
                    key={service.id}
                    className="grid gap-4 p-5 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <p className="font-black">{service.titleEn}</p>

                        {service.titleSw ? (
                          <p className="mt-1 text-sm text-slate-500">
                            {service.titleSw}
                          </p>
                        ) : null}

                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                          {service.eyebrowEn ? (
                            <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">
                              {service.eyebrowEn}
                            </span>
                          ) : null}

                          <span
                            className={`rounded-full px-3 py-1 ${
                              service.isPublished
                                ? "bg-green-50 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {service.isPublished ? "Published" : "Hidden"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <Link
                          href={`/services/${service.slug}`}
                          target="_blank"
                          className="rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-black text-white transition hover:bg-red-600"
                        >
                          View
                        </Link>

                        <form action={toggleServicePublished}>
                          <input
                            type="hidden"
                            name="serviceId"
                            value={service.id}
                          />
                          <input
                            type="hidden"
                            name="nextValue"
                            value={String(!service.isPublished)}
                          />

                          <AdminToggleButton
                            isPublished={service.isPublished}
                          />
                        </form>
                      </div>
                    </div>

                    {service.descriptionEn ? (
                      <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                        {service.descriptionEn}
                      </p>
                    ) : null}

                    {features.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {features.slice(0, 5).map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
