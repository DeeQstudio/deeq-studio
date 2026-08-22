import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

const project = projects["de-kweker"];
export const metadata: Metadata = pageMetadata({ title: "kwkr.be · De Kweker Website Case", description: "DeeQ Studio designed and developed the official digital platform for De Kweker.", path: "/work/de-kweker", image: project.ogImage });

export default function DeKwekerPage() {
  return <><article className="kwekerCase"><section className="kwekerHero"><Image src={project.image} alt="De Kweker portrait on the official kwkr.be platform" fill priority sizes="100vw" /><div><p>De Kweker · official digital platform</p><h1>kwkr.be</h1><p>Website, media, live and booking—designed and developed as one official destination.</p><a href={project.liveUrl} target="_blank" rel="noreferrer">Visit live platform ↗</a></div></section><section className="caseNarrative"><header><p className="eyebrow">The assignment</p><h2>The artist already had a world. The website had to bring it together.</h2></header><div><p>Releases, live dates, media, booking and search visibility previously needed one clear home. The interface stays dark and direct so photography, music and artwork remain central.</p><dl><div><dt>Direction</dt><dd>Visual direction and responsive design</dd></div><div><dt>Build</dt><dd>Front-end and content structure</dd></div><div><dt>Launch</dt><dd>SEO, social previews and production QA</dd></div></dl></div></section><section className="kwekerGallery"><figure><Image src="/media/kwkr-live.webp" alt="De Kweker and Friends live artwork" width={1080} height={1350} sizes="(max-width: 820px) 76vw, 42vw" /></figure><figure><Image src="/media/kwkr-release.webp" alt="De Kweker release artwork" width={300} height={300} sizes="(max-width: 820px) 48vw, 25vw" /></figure><p>The platform can absorb new releases and live moments without redesigning the entire site each time.</p></section></article><nav className="nextCase" aria-label="Next project"><span>Next project</span><Link href="/work/kwartier-west">Kwartier West →</Link></nav><ContactCta /></>;
}
