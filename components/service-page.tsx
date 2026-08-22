import { ContactCta } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
export function ServicePage({eyebrow,title,accent,intro,heading,paragraphs}:{eyebrow:string;title:string;accent:string;intro:string;heading:string;paragraphs:string[]}){return <><PageHero eyebrow={eyebrow} title={title} accent={accent} lead={intro}/><section className="editorial"><h2>{heading}</h2><div>{paragraphs.map(p=><p key={p}>{p}</p>)}</div></section><ContactCta /></>}
