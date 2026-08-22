"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelectors = [
  ".workPair > header",
  ".pageHero > *", ".workIndexItem > *", ".serviceList > a",
  ".editorial > *", ".contactPanel > *", ".caseNarrative > *",
  ".kwekerGallery > *", ".kwManifesto > *", ".kwClose > *", ".nextCase > *",
];

export function MotionController() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = revealSelectors.flatMap((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)));
    document.documentElement.classList.add("motionReady");
    elements.forEach((element, index) => {
      element.dataset.reveal = "";
      element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 70}ms`);
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
