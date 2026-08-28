import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHero } from "@/components/editorial-hero";
import { ContactStage } from "@/components/contact-stage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Webdesign Brugge",
  description: "Webdesign en creative development vanuit Brugge. Responsieve websites, identiteit en digitale productie door DeeQ Studio.",
  path: "/nl/webdesign-brugge",
  locale: "nl_BE",
});

export default function Page(){
  return <div lang="nl-BE">
    <EditorialHero eyebrow="Webdesign / Brugge" title="Websites uit Brugge." accent="Niet uit een template." lead="DeeQ Studio ontwerpt en bouwt digitale platformen voor merken, makers en organisaties die een eigen visuele taal nodig hebben."/>
    <section className="localProof">
      <div data-reveal><small>Vanuit Brugge</small><h2>Ontwerp en ontwikkeling blijven één geheel.</h2></div>
      <div data-reveal><p>Richting, interface, responsive gedrag, toegankelijkheid, performance, metadata en oplevering worden samen uitgewerkt.</p><Link href="/work">Bekijk geselecteerd werk</Link></div>
    </section>
    <ContactStage kicker="Iets bouwen vanuit Brugge?"/>
  </div>;
}
