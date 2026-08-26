import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import styles from "./work.module.css";

export const metadata: Metadata = pageMetadata({ title: "Selected Work", description: "Selected live work by DeeQ Studio for De Kweker and Kwartier West.", path: "/work" });

export default function WorkPage() {
  const kweker = projects["de-kweker"];
  const kwartier = projects["kwartier-west"];
  return <>
    <header className={styles.intro}><div><span>Selected work / 2026</span><i /></div><h1>Not a portfolio grid.<br /><em>Two worlds in full.</em></h1><p>Each project follows its own audience, identity and content. DeeQ supplies the direction and production discipline underneath.</p></header>
    <section className={`${styles.world} ${styles.kweker}`}><Image src={kweker.image} alt={kweker.imageAlt} fill priority sizes="100vw" /><div className={styles.worldIndex}>01 / 02</div><div className={styles.copy}><span>{kweker.eyebrow}</span><h2>{kweker.name}</h2><p>{kweker.summary}</p><Link href="/work/de-kweker">Enter the case</Link></div></section>
    <section className={`${styles.world} ${styles.kwartier}`}><Image src={kwartier.image} alt={kwartier.imageAlt} fill sizes="100vw" /><div className={styles.redBlock} aria-hidden="true" /><div className={styles.worldIndex}>02 / 02</div><div className={styles.kwCopy}><Image src="/media/kwartier-west-wordmark.png" alt="Kwartier West" width={804} height={185} /><p>{kwartier.summary}</p><Link href="/work/kwartier-west">Enter the case</Link></div></section>
    <ContactCta>Need a visual world of your own?</ContactCta>
  </>;
}
