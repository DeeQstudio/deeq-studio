import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { HomeHero } from "@/components/home-hero";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import styles from "./home.module.css";

export const metadata: Metadata = pageMetadata({ title: "DeeQ Studio | Web Design, Development & Digital Care in Bruges", description: "Independent web design and creative development studio in Bruges, Belgium. Distinctive websites, identities and digital systems.", path: "/" });

const disciplines = [
  { href: "/services/web-design", title: "Web design & development", copy: "Strategy, responsive interface design, creative development, accessibility and production delivery." },
  { href: "/services/identity", title: "Identity & content", copy: "Visual systems and art direction that remain coherent beyond one screen." },
  { href: "/services/digital-care", title: "Digital care", copy: "Maintenance, launches and ongoing improvements without technical lock-in." },
];

export default function HomePage() {
  const kweker = projects["de-kweker"];
  const kwartier = projects["kwartier-west"];
  return <>
    <HomeHero />
    <section className={styles.standard}>
      <aside aria-label="Production standard"><span>Responsive</span><span>Accessible</span><span>Performant</span><span>Production-ready</span></aside>
      <article><p>The standard</p><h2><span>Nothing left</span><span>to finish</span><span>after launch.</span></h2><p>Responsive behaviour, accessibility, performance, metadata, browser details and a clean handoff are part of the design—not repairs for later.</p></article>
    </section>
    <section className={styles.work} aria-labelledby="selected-work">
      <header><p>Selected work · live</p><h2 id="selected-work">Two clients.<em>Two visual worlds.</em></h2></header>
      <article className={`${styles.project} ${styles.kweker}`}><Image src={kweker.image} alt={kweker.imageAlt} fill sizes="100vw" /><span className={styles.kwekerBadge} aria-hidden="true">KWKR<small>Official platform</small></span><div className={styles.projectCopy}><div><small>{kweker.eyebrow}</small><h3>{kweker.name}</h3></div><div><p>{kweker.summary}</p><Link href="/work/de-kweker">Enter De Kweker</Link></div></div></article>
      <article className={`${styles.project} ${styles.kwartier}`}><Image src={kwartier.image} alt={kwartier.imageAlt} fill sizes="100vw" /><div className={styles.projectCopy}><div><small>{kwartier.eyebrow}</small><h3>{kwartier.name}</h3><Image className={styles.kwLogo} src="/media/kwartier-west-wordmark.png" alt="Kwartier West" width={804} height={185} /></div><div><p>{kwartier.summary}</p><Link href="/work/kwartier-west">Enter Kwartier West</Link></div></div></article>
    </section>
    <section className={styles.disciplines}><header><p>One accountable studio</p><h2>Direction, design and delivery.</h2></header><div className={styles.list}>{disciplines.map((item, index) => <Link href={item.href} key={item.href}><small>0{index + 1}</small><h3>{item.title}</h3><p>{item.copy}</p></Link>)}</div></section>
    <ContactCta>Have a world that needs a digital home?</ContactCta>
  </>;
}
