import { ContactStage } from "@/components/contact-stage";
import { EditorialHero } from "@/components/editorial-hero";

export function ServiceDetail({eyebrow,title,accent,intro,heading,paragraphs,markers}:{eyebrow:string;title:string;accent:string;intro:string;heading:string;paragraphs:string[];markers:string[]}){
  return <><EditorialHero eyebrow={eyebrow} title={title} accent={accent} lead={intro}/><section className="serviceDetail"><aside>{markers.map((m)=><span key={m}>{m}</span>)}</aside><div><h2 data-reveal-soft>{heading}</h2>{paragraphs.map(p=><p key={p} data-reveal-soft>{p}</p>)}</div></section><ContactStage/></>
}
