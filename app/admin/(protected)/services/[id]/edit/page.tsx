/**
 * Admin Service Edit Page
 * -----------------------
 * Allows BM admin to edit an existing service page.
 *
 * Current features:
 * - Reads service by ID from Neon.
 * - Updates English and Swahili service content.
 * - Updates feature lists.
 * - Updates optional image URL/path.
 *
 * Future:
 * - Image upload.
 * - Rich text editor.
 * - Delete service.
 * - Preview mode.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { updateService } from "../../actions";

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

export default async function AdminServiceEditPage({ params }: PageProps) {
  const resolvedParams = await params;

  const service = await prisma.service.findUnique({
    where: {
      id: resolvedParams.id,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit Service"
      subtitle="Update service page content, features and public details."
    >
      <div className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          action={updateService}
          className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
        >
          <input type="hidden" name="serviceId" value={service.id} />

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
              Service Editor
            </p>

            <h2 className="mt-2 text-2xl font-black">{service.titleEn}</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Edit the content shown on the service overview and detail page.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="titleEn"
              required
              defaultValue={service.titleEn}
              placeholder="English title"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="titleSw"
              defaultValue={service.titleSw || ""}
              placeholder="Swahili title"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="eyebrowEn"
              defaultValue={service.eyebrowEn || ""}
              placeholder="English label"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="eyebrowSw"
              defaultValue={service.eyebrowSw || ""}
              placeholder="Swahili label"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <textarea
            name="descriptionEn"
            required
            defaultValue={service.descriptionEn || ""}
            placeholder="English short description"
            className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="descriptionSw"
            defaultValue={service.descriptionSw || ""}
            placeholder="Swahili short description"
            className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="contentEn"
            defaultValue={service.contentEn || ""}
            placeholder="English full content"
            className="min-h-32 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="contentSw"
            defaultValue={service.contentSw || ""}
            placeholder="Swahili full content"
            className="min-h-32 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <input
            name="imageUrl"
            defaultValue={service.imageUrl || ""}
            placeholder="Image URL/path e.g. /images/services/cctv.jpg"
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <textarea
              name="featuresEn"
              defaultValue={asTextLines(service.featuresEn)}
              placeholder="English features, one per line"
              className="min-h-36 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <textarea
              name="featuresSw"
              defaultValue={asTextLines(service.featuresSw)}
              placeholder="Swahili features, one per line"
              className="min-h-36 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <SubmitButton loadingText="Saving changes...">
              Save Changes
            </SubmitButton>

            <Link
              href="/admin/services"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        <section className="h-fit rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Current Service
          </p>

          <h3 className="mt-3 text-2xl font-black">{service.titleEn}</h3>

          {service.titleSw ? (
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {service.titleSw}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            <p>
              <span className="font-black text-slate-950">Slug:</span>{" "}
              {service.slug}
            </p>

            <p>
              <span className="font-black text-slate-950">Label:</span>{" "}
              {service.eyebrowEn || "N/A"}
            </p>

            <p>
              <span className="font-black text-slate-950">Status:</span>{" "}
              {service.isPublished ? "Published" : "Hidden"}
            </p>

            <p>
              <span className="font-black text-slate-950">Image:</span>{" "}
              {service.imageUrl || "No image yet"}
            </p>
          </div>

          {service.descriptionEn ? (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {service.descriptionEn}
            </p>
          ) : null}

          <Link
            href={`/services/${service.slug}`}
            target="_blank"
            className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
          >
            View Public Page
          </Link>
        </section>
      </div>
    </AdminShell>
  );
}
