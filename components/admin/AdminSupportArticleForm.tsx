/**
 * AdminSupportArticleForm Component
 * ---------------------------------
 * Form for creating BM Contractors help center articles.
 *
 * Purpose:
 * - Add useful customer support articles from admin.
 * - Supports English and Swahili fields.
 * - Saves article into Neon database through server action.
 *
 * Future:
 * - Edit mode.
 * - Image upload.
 * - Category dropdown.
 * - Publish/unpublish control.
 */

import { SubmitButton } from "@/components/ui/SubmitButton";
import { createSupportArticle } from "@/app/admin/(protected)/support/actions";

export function AdminSupportArticleForm() {
  return (
    <form
      action={createSupportArticle}
      className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
          Add Help Article
        </p>

        <h2 className="mt-2 text-2xl font-black">Create support article</h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add articles that help customers understand CCTV, electric fence, site
          survey, gate motors, support and installation guidance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="categoryEn"
          required
          placeholder="English category e.g. CCTV"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="categorySw"
          placeholder="Swahili category e.g. CCTV"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
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

      <textarea
        name="summaryEn"
        placeholder="English short summary"
        className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="summarySw"
        placeholder="Swahili short summary"
        className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="contentEn"
        required
        placeholder="English full article content"
        className="min-h-40 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="contentSw"
        placeholder="Swahili full article content"
        className="min-h-40 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <SubmitButton loadingText="Saving article...">Save Article</SubmitButton>
    </form>
  );
}
