import Image from "next/image";
import Link from "next/link";
import { navigation, site } from "@/content/site";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.identity}><Link href="/" aria-label="DeeQ Studio home"><Image src="/media/deeq-wordmark-white.png" alt="DeeQ Studio" width={762} height={149} /></Link><p>Independent web design and creative development from Bruges.</p></div>
      <nav aria-label="Footer navigation">{navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link href="/contact">Contact</Link></nav>
      <div className={styles.contact}><span>New projects</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
      <div className={styles.base}><span>© {new Date().getFullYear()} {site.name}</span><span>{site.location}</span><Link href="/">Back to start ↑</Link></div>
    </footer>
  );
}
