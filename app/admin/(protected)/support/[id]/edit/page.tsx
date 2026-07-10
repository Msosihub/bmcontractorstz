/**
 * Admin Support Article Edit Page
 * -------------------------------
 * Allows BM admin to edit an existing help center article.
 *
 * Current features:
 * - Reads article by ID from Neon.
 * - Updates English and Swahili category, title, summary and content.
 * - Revalidates public support pages after saving.
 *
 * Future:
 * - Rich text editor.
 * - Article image upload.
 * - Delete/archive article.
 * - Related articles.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { updateSupportArticle } from "../../actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminSupportArticleEditPage({
  params,
}: PageProps) {
  const resolvedParams = await params;

  const article = await prisma.supportArticle.findUnique({
    where: {
      id: resolvedParams.id,
    },
  });

  if (!article) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit Support Article"
      subtitle="Update help center content shown to website visitors."
    >
      <div className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          action={updateSupportArticle}
          className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
        >
          <input type="hidden" name="articleId" value={article.id} />

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
              Article Editor
            </p>

            <h2 className="mt-2 text-2xl font-black">{article.titleEn}</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Edit the customer help article shown on the public support page.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="categoryEn"
              required
              defaultValue={article.categoryEn}
              placeholder="English category e.g. CCTV"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="categorySw"
              defaultValue={article.categorySw || ""}
              placeholder="Swahili category e.g. CCTV"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="titleEn"
              required
              defaultValue={article.titleEn}
              placeholder="English title"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="titleSw"
              defaultValue={article.titleSw || ""}
              placeholder="Swahili title"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <textarea
            name="summaryEn"
            defaultValue={article.summaryEn || ""}
            placeholder="English short summary"
            className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="summarySw"
            defaultValue={article.summarySw || ""}
            placeholder="Swahili short summary"
            className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="contentEn"
            required
            defaultValue={article.contentEn || ""}
            placeholder="English full article content"
            className="min-h-52 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="contentSw"
            defaultValue={article.contentSw || ""}
            placeholder="Swahili full article content"
            className="min-h-52 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <SubmitButton loadingText="Saving changes...">
              Save Changes
            </SubmitButton>

            <Link
              href="/admin/support"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        <section className="h-fit rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Current Article
          </p>

          <h3 className="mt-3 text-2xl font-black">{article.titleEn}</h3>

          {article.titleSw ? (
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {article.titleSw}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            <p>
              <span className="font-black text-slate-950">Slug:</span>{" "}
              {article.slug}
            </p>

            <p>
              <span className="font-black text-slate-950">Category:</span>{" "}
              {article.categoryEn}
            </p>

            <p>
              <span className="font-black text-slate-950">Status:</span>{" "}
              {article.isPublished ? "Published" : "Hidden"}
            </p>

            <p>
              <span className="font-black text-slate-950">Created:</span>{" "}
              {article.createdAt.toLocaleDateString("en-GB")}
            </p>
          </div>

          {article.summaryEn ? (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {article.summaryEn}
            </p>
          ) : null}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/support/${article.slug}`}
              target="_blank"
              className="inline-flex justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
            >
              View Public Page
            </Link>

            <Link
              href="/admin/support"
              className="inline-flex justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Back to Articles
            </Link>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
