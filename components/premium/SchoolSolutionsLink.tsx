import type { Language } from "@/lib/i18n/config";
import "./school-solutions-link.css";
export function SchoolSolutionsLink({ lang }: { lang: Language }) {
  return (
    <aside className="bm-schools-related">
      <div>
        <strong>
          {lang === "sw"
            ? "Unapanga mradi wa shule?"
            : "Planning a school project?"}
        </strong>
        <p>
          {lang === "sw"
            ? "Unganisha mahitaji ya ulinzi, mabweni, mawasiliano na umeme katika mpango mmoja wa shule."
            : "Plan security, boarding safety, communication and power around the whole campus."}
        </p>
      </div>
      <a href={"/industries/schools?lang=" + lang}>
        {lang === "sw"
          ? "Suluhisho za shule na mabweni"
          : "Explore school & boarding solutions"}{" "}
        ↗
      </a>
    </aside>
  );
}
