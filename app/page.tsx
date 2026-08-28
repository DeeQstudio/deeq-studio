import type { Metadata } from "next";
import { BuildContinuum } from "@/components/build-continuum";
import { ContactStage } from "@/components/contact-stage";
import { GhostTypeField } from "@/components/ghost-type-field";
import { IdentityShowcase } from "@/components/identity-showcase";
import { LogoHero } from "@/components/logo-hero";
import { ProjectWorlds } from "@/components/project-worlds";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ title: "DeeQ Studio | Web Design & Creative Development in Bruges", description: "Independent web design and creative development studio in Bruges, Belgium. Distinctive websites, identities and digital systems.", path: "/", absoluteTitle: true });

export default function HomePage(){
  return <>
    <LogoHero/>

    <section className="studioThesis" aria-labelledby="studio-thesis-title">
      <h2 id="studio-thesis-title" data-reveal-soft>A Kwartier West site should feel like <span>Kwartier West.</span><br/>A De Kweker site should feel like <span>De Kweker.</span></h2>
      <p data-reveal-soft>DeeQ handles the direction, design and development behind both. The visual language belongs to the project.</p>
    </section>

    <GhostTypeField/>
    <ProjectWorlds/>
    <IdentityShowcase/>
    <BuildContinuum/>
    <ContactStage kicker="Tell me what needs building."/>
  </>;
}
