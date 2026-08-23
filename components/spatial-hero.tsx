"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DeeQScene = dynamic(() => import("@/components/spatial-hero-scene"), {
  ssr: false,
  loading: () => null,
});

export function SpatialHero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const updateCapability = () => setCanRender(!reduced.matches && !coarse.matches && window.innerWidth >= 760);
    updateCapability();
    reduced.addEventListener("change", updateCapability);
    coarse.addEventListener("change", updateCapability);

    let frame = 0;
    const update = () => {
      frame = 0;
      const element = root.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      progress.current = Math.min(1, Math.max(0, -rect.top / Math.max(1, element.offsetHeight - window.innerHeight)));
      element.style.setProperty("--hero-progress", progress.current.toFixed(4));
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      reduced.removeEventListener("change", updateCapability);
      coarse.removeEventListener("change", updateCapability);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="spatialHero" ref={root} aria-labelledby="hero-title">
      <div className="spatialHeroSticky">
        <div className="spatialAtmosphere" aria-hidden="true" />
        {canRender && <DeeQScene progress={progress} />}
        <div className="spatialWordmark" aria-hidden="true">
          <span className="wordmarkGhost wordmarkGhostOne" />
          <span className="wordmarkGhost wordmarkGhostTwo" />
          <span className="spatialWordmarkType"><strong>DeeQ</strong><span>Studio</span></span>
        </div>
        <div className="mobileConstruction" aria-hidden="true">
          <span className="mobileGrid" />
          <span className="mobileD">D</span><span className="mobileQ">Q</span>
          <div className="mobileProjectFrame"><Image src="/media/kwkr-hero.webp" alt="" fill sizes="82vw" /><i>Image</i><b>Interface</b></div>
          <span className="mobileBlueprint">FORM / GRID / IMAGE / INTERFACE</span>
        </div>
        <div className="spatialIntro">
          <p className="eyebrow">Independent design & creative development · Bruges</p>
          <h1 id="hero-title"><span>Digital worlds,</span><span>built to <em>move.</em></span></h1>
        </div>
        <div className="spatialResolve">
          <p>DeeQ gives every organisation its own visual system—not an agency template with a different logo.</p>
          <div><Link className="button" href="/work">Explore selected work</Link><Link className="textLink" href="/contact">Start a project</Link></div>
        </div>
        <div className="spatialIndex" aria-hidden="true"><span>Scroll to construct</span><b>01</b><i /></div>
      </div>
    </section>
  );
}
