/**
 * Admin Support Articles Page
 * ---------------------------
 * Backend help center management for BM Contractors.
 *
 * Current features:
 * - Reads support articles from Neon database.
 * - Shows article counts.
 * - Allows admin to create support articles.
 *
 * Future:
 * - Admin login protection.
 * - Edit/delete article actions.
 * - Publish/unpublish toggle.
 * - Article image upload.
 */

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminSupportArticleForm } from "@/components/admin/AdminSupportArticleForm";
import { AdminToggleButton } from "@/components/admin/AdminToggleButton";
import { toggleSupportArticlePublished } from "./actions";

export default async function AdminSupportPage() {
  const articles = await prisma.supportArticle.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const articleCount = await prisma.supportArticle.count();

  const publishedCount = await prisma.supportArticle.count({
    where: {
      isPublished: true,
    },
  });

  const categoryCount = new Set(articles.map((article) => article.categoryEn))
    .size;

  return (
    <AdminShell
      title="Support Articles"
      subtitle="Manage customer help center articles, FAQs and support guides."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Articles"
          value={articleCount}
          hint="Total support articles"
        />

        <AdminStatCard
          label="Published"
          value={publishedCount}
          hint="Visible on public website"
        />

        <AdminStatCard
          label="Categories"
          value={categoryCount}
          hint="Article categories"
        />
      </div>

      <div className="mt-6 grid item-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminSupportArticleForm />

        <section className="overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl shadow-black/20">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-black">Current Articles</h2>
            <p className="mt-1 text-sm text-slate-500">
              Help center articles shown on the public support page.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-black">No support articles yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Run <code>npm run seed</code> or add your first article using
                the form.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="grid gap-4 p-5 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="font-black">{article.titleEn}</p>

                      {article.titleSw ? (
                        <p className="mt-1 text-sm text-slate-500">
                          {article.titleSw}
                        </p>
                      ) : null}

                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                        <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">
                          {article.categoryEn}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 ${
                            article.isPublished
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {article.isPublished ? "Published" : "Hidden"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <Link
                        href={`/support/${article.slug}`}
                        target="_blank"
                        className="rounded-full bg-slate-950 px-4 py-2 text-center text-xs font-black text-white transition hover:bg-red-600"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/support/${article.id}/edit`}
                        className="rounded-full border border-slate-300 px-4 py-2 text-center text-xs font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        Edit
                      </Link>

                      <form action={toggleSupportArticlePublished}>
                        <input
                          type="hidden"
                          name="articleId"
                          value={article.id}
                        />
                        <input
                          type="hidden"
                          name="nextValue"
                          value={String(!article.isPublished)}
                        />

                        <AdminToggleButton isPublished={article.isPublished} />
                      </form>
                    </div>
                  </div>

                  {article.summaryEn ? (
                    <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                      {article.summaryEn}
                    </p>
                  ) : null}

                  <p className="text-xs font-semibold text-slate-400">
                    Created: {article.createdAt.toLocaleDateString("en-GB")}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
