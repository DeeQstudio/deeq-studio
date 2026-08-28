import Image from "next/image";
import Link from "next/link";
import { identityAssets } from "@/content/identity-assets";

export function IdentityShowcase(){
  return (
    <section className="identityArchiveV2" aria-labelledby="identity-archive-title">
      <header className="identityArchiveV2Head" data-reveal-soft>
        <div>
          <span>Published identity</span>
          <h2 id="identity-archive-title">From full wordmark<br/>to 16px.</h2>
        </div>
        <p>Only marks that actually ship with the live projects: wordmarks, favicons and the browser identity people see.</p>
      </header>

      <div className="identityArchiveV2Body">
        <figure className="identityDeeqScene" data-reveal-soft>
          <div className="identityDeeqWord">
            <Image src={identityAssets.deeq.wordmark} alt="DeeQ Studio wordmark" width={762} height={149}/>
          </div>
          <div className="identityDeeqMark">
            <Image src={identityAssets.deeq.monogram} alt="DeeQ Studio DQ mark" width={512} height={512}/>
          </div>
          <div className="identityDeeqScale" aria-label="DeeQ favicon shown at working browser sizes">
            <span>Browser mark</span>
            <Image src={identityAssets.deeq.favicon} alt="" width={32} height={32}/>
            <Image src={identityAssets.deeq.favicon} alt="" width={24} height={24}/>
            <Image src={identityAssets.deeq.favicon} alt="" width={16} height={16}/>
          </div>
          <figcaption><b>DeeQ Studio</b><span>wordmark · DQ mark · favicon</span></figcaption>
        </figure>

        <figure className="identityKwScene" data-reveal-soft>
          <Link href="/work/kwartier-west" className="identityKwSceneLink" aria-label="Open the Kwartier West case">
            <div className="identityKwWord">
              <Image src={identityAssets.kwartierWest.wordmark} alt="Kwartier West wordmark" width={804} height={185}/>
            </div>
            <div className="identityKwBrowserMark">
              <Image src={identityAssets.kwartierWest.favicon} alt="Kwartier West favicon" width={512} height={512}/>
              <span>Live favicon</span>
            </div>
            <span className="identityKwDomain">kwartierwest.be</span>
          </Link>
          <figcaption><b>Kwartier West</b><span>published wordmark · red/white KW browser mark</span></figcaption>
        </figure>

        <figure className="identityKwekerScene" data-reveal-soft>
          <Link href="/work/de-kweker" className="identityKwekerSceneLink" aria-label="Open the De Kweker case">
            <div className="identityKwekerLive">
              <Image src="/media/kwkr-live-header-crop.webp" alt="Actual live kwkr.be header and hero output" width={1600} height={280}/>
            </div>
            <div className="identityKwekerMark">
              <Image src={identityAssets.deKweker.favicon} alt="Current kwkr.be favicon" width={512} height={512}/>
              <div><b>kwkr.be</b><span>Current browser mark</span></div>
            </div>
          </Link>
          <figcaption><b>De Kweker</b><span>actual live header · production favicon</span></figcaption>
        </figure>
      </div>
    </section>
  );
}
