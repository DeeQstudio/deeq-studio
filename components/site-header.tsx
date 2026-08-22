import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";
import { navigation } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <Link className="brand" href="/" aria-label="DeeQ Studio home">
        <Image src="/media/deeq-wordmark-white.png" alt="DeeQ Studio" width={762} height={149} priority />
      </Link>
      <nav className="desktopNav" aria-label="Primary navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="headerCta" href="/contact">Start a project</Link>
      <MobileNavigation />
    </header>
  );
}
