import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata={...pageMetadata({title:"Webdesign Brugge",description:"Webdesign en development vanuit Brugge voor ondernemingen, artiesten en organisaties.",path:"/nl/webdesign-brugge"}),alternates:{canonical:"https://deeqstudio.com/nl/webdesign-brugge",languages:{en:"https://deeqstudio.com/services/web-design","nl-BE":"https://deeqstudio.com/nl/webdesign-brugge","x-default":"https://deeqstudio.com/services/web-design"}}};
const schema={"@context":"https://schema.org","@type":"Service",name:"Webdesign Brugge",provider:{"@type":"Organization",name:"DeeQ Studio",url:"https://deeqstudio.com/"},areaServed:["Brugge","West-Vlaanderen","België"],serviceType:"Webdesign en webdevelopment",url:"https://deeqstudio.com/nl/webdesign-brugge"};
export default function Page(){return <><JsonLd data={schema}/><PageHero eyebrow="DeeQ Studio · Brugge, België" title="Webdesign" accent="uit Brugge." lead="Een website die bij je merk hoort, technisch klopt en na de lancering niet half afgewerkt aanvoelt."/><section className="editorial"><h2>Geen standaardsite met jouw logo erop.</h2><div><p>DeeQ Studio ontwerpt en bouwt websites vanuit Brugge voor ondernemingen, artiesten en organisaties die digitaal sterker voor de dag willen komen.</p><p>Structuur, design, development, responsive gedrag, accessibility, performance, metadata en een nette overdracht horen bij dezelfde productie.</p><p>English version: <Link className="inlineLink" href="/services/web-design">Web design & development</Link></p></div></section><ContactCta>Een website in gedachten? Stuur het ruwe idee.</ContactCta></>}
