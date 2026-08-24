"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function SpatialHero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
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
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="spatialHero" ref={root} aria-labelledby="hero-title">
      <div className="spatialHeroSticky">
        <div className="spatialAtmosphere" aria-hidden="true" />
        <div className="logoSequence" aria-hidden="true">
          <div className="logoField logoFieldBase"><Image src="/media/deeq-wordmark-white.png" alt="" width={762} height={149} priority /></div>
          <div className="logoField logoFieldBlue"><Image src="/media/deeq-wordmark-white.png" alt="" width={762} height={149} priority /></div>
          <span className="logoSweep" />
          <p><span>Direction</span><span>Design</span><span>Development</span></p>
        </div>
        <div className="spatialIntro">
          <p className="eyebrow">Independent design & creative development · Bruges</p>
          <h1 id="hero-title"><span>Digital worlds,</span><span>built to <em>move.</em></span></h1>
        </div>
        <div className="spatialResolve">
          <p>DeeQ gives every organisation its own visual system—not an agency template with a different logo.</p>
          <div><Link className="button" href="/work">Explore selected work</Link><Link className="textLink" href="/contact">Start a project</Link></div>
        </div>
        <div className="spatialIndex" aria-hidden="true"><span>Scroll to reveal</span><b>01</b><i /></div>
      </div>
    </section>
  );
}
