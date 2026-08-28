import type { Metadata } from "next";
import { EditorialHero } from "@/components/editorial-hero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata=pageMetadata({title:"Contact",description:"Contact DeeQ Studio about web design, development, identity or ongoing digital care.",path:"/contact"});
export default function Page(){return <><EditorialHero eyebrow="Contact" title="Send what" accent="you have." lead="A link, rough idea, existing website or clear problem is enough to start."/><section className="contactDirect"><span>Start with the useful part.</span><a href={`mailto:${site.email}?subject=New%20project%20for%20DeeQ%20Studio`}>{site.email}</a><p>Tell me what exists today, what is getting in the way and what needs to be different. You do not need to arrive with the solution.</p><div><span>{site.location}</span><span>Local + remote projects</span></div></section></>}
