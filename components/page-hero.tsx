export function PageHero({ eyebrow, title, accent, lead }: { eyebrow: string; title: string; accent: string; lead: string }) {
  return (
    <section className="pageHero">
      <div className="pageHeroSignal" data-motion="signal" aria-hidden="true"><span>{title}</span><em>{accent}</em><i /></div>
      <div data-motion="title"><p className="eyebrow">{eyebrow}</p><h1>{title}<br /><em>{accent}</em></h1></div>
      <p className="lead" data-motion="copy">{lead}</p>
    </section>
  );
}
