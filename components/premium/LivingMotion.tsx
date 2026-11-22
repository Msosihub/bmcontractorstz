"use client";
import { useEffect } from "react";
/** CSS remains static until this small lifecycle controller can safely enable it. */
export function LivingMotion() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-living]"),
    );
    const visible = new Set<Element>();
    const update = () =>
      nodes.forEach((node) => {
        node.toggleAttribute(
          "data-living-active",
          visible.has(node) && !document.hidden,
        );
      });
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting
            ? visible.add(entry.target)
            : visible.delete(entry.target),
        );
        update();
      },
      { threshold: 0.1 },
    );
    nodes.forEach((node) => {
      node.setAttribute("data-living-ready", "");
      observer.observe(node);
    });
    const revealOffice = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[data-office-link]",
      );
      if (!link) return;
      const target = document.getElementById(link.hash.slice(1));
      if (target instanceof HTMLDetailsElement) target.open = true;
    };
    document.addEventListener("click", revealOffice);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", revealOffice);
      document.removeEventListener("visibilitychange", update);
      nodes.forEach((node) => {
        node.removeAttribute("data-living-ready");
        node.removeAttribute("data-living-active");
      });
    };
  }, []);
  return null;
}
