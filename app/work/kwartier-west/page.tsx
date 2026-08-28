import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ContactStage } from "@/components/contact-stage";
import { identityAssets } from "@/content/identity-assets";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { projectSchema } from "@/lib/schema";
const p=projects["kwartier-west"];
export const metadata: Metadata=pageMetadata({title:"Kwartier West Website Case",description:"A digital platform connecting Kwartier West's scenes, events and booking.",path:"/work/kwartier-west",image:p.ogImage});
export default function Page(){return <><JsonLd data={projectSchema(p)}/><article className="case caseKw">
  <section className="caseKwHero"><Image src={p.image} alt={p.imageAlt} fill priority sizes="100vw"/><div className="kwHeroVeil"/><div className="caseCounter">02 / 02</div><div className="kwHeroType"><Image src="/media/kwartier-west-wordmark.png" alt="Kwartier West" width={804} height={185}/><span>{p.eyebrow}</span><a href={p.liveUrl} target="_blank" rel="noreferrer">Live platform</a></div><b className="kwEdge" aria-hidden="true">WEST / WEST / WEST / WEST</b></section>
  <section className="kwChoice"><small>The structure</small><div><span>TEKNO</span><i>or</i><span>HIP HOP</span></div><p>Different scenes keep their own entrance. Events and booking stay connected underneath.</p></section>
  <section className="kwEditorial"><div><small>The assignment</small><h2>Do not flatten the scene into a corporate website.</h2><p>Kwartier West already had a strong visual language. DeeQ translated it into a digital structure where the collective can grow while each scene keeps its own character.</p></div><figure><Image src="/media/kwartier-west-social.jpg" alt="Kwartier West event visual" fill sizes="(max-width: 980px) 100vw, 46vw"/></figure></section>

  <section className="caseIdentity caseIdentityKw caseIdentityPublished caseIdentityKwP5" aria-labelledby="kw-identity-title">
    <header data-reveal-soft><small>Identity / live system</small><h2 id="kw-identity-title">The collective keeps<br/>its own pressure.</h2></header>
    <figure className="caseIdentityProjectFavicon caseIdentityProjectFaviconKw" data-reveal-soft><div><Image src={identityAssets.kwartierWest.favicon} alt="Kwartier West favicon" width={512} height={512}/></div><figcaption>Current browser mark</figcaption></figure>
    <figure className="caseIdentityWordmark caseIdentityWordmarkPublished" data-reveal-soft><div><Image src={identityAssets.kwartierWest.wordmark} alt="Kwartier West wordmark" width={804} height={185}/></div><figcaption>Published wordmark / live system</figcaption></figure>
    <div className="caseIdentityKwUrl" data-reveal-soft><span>kwartierwest.be</span><small>live platform</small></div>
    <p className="caseIdentityNote" data-reveal-soft>The wordmark and KW favicon stay fixed while events, photography and both scenes can change the surrounding pace.</p>
  </section>

  <section className="kwSourceProof" aria-labelledby="kw-source-title">
    <div className="kwSourceIntro"><small>kwartierwest.be / production</small><h2 id="kw-source-title">Tekno. Hip hop.<br/>One booking desk.</h2><p>Real output from the production build: the scene entrance, booking route and mobile composition.</p></div>
    <figure className="kwSourceHome"><Image src="/media/source-proof/kw-home-desktop.webp" alt="Actual Kwartier West homepage rendered from the production source" width={1600} height={1000} sizes="(max-width: 980px) calc(100vw - 56px), 94vw"/><figcaption>Home / Tekno + Hip hop</figcaption></figure>
    <div className="kwSourceLower">
      <div className="kwSourceBookingCopy"><span>Booking</span><p>Single artists, multiple artists, a complete scene or a takeover all use the same operational route.</p></div>
      <figure className="kwSourceBooking"><Image src="/media/source-proof/kw-booking-desktop.webp" alt="Actual Kwartier West booking route rendered from the production source" width={1600} height={1000} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 980px) 60vw, 58vw"/><figcaption>Booking desk / production route</figcaption></figure>
      <figure className="kwSourceMobile"><Image src="/media/source-proof/kw-home-mobile.webp" alt="Actual Kwartier West mobile homepage rendered from the production source" width={430} height={932} sizes="(max-width: 700px) 70vw, (max-width: 980px) 28vw, 23vw"/><figcaption>Home / mobile</figcaption></figure>
    </div>
  </section>
</article><nav className="nextWorld nextWorldLight" aria-label="Next project"><span>Next world</span><Link href="/work/de-kweker">De Kweker</Link></nav><ContactStage/></>}
