"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n/config";

/** Small optional control; the logos and their links are server rendered. */
export function BrandBeltControl({ lang }: { lang: Language }) {
  const [paused, setPaused] = useState(false);
  const label = paused
    ? lang === "sw" ? "Endelea kuonyesha chapa" : "Resume brand animation"
    : lang === "sw" ? "Sitisha mwendo wa chapa" : "Pause brand animation";
  return (
    <button
      type="button"
      className="ge-brand-control"
      aria-label={label}
      aria-pressed={paused}
      onClick={(event) => {
        const next = !paused;
        event.currentTarget.closest(".ge-brand-belt")?.toggleAttribute("data-paused", next);
        setPaused(next);
      }}
    >
      <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
        {paused ? <path d="m9 5 10 7-10 7Z" fill="currentColor" /> : <path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" strokeWidth="2.5" />}
      </svg>
    </button>
  );
}
