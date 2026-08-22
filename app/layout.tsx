import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { MotionController } from "@/components/motion-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "DeeQ Studio | Web Design & Development in Bruges", template: "%s | DeeQ Studio" },
  description: site.description,
  applicationName: site.name,
  verification: { google: "d62ab7e3a23715db" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skipLink" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionController />
        <JsonLd data={organizationSchema} />
      </body>
    </html>
  );
}
