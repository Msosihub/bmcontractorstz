import type { Language } from "@/lib/i18n/config";

/** Build-scoped staging notice; never hide or change the independent Preview guards. */
export function PreviewNotice({ lang }: { lang: Language }) {
  if (process.env.NEXT_PUBLIC_BM_PREVIEW !== "1") return null;
  return (
    <div className="review-bar" role="note" aria-label="Preview">
      <span>
        {lang === "sw" ? "ONYESHO LA MAJARIBIO" : "PROTECTED PREVIEW"}
      </span>
      <span>
        {lang === "sw"
          ? "Kwa majaribio tu · Tumia taarifa za kubuni"
          : "Testing only · Use synthetic enquiries"}
      </span>
    </div>
  );
}
