import type { Metadata } from "next";
import { EditorialHero } from "@/components/editorial-hero";
import { ContactStage } from "@/components/contact-stage";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata({title:"How We Work",description:"A clear web design and development process from direction to production and handoff.",path:"/process"});
const steps=[
 ["01","Start with what exists","Send the current site, rough idea or problem. First we decide what actually needs to change."],
 ["02","Set direction","Structure, priorities and visual direction are decided while the big choices are still easy to change."],
 ["03","Work in the browser","You review real screens and responsive behaviour while the work is being built, not at a final reveal."],
 ["04","Break it before launch","Keyboard use, motion preferences, metadata, links, layouts and edge cases are checked before release."],
 ["05","Hand over cleanly","Take the code and accounts, or keep DeeQ involved for updates. Ownership stays yours either way."]
];
export default function Page(){return <><EditorialHero eyebrow="How DeeQ works" title="See it early." accent="Fix it early." lead="Direction becomes real screens quickly. Feedback happens while changes are still easy, then QA happens before launch."/><section className="processSpine"><div className="processSpineLine" aria-hidden="true"/>{steps.map(([n,t,c],i)=><article className={`processStep step${i+1}`} key={n} data-reveal><small>{n}</small><h2>{t}</h2><p>{c}</p></article>)}</section><ContactStage kicker="Send what already exists."/></>}
