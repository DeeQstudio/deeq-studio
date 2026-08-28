import type { Metadata } from "next";
import Link from "next/link";
import { ContactStage } from "@/components/contact-stage";
import { pageMetadata } from "@/lib/metadata";

export const metadata:Metadata=pageMetadata({title:"Web Design, Identity & Digital Care",description:"Web design, development, identity and ongoing digital care from DeeQ Studio.",path:"/services"});

export default function Page(){return <>
  <section className="practiceIntroP4">
    <span>What DeeQ does</span>
    <h1>Identity, website<br/>or what comes after.</h1>
    <p>Start with the job, not a package. The scope follows what actually needs designing, building or maintaining.</p>
  </section>

  <section className="practiceSlices" aria-label="DeeQ Studio services">
    <Link href="/services/identity" className="practiceSlice practiceSliceIdentity">
      <strong>Identity</strong><p>Wordmarks, favicons, type, colour and visual rules that stay recognisable across real uses.</p><span>Identity work</span>
    </Link>
    <Link href="/services/web-design" className="practiceSlice practiceSliceWeb">
      <strong>Web design<br/>& development</strong><p>Structure, responsive interface, motion and production code built together.</p><span>Web design & development</span>
    </Link>
    <Link href="/services/digital-care" className="practiceSlice practiceSliceCare">
      <strong>Digital care</strong><p>Updates, launches, maintenance and the practical work that keeps a live site current.</p><span>Digital care</span>
    </Link>
  </section>
  <ContactStage/>
</>}
