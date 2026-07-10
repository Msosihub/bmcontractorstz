/**
 * AdminProjectForm Component
 * --------------------------
 * Form for creating BM Contractors project/gallery records.
 *
 * Purpose:
 * - Add completed work examples to the project gallery.
 * - Supports English and Swahili project titles/descriptions.
 * - Accepts optional image URL for now.
 *
 * Future:
 * - Replace image URL input with real image upload.
 * - Add multiple images per project.
 * - Add before/after image support.
 */

import { SubmitButton } from "@/components/ui/SubmitButton";
import { createProject } from "@/app/admin/(protected)/projects/actions";

export function AdminProjectForm() {
  return (
    <form
      action={createProject}
      className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
          Add Project
        </p>

        <h2 className="mt-2 text-2xl font-black">Create gallery project</h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add site work examples like CCTV installation, electric fence, access
          control, gate motor and networking projects.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="titleEn"
          required
          placeholder="English title"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="titleSw"
          placeholder="Swahili title"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="category"
          required
          placeholder="Category e.g. CCTV"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="location"
          placeholder="Location e.g. Moshi / Arusha / Office"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <input
        name="imageUrl"
        placeholder="Image URL or path e.g. /images/projects/cctv-site.jpg"
        className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="descriptionEn"
        placeholder="English project description"
        className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="descriptionSw"
        placeholder="Swahili project description"
        className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <SubmitButton loadingText="Saving project...">Save Project</SubmitButton>
    </form>
  );
}
