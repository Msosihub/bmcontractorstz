/**
 * Admin CCTV Package Edit Page
 * ----------------------------
 * Allows BM admin to edit an existing CCTV package.
 *
 * Current features:
 * - Reads package by ID from Neon.
 * - Updates English and Swahili package text.
 * - Updates camera count and starting price.
 * - Updates included items list.
 *
 * Future:
 * - Package image upload.
 * - Package item table.
 * - Package detail preview.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { updateCctvPackage } from "../../actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function asTextLines(value: unknown) {
  /**
   * Converts Prisma Json array into textarea text.
   */
  if (!Array.isArray(value)) return "";

  return value.filter((item) => typeof item === "string").join("\n");
}

function formatMoney(value: number | null) {
  /**
   * Formats package price for preview card.
   */
  if (!value) return "Price after survey";

  return `TZS ${value.toLocaleString("en-US")}`;
}

export default async function AdminCctvPackageEditPage({ params }: PageProps) {
  const resolvedParams = await params;

  const pkg = await prisma.cctvPackage.findUnique({
    where: {
      id: resolvedParams.id,
    },
  });

  if (!pkg) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit CCTV Package"
      subtitle="Update package details, included items and public package content."
    >
      <div className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          action={updateCctvPackage}
          className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
        >
          <input type="hidden" name="packageId" value={pkg.id} />

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
              Package Editor
            </p>

            <h2 className="mt-2 text-2xl font-black">{pkg.titleEn}</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Edit the package shown on the public CCTV packages page and site
              survey form.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="titleEn"
              required
              defaultValue={pkg.titleEn}
              placeholder="English title e.g. 8 Camera CCTV Package"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="titleSw"
              defaultValue={pkg.titleSw || ""}
              placeholder="Swahili title e.g. Package ya CCTV Camera 8"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="cameras"
              required
              inputMode="numeric"
              defaultValue={pkg.cameras}
              placeholder="Camera count e.g. 8"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="priceFrom"
              inputMode="numeric"
              defaultValue={pkg.priceFrom || ""}
              placeholder="Price from TZS e.g. 850000"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <textarea
            name="descriptionEn"
            defaultValue={pkg.descriptionEn || ""}
            placeholder="English description"
            className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="descriptionSw"
            defaultValue={pkg.descriptionSw || ""}
            placeholder="Swahili description"
            className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="includedItems"
            defaultValue={asTextLines(pkg.includedItems)}
            placeholder={`Included items, one per line e.g.\n8 CCTV cameras\n8 channel DVR/NVR\nHDD storage\nCables and connectors\nInstallation option`}
            className="min-h-40 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <SubmitButton loadingText="Saving changes...">
              Save Changes
            </SubmitButton>

            <Link
              href="/admin/packages"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        <section className="h-fit rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Current Package
          </p>

          <h3 className="mt-3 text-2xl font-black">{pkg.titleEn}</h3>

          {pkg.titleSw ? (
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {pkg.titleSw}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            <p>
              <span className="font-black text-slate-950">Slug:</span>{" "}
              {pkg.slug}
            </p>

            <p>
              <span className="font-black text-slate-950">Cameras:</span>{" "}
              {pkg.cameras}
            </p>

            <p>
              <span className="font-black text-slate-950">Price:</span>{" "}
              {formatMoney(pkg.priceFrom)}
            </p>

            <p>
              <span className="font-black text-slate-950">Status:</span>{" "}
              {pkg.isPublished ? "Published" : "Hidden"}
            </p>
          </div>

          {pkg.descriptionEn ? (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {pkg.descriptionEn}
            </p>
          ) : null}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/cctv-packages"
              target="_blank"
              className="inline-flex justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
            >
              View Public Page
            </Link>

            <Link
              href={`/request-site-survey?package=${pkg.slug}`}
              target="_blank"
              className="inline-flex justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Test Survey Link
            </Link>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
