import Image from "next/image";
import Link from "next/link";

export function LogoHero(){
  return <section className="brandHero" data-brand-hero aria-labelledby="brand-hero-title">
    <h1 id="brand-hero-title" className="srOnly">DeeQ Studio — web design and creative development in Bruges, Belgium</h1>

    <div className="brandHeroFrame" aria-hidden="true">
      <span>Independent digital studio</span>
      <span>Bruges, Belgium</span>
    </div>

    <div className="brandHeroSticky">
      <div className="brandHeroCoreAnchor" aria-hidden="true">
        <div className="brandHeroCore" data-brand-core>
          <Image src="/media/deeq-dq-mark-transparent.png" alt="" width={512} height={512} priority />
        </div>
      </div>

      <div className="brandHeroAxis" data-brand-axis aria-hidden="true" />

      <div className="brandWordAnchor" aria-hidden="true">
        <div className="brandWord brandWordLeft" data-brand-left>
          <Image src="/media/deeq-wordmark-white.png" alt="" width={762} height={149} priority />
        </div>
      </div>
      <div className="brandWordAnchor" aria-hidden="true">
        <div className="brandWord brandWordRight" data-brand-right>
          <Image src="/media/deeq-wordmark-white.png" alt="" width={762} height={149} priority />
        </div>
      </div>

      <div className="brandHeroCaption" data-brand-caption>
        <Link href="#work">See the work</Link>
      </div>
    </div>
  </section>;
}
