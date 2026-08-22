import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { SpatialHero } from "@/components/spatial-hero";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "DeeQ Studio | Web Design, Development & Digital Care in Bruges",
  description: "Independent web design and creative development studio in Bruges, Belgium. Distinctive websites, identities and digital systems.",
  path: "/",
});

export default function HomePage() {
  const kweker = projects["de-kweker"];
  const kwartier = projects["kwartier-west"];
  return (
    <>
      <SpatialHero />

      <section className="studioStandard"><div className="standardRail" aria-hidden="true"><span>Responsive</span><span>Accessible</span><span>Performant</span><span>Production-ready</span></div><div className="standardCopy"><p className="eyebrow">The standard</p><h2><span>Not a site</span><span>you still have to</span><em>finish after launch.</em></h2><p>Responsive behaviour, accessibility, performance, metadata, browser details and a clean handoff belong to the work—not to a repair list afterwards.</p></div></section>

      <section className="workPair" aria-labelledby="work-title">
        <header><p className="eyebrow">Selected work · live</p><h2 id="work-title">Two clients.<br /><em>Two different worlds.</em></h2></header>
        <article className="projectWorld kwekerWorld">
          <Image src={kweker.image} alt={kweker.imageAlt} fill sizes="100vw" />
          <span className="kwekerEdition" aria-hidden="true">KWKR<br /><small>Official platform</small></span>
          <div><p>{kweker.eyebrow}</p><h3>{kweker.name}</h3><p>{kweker.summary}</p><Link href="/work/de-kweker">Enter the case</Link></div>
        </article>
        <article className="projectWorld kwartierWorld">
          <Image src={kwartier.image} alt={kwartier.imageAlt} fill sizes="100vw" />
          <span className="kwShutter kwShutterOne" aria-hidden="true" /><span className="kwShutter kwShutterTwo" aria-hidden="true" />
          <div><Image className="kwLogo" src="/media/kwartier-west-wordmark.png" alt="Kwartier West" width={804} height={185} /><p>{kwartier.summary}</p><Link href="/work/kwartier-west">Enter the case</Link></div>
        </article>
      </section>

      <section className="capabilities instrumentPanel"><header><p className="eyebrow">What DeeQ can own</p><h2>Direction, design and delivery.</h2><div className="instrumentDial" aria-hidden="true"><i /><span>One accountable studio</span></div></header><div><Link className="capabilityDesign" href="/services/web-design"><small>01 / Structure</small><span>Web design & development</span><p>Strategy, responsive interfaces, creative development, accessibility, SEO and production delivery.</p><b aria-hidden="true"><i /><i /><i /></b></Link><Link className="capabilityIdentity" href="/services/identity"><small>02 / Expression</small><span>Identity & content</span><p>Visual systems, art direction and content that hold together beyond one screen.</p><b aria-hidden="true">Aa</b></Link><Link className="capabilityCare" href="/services/digital-care"><small>03 / Continuity</small><span>Digital care</span><p>Maintenance, launches and ongoing improvements without technical lock-in.</p><b aria-hidden="true"><i /></b></Link></div></section>
      <ContactCta>Have a world that needs a digital home?</ContactCta>
    </>
  );
}
