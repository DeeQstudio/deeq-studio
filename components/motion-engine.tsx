"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionEngine() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const shortLandscape = window.innerWidth > window.innerHeight && window.innerHeight <= 560;

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal-soft], [data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.001 },
          {
            opacity: 1,
            duration: el.hasAttribute("data-reveal-soft") ? 0.75 : 0.7,
            ease: "power1.out",
            scrollTrigger: { trigger: el, start: "top 91%", once: true },
          },
        );
      });

      if (!shortLandscape) {
        document.querySelectorAll<HTMLElement>("[data-scale-media]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: coarse ? 1.025 : 1.07 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: coarse ? 0.65 : true,
              },
            },
          );
        });
      }

      const hero = document.querySelector<HTMLElement>("[data-brand-hero]");
      if (hero) {
        const left = hero.querySelector<HTMLElement>("[data-brand-left]");
        const right = hero.querySelector<HTMLElement>("[data-brand-right]");
        const core = hero.querySelector<HTMLElement>("[data-brand-core]");
        const axis = hero.querySelector<HTMLElement>("[data-brand-axis]");
        const caption = hero.querySelector<HTMLElement>("[data-brand-caption]");

        const splitDistance = () => {
          if (window.innerWidth > window.innerHeight && window.innerHeight <= 560) {
            return Math.min(window.innerWidth * 0.16, 150);
          }
          return Math.min(window.innerWidth * (window.innerWidth < 700 ? 0.27 : 0.23), 380);
        };

        if (left && right && core) {
          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: () => `+=${Math.max(1, hero.offsetHeight - window.innerHeight)}`,
              scrub: coarse ? 0.55 : 0.72,
              invalidateOnRefresh: true,
            },
          });

          heroTimeline
            .set([left, right], { x: 0, opacity: 1 }, 0)
            .set(core, { scale: 0.82, opacity: 0 }, 0)
            .to(left, { x: () => -splitDistance(), duration: 0.42, ease: "none" }, 0.18)
            .to(right, { x: () => splitDistance(), duration: 0.42, ease: "none" }, 0.18)
            .to(left, { opacity: 0, duration: 0.16, ease: "none" }, 0.5)
            .to(right, { opacity: 0, duration: 0.16, ease: "none" }, 0.5)
            .to(core, { scale: 1, opacity: 1, duration: 0.24, ease: "none" }, 0.44)
            .to(core, { scale: 1, opacity: 1, duration: 0.26, ease: "none" }, 0.68);

          if (axis) {
            heroTimeline
              .fromTo(axis, { scaleY: 0.08, opacity: 0.08 }, { scaleY: 1, opacity: 0.32, duration: 0.28, ease: "none" }, 0.18)
              .to(axis, { opacity: 0.12, duration: 0.22, ease: "none" }, 0.5);
          }
          if (caption) {
            heroTimeline.fromTo(caption, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "none" }, 0.74);
          }
        }
      }

      document.querySelectorAll<HTMLElement>("[data-ghost-track]").forEach((track, index) => {
        const parent = track.parentElement;
        if (!parent || getComputedStyle(track).display === "none" || !track.offsetParent) return;
        gsap.fromTo(
          track,
          { xPercent: index === 1 ? -10 : 0 },
          {
            xPercent: index === 1 ? 12 : -22,
            ease: "none",
            scrollTrigger: { trigger: parent, start: "top bottom", end: "bottom top", scrub: 1.1 },
          },
        );
      });

      const kweker = document.querySelector<HTMLElement>("[data-kweker-world]");
      if (kweker && !shortLandscape) {
        const city = kweker.querySelector<HTMLElement>("[data-kweker-city]");
        const name = kweker.querySelector<HTMLElement>("[data-kweker-name]");
        const media = kweker.querySelector<HTMLElement>("[data-kweker-media]");

        if (city) gsap.to(city, { xPercent: coarse ? -4 : -9, ease: "none", scrollTrigger: { trigger: kweker, start: "top bottom", end: "bottom top", scrub: coarse ? 0.7 : 1 } });
        if (name) gsap.fromTo(name, { xPercent: coarse ? -2 : -4 }, { xPercent: coarse ? 2.5 : 5, ease: "none", scrollTrigger: { trigger: kweker, start: "top 80%", end: "bottom top", scrub: coarse ? 0.7 : 1 } });
        if (media) gsap.fromTo(media, { scale: coarse ? 1.035 : 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: kweker, start: "top bottom", end: "bottom top", scrub: coarse ? 0.7 : 1 } });
      }

      const kw = document.querySelector<HTMLElement>("[data-kw-world]");
      if (kw && !shortLandscape) {
        const photo = kw.querySelector<HTMLElement>("[data-kw-photo]");
        const word = kw.querySelector<HTMLElement>("[data-kw-word]");

        if (photo) gsap.fromTo(photo, { xPercent: coarse ? 2.5 : 6 }, { xPercent: coarse ? -2 : -5, ease: "none", scrollTrigger: { trigger: kw, start: "top bottom", end: "bottom top", scrub: coarse ? 0.7 : 1 } });
        if (word) gsap.fromTo(word, { xPercent: coarse ? -2 : -5 }, { xPercent: coarse ? 2 : 5, ease: "none", scrollTrigger: { trigger: kw, start: "top bottom", end: "bottom top", scrub: coarse ? 0.7 : 1 } });
      }
    });

    let refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    };

    window.addEventListener("orientationchange", refresh);
    window.addEventListener("pageshow", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener("pageshow", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
