"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionController() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    document.documentElement.classList.add("motionReady");
    elements.forEach((element) => {
      element.dataset.reveal = "";
    });
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("isRevealed"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("isRevealed");
      observer.unobserve(entry.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -4%" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
