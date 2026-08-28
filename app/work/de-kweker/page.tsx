import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { KwkrLockup } from "@/components/kwkr-lockup";
import { ContactStage } from "@/components/contact-stage";
import { projects } from "@/content/projects";
import { identityAssets } from "@/content/identity-assets";
import { pageMetadata } from "@/lib/metadata";
import { projectSchema } from "@/lib/schema";
const p=projects["de-kweker"];
export const metadata: Metadata=pageMetadata({title:"kwkr.be · De Kweker Website Case",description:"DeeQ Studio designed and developed the official digital platform for De Kweker.",path:"/work/de-kweker",image:p.ogImage});
export default function Page(){return <><JsonLd data={projectSchema(p)}/><article className="case caseKweker">
  <section className="caseKHero"><Image src={p.image} alt={p.imageAlt} fill priority sizes="100vw"/><div className="caseCounter">01 / 02</div><div className="caseKType"><span data-intro-meta>Official digital platform</span><h1><span className="wordMask"><b data-intro-word>KWKR</b></span><br/><em className="wordMask"><b data-intro-word>.BE</b></em></h1><a href={p.liveUrl} target="_blank" rel="noreferrer">Live platform</a></div></section>
  <section className="caseSplit"><div><small>The assignment</small><h2>One official place for releases, live, media and booking.</h2></div><div><p>Releases, live dates, media, booking and search visibility needed one official home. The interface stays direct so the work remains central.</p><dl><div><dt>Direction</dt><dd>Visual direction & responsive design</dd></div><div><dt>Build</dt><dd>Front-end & content structure</dd></div><div><dt>Launch</dt><dd>SEO, previews & production QA</dd></div></dl></div></section>

  <section className="caseIdentity caseIdentityKweker caseIdentityPublished caseIdentityKwekerP5" aria-labelledby="kweker-identity-title">
    <header data-reveal-soft><small>Identity / digital system</small><h2 id="kweker-identity-title">KWKR has to read<br/>before anything plays.</h2></header>
    <figure className="caseIdentityProjectFavicon caseIdentityProjectFaviconKweker" data-reveal-soft><div><Image src={identityAssets.deKweker.favicon} alt="kwkr.be favicon" width={512} height={512}/></div><figcaption>Current browser mark</figcaption></figure>
    <figure className="caseIdentityKwkr" data-reveal-soft><KwkrLockup/><figcaption>KWKR / 8000 / kwkr.be</figcaption></figure>
    <p className="caseIdentityNote" data-reveal-soft>The same KWKR language carries the favicon, releases, live pages and booking without turning them into separate mini-sites.</p>
  </section>

  <section className="kwekerSourceProof" aria-labelledby="kweker-source-title">
    <header className="kwekerSourceHead"><small>kwkr.be / production</small><h2 id="kweker-source-title">Homepage.<br/>Mobile. Booking.</h2><p>Real output from the production build, shown without redrawing the interface for this case.</p></header>
    <figure className="kwekerSourceDesktop"><Image src="/media/source-proof/kwkr-home-desktop.webp" alt="Actual kwkr.be homepage rendered from the production source" width={1600} height={1000} sizes="(max-width: 980px) calc(100vw - 56px), 94vw"/><figcaption>Homepage / desktop</figcaption></figure>
    <div className="kwekerSourceTrail">
      <figure className="kwekerSourceMobile"><Image src="/media/source-proof/kwkr-home-mobile.webp" alt="Actual kwkr.be mobile homepage rendered from the production source" width={430} height={932} sizes="(max-width: 700px) 68vw, (max-width: 980px) 28vw, 23vw"/><figcaption>Homepage / mobile</figcaption></figure>
      <figure className="kwekerSourceBooking"><Image src="/media/source-proof/kwkr-booking-desktop.webp" alt="Actual kwkr.be booking page rendered from the production source" width={1600} height={1000} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 980px) 64vw, 62vw"/><figcaption>Booking / production route</figcaption></figure>
    </div>
  </section>
  <section className="caseClose darkClose"><small>After launch</small><h2>New release.<br/>New show.<br/><em>Same platform.</em></h2><p>New work can be added without rebuilding the site around it.</p></section>
</article><nav className="nextWorld" aria-label="Next project"><span>Next world</span><Link href="/work/kwartier-west">Kwartier West</Link></nav><ContactStage/></>}
