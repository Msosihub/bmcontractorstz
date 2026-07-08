/**
 * Admin Projects Page
 * -------------------
 * Backend project/gallery management for BM Contractors.
 *
 * Current features:
 * - Reads project records from Neon database.
 * - Shows project counts.
 * - Allows admin to create project/gallery records.
 *
 * Future:
 * - Admin login protection.
 * - Image uploads.
 * - Edit/delete projects.
 * - Publish/unpublish project.
 */

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminProjectForm } from "@/components/admin/AdminProjectForm";
import { AdminToggleButton } from "@/components/admin/AdminToggleButton";
import { toggleProjectPublished } from "./actions";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const projectCount = await prisma.project.count();

  const publishedCount = await prisma.project.count({
    where: {
      isPublished: true,
    },
  });

  const categoryCount = new Set(projects.map((project) => project.category))
    .size;

  return (
    <AdminShell
      title="Projects & Gallery"
      subtitle="Manage completed work, installation photos and site project examples."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Projects"
          value={projectCount}
          hint="Total gallery records"
        />

        <AdminStatCard
          label="Published"
          value={publishedCount}
          hint="Visible on public website"
        />

        <AdminStatCard
          label="Categories"
          value={categoryCount}
          hint="Project categories"
        />
      </div>

      <div className="mt-6 grid item-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminProjectForm />

        <section className="overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl shadow-black/20">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-black">Current Projects</h2>
            <p className="mt-1 text-sm text-slate-500">
              Gallery records shown on the public projects page.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-black">No projects yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Run <code>npm run seed</code> or add your first project using
                the form.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="grid gap-4 p-5 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="font-black">{project.titleEn}</p>

                      {project.titleSw ? (
                        <p className="mt-1 text-sm text-slate-500">
                          {project.titleSw}
                        </p>
                      ) : null}

                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                        <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">
                          {project.category}
                        </span>

                        {project.location ? (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                            {project.location}
                          </span>
                        ) : null}

                        <span
                          className={`rounded-full px-3 py-1 ${
                            project.isPublished
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {project.isPublished ? "Published" : "Hidden"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <Link
                        href="/projects"
                        target="_blank"
                        className="rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-black text-white transition hover:bg-red-600"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-full border border-slate-300 px-4 py-2 text-center text-xs font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        Edit
                      </Link>

                      <form action={toggleProjectPublished}>
                        <input
                          type="hidden"
                          name="projectId"
                          value={project.id}
                        />
                        <input
                          type="hidden"
                          name="nextValue"
                          value={String(!project.isPublished)}
                        />

                        <AdminToggleButton isPublished={project.isPublished} />
                      </form>
                    </div>
                  </div>

                  {project.descriptionEn ? (
                    <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                      {project.descriptionEn}
                    </p>
                  ) : null}

                  {project.imageUrl ? (
                    <p className="text-xs font-semibold text-slate-400">
                      Image: {project.imageUrl}
                    </p>
                  ) : (
                    <p className="text-xs font-semibold text-slate-400">
                      No image yet
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
