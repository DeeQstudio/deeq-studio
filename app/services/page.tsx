import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ title: "Web Design, Identity & Digital Care", description: "Web design, development, identity and ongoing digital care from DeeQ Studio.", path: "/services" });
const services = [{ href: "/services/web-design", title: "Web design & development", copy: "Distinctive, responsive websites and digital systems built for real use." },{ href: "/services/identity", title: "Identity & content", copy: "Visual direction and systems that remain coherent across every public touchpoint." },{ href: "/services/digital-care", title: "Digital care", copy: "Maintenance, content and recurring launches without ownership lock-in." }];
export default function ServicesPage(){return <><PageHero eyebrow="Services · DeeQ Studio" title="What DeeQ" accent="can own." lead="A focused deliverable or the full digital workload, shaped around the actual problem rather than an agency package."/><section className="serviceList">{services.map((service,index)=><Link href={service.href} key={service.href}><small>0{index+1}</small><h2>{service.title}</h2><p>{service.copy}</p><span>Explore ↗</span></Link>)}</section><ContactCta /></>}
