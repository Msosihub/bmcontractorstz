import entries from "@/data/blog.json";
/** Reviewed local editorial source. No live CMS, customer data or manufacturer article copying. */
export const blogArticles = entries.filter((entry) => entry.published);
export function getBlogArticle(slug: string) {
  return blogArticles.find((entry) => entry.slug === slug);
}
