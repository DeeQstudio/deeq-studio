import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return <footer className="siteFooter siteFooterP4">
    <div><span>DeeQ Studio</span><span>{site.location}</span></div>
    <nav aria-label="Footer navigation"><Link href="/work">Work</Link><Link href="/services">Practice</Link><Link href="/process">Process</Link><Link href="/contact">Contact</Link></nav>
    <a href={`mailto:${site.email}`}>{site.email}</a>
    <small>© 2026</small>
  </footer>;
}
