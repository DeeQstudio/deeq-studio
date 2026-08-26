import styles from "./page-hero.module.css";

export function PageHero({ eyebrow, title, accent, lead }: { eyebrow: string; title: string; accent: string; lead: string }) {
  return (
    <section className={styles.hero}>
      <div className={styles.coordinates} aria-hidden="true"><span>DeeQ / Studio</span><i /><span>Selected discipline</span></div>
      <div className={styles.title} data-motion="title"><p>{eyebrow}</p><h1><span>{title}</span><em>{accent}</em></h1></div>
      <div className={styles.context} data-motion="copy"><span aria-hidden="true">01</span><p>{lead}</p></div>
    </section>
  );
}
