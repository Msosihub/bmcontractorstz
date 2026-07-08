/**
 * Admin Project Edit Page
 * -----------------------
 * Allows BM admin to edit an existing project/gallery record.
 *
 * Current features:
 * - Reads project by ID from Neon.
 * - Updates English and Swahili project content.
 * - Updates category, location and image URL/path.
 *
 * Future:
 * - Image upload.
 * - Multiple project images.
 * - Before/after gallery.
 * - Project detail page preview.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { updateProject } from "../../actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProjectEditPage({ params }: PageProps) {
  const resolvedParams = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: resolvedParams.id,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit Project"
      subtitle="Update gallery/project details shown on the public projects page."
    >
      <div className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          action={updateProject}
          className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
        >
          <input type="hidden" name="projectId" value={project.id} />

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
              Project Editor
            </p>

            <h2 className="mt-2 text-2xl font-black">{project.titleEn}</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Edit the project card shown on the public gallery page.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="titleEn"
              required
              defaultValue={project.titleEn}
              placeholder="English title"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="titleSw"
              defaultValue={project.titleSw || ""}
              placeholder="Swahili title"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="category"
              required
              defaultValue={project.category}
              placeholder="Category e.g. CCTV"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="location"
              defaultValue={project.location || ""}
              placeholder="Location e.g. Moshi / Arusha / Office"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <input
            name="imageUrl"
            defaultValue={project.imageUrl || ""}
            placeholder="Image URL/path e.g. /images/projects/cctv-site.jpg"
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="descriptionEn"
            defaultValue={project.descriptionEn || ""}
            placeholder="English project description"
            className="min-h-32 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="descriptionSw"
            defaultValue={project.descriptionSw || ""}
            placeholder="Swahili project description"
            className="min-h-32 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <SubmitButton loadingText="Saving changes...">
              Save Changes
            </SubmitButton>

            <Link
              href="/admin/projects"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        <section className="h-fit rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Current Project
          </p>

          <h3 className="mt-3 text-2xl font-black">{project.titleEn}</h3>

          {project.titleSw ? (
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {project.titleSw}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            <p>
              <span className="font-black text-slate-950">Slug:</span>{" "}
              {project.slug}
            </p>

            <p>
              <span className="font-black text-slate-950">Category:</span>{" "}
              {project.category}
            </p>

            <p>
              <span className="font-black text-slate-950">Location:</span>{" "}
              {project.location || "N/A"}
            </p>

            <p>
              <span className="font-black text-slate-950">Status:</span>{" "}
              {project.isPublished ? "Published" : "Hidden"}
            </p>

            <p>
              <span className="font-black text-slate-950">Image:</span>{" "}
              {project.imageUrl || "No image yet"}
            </p>
          </div>

          {project.imageUrl ? (
            <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-slate-950">
              <img
                src={project.imageUrl}
                alt={project.titleEn}
                className="aspect-video w-full object-cover"
              />
            </div>
          ) : (
            <div className="mt-5 flex aspect-video items-center justify-center rounded-[1.5rem] bg-slate-950 text-white">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">
                  BM
                </div>
                <p className="mt-3 text-sm font-bold text-slate-300">
                  Image placeholder
                </p>
              </div>
            </div>
          )}

          {project.descriptionEn ? (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {project.descriptionEn}
            </p>
          ) : null}

          <Link
            href="/projects"
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
