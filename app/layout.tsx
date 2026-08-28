import type { Metadata, Viewport } from "next";
import { CursorOrbit } from "@/components/cursor-orbit";
import { JsonLd } from "@/components/json-ld";
import { MotionEngine } from "@/components/motion-engine";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteSchema } from "@/lib/schema";
import { site } from "@/content/site";
import "./globals.css";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "DeeQ Studio | Web Design & Creative Development in Bruges", template: "%s | DeeQ Studio" },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [
      { url: "/media/deeq-favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/media/deeq-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/media/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/media/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/media/apple-touch-icon-180.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { capable: true, title: site.name, statusBarStyle: "black-translucent" },
  verification: { google: "d62ab7e3a23715db" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CursorOrbit/><a className="skipLink" href="#main">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/><MotionEngine/><JsonLd data={siteSchema}/></body></html>;
}
