import { PremiumArticle } from "@/components/premium/Article";
import premiumServices from "@/data/premium-services.json";
import { PremiumService } from "@/components/premium/Service";
import { getServiceRecord } from "@/lib/services";
import { getPublicService } from "@/lib/services";
import { TranslationNotice } from "@/components/site/TranslationNotice";
/**
 * ServiceDetailPage Component
 * ---------------------------
 * Shared detail page layout for individual BM Contractors services.
 *
 * Purpose:
 * - Avoid repeating the same code in every service route.
 * - Supports English and Swahili.
 * - Shows service overview, features and CTA.
 * - Works with database service records or static fallback records.
 *
 * Future:
 * - Add real service images.
 * - Add related products/packages.
 * - Add admin-managed richer content sections.
 */

import { notFound } from "next/navigation";

import type { Language } from "@/lib/i18n/config";

type ServiceDetailPageProps = {
  lang: Language;
  slug: string;
};

function asStringArray(value: unknown) {
  /**
   * Safely converts Prisma Json feature fields into string[].
   */
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is string => typeof item === "string");
}

export async function ServiceDetailPage({
  lang,
  slug,
}: ServiceDetailPageProps) {
  if (premiumServices.some((x) => x.slug === slug)) {
    const record = await getServiceRecord(slug);
    if (record && !record.isPublished) notFound();
    return <PremiumService slug={slug} lang={lang} record={record} />;
  }
  const service = await getPublicService(slug);

  if (!service) {
    notFound();
  }

  const title =
    lang === "sw" ? service.titleSw || service.titleEn : service.titleEn;

  const description =
    lang === "sw"
      ? service.descriptionSw || service.descriptionEn || ""
      : service.descriptionEn || "";

  const content =
    lang === "sw"
      ? service.contentSw || service.contentEn || ""
      : service.contentEn || "";

  const features =
    lang === "sw"
      ? asStringArray(service.featuresSw).length > 0
        ? asStringArray(service.featuresSw)
        : asStringArray(service.featuresEn)
      : asStringArray(service.featuresEn);

  const sw = lang === "sw";
  return (
    <PremiumArticle
      lang={lang}
      title={title}
      intro={description}
      label={sw ? "HUDUMA / BM CONTRACTORS" : "SERVICES / BM CONTRACTORS"}
    >
      {sw &&
        !(service.titleSw && service.descriptionSw && service.contentSw) && (
          <TranslationNotice />
        )}
      <section>
        <h2>{sw ? "Wigo wa huduma" : "Service scope"}</h2>
        <p>{content}</p>
        <ul>
          {features.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>
          {sw ? "Tathmini kabla ya nukuu" : "Assessment before quotation"}
        </h2>
        <p>
          {sw
            ? "Taja aina ya jengo, eneo, vifaa vilivyopo na tatizo au matokeo unayohitaji. Ukaguzi utasaidia kufafanua vifaa, kazi, majaribio na mahitaji ya matengenezo kabla ya kukubaliana bei na ratiba."
            : "Share the building type, location, existing equipment and the problem or outcome required. Assessment helps define equipment, installation, testing and maintenance requirements before price and scheduling are agreed."}
        </p>
      </section>
      <nav
        className="article-links"
        aria-label={sw ? "Huduma zinazohusiana" : "Related services"}
      >
        <a href={"/services?lang=" + lang}>
          {sw ? "Huduma zote" : "All services"} ↗
        </a>
        <a href={"/products?lang=" + lang}>{sw ? "Vifaa" : "Equipment"} ↗</a>
        <a href={"/services/institutional-procurement?lang=" + lang}>
          {sw ? "Ununuzi wa taasisi" : "Institutional procurement"} ↗
        </a>
      </nav>
    </PremiumArticle>
  );
}
