/**
 * Admin CCTV Packages Page
 * ------------------------
 * Backend CCTV package management for BM Contractors.
 *
 * Current features:
 * - Shows CCTV packages from Neon database.
 * - Allows admin to create or update packages by title/slug.
 * - Shows package count, published count and package cards.
 *
 * Future:
 * - Admin login protection.
 * - Edit/delete package buttons.
 * - Publish/unpublish package.
 * - Upload package images.
 */

import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminCctvPackageForm } from "@/components/admin/AdminCctvPackageForm";
import { AdminToggleButton } from "@/components/admin/AdminToggleButton";
import { toggleCctvPackagePublished } from "./actions";

function formatMoney(value: number | null) {
  /**
   * Formats package starting price.
   */
  if (!value) return "Price after survey";

  return `From TZS ${value.toLocaleString("en-US")}`;
}

function asStringArray(value: unknown) {
  /**
   * Safely converts Prisma Json includedItems into string[].
   */
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is string => typeof item === "string");
}

export default async function AdminPackagesPage() {
  const packages = await prisma.cctvPackage.findMany({
    orderBy: {
      cameras: "asc",
    },
  });

  const packageCount = await prisma.cctvPackage.count();

  const publishedCount = await prisma.cctvPackage.count({
    where: {
      isPublished: true,
    },
  });

  return (
    <AdminShell
      title="CCTV Packages"
      subtitle="Manage popular CCTV package cards shown on the public website."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Packages"
          value={packageCount}
          hint="Total CCTV packages"
        />

        <AdminStatCard
          label="Published"
          value={publishedCount}
          hint="Visible on public website"
        />

        <AdminStatCard
          label="Sample Set"
          value={6}
          hint="4, 8, 10, 16, 24, 32 cameras"
        />
      </div>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminCctvPackageForm />

        <section className="overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl shadow-black/20">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-black">Current Packages</h2>
            <p className="mt-1 text-sm text-slate-500">
              Packages shown on public CCTV packages page.
            </p>
          </div>

          {packages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-black">No packages yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Run <code>npm run seed</code> or add your first package using
                the form.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {packages.map((pkg) => {
                const includedItems = asStringArray(pkg.includedItems);

                return (
                  <article
                    key={pkg.id}
                    className="grid gap-4 p-5 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <p className="font-black">{pkg.titleEn}</p>

                        {pkg.titleSw ? (
                          <p className="mt-1 text-sm text-slate-500">
                            {pkg.titleSw}
                          </p>
                        ) : null}

                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                          <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">
                            {pkg.cameras} Cameras
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 ${
                              pkg.isPublished
                                ? "bg-green-50 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {pkg.isPublished ? "Published" : "Hidden"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:items-end">
                        <p className="text-sm font-black">
                          {formatMoney(pkg.priceFrom)}
                        </p>

                        <form action={toggleCctvPackagePublished}>
                          <input
                            type="hidden"
                            name="packageId"
                            value={pkg.id}
                          />
                          <input
                            type="hidden"
                            name="nextValue"
                            value={String(!pkg.isPublished)}
                          />

                          <AdminToggleButton isPublished={pkg.isPublished} />
                        </form>
                      </div>
                    </div>

                    {pkg.descriptionEn ? (
                      <p className="text-sm leading-6 text-slate-600">
                        {pkg.descriptionEn}
                      </p>
                    ) : null}

                    {includedItems.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {includedItems.slice(0, 6).map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {item}
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
