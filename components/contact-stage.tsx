import { site } from "@/content/site";

export function ContactStage({ kicker="Tell me what needs building." }: {kicker?:string}){
  return <section className="contactStage contactStageP4">
    <p>{kicker}</p>
    <a href={`mailto:${site.email}?subject=New%20project%20for%20DeeQ%20Studio`} aria-label={`Email DeeQ Studio at ${site.email}`}>
      <span>info@</span><span>deeqstudio.com</span>
    </a>
    <div><span>DeeQ Studio</span><span>{site.location}</span></div>
  </section>;
}
