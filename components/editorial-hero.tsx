export function EditorialHero({eyebrow,title,accent,lead}:{eyebrow:string;title:string;accent:string;lead:string}){
  return <section className="editorialHero editorialHeroP4">
    <span>{eyebrow}</span>
    <h1><span>{title}</span><br/><span className="editorialAccent">{accent}</span></h1>
    <p>{lead}</p>
    <div className="editorialRule" aria-hidden="true"/>
  </section>
}
