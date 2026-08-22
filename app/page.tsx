import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
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
      <section className="homeHero">
        <div className="heroCopy">
          <p className="eyebrow">Web design & creative development · Bruges, Belgium</p>
          <h1>Good work<br />should <em>move.</em></h1>
          <p>DeeQ designs and develops distinctive digital homes for businesses, artists and organisations—clear to use, built to last and recognisably theirs.</p>
          <div className="heroActions"><Link className="button" href="/work">See the work</Link><Link className="textLink" href="/contact">Start a project</Link></div>
        </div>
        <Link className="heroProject" href="/work/de-kweker" aria-label="View the De Kweker case">
          <Image src={kweker.image} alt={kweker.imageAlt} fill priority sizes="(max-width: 820px) 86vw, 52vw" />
          <span>{kweker.eyebrow}</span><strong>kwkr.be</strong>
        </Link>
      </section>

      <section className="statement"><p className="eyebrow">The standard</p><h2>Not a site you still have to <em>finish after launch.</em></h2><p>Responsive behaviour, accessibility, performance, metadata, browser details and a clean handoff belong to the work—not to a repair list afterwards.</p></section>

      <section className="workPair" aria-labelledby="work-title">
        <header><p className="eyebrow">Selected work · live</p><h2 id="work-title">Two clients.<br /><em>Two different worlds.</em></h2></header>
        <article className="projectWorld kwekerWorld">
          <Image src={kweker.image} alt={kweker.imageAlt} fill sizes="100vw" />
          <div><p>{kweker.eyebrow}</p><h3>{kweker.name}</h3><p>{kweker.summary}</p><Link href="/work/de-kweker">Enter the case</Link></div>
        </article>
        <article className="projectWorld kwartierWorld">
          <Image src={kwartier.image} alt={kwartier.imageAlt} fill sizes="100vw" />
          <div><Image className="kwLogo" src="/media/kwartier-west-wordmark.png" alt="Kwartier West" width={804} height={185} /><p>{kwartier.summary}</p><Link href="/work/kwartier-west">Enter the case</Link></div>
        </article>
      </section>

      <section className="capabilities"><header><p className="eyebrow">What DeeQ can own</p><h2>Direction, design and delivery.</h2></header><div><Link href="/services/web-design"><span>Web design & development</span><p>Strategy, responsive interfaces, creative development, accessibility, SEO and production delivery.</p></Link><Link href="/services/identity"><span>Identity & content</span><p>Visual systems, art direction and content that hold together beyond one screen.</p></Link><Link href="/services/digital-care"><span>Digital care</span><p>Maintenance, launches and ongoing improvements without technical lock-in.</p></Link></div></section>
      <ContactCta>Have a world that needs a digital home?</ContactCta>
    </>
  );
}
