export function PageHero({ eyebrow, title, accent, lead }: { eyebrow: string; title: string; accent: string; lead: string }) {
  return (
    <section className="pageHero">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}<br /><em>{accent}</em></h1></div>
      <p className="lead">{lead}</p>
    </section>
  );
}
