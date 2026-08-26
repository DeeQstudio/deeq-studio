import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ title: "Selected Work", description: "Selected live work by DeeQ Studio for De Kweker and Kwartier West.", path: "/work" });

export default function WorkPage() {
  return <><PageHero eyebrow="Selected work · live" title="Two clients." accent="Two worlds." lead="Each project follows its own audience, identity and content. The production standard underneath stays rigorous." /><section className="workIndex">{Object.values(projects).map((project, index) => <article key={project.slug} className={`workIndexItem workIndex${index + 1}`}><div className="workIndexMedia" data-motion={index === 0 ? "image-left" : "image-right"}><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 820px) 100vw, 58vw" /></div><div data-motion={index === 0 ? "copy-right" : "copy-left"}><p className="eyebrow">{project.eyebrow}</p><h2>{project.name}</h2><p>{project.summary}</p><Link href={`/work/${project.slug}`}>View case</Link></div></article>)}</section><ContactCta>Need a world of your own?</ContactCta></>;
}
