"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./home-hero.module.css";

export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = root.current;
      if (!node) return;
      const range = Math.max(1, node.offsetHeight - window.innerHeight);
      const value = Math.min(1, Math.max(0, -node.getBoundingClientRect().top / range));
      node.style.setProperty("--progress", value.toFixed(4));
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", requestUpdate, { passive: true });
    addEventListener("resize", requestUpdate);
    return () => { removeEventListener("scroll", requestUpdate); removeEventListener("resize", requestUpdate); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <section ref={root} className={styles.hero} aria-labelledby="home-title">
      <div className={styles.sticky}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.topline}><span>Independent studio · Bruges</span><span>Design / Development / Direction</span></div>
        <div className={styles.wordmark} aria-hidden="true"><Image src="/media/deeq-wordmark-white.png" alt="" width={762} height={149} priority /></div>
        <div className={styles.statement}>
          <p>Premium web design & creative development</p>
          <h1 id="home-title"><span>Distinct by design.</span><em>Exact in production.</em></h1>
        </div>
        <div className={styles.resolve}>
          <p>DeeQ turns strategy, identity and code into one coherent digital world.</p>
          <div><Link href="/work">See the work</Link><Link href="/contact">Start a project</Link></div>
        </div>
        <div className={styles.progress} aria-hidden="true"><i /><span>01—03</span></div>
      </div>
    </section>
  );
}
