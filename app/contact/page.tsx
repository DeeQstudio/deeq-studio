import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({title:"Contact DeeQ Studio",description:"Contact DeeQ Studio about web design, development, identity or ongoing digital care.",path:"/contact"});
export default function ContactPage(){return <><PageHero eyebrow="Contact · DeeQ Studio" title="Bring the thing" accent="that is stuck." lead="A rough idea, an existing website or a problem you want off your list is enough to start the conversation."/><section className="contactPanel"><div><p className="eyebrow">Start here</p><h2>A few sentences are enough.</h2></div><div><p>Tell us what exists today, what is getting in the way and what you would like to be different. You do not need to diagnose the solution first.</p><a className="mailLink" href={`mailto:${site.email}?subject=New%20project%20for%20DeeQ%20Studio`}>{site.email}<span aria-hidden="true">↗</span></a><p className="location">Based in Bruges, Belgium. Local and remote projects are welcome.</p></div></section></>}
