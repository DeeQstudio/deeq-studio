import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return <header className="siteHeader siteHeaderP4">
    <Link className="brand" href="/" aria-label="DeeQ Studio home"><Image src="/media/deeq-wordmark-white.png" alt="DeeQ Studio" width={762} height={149} priority /></Link>
    <nav className="headerNavP4" aria-label="Primary navigation">
      <Link href="/work">Work</Link>
      <Link href="/process">Process</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </header>;
}
