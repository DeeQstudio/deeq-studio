import Image from "next/image";
import Link from "next/link";

export function BuildContinuum(){
  return <section className="buildContinuum" aria-labelledby="build-continuum-title">
    <div className="buildContinuumLead" data-reveal-soft>
      <h2 id="build-continuum-title">From mark<br/>to live site.</h2>
      <p>The mark, interface and production build have to agree at favicon size, on mobile and on the live domain.</p>
    </div>

    <div className="buildProof buildProofMark" data-reveal-soft>
      <Image src="/media/deeq-dq-mark.png" alt="DeeQ DQ mark" width={512} height={512}/>
      <span>Identity</span>
    </div>

    <div className="buildProof buildProofScreen" data-reveal-soft>
      <Image src="/media/source-proof/kwkr-home-desktop.webp" alt="Actual kwkr.be production interface" width={1600} height={1000}/>
      <span>Interface</span>
    </div>

    <div className="buildProof buildProofLive" data-reveal-soft>
      <div><b>deeqstudio.com</b><i/><span>live</span></div>
      <div><b>kwkr.be</b><i/><span>live</span></div>
      <div><b>kwartierwest.be</b><i/><span>live</span></div>
      <span>Production & care</span>
    </div>

    <nav className="buildContinuumLinks" aria-label="DeeQ Studio practice">
      <Link href="/services/identity">Identity</Link>
      <Link href="/services/web-design">Web design & development</Link>
      <Link href="/services/digital-care">Digital care</Link>
      <Link href="/process">Process</Link>
    </nav>
  </section>;
}
