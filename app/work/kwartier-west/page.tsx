import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

const project = projects["kwartier-west"];
export const metadata: Metadata = pageMetadata({ title: "Kwartier West Website Case", description: "A digital platform connecting Kwartier West's scenes, events and booking.", path: "/work/kwartier-west", image: project.ogImage });

export default function KwartierWestPage() {
  return <><article className="kwCase"><section className="kwHero"><Image src={project.image} alt="Kwartier West visual world" fill priority sizes="100vw" /><div className="kwHeroLogo"><Image src="/media/kwartier-west-wordmark.png" alt="Kwartier West" width={804} height={185} /><p>Collective · events · booking</p><a href={project.liveUrl} target="_blank" rel="noreferrer">Visit live platform ↗</a></div></section><section className="kwManifesto"><div><span>Kies je kant</span><strong>TEKNO</strong><strong>HIP HOP</strong></div><div><h1>A platform for different scenes—not one flattened audience.</h1><p>Kwartier West already had a strong visual language. DeeQ translated it into a structure where Tekno and Hip hop keep their own entrance, while events and booking remain connected underneath.</p></div></section><section className="kwSystem" aria-labelledby="kw-system-title"><div className="kwSystemRail" aria-hidden="true"><span>01</span><span>02</span><span>03</span></div><header><p>Kwartier West / digital system</p><h2 id="kw-system-title">One backbone.<br />Different entrances.</h2></header><div className="kwSystemPoster"><Image src="/media/kwartier-west-social.jpg" alt="Kwartier West event visual" fill sizes="(max-width: 820px) 84vw, 44vw" /><b>EVENTS</b><span>BOOKING / SCENES / COLLECTIVE</span></div></section><section className="kwClose"><p>What DeeQ connected</p><h2>Identity, events and booking, without making the scene feel corporate.</h2></section></article><nav className="nextCase lightNext" aria-label="Next project"><span>Next project</span><Link href="/work/de-kweker">De Kweker →</Link></nav><ContactCta /></>;
}
