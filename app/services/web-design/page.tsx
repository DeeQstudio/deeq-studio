import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata({title:"Web Design & Development in Bruges, Belgium",description:"Distinctive responsive and accessible web design and development from Bruges.",path:"/services/web-design"});
export default function Page(){return <ServicePage eyebrow="Web design & creative development · Bruges" title="Web design" accent="with a point of view." intro="A website should feel unmistakably yours, work properly on the devices people use and stay manageable after launch." heading="Made to be remembered—and used." paragraphs={["DeeQ designs and develops focused company sites, campaign experiences, booking flows, portfolios and custom digital products.","Responsive behaviour, accessibility, performance, search foundations and a clean handoff are part of production from the start."]} />}
