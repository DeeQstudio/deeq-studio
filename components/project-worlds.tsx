import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";

export function ProjectWorlds(){
  const kweker=projects["de-kweker"];
  const kw=projects["kwartier-west"];

  return <section id="work" className="projectWorlds" aria-labelledby="project-worlds-title">
    <h2 id="project-worlds-title" className="srOnly">Selected DeeQ Studio work</h2>

    <Link href="/work/de-kweker" className="kwekerWorld" data-kweker-world>
      <div className="kwekerWorldMedia" data-kweker-media>
        <Image src={kweker.image} alt={kweker.imageAlt} fill sizes="100vw" />
      </div>
      <div className="kwekerWorldFog" aria-hidden="true" />
      <div className="kwekerWorldCity" aria-hidden="true" data-kweker-city>8000</div>
      <div className="kwekerWorldName" data-kweker-name><span>DE</span><span>KWEKER</span></div>
      <div className="kwekerWorldInfo">
        <p>{kweker.summary}</p>
        <span>Open the case</span>
      </div>
    </Link>

    <div className="worldHandoff" aria-hidden="true"><span>Same studio</span><i/><span>different project</span></div>

    <Link href="/work/kwartier-west" className="kwWorld" data-kw-world>
      <div className="kwWorldPhoto" data-kw-photo><Image src={kw.image} alt={kw.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 72vw, 61vw" /></div>
      <div className="kwWorldRed" aria-hidden="true" />
      <div className="kwWorldWord" data-kw-word><Image src="/media/kwartier-west-wordmark.png" alt="Kwartier West" width={804} height={185}/></div>
      <div className="kwWorldScenes" aria-hidden="true"><span>TEKNO</span><span>HIP HOP</span></div>
      <div className="kwWorldInfo"><p>{kw.summary}</p><span>Open the case</span></div>
    </Link>
  </section>;
}
