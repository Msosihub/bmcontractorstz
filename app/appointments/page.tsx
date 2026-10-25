import { PremiumArticle } from "@/components/premium/Article";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = (await searchParams).lang === "sw" ? "sw" : "en";
  const sw = lang === "sw";
  return (
    <PremiumArticle
      lang={lang}
      title={sw ? "Panga ukaguzi wa eneo." : "Arrange a site assessment."}
      intro={
        sw
          ? "Tuma mahitaji yako kupitia fomu ya ukaguzi. Timu itawasiliana nawe kuhusu eneo, wigo na muda unaowezekana; kutuma ombi si uthibitisho wa miadi."
          : "Submit the site survey form with your requirements. The team will follow up on location, scope and possible timing; submitting a request does not confirm an appointment."
      }
    >
      <section>
        <h2>{sw ? "Taarifa za kuandaa" : "What to prepare"}</h2>
        <p>
          {sw
            ? "Eneo, aina ya jengo, huduma unayohitaji, vifaa vilivyopo na muda unaokufaa. Taja pia kama ni tatizo la mfumo uliopo au ufungaji mpya."
            : "Location, building type, required service, existing equipment and preferred timing. Say whether this concerns an existing-system fault or a new installation."}
        </p>
      </section>
    </PremiumArticle>
  );
}
