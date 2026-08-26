import Image from "next/image";
import Link from "next/link";
import styles from "./contact-cta.module.css";

export function ContactCta({ children = "Bring the rough idea." }: { children?: React.ReactNode }) {
  return <section className={styles.cta}><div className={styles.topline}><span>Next / a conversation</span><span>Bruges · Belgium</span></div><div className={styles.body}><h2>{children}</h2><div className={styles.action}><p>No polished briefing needed. Start with what exists, what is stuck and what should change.</p><Link href="/contact">Start a project <span aria-hidden="true">↗</span></Link></div></div><Image className={styles.mark} src="/media/deeq-wordmark-white.png" alt="" width={762} height={149} aria-hidden="true" /></section>;
}
