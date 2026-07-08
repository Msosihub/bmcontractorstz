/**
 * FaqJsonLd Component
 * -------------------
 * Adds FAQ structured data for SEO.
 *
 * Purpose:
 * - Helps search engines understand important customer questions.
 * - Matches visible FAQ content on the homepage.
 */

type FaqItem = {
  question: string;
  answer: string;
};

type FaqJsonLdProps = {
  items: FaqItem[];
};

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
