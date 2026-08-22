import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <span>© {new Date().getFullYear()} {site.name}</span>
      <span>{site.location}</span>
      <Link href="/contact">Start a project</Link>
    </footer>
  );
}
