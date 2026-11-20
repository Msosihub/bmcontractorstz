"use client";

import { useEffect } from "react";

/** Motion enhances already visible, server-rendered content. */
export function ExperienceMotion() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const main = document.querySelector("main");
    const visibility = () =>
      main?.toggleAttribute("data-bm-hidden", document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.hasAttribute("data-bm-belt")) {
            entry.target.toggleAttribute(
              "data-bm-in-view",
              entry.isIntersecting,
            );
          }
          if (
            entry.isIntersecting &&
            entry.target.hasAttribute("data-bm-reveal")
          ) {
            entry.target.setAttribute("data-bm-entered", "");
            if (!entry.target.hasAttribute("data-bm-belt"))
              observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-bm-reveal],[data-bm-belt]")
      .forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      main?.removeAttribute("data-bm-hidden");
    };
  }, []);
  return null;
}
