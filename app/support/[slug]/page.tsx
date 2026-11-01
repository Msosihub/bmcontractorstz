import { pageMetadata } from "@/lib/seo";
import { PremiumArticle } from "@/components/premium/Article";
import { getPublicSupportArticle } from "@/lib/support";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const article = await getPublicSupportArticle(slug);
  const translated = Boolean(
    article?.titleSw && article?.summarySw && article?.contentSw,
  );
  const title =
    (lang === "sw" ? article?.titleSw : article?.titleEn) ||
    article?.titleEn ||
    "BM Support";
  const description =
    (lang === "sw" ? article?.summarySw : article?.summaryEn) ||
    (lang === "sw"
      ? "Mwongozo wa mifumo ya usalama kutoka BM Contractors."
      : "Security system guidance from BM Contractors.");
  return pageMetadata(
    "/support/" + slug,
    lang,
    [title, description],
    translated,
  );
}

export default async function Page({ params, searchParams }: PageProps) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const sw = lang === "sw";
  const article = await getPublicSupportArticle((await params).slug);
  if (!article) notFound();
  const title = sw ? article.titleSw || article.titleEn : article.titleEn;
  return (
    <PremiumArticle
      lang={lang}
      title={title}
      intro={
        (sw ? article.summarySw || article.summaryEn : article.summaryEn) ||
        undefined
      }
      label={sw ? article.categorySw || article.categoryEn : article.categoryEn}
    >
      {sw && !(article.titleSw && article.summarySw && article.contentSw) && (
        <p className="scope-note">
          Baadhi ya maelezo bado yako kwa Kiingereza.
        </p>
      )}
      <section>
        <p className="preserve-lines">
          {sw ? article.contentSw || article.contentEn : article.contentEn}
        </p>
      </section>
      <nav className="article-links">
        <a href={"/support?lang=" + lang}>
          {sw ? "Miongozo yote" : "All guides"} ↗
        </a>
        <a href={"/services?lang=" + lang}>
          {sw ? "Huduma zinazohusiana" : "Explore services"} ↗
        </a>
      </nav>
    </PremiumArticle>
  );
}
