import Link from "next/link";

export function ContactCta({ children = "Bring the rough idea." }: { children?: React.ReactNode }) {
  return <section className="contactCta"><div className="contactField" aria-hidden="true"><i /><i /><i /></div><p className="eyebrow">Next / a conversation</p><h2>{children}</h2><Link href="/contact">Start a project <span aria-hidden="true">↗</span></Link></section>;
}
