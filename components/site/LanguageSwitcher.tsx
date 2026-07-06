"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLang = searchParams.get("lang") === "sw" ? "sw" : "en";

  function hrefFor(lang: "en" | "sw") {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      <Link
        href={hrefFor("en")}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
          currentLang === "en"
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:text-slate-950"
        }`}
      >
        EN
      </Link>
      <Link
        href={hrefFor("sw")}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
          currentLang === "sw"
            ? "bg-slate-950 text-white"
            : "text-slate-600 hover:text-slate-950"
        }`}
      >
        SW
      </Link>
    </div>
  );
}
