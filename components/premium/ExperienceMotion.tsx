"use client";

import { useEffect } from "react";

/** Motion enhances already visible, server-rendered content. */
export function ExperienceMotion() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.hasAttribute("data-bm-belt")) {
            entry.target.toggleAttribute(
              "data-bm-in-view",
              entry.isIntersecting,
            );
          } else if (entry.isIntersecting) {
            entry.target.setAttribute("data-bm-entered", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-bm-reveal],[data-bm-belt]")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
